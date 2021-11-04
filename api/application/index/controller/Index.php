<?php
namespace app\index\controller;

use app\admin\model\Mine;
use app\index\service\Im;
use think\App;
use think\Controller;
use think\Db;
use \think\facade\Request;

class Index extends Controller
{

    public function vr(){

        $mine_id =Request::get('mine_id');
//        $this->assign('mine_id',Request::get('mine_id'));
//        $this->assign('status',empty(Request::get('type'))?0:1);
        return $this->fetch("{$mine_id}/index");
    }

    /**
     * 即时通讯
     * @return mixed
     */
    public function im(){

        $auth = Im::getAuth();
        $imService = new Im();
        $status = $imService->verify($auth);
        $this->assign('status',$status);
//        echo $status['data']['user']['role'];exit;
        if(empty($auth)){
            return $this->fetch('cim');
        }else{
            return $this->fetch('sim');
        }

    }

    /**
     * func获取token
     * @return \think\response\Json
     */
    public function getToken(){

        $request = Request::post();
        $imService = new Im();
        if(!$token = $imService->getToken($request)){
            return json(['code' => 0,'msg' => $imService->error]);
        }
        return  json(['code' => 1,'msg' => 'success','data' => ['token' => $token]]);
    }

    /**
     * 更新房间
     * @return \think\response\Json
     */
    public function updateRoom(){

        $request = Request::post();
        $imService = new Im();
        if(!$imService->update($request)){
            return json(['code' => 0,'msg' => $imService->error]);
        }
        return json(['code' => 1,'msg' => 'success']);

    }

    /**
     * 验证状态
     * @return \think\response\Json
     */
    public function verify(){

        $auth = NULL;
        $imService = new Im();
        if(!Request::has('token')){
            $status = $imService->verify($auth);
        }else{
            $auth = Im::getAuth();
            if($auth){
                $status = $imService->verify($auth);
            }else{
                return json(['code' => 0,'msg' => "token 已经过期，请重新登陆"]);
            }
        }
        return json($status);
    }

    /**
     * 获取房间列表
     * @return \think\response\Json
     * @throws \think\db\exception\DataNotFoundException
     * @throws \think\db\exception\ModelNotFoundException
     * @throws \think\exception\DbException
     */
    public function room(){

        $request = Request::request('mine_id');
        $list = Db::name("room")
            ->alias('r')
            ->field(['r.id','r.mine_id','user_id','r.status','r.is_publish','count','limit','a.name as username','a.language','m.name'])
            ->join('admin a','r.user_id = a.id','left')
            ->join('mine m','m.id = r.mine_id','left')
            ->where(['m.mine_id' => $request])
            ->select();
        return json(['code' => 1,'data' => $list,'msg' => "success"]);

    }

    /**
     * 获取房间信息
     * @return array|\think\response\Json
     */
    public function roominfo(){

        $request = Request::request();
        $imService = new Im();
        if(!$info = $imService->getRoomInfo($request)){
            return json(['code'  => $imService->code,'msg' => $imService->error ]);
        }
        return json(['code' => 1 ,'msg' => 'success','data' => $info]);
    }

    /**
     * func 房间内的流
     * @return \think\response\Json
     */
    public function stream(){

        $request = Request::request();
        $im = new Im();
        if(!$list = $im->stream($request)){
            return json(['code' => 0,'msg' => $im->error]);
        }
        return json(['code' => 1 ,'msg' => 'success','data' => $list]);
    }



    /**
     * func 判断对应矿场是否有vr
     * @return \think\response\Json
     */
    public function hasVr(){

        $request = Request::request();
        $mineModel= Mine::get(['mine_id' =>$request['mine_id']]);
        if(empty($mineModel)){
            return json(['code' => 1 ,'data' => ['has_vr' =>  false],'msg' => 'success']);
        }
        if($mineModel->has_vr ==0){
            return json(['code' => 1 ,'data' => ['has_vr' =>  false],'msg' => 'success']);
        }
        return json(['code' => 1 ,'data' => ['has_vr' =>  1],'msg' => 'success']);
    }
}
