<?php
namespace app\admin\model;
use think\Cache;
use think\Db;
use think\facade\Validate;
use think\Model;

class Nav extends model{

    protected $name = "nav";
    protected $autoWriteTimestamp = true;

    /**
     * 获取菜单的树形结构
     * @param $user
     * @return array
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public static function getList($user){

        $navList = Db::name("auth_group_access")
            ->alias('agc')
            ->field(['ag.navs'])
            ->join("auth_group ag",'ag.id = agc.group_id','left')
            ->where('agc.uid',$user->id)
            ->find();
        $list = DB::name("nav")->field(['id','nid','title','icon','name','jump','sort','nid as pid','create_time','update_time'])->where('id','in',explode(',',$navList['navs']))->select();
        return $list = self::getTree($list);
    }

    /**
     * 递归
     * @param $list
     * @param int $nid
     * @return array
     */
    public static function getTree($list,$nid=0){
        $tree = array();
        foreach($list as $k => $v) {
            if($v['nid'] == $nid) {
                $v['list'] = [];
                $v['list'] = self::getTree($list, $v['id']);
                $tree[] = $v;
            }
        }
        return $tree;
    }


    /**
     * func 添加导航栏
     * @param $data
     * @return bool
     */
    public function add($data){

        $validate = Validate::make(
            [
                'title' => 'require|max:25',
                'name'  => 'require|max:25'
            ]
        );
        if(!$validate->check($data)){
            $this->error = $validate->getError();
            return false;
        }
        $data['type'] = 1;
        $data['nid'] = isset($data['nid'])?$data['nid']:0;
        return $this->save($data);
    }


    public function edit($data){

        $validate = Validate::make(
            [
                'title' => 'require|max:25',
                'name'  => 'require|max'
            ]
        );
        if(!$validate->check($data)){
            $this->error = $validate->getError();
            return false;
        }
        $data['type'] = 1;
        $data['nid'] = isset($data['nid'])?$data['nid']:0;
        return $this->save($data);
    }
}