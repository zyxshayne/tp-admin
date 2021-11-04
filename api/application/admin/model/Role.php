<?php
namespace app\admin\model;
use think\Cache;
use think\Db;
use think\facade\Request;
use think\facade\Validate;
use think\Model;

class Role extends model{

    public $name = "auth_group";
    protected $autoWriteTimestamp = true;

    /**
     * func 获取数据列表
     * @return array
     */
    public function getList(){

        $request = Request::request();
        $limit = isset($request['limit']) ? $request['limit']:10;
        $list = $this
            ->paginate($limit, false, [
                'query' => \request()->request()
            ]);
        $total =$this
            ->alias("a")
            ->count();
        !empty($list) &&  $list = $list->toArray()['data'];
        return [$list,$total];
    }

    /**
     * fun 添加与编辑
     * @param $data
     */
    public function add($data){

        if(!isset($data['title'])){
            $this->error = "title is required";
            return false;
        }
        if(!isset($data['info'])){
            $this->error = "info is required";
            return false;
        }
        if(isset($data['id'])){
            $model = self::get($data['id']);
            if(empty($model)){
                $this->error  = "role is not exist!";
                return false;
            }
            return $model->allowField(true)->save($data);
        }
        return $this->allowField(true)->save($data);
    }

    /**
     * func 角色分配菜单
     * @param $data
     * @return bool
     */
    public function nav($data){

        if(!isset($data['id'])){
            $this->error = "please select role!";
            return false;
        }
        $model = self::get($data['id']);
        if(empty($model)){
            $this->error = "role is not exist!";
            return false;
        }
        $model->allowField(true)->save($data);
        return true;
    }
}