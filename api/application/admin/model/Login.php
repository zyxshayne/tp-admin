<?php
namespace app\admin\model;
use think\Cache;
use think\facade\Validate;
use think\Model;

class Login extends model{


    protected $name = "admin";

    public function login($request){
        //验证器
        $validate = Validate::make(
            [
                'username'  => 'require',
                'password' => 'require',
                'captcha' => 'require',
            ]
        );
        if(!$validate->check($request)){
            $this->error = $validate->getError();
            return false;
        }
        if(!captcha_check($request['captcha'],$request['key'])){
            $this->error = "Error  Captcha code!";
            return false;
        }
        $record = $this->where('username',$request['username'])
            ->find();
        if(empty($record)){
            $this->error = "User is  not exist!";
            return false;
        }
        $record = $record->toArray();
        if(hash('md5',$request["password"])!=$record['password']){
            $this->error = "Incorrect password!";
            return false;
        }
        return $record;
    }

    public function getToken($request){

        $validate = Validate::make(
            [
                'username'  => 'require',
                'password' => 'require',
            ]
        );
        if(!$validate->check($request)){
            $this->error = $validate->getError();
            return false;
        }
        $record = $this->where('username',$request['username'])
            ->find();
        if(empty($record)){
            $this->error = "User is  not exist!";
            return false;
        }
        $record = $record->toArray();
        if(hash('md5',$request["password"])!=$record['password']){
            $this->error = "Incorrect password!";
            return false;
        }
        return $record;
    }
}
