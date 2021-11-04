<?php

namespace app\admin\controller;
use thans\jwt\exception\JWTException;
use think\Controller;
use thans\jwt\facade\JWTAuth;
use think\Exception;

class Base extends Controller{

    public $auth = NULL;

    public function __construct(){
        try {
            $payload = JWTAuth::auth();
            $this->auth = $payload['user']->getValue();
        }catch (JWTException $exception){
            json('Unauthorized',401)->send();
            die;
        }

    }
}
