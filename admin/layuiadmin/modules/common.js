/**

 @Name：layuiAdmin 公共业务
 @Author：贤心
 @Site：http://www.layui.com/admin/
 @License：LPPL

 */

layui.define(function(exports) {
	var $ = layui.$,
		layer = layui.layer,
		setter = layui.setter,
		admin = layui.admin

	//公共业务的逻辑处理可以写在此处，切换任何页面都会执行
	//……

	//退出
	admin.events.logout = function() {
		//执行退出接口
		var newData = layui.sessionData('logout');
		newData.logout = '退出登录';
		admin.exit(function() {
			location.href = '/views/login.html';
		});
	};

	//对外暴露的接口
	exports('common', {});
});
