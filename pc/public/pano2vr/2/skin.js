// Garden Gnome Software - Skin
// Pano2VR 6.1.10/18007
// Filename: test.ggsk
// Generated 2021-10-21T14:29:01

function pano2vrSkin(player,base) {
	var me=this;
	var skin=this;
	var flag=false;
	var skinKeyPressed = 0;
	this.player=player;
	this.player.skinObj=this;
	this.divSkin=player.divSkin;
	this.ggUserdata=player.userdata;
	this.lastSize={ w: -1,h: -1 };
	var basePath="";
	// auto detect base path
	if (base=='?') {
		var scripts = document.getElementsByTagName('script');
		for(var i=0;i<scripts.length;i++) {
			var src=scripts[i].src;
			if (src.indexOf('skin.js')>=0) {
				var p=src.lastIndexOf('/');
				if (p>=0) {
					basePath=src.substr(0,p+1);
				}
			}
		}
	} else
	if (base) {
		basePath=base;
	}
	this.elementMouseDown=[];
	this.elementMouseOver=[];
	var cssPrefix='';
	var domTransition='transition';
	var domTransform='transform';
	var prefixes='Webkit,Moz,O,ms,Ms'.split(',');
	var i;
	var hs,el,els,elo,ela,elHorScrollFg,elHorScrollBg,elVertScrollFg,elVertScrollBg,elCornerBg;
	if (typeof document.body.style['transform'] == 'undefined') {
		for(var i=0;i<prefixes.length;i++) {
			if (typeof document.body.style[prefixes[i] + 'Transform'] !== 'undefined') {
				cssPrefix='-' + prefixes[i].toLowerCase() + '-';
				domTransition=prefixes[i] + 'Transition';
				domTransform=prefixes[i] + 'Transform';
			}
		}
	}
	
	player.setMargins(0,0,0,0);
	
	this.updateSize=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggUpdatePosition) {
				e.ggUpdatePosition();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	
	this.callNodeChange=function(startElement) {
		var stack=[];
		stack.push(startElement);
		while(stack.length>0) {
			var e=stack.pop();
			if (e.ggNodeChange) {
				e.ggNodeChange();
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
	}
	player.addListener('changenode', function() { me.ggUserdata=player.userdata; me.callNodeChange(me.divSkin); });
	
	var parameterToTransform=function(p) {
		var hs='translate(' + p.rx + 'px,' + p.ry + 'px) rotate(' + p.a + 'deg) scale(' + p.sx + ',' + p.sy + ')';
		return hs;
	}
	
	this.findElements=function(id,regex) {
		var r=[];
		var stack=[];
		var pat=new RegExp(id,'');
		stack.push(me.divSkin);
		while(stack.length>0) {
			var e=stack.pop();
			if (regex) {
				if (pat.test(e.ggId)) r.push(e);
			} else {
				if (e.ggId==id) r.push(e);
			}
			if (e.hasChildNodes()) {
				for(var i=0;i<e.childNodes.length;i++) {
					stack.push(e.childNodes[i]);
				}
			}
		}
		return r;
	}
	
	this.addSkin=function() {
		var hs='';
		this.ggCurrentTime=new Date().getTime();
		el=me._button_1=document.createElement('div');
		els=me._button_1__img=document.createElement('img');
		els.className='ggskin ggskin_button_1';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAECElEQVRogc1aT2gcVRz+fm92ZrXF/2LZnUgplHQnKal6kKrooYsHixSsEgqCQvVii0Kbg4iCYiR4UJAqQQ9SLVjQCoqJrIoFxaYe6qFSdyeKB63ZsSBNq4duspOZz4PZuEn2z5vdSWa/0773vu/3vt/7vdn3lllBDyLrOx+BuFOA70icg6GmvVTxs0ZcWW9z7WD7A2Mkn1s1QPlSguqT5Q2/ztR391QC9kLuQYYy0YojwONlyz1Wa6u1t6UPUva35QDv25WBfK3dMxWw/cFdZHhSl68q6qaZ64qzPVMBMmi7+vUIr+brQI9UwK46Owl8H1VHhb09UQECkVa/Bgm4w4jbTFT0zQ1upeI7AFLR1XIp8QrQCPeBSHckFgwlmwChyM62zyJuSTSBbDW3D8'+
			'CWziPwTLIVEBzoTi/JJWBXnZ2A3NNNDAnDHxJLgMChLkP8ZVSsk0luoeHu5Jw8f/25RL9Gi92ISXwOJHgbDU01DPAIgEsdyH/faC1MAj1wF8pe2X4rUsGnAO6IIBv3LPcg0AO/B7wNP/0hUE9E0YRKJmufE08AAIIguKxNJj65kCoVas2eSECU3K5NVhhf3kwYfVf6bREZ02PLcc90v67vSTyBIGWMAcxpkUXGV3Z1cAePD9mqcxDAY5r0dz2zOLWyM7EKZH3nfgBvadL/EaiG3EQSyHC7A+IrXb6IvFy2imcbjsVnSw83cuu1V/nm39oC8gsvPf1As+F1fQY2cWij4fva5gXwqTDaitNxAnZlIE/Faywr/c1vcrbtQbSJ27YYvt9wGzSFYNQzp0+3pkREdm7bHij1LIC7F7uKoamGL0ix1ExjVwdvo3ACZJ/2RIIT'+
			'num2vXJrJ5CZz+0VkQMA8qsGW0zWN+fsDgWvQeDozqVr/j9qG2R85z4JOQKRPW1C7fes0tH6nux87iWIvKhjpA6nPMu9V5fcNIEMnc3icwSQp/Xnlmf8y3LUvCEYIuR5IXbrawEA5z3L3RxF0DAB288dZigjEGQjGugKnuVGfiaXCWw/dxeJVwDZFZ8tLURe+RqWTmK76hwi5XQC5k91ah4AxJ7L9cOQN0g0Pe3WDnLcs0qPdhMhRSU/g3EZigDKq166tPplXkQoCLRf68SEX4QyHId5AFAMo78Z6RQkjolp5svp0om4YqYEdNfhUnpRIC946dLbcQdWqYpZAODGHfh/yHsClS9b8ZsHFpc+s5B7WEL5ONbIlAkoHln5IzxuLO2dbNUZB/BU9yE5BcqbXtr9sPtY7bH8JJ4fGKM0+J9Ce8wCLJCq8Ge69EFM3rSw6u'+
			'nNzvfnqFKjQj7SRrtk2rCkMCPF2TXy2BLNb6MLzkMScAcgQxAMUXAzgCkJeYaG/GgY6tukTNfjXzzBUnzA6xLGAAAAAElFTkSuQmCC';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 1";
		el.ggDx=-46;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button call";
		el.ggType='button';
		hs ='';
		hs+='bottom : 52px;';
		hs+='cursor : pointer;';
		hs+='height : 48px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 48px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_1.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._button_1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		me.divSkin.appendChild(me._button_1);
		el=me._container_1=document.createElement('div');
		el.ggId="Container 1";
		el.ggDx=34;
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_container ";
		el.ggType='container';
		hs ='';
		hs+='bottom : 52px;';
		hs+='height : 48px;';
		hs+='left : -10000px;';
		hs+='position : absolute;';
		hs+='visibility : inherit;';
		hs+='width : 68px;';
		hs+='pointer-events:none;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._container_1.ggIsActive=function() {
			return false;
		}
		el.ggElementNodeId=function() {
			return player.getCurrentNode();
		}
		me._container_1.ggUpdatePosition=function (useTransition) {
			if (useTransition==='undefined') {
				useTransition = false;
			}
			if (!useTransition) {
				this.style[domTransition]='none';
			}
			if (this.parentNode) {
				var pw=this.parentNode.clientWidth;
				var w=this.offsetWidth;
					this.style.left=(this.ggDx + pw/2 - w/2) + 'px';
			}
		}
		el=me._button_2=document.createElement('div');
		els=me._button_2__img=document.createElement('img');
		els.className='ggskin ggskin_button_2';
		hs='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEQAAAAwCAYAAACooNxlAAADGklEQVRoge3YT2tUVxjH8e9z7sxc/2QEY0GrM5OgViemiYK6kSIoBAzu3OrCjYovwF0WuvIFdFNX3TQrhVoodiGo7a4tKa1lYhIhzExTW4jYEDqJueOcx4WbQsF7zp2ZhsL5rJ/fcx6eexnOHQiCIAiCIAiCIAj+92QzDlWIfh6mmEu2FuN8Z0A7WsRooaNmJW+jlSRZXxld5u/NmK3vC3m+b2upE3VOoYwhjAFjwH6HwdaBRYVF0EWBn6yJvhupv673c96+LGS2Ek8YdAKYAI71uP08Io/U2h8iI98faiTPetm8ZwuZK2/bi7y5hHARZbxXfdMI+tDCdLXZ/kKg032/Li0M549Zy2UwF0E/6LZfVgI1C9PWJndGl3jVRZ/s5obiG6hOATu66dNLAj'+
			'UVblcbyXTGvL+Fcu60ikwpMpEl/x+ZrjaTS74h74UsDMXnrerXvrlN8qraTHb5BLwWMl/JfaKYr4BBr7H+rQXaAmkptFBaIpIoOiDCdpQBYEBgu0LU1UmqT6q/tc+4ljsvZLZc+NgI94EDHsMsAzVgVoVfgJmRZnvGOQ/8Wo4PFIyOW+UoyrgRxtVnBgDks2pz47pTpWvL+Up8R9GrzjN4Phkfz8r5yyLyuUfk9RbJ7R9urP2RVmicBqjkj3stA0Ck6FXvw8iqZ2LLur655tTa7Xy54DkAwPEMGSeiHPTOwBWXOqeFqJXdvgPAuzcrSy6dfJQhtLdRYWdakdNCEC1lGABBUj/iMlHr/YYArEphT1qN20JU4ywDiEqmRfZLrmNT33S3hWRksX/1s78vQ/55eo0DMfJnpgmi6EmmXAoV+dY/JS8PL63/nlbltBAL9zxP'+
			'n1Frz/Trz5yRZnJT4RbwwjUj8KVjXbqnFXbGFH587w1RdVlFvlHL/SNLidPh3aqVGIyiwiTKJDDJez4pROT84cbGg7SezjfVuVJ8To1+KvzjDvDuan7XGPNgtb3x+MQL1lz79VqtxGBkCmeBE6AnQU4CRQCFWyPN5KZLH++v3frQtg/XpD2kFOqj9Va235YgCIIgCIIgCIIg6Ke3DRb6qIg5Us0AAAAASUVORK5CYII=';
		els.setAttribute('src',hs);
		els.ggNormalSrc=hs;
		els.setAttribute('style','position: absolute;top: 0px;left: 0px;width: 100%;height: 100%;-webkit-user-drag:none;pointer-events:none;;');
		els.className='ggskin ggskin_button';
		els['ondragstart']=function() { return false; };
		player.checkLoaded.push(els);
		el.appendChild(els);
		el.ggSubElement = els;
		el.ggId="Button 2";
		el.ggParameter={ rx:0,ry:0,a:0,sx:1,sy:1 };
		el.ggVisible=true;
		el.className="ggskin ggskin_button shutdown";
		el.ggType='button';
		hs ='';
		hs+='cursor : pointer;';
		hs+='height : 52px;';
		hs+='left : -1px;';
		hs+='position : absolute;';
		hs+='top : 3px;';
		hs+='visibility : inherit;';
		hs+='width : 79px;';
		hs+='pointer-events:auto;';
		el.setAttribute('style',hs);
		el.style[domTransform + 'Origin']='50% 50%';
		me._button_2.ggIsActive=function() {
			if ((this.parentNode) && (this.parentNode.ggIsActive)) {
				return this.parentNode.ggIsActive();
			}
			return false;
		}
		el.ggElementNodeId=function() {
			if ((this.parentNode) && (this.parentNode.ggElementNodeId)) {
				return this.parentNode.ggElementNodeId();
			}
			return player.getCurrentNode();
		}
		me._button_2.ggUpdatePosition=function (useTransition) {
		}
		me._container_1.appendChild(me._button_2);
		me.divSkin.appendChild(me._container_1);
		player.addListener('sizechanged', function() {
			me.updateSize(me.divSkin);
		});
	};
	this.hotspotProxyClick=function(id, url) {
	}
	this.hotspotProxyDoubleClick=function(id, url) {
	}
	me.hotspotProxyOver=function(id, url) {
	}
	me.hotspotProxyOut=function(id, url) {
	}
	player.addListener('changenode', function() {
		me.ggUserdata=player.userdata;
	});
	me.skinTimerEvent=function() {
		me.ggCurrentTime=new Date().getTime();
	};
	player.addListener('timer', me.skinTimerEvent);
	me.addSkin();
	var style = document.createElement('style');
	style.type = 'text/css';
	style.appendChild(document.createTextNode('.ggskin { font-family: Verdana, Arial, Helvetica, sans-serif; font-size: 14px;}'));
	document.head.appendChild(style);
	me.skinTimerEvent();
};