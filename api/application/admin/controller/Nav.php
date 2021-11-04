<?php
namespace app\admin\controller;
use think\Db;
use think\facade\Request;
use app\admin\model\Nav as NavModel;



class Nav extends Base {

    /**
     * func 获取导航栏无限极分类
     * @return \think\response\Json
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function index(){
        $list = NavModel::getList($this->auth);
        return json(['code' => 1,'data' => $list,'msg' => 'success','count' => 2]);
    }

    /**
     * 添加导航栏
     * @return \think\response\Json
     */
    public function add(){
        $request = Request::post();
        $model = new NavModel();
        if(!$model->add($request)){
            return json( ['code' => 0,'msg' =>$model->getError()]);
        }
        return json(['code' => 1,'msg' => "success"]);
    }

    /**
     * 获取导航列表
     * @return \think\response\Json
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function getList(){

        $list  = Db::name('nav')->alias('n')
            ->field(['n.*','n.nid as pid','(select count(id) from vr_nav as b  where b.nid = n.id) as has_child'])
            ->select();
        return json(['code' => 1,'data' => $list]);
    }

    public function edit(){

        if(Request::isPost()){
            $model = NavModel::get(Request::request('id'));
            if($model){
                if(!$model->add(Request::request())){
                    return json(['code' => 0,'msg' => $model->getError()]);
                }
                return json(['code' => 1,'msg' => 'success']);
            }
            return  json(['code' => 0,'msg' => "nav is not exist!"]);
        }
        return json(['code' => 1,'data' => NavModel::get(Request::get('id')),'msg' => 'success']);
    }
}
