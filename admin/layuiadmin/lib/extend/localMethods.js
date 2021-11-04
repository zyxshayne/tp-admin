//本地可用函数
layui.define(["jquery", "layer"], function(exports) { //提示：模块也可以依赖其它模块，如：layui.define('layer', callback);
	var MOD_NAME = "localMethods", //本地方法
		$ = layui.jquery,
		layer = layui.layer,
		obj = function() {};

	//获取URL建的值
	obj.prototype.getUrlParam = function(name) {    
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");    
		var URL =  decodeURI(window.location.search);    
		var r = URL.substr(1).match(reg);    
		if(r != null) {       //decodeURI() 函数可对 encodeURI() 函数编码过的 URI 进行解码
			      
			return  decodeURI(r[2]);    
		};    
		return null;
	};

	//上传图片进行验证
	obj.prototype.uploadImgFn = function(Dom) {
		var fileObj = Dom.files[0];
		if(!fileObj) {
			Dom.value = "";
			return false
		}
		if(fileObj.type != 'image/png' && fileObj.type != 'image/jpg' && fileObj.type != 'image/jpeg') {
			layer.msg('图片格式只能是jpg,png,jpeg!', {
				icon: 2
			});
			Dom.value = "";
			return false;
		}

		if(Math.floor(fileObj.size / 1024) > 1024 * 100) {
			layer.msg("上传图片不能超过100M", {
				icon: 2
			});
			Dom.value = "";
			return false
		}

		Dom.value = "";
		return fileObj;
	};
	
	/*
	 * 小写金额转换为大写金额  
	*/
	obj.prototype.digitUppercase = function(n){
		let fraction = ['角', '分']
		let digit = [
		'零', '壹', '贰', '叁', '肆',
		'伍', '陆', '柒', '捌', '玖'
		];
		let unit = [
		['元', '万', '亿'],
		['', '拾', '佰', '仟']
		];
		let head = n < 0 ? '欠' : ''
		n = Math.abs(n)
		let s = ''
		for (let i = 0; i < fraction.length; i++) {
		        s += (digit[Math.floor(Math.floor(n * 1000 * 10 * Math.pow(10, i)) % (10 * 1000) / 1000)] + fraction[i]).replace(/零./, '')
		    }
		s = s || '整'
		n = Math.floor(n)
		for (let i = 0; i < unit[0].length && n > 0; i++) {
		let p = ''
		for (let j = 0; j < unit[1].length && n > 0; j++) {
		p = digit[n % 10] + unit[1][j] + p
		n = Math.floor(n / 10)
		}
		s = p.replace(/(零.)*零$/, '').replace(/^$/, '零') + unit[0][i] + s
		    }
		return head + s.replace(/(零.)*零元/, '元')
		.replace(/(零.)+/g, '零')
		.replace(/^整$/, '零元整')
	}

	var lFuns = new obj();
	//输出test接口
	exports(MOD_NAME, lFuns);
});