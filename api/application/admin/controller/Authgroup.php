<?php
namespace app\admin\controller;
use app\admin\model\Manager;
use app\admin\model\Nav;
use think\Db;
use think\facade\Request;
use app\admin\model\Mine as mineModel;

class Authgroup extends Base{


    public function index(){

        $list = Db::name('auth_group')->where(['status' => 1])->select();
        return json(['code' => 1 ,'data' =>$list ]);
    }
}