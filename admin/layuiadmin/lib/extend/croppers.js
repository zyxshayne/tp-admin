/*!
 * Cropper v3.0.0
 */

layui.define(['jquery','layer','admin','cropper',],function (exports) {
    var $ = layui.jquery
        ,layer = layui.layer
        ,admin = layui.admin
        ,cropper = layui.cropper;
    var html = "<div class=\"layui-fluid showImgEdit\" style=\"display: none\">\n" +
        "    <div class=\"layui-card\">\n" +
        "    <div class=\"layui-card-body\">\n" +
        
        "    <div class=\"layui-form-item\">\n" +
        "        <div class=\"layui-input-inline layui-btn-container\" style=\"width: auto;\">\n" +
        "            <label for=\"cropper_avatarImgUpload\" class=\"layui-btn layui-btn-primary\">\n" +
        "                <i class=\"layui-icon\">&#xe67c;</i>选择图片\n" +
        "            </label>\n" +
        "            <input class=\"layui-upload-file\" id=\"cropper_avatarImgUpload\" type=\"file\" value=\"选择图片\" name=\"file\">\n" +
        "        </div>\n" +
        "        <div class=\"layui-form-mid layui-word-aux\">封面尺寸限定750x500px,大小在5MB以内</div>\n" +
        "    </div>\n" +
        "    <div class=\"layui-row layui-col-space15\">\n" +
        "        <div class=\"layui-col-xs9\">\n" +
        "            <div class=\"readyimg\" style=\"height:450px;background-color: rgb(247, 247, 247);\">\n" +
        "                <img src=\"\" >\n" +
        "            </div>\n" +
        "        </div>\n" +
        "        <div class=\"layui-col-xs3\">\n" +
        "            <div class=\"img-preview\" style=\"width:200px;height:200px;overflow:hidden\">\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "    <div class=\"layui-row layui-col-space15\">\n" +
        "        <div class=\"layui-col-xs9\">\n" +
        "            <div class=\"layui-row\">\n" +
        "                <div class=\"layui-col-xs10\">\n" +
        "                    <button type=\"button\" class=\"layui-btn\" cropper-event=\"reset\" title=\"重置\">重置</button>\n" +
        "                    <button type=\"button\" class=\"layui-btn layui-icon layui-icon-left\" cropper-event=\"rotate\" data-option=\"-15\" title=\"Rotate -15 degrees\"> 向左15°旋转</button>\n" +
        "                    <button type=\"button\" class=\"layui-btn layui-icon layui-icon-right\" cropper-event=\"rotate\" data-option=\"15\" title=\"Rotate 15 degrees\"> 向右15°旋转</button>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "        <div class=\"layui-col-xs3\">\n" +
        "            <button class=\"layui-btn layui-btn-fluid\" cropper-event=\"confirmSave\" type=\"button\"> 保存修改</button>\n" +
        "        </div>\n" +
        "    </div>\n" +
        
        "    </div>\n" +
        "    </div>\n" +
        "\n" +
        "</div>";
        
    	var twoHtml = "<div class=\"layui-fluid showImgEdit\" style=\"display: none\">\n" +
        "    <div class=\"layui-card\">\n" +
        "    <div class=\"layui-card-body\">\n" +
        
        "    <div class=\"layui-row layui-col-space15\">\n" +
        "        <div class=\"layui-col-xs9\">\n" +
        "            <div class=\"readyimg\" style=\"height:450px;background-color: rgb(247, 247, 247);\">\n" +
        "                <img src=\"\" >\n" +
        "            </div>\n" +
        "        </div>\n" +
        "        <div class=\"layui-col-xs3\">\n" +
        "            <div class=\"img-preview\" style=\"width:200px;height:200px;overflow:hidden\">\n" +
        "            </div>\n" +
        "        </div>\n" +
        "    </div>\n" +
        "    <div class=\"layui-row layui-col-space15\">\n" +
        "        <div class=\"layui-col-xs9\">\n" +
        "            <div class=\"layui-row\">\n" +
        "                <div class=\"layui-col-xs10\">\n" +
        "                    <button type=\"button\" class=\"layui-btn\" cropper-event=\"reset\" title=\"重置\">重置</button>\n" +
        "                    <button type=\"button\" class=\"layui-btn layui-icon layui-icon-left\" cropper-event=\"rotate\" data-option=\"-15\" title=\"Rotate -15 degrees\"> 向左15°旋转</button>\n" +
        "                    <button type=\"button\" class=\"layui-btn layui-icon layui-icon-right\" cropper-event=\"rotate\" data-option=\"15\" title=\"Rotate 15 degrees\"> 向右15°旋转</button>\n" +
        "                </div>\n" +
        "            </div>\n" +
        "        </div>\n" +
        "        <div class=\"layui-col-xs3\">\n" +
        "            <button class=\"layui-btn layui-btn-fluid\" cropper-event=\"confirmSave\" type=\"button\"> 保存修改</button>\n" +
        "        </div>\n" +
        "    </div>\n" +
        
        "    </div>\n" +
        "    </div>\n" +
        "\n" +
        "</div>";
    var obj = {
        render: function(e){
            var self = this,
                elem = e.elem,
                saveW = e.saveW,
                saveH = e.saveH,
                mark = e.mark,
                area = e.area,
                url = e.url,
                done = e.done,
                imgUrl = e.imgUrl,
                cropperNum = e.cropperNum;
            
            if(imgUrl){
            	if(cropperNum===1){
		          	$('body').append(twoHtml);
            	}
            }else{
            	$('body').append(html);
            }
			var fileName = "";
            var content = $('.showImgEdit')
                ,image = $(".showImgEdit .readyimg img")
                ,preview = '.showImgEdit .img-preview'
                ,file = $(".showImgEdit input[name='file']")
                , options = {aspectRatio: mark,preview: preview,viewMode:1};
			
			if(imgUrl){
				layer.open({
			        type: 1
			        ,maxmin: true
			        ,content: content
			        , area: area
			        , success: function () {
			            image.attr('src', imgUrl).cropper(options);
			        }
			        , cancel: function (index) {
			            layer.close(index);
			            image.cropper('destroy');
			        }
			    });
			    
			    var name = imgUrl.split("/");
			    fileName = name[name.length-1];
			}else{
				$(elem).on('click',function () {
				    layer.open({
				        type: 1
				        ,maxmin: true
				        ,content: content
				        , area: area
				        , success: function () {
				            image.cropper(options);
				        }
				        , cancel: function (index) {
				            layer.close(index);
				            image.cropper('destroy');
				        }
				    });
				});
			}
            $(".layui-btn").on('click',function () {
                var event = $(this).attr("cropper-event");
                //监听确认保存图像
                if(event === 'confirmSave'){
                    var cas = image.cropper("getCroppedCanvas",{
                        width: saveW,
                        height: saveH
                    });
                    var  base64url = cas.toDataURL('image/jpeg')
                    var src = image[0].src;
                    fileName = "_time_" + new Date().getTime() + fileName;
                    var filesObj = dataURLtoFile(base64url,fileName)
                    var formData=new FormData();
                    	formData.append("token",layui.data("userInfo").token);
                    	formData.append("image",filesObj,fileName);
                    
                    admin.req({
                        method:"post",
                        url: url, //用于文件上传的服务器端请求地址
                        data: formData,
                        dataType: 'json',
                        processData: false,
                        contentType: false,
                        done:function(res){
                            if(res.status == 1){
                                layer.msg(res.msg,{icon: 1});
                                layer.closeAll('page');
                                return done(res.data);
                            }else{
                                layer.msg(res.msg,{icon:2});
                            }
                        }
                    });
                    //监听旋转
                }else if(event === 'rotate'){
                    var option = $(this).attr('data-option');
                    image.cropper('rotate', option);
                    //重设图片
                }else if(event === 'reset'){
                    image.cropper('reset');
                }
                //文件选择
                file.change(function () {
                    var r= new FileReader();
                    var f=this.files[0];
                    r.readAsDataURL(f);
                    fileName = f.name;
                    r.onload=function (e) {
                        image.cropper('destroy').attr('src', this.result).cropper(options);
                    };
                });
            });
            //将base64转换为文件
			function dataURLtoFile(dataurl, filename) {
	        	var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
		            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
		        while(n--){
		            u8arr[n] = bstr.charCodeAt(n);
		        }
		        return new File([u8arr], filename, {type:mime});
		    }
        }
    };
    exports('croppers', obj);
});