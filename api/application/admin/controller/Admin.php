<?php
namespace app\admin\controller;
use app\admin\model\Manager;
use app\admin\model\Nav;
use think\Db;
use think\facade\Request;
use app\admin\model\Mine as mineModel;

class  Admin extends Base{

    /**
     * func 获取管理员列表
     * @return \think\response\Json
     */
    public function index(){

        $request = Request::request();
        $adminModel  = new Manager();
        list($list,$total) = $adminModel->getList($request);
        return json(['code' => 1 ,'data' => $list->toArray()['data'],'total' => $total]);
    }

    /**
     * func 用户详情
     * @param $id
     * @return \think\response\Json
     */
    public function detail($id){

        $record = Manager::get($id);
        return json(['code' => 1 ,'msg' => "success",'data' => $record ]);
    }
}
