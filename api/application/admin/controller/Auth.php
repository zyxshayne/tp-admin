<?php
namespace app\admin\controller;
use app\admin\model\Login;
use app\admin\model\Manager;
use think\captcha\Captcha;
use think\Controller;
use think\facade\Request;
use thans\jwt\facade\JWTAuth;



class Auth extends Controller{

    /**
     * 获取验证码
     * @return \think\Response
     */
    public function Captcha(){

        $captcha = new Captcha();
        return $captcha->entry();
    }

    /**
     * func登录
     * @return \think\response\Json
     */
    public function login(){

        //验证
        $request = Request::post();
        $loginModel = new Login();
        if(!$record = $loginModel->login($request)){
            return json( ['code' => 0,'msg' =>$loginModel->getError()]);
        }
        //用户生成token
        return json(['code' => 1,
                'data' =>[
                    'access_token' => JWTAuth::builder(['user' =>$record ]),
                    'token_type' => 'bearer'
             ],'msg' => 'success']);
    }

    /**
     * 注册用户
     * @return \think\response\Json
     */
    public function regist(){

        $request = Request::post();
        $managerModel = new Manager();
        if(!$managerModel->regist($request)){
            return json( ['code' => 0,'msg' =>$managerModel->getError()]);
        }
        return json(['code' => 1,'msg' => "success"]);
    }

    /**
     * func 获取token
     * @return \think\response\Json
     */
    public function gettoken(){

        $request = Request::post();
        $loginModel = new Login();
        if(!$record = $loginModel->getToken($request)){
            return json( ['code' => 0,'msg' =>$loginModel->getError()]);
        }
        //用户生成token
        return json(['code' => 1,
            'data' =>[
                'access_token' => JWTAuth::builder(['user' =>$record ]),
                'token_type' => 'bearer'
            ],'msg' => 'success']);
    }

    public function logout(){

    }
}
