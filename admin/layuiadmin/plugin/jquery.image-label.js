/**
 * 图片中插入特征标签
 * @author eko.zhan
 * @since 2018-07-24 10:00
 */
;(function($){
    var area = null;
    var _dragLeft = 0;  //临时变量，拖拽开始记录鼠标与标签左侧边距
    var _dragTop = 0;   //临时变量，拖拽开始记录鼠标与标签上侧边距

    var builder = {
        debug: function(o){
            if (window.console && window.console.log){
                console.log(o);
            }
        },
        fire: function(key, elem, opts){
            if (typeof key == 'string') {
                if (this[key]){
                    return this[key](elem, opts);
                }else{
                    this.debug('function [' + key + '] undefined');
                }
            }
        },
        /**
         * 初始化插件
         * @param elem img 元素
         */
        init: function(elem){
            if ($(elem).parent('.kbs-label-area').length==0){
                $(elem).wrap('<div class="kbs-label-area"></div>');
                area = $(elem).parent('.kbs-label-area');
                this.debug('image-label plugins initialized.');
                //面板监听
                area.on({
                    'drop': function(e){
                        e.preventDefault();
                        e.stopPropagation();
                        var dataTransfer = e.dataTransfer || e.originalEvent.dataTransfer;
                        var data = dataTransfer.getData("Text");
                        if (data!='kbs-drag-active') return false;
                        var _label = $('.' + data);
                        var _left = (e.clientX || e.originalEvent.clientX) - _dragLeft;
                        var _top = (e.clientY || e.originalEvent.clientY) - _dragTop;
                        _label.css({
                            left: _left,
                            top: _top
                        });
                        _label.attr('_left', _left);
                        _label.attr('_top', _top);
                        $(this).append($('.' + data));
                        $('.' + data).removeClass('kbs-drag-active');
                    },
                    'dragover': function(e){
                        e.preventDefault();
                    }
                });
                //面板标签监听
                area.on('dragstart', '.kbs-label', function(e){
                    var _this = this;
                    $(_this).addClass('kbs-drag-active');
                    var dataTransfer = e.dataTransfer || e.originalEvent.dataTransfer;
                    dataTransfer.setData("Text", 'kbs-drag-active');
                    // 计算鼠标位置与 .kbs-label 之间的左上边距，在 drag stop 时需要调整
                    _dragLeft = e.clientX - _this.offsetLeft;
                    _dragTop = e.clientY - _this.offsetTop;
                });
                area.on('click', '.kbs-label', function(e){
                	$(this).find(".layui-btn-danger").toggle();
                });
                area.on('click', '.layui-btn-danger', function(e){
                	if (window.confirm('确定删除吗?删除后请点击保存哦')){
						$(this).parents(".kbs-label").remove();
                    }
//                  $(this).prop('contenteditable', true);
                });
//              area.on('dblclick', '.kbs-label', function(e){
//                  $(this).prop('contenteditable', true);
//              });
//              area.on('blur', '.kbs-label', function(e){
//                  var _this = this;
//                  $(this).prop('contenteditable', false);
//                  if ($(this).text()==''){
//                      if (window.confirm('确定删除吗')){
//                          $(this).remove();
//                      }
//                  }
//              });
            }
        },
        /**
         * 加载 json
         * @param arr [{"text":"主队","index":"1","top":"139","left":"778"},{"text":"客队","index":"2","top":"98","left":"483"}]
         */
        loadData: function(elem, opts){
            $(opts.data).each(function(i, item){
                var _labelHtml = '<div _id="' + item.id + '" class="kbs-label kbs-label-arrow kbs-label-arrow-left kbs-label-black " draggable="true" style="top:' + item.y + 'px;left:' + item.x + 'px" _top="' + item.y + '" _left="' + item.x + '"><span class="text">' + item.name + '</span><span class="layui-btn layui-btn-xs layui-btn-danger" style="margin-left: 10px;display:none;">删除</span></div>';
                area.append(_labelHtml);
            });
        },
        /**
         * 获取标签，返回 json arr
         */
        getData: function(){
            var _arr = [];
            var _labelArr = area.find('.kbs-label');
            $(_labelArr).each(function(i, _label){
                var _json = {};
                _json.name = $(_label).find(".text").text();
                _json.id = $(_label).attr('_id');
                _json.y = $(_label).attr('_top');
                _json.x = $(_label).attr('_left');
                _arr.push(_json);
            });
            return _arr;
        },
        create: function(elem, opts){
//          var _ind = area.find('.kbs-label').length;
//          _ind++;
//          var _top = $(elem).get(0).offsetTop;
//          var _left = $(elem).get(0).offsetLeft;
////          
//          opts = $.extend({
//              text: '新建标签_',
//              y: _top,
//              x: _left
//          }, opts);
//          console.log(opts)
//          var _class = 'kbs-label-' + _ind;
            var item = opts;
            var _labelHtml = '<div _id="' + item.id + '" class="kbs-label kbs-label-arrow kbs-label-arrow-left kbs-label-black" draggable="true" style="top:' + item.y + 'px;left:' + item.x + 'px" _top="' + item.x + '" _left="' + item.x + '"><span class="text">' + item.name + '</span><span class="layui-btn layui-btn-xs layui-btn-danger" style="margin-left: 10px;display:none;">删除</span></div>';
            area.append(_labelHtml);
        },
        sava:function(elem, opts){
        	var labelArr = localStorage.getItem('labelArr');
        	if(!labelArr||labelArr=="null"){
        		var arr = [];
        		arr[opts]=builder.getData();
        		localStorage.setItem('labelArr',JSON.stringify(arr));
        	}else{
        		var labelArr = JSON.parse(localStorage.getItem('labelArr'));
        		labelArr[opts]=builder.getData();
        		localStorage.setItem('labelArr',JSON.stringify(labelArr));
        	}
        },
        labelDel:function(elem, opts){
        	$(".kbs-label-area > .kbs-label").remove();
        },
        delAll:function(elem, opts){
	      	$(".kbs-label-area > .kbs-label").remove();
        	var labelArr = JSON.parse(localStorage.getItem('labelArr'));
        	if(labelArr.length>0){
        		labelArr.splice(opts,1);
        		localStorage.setItem('labelArr',JSON.stringify(labelArr));
        	}
        },
        hide: function(elem, opts){
            area.find('.kbs-label').hide();
        },
        show: function(elem, opts){
            area.find('.kbs-label').show();
        }
    }


    $.fn.extend({
        /**
         *
         * @param key
         * @param opts
         */
        imageLabel: function(key, opts){
            var _this = this;
            if (key==undefined || typeof key!='string'){
                builder.init(_this);
            }else{
                if ($(_this).parent('.kbs-label-area').length==0) builder.init(_this);
                return builder.fire(key, _this, opts);
            }
        }
    });

})(jQuery);