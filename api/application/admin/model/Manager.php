<?php
namespace app\admin\model;
use mysql_xdevapi\BaseResult;
use think\Cache;
use think\Db;
use think\exception\ErrorException;
use think\facade\Validate;
use think\Model;

class Manager extends Model{

    protected $name = "admin";

    protected $autoWriteTimestamp = true;

    /**
     * 注册
     * @param $data
     * @return bool
     */
    public function regist($data){
        //验证数据
        $validate = Validate::make(
            [
                "username" => 'require|max:25|unique:admin',
                "name"      => "require|max:25",
                "email"     => "email",
                "password"  => 'require'
            ],
            [
                'name.require' => "name is must require",
                'name.max' => "length of name max is 25",
                'username.require' => "name is must require",
                'username.max' => "length of name max is 25",
                'username.unique' => "username require unique",
                'email'    => "Email format error",
                'password.require'    => "password is must require"
            ]
        );
        if(!$validate->check($data)){
            $this->error = $validate->getError();
            return false;
        }
        $data['password'] = hash('md5',$data["password"]);
        Db::startTrans();
        try{
            $this->save($data);
            Db::name('auth_group_access')->insert(['uid' => $this->id,'group_id' => $data['identity']]);
            Db::commit();
        }catch (ErrorException $exception){
            $this->error = $exception->getMessage();
            Db::rollback();
            return false;
        }
        return $this->save($data);
    }

    /**
     * func 获取用户列表数据
     * @param $param
     * @return array
     */
    public function getList($param){

        $params = array_merge(
            [
                'status' => 1,
                'listRows' => 15,       // 每页数量
            ],$param
        );
        $filter = [];
        $params['status'] > 0 &&  $filter['a.status'] = 1;
        isset($params['name']) &&  $filter['name'] = $params['name'];
        isset($params['user_name']) &&  $filter['user_name'] = $params['user_name'];
        isset($params['identity']) &&  $filter['identity'] = $params['identity'];
        $list = $this
            ->alias('a')
            ->where($filter)
            ->field(['a.*','ag.title'])
            ->join("auth_group ag",'a.identity =ag.id')
            ->paginate($params['listRows'], false, [
                'query' => \request()->request()
            ]);
        $total =$this
            ->alias("a")
            ->where($filter)
            ->count();
        return [$list,$total];

    }

}