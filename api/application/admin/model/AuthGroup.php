<?php
namespace app\admin\model;
use mysql_xdevapi\BaseResult;
use think\Cache;
use think\Db;
use think\facade\Validate;
use think\Model;

class AuthGroup extends Model{

    protected $name = "auth_group";
    protected $autoWriteTimestamp = true;

    public function getList(){

    }

}
