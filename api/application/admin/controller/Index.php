<?php
namespace app\admin\controller;
use app\admin\model\Nav;
use think\Db;
use think\facade\Request;

class  Index extends Base{

    /**
     * fun导航栏
     * @return \think\response\Json
     */
    public function nav(){
        $list = Nav::getList($this->auth);
        return json(['code' => 1 ,'data' => ['manage' => $this->auth,'nav' => $list]]);
    }
}