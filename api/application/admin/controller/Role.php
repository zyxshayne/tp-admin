<?php
namespace app\admin\controller;
use app\admin\model\Nav;
use think\Db;
use think\facade\Request;
use app\admin\model\Role as roleModel;

class  Role extends Base{


    /**
     * func 获取列表
     * @return \think\response\Json
     */
    public function index(){

        $model = new roleModel();
        list($list,$total) = $model->getList();
        return json(['code' => 1 ,'data' => $list,'total' => $total]);
    }

    /**
     * func 添加
     * @return \think\response\Json
     */
    public function add(){

        $request = Request::post();
        $model = new roleModel();
        if(!$result = $model->add($request)){
            return json(['code' => 0,'msg' => $model->getError()]);
        }
        return json(['code' => 1,'data' => $result,'msg' => "success"]);
    }

    /**
     * func 获取
     * @return \think\response\Json
     */
    public function detail(){

        $id = Request::post('id');
        if(empty($id)){
            return json(['code' => 0,'msg' => 'please select role']);
        }
        $model = roleModel::get($id);
        if(empty($model)){
            return  json(['code' => 0,'msg' => 'role is not exist']);;
        }
        return  json(['code' =>1 ,'data' => $model->toArray()]);
    }

    public function nav(){

        $request  = Request::post();
        $model = new roleModel();
        if(!$result = $model->nav($request)){
            return json(['code' => 0,'msg' => $model->getError()]);
        }
        return json(['code' => 1,'data' => $result,'msg' => "success"]);
    }

}