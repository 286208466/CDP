/*
 *	author：fh
 *	version：0.1.0
 *	license：MIT
 * 	description：常用函数库
 * 
 * */
var basePath=window.location.host;
if(basePath.indexOf("http://")<0){
	basePath="http://"+basePath+"/";
}

//根据url参数获取参数的值
function getUrlParamVal(name){
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
	var r = window.location.search.substr(1).match(reg);
	if (r != null) return decodeURI(r[2]); 
	return null;
}

//检测浏览器，如果是ie7、ie6 显示提示升级浏览器信息
function updateIE(){
	var browser=navigator.appName;
	if(browser=="Microsoft Internet Explorer"){
		var b_version=navigator.appVersion;
		var version=b_version.split(";");
		var trim_Version=version[1].replace(/[ ]/g,"");
		if( trim_Version=="MSIE7.0" || trim_Version=="MSIE6.0")
		{
			$("body").html('<div class="updateExplore"><h2>您的浏览器版本过低，请升级您的浏览器！</h2></div>');
		}
	}
}

//获取模板
function getTemplate(url){
	var template=null;
	$.ajax({
		url:url,
		async:false,
		cache:false,
		success:function(data){
			template=data;
		},
		error:function(data){
			alert("操作失败");
		}
	});
	return template;
}

//ajax
function Ajax(param){
	var btntext=null;
	if(!!param.btn){
		if($(param.btn).hasClass("loadingBtn")){
			return;
		}
		btntext=$(param.btn).text();
		$(param.btn).addClass("loadingBtn").html("<img src='../public/img/loading2.gif' width='14' style='position:relative;top:-2px'>&emsp;提交中...");
	}
	$.ajax({
		url:param.url,
		data:param.data,
		type:"POST",
		dataType:"json",
		cache:false,
		async:!!param.async?param.async:true,
		beforeSend:function(){
			//loading("show");
			$.messager.progress();
        },
		success:function(data){
			if(data.success){
				param.success(data);
			}else{
				if(!!data.message){
					$.messager.alert('提示',data.message,'warning');
				}
			}
		},
		error:function(data){
			//loading("hide");
			if(!!data.message){
				$.messager.alert('提示',data.message,'warning');
			}else{
				$.messager.alert('提示','系统繁忙,请稍后！','warning');
			}
		},
		complete: function() {
			//loading("hide");
			$.messager.progress('close');
			if(!!param.btn){
				$(param.btn).removeClass("loadingBtn").html(btntext);
			}
        }
	});
}
//ajax加载动画
function loading(type){
	var loading='<div class="ui-loading"><div></div><img src="../public/img/loading.gif"></div>';
	if(type=="show"){
		$("body").find(".ui-loading").remove();
		$("body").append(loading);
		var height=document.documentElement.clientHeight;
		if(document.body.scrollHeight>0){
			height+=document.body.scrollHeight;
		}
		$("#loadingbg").height(height);
	}else{
		$("body").find(".ui-loading").remove();
	}
}

//日期格式化
/*
 * 	示例
	alert(new Date().format("yyyy年MM月dd日"));
	alert(new Date().format("MM/dd/yyyy"));
	alert(new Date().format("yyyyMMdd"));
	alert(new Date().format("yyyy-MM-dd hh:mm:ss"));
*/
Date.prototype.format = function(format){
	var o = {
	"M+" : this.getMonth()+1, //month
	"d+" : this.getDate(), //day
	"h+" : this.getHours(), //hour
	"m+" : this.getMinutes(), //minute
	"s+" : this.getSeconds(), //second
	"q+" : Math.floor((this.getMonth()+3)/3), //quarter
	"S" : this.getMilliseconds() //millisecond
	}

	if(/(y+)/.test(format)) {
		format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
	}

	for(var k in o) {
		if(new RegExp("("+ k +")").test(format)) {
			format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length));
		}
	}
	return format;
} 

//下载文件
function downloadfile(filepath) {
    var iframe = document.createElement("iframe");
    iframe.src = filepath;
    iframe.style.display = "none";
    document.body.appendChild(iframe);
}

//页面右上角用户信息
function isLoginPanel(){
	if(true){
		$("#isLoginPanel").html('<div onmouseover="showRightMenu(this)" onmouseleave="hideRightMenu(this)"><img src="test/avatar3.jpg"><span>Amily</span><div class="rightmenu"><ul class="clearfix"><li>找货单</li><li>账号设置</li><li>退出</li></ul></div></div>');
	}else{
		$("#isLoginPanel").html('<a class="btn login-btn" onclick="showLogin()">免注册登录</a>');
	}
}

function showRightMenu(self){
	var $self=$(self);
	$self.find(".rightmenu").show();
}

function hideRightMenu(self){
	var $self=$(self);
	$self.find(".rightmenu").hide();
}

//我的找货单
function toMyOrder(){
	if(true){
		window.location.href="user.html";
	}else{
		showLogin();
	}
}

//显示登陆框
function showLogin(){
	var grayBg=$(".grayBg");
	var body=$("body");
	var loginWrap=$(".loginWrap");
	var loginHtml=getTemplate("public/template/login1.html");
	if(grayBg.length>0){
		grayBg.show();
	}else{
		body.append("<div class='grayBg'></div>");
	}
	if(loginWrap.length>0){
		loginWrap.show();
	}else{
		body.append(loginHtml);
	}
}
function hideDialog(self){
	$(".grayBg").remove();
	$(self).parents(".dialog").remove();
}

//注册第二步
function showLogin2(){
	$(".loginWrap").remove();
	var grayBg=$(".grayBg");
	var body=$("body");
	var loginWrap2=$(".loginWrap2");
	var loginHtml=getTemplate("public/template/login2.html");
	if(grayBg.length>0){
		grayBg.show();
	}else{
		body.append("<div class='grayBg'></div>");
	}
	if(loginWrap2.length>0){
		loginWrap2.show();
	}else{
		body.append(loginHtml);
	}
}

//注册第三步
function showLogin3(){
	$(".loginWrap2").remove();
	var grayBg=$(".grayBg");
	var body=$("body");
	var loginWrap3=$(".loginWrap3");
	var loginHtml=getTemplate("public/template/login3.html");
	if(grayBg.length>0){
		grayBg.show();
	}else{
		body.append("<div class='grayBg'></div>");
	}
	if(loginWrap3.length>0){
		loginWrap3.show();
	}else{
		body.append(loginHtml);
	}
}

//绑定手机号 
function showBindPhone(){
	var grayBg=$(".grayBg");
	var body=$("body");
	var bindPhone=$(".bindPhoneWrap");
	var bindPhoneHtml=getTemplate("public/template/bindPhone.html");
	if(grayBg.length>0){
		grayBg.show();
	}else{
		body.append("<div class='grayBg'></div>");
	}
	if(bindPhone.length>0){
		bindPhone.show();
	}else{
		body.append(bindPhoneHtml);
	}
}

//接单弹出框
function showTakeOrder(){
	var grayBg=$(".grayBg");
	var body=$("body");
	var takeOrder=$(".takeOrderWrap");
	var takeOrderHtml=getTemplate("public/template/takeOrder.html");
	if(grayBg.length>0){
		grayBg.show();
	}else{
		body.append("<div class='grayBg'></div>");
	}
	if(takeOrder.length>0){
		takeOrder.show();
	}else{
		body.append(takeOrderHtml);
	}
}

//切换事件
function toggleCheck(self){
	var $self=$(self);
	if(!$self.hasClass("checked")){
		$self.addClass("checked").siblings().removeClass("checked");
	}
}

//下单弹出框
function showPlaceOrder(data){
	var grayBg=$(".grayBg");
	var body=$("body");
	var placeOrder=$(".placeOrderWrap1");
	var placeOrderHtml=getTemplate("public/template/placeOrder.html");
	if(grayBg.length>0){
		grayBg.show();
	}else{
		body.append("<div class='grayBg'></div>");
	}
	if(placeOrder.length>0){
		placeOrder.show();
	}else{
		body.append(doT.template(placeOrderHtml)(data));
	}
}

//下单弹出框加减事件
function plusNum(self){
	var input=$(self).siblings("input");
	var val=parseInt(input.val());
	input.val(val+1);
}

function minusNum(self){
	var input=$(self).siblings("input");
	var val=parseInt(input.val());
	if(val==1){
		return;
	}
	input.val(val-1);
}

function publish(){
	var $placeOrderWrap=$(".placeOrderWrap");
	var main_image=$placeOrderWrap.find(".main_image").attr("src");
	var buy_num=$.trim($placeOrderWrap.find(".buy_num").val());
	var description=$.trim($placeOrderWrap.find(".description").val());
	var is_show_qq=$placeOrderWrap.find(".is_show_qq .checked").attr("data-val");
	var is_server=$placeOrderWrap.find(".is_server .checked").attr("data-val");
	$.ajax({
		url:"",
		data:{
			main_image:main_image,
			buy_num:buy_num,
			description:description,
			is_show_qq:is_show_qq,
			is_server:is_server
		},
		dataType:"json",
		success:function(data){
			
		}
	})
}

//看单1
function showOrderDetail(){
	var grayBg=$(".grayBg");
	var body=$("body");
	var orderDetail=$(".orderDetail");
	var orderDetailHtml=getTemplate("public/template/orderDetail.html");
	if(grayBg.length>0){
		grayBg.show();
	}else{
		body.append("<div class='grayBg'></div>");
	}
	if(orderDetail.length>0){
		orderDetail.show();
	}else{
		body.append(orderDetailHtml);
	}
}

function showDetailDesc(self){
	$("#detailDesc").show().siblings().hide();
	var html=getTemplate("public/template/detailDesc.html");
	$("#detailDesc").html(html);
}

function hideDetailDesc(){
	$("#detailDesc").hide().html("").siblings().show();
}

function hideDetailDesc(){
	$("#detailDesc").hide().html("").siblings().show();
}

function showCloseConfirm(){
	$("#closeConfirm").show();
}

function hideCloseConfirm(){
	$("#closeConfirm").hide();
}

function showTip(e){
	e.stopPropagation();
	var $e=$(e.currentTarget);
	$e.siblings(".tooltip").show();
}

function hideTip(e){
	e.stopPropagation();
	var $e=$(e.currentTarget);
	$e.siblings(".tooltip").hide();
}

//权限提示1
function showError1(){
	var grayBg=$(".grayBg");
	var body=$("body");
	var errorTip=$(".errorTip");
	var errorTipHtml='<div class="errorTipWrap dialog"><div><i class="icon-02" onclick="hideDialog(this)"></i><h2>抱歉~!此功能仅限设计师</h2><div class="solidline"></div><span>找货功能目前仅限设计师使用</span><p class="red" onclick="toCenter()">返回商家中心看看吧&#62;&#62;</p></div></div>';
	if(grayBg.length>0){
		grayBg.show();
	}else{
		body.append("<div class='grayBg'></div>");
	}
	if(errorTip.length>0){
		errorTip.show();
	}else{
		body.append(errorTipHtml);
	}
}

//返回商家中心事件
function toCenter(){
	window.location.href="";
}

//权限提示2
function showError2(){
	var grayBg=$(".grayBg");
	var body=$("body");
	var errorTip=$(".errorTip");
	var errorTipHtml='<div class="errorTipWrap dialog"><div><i class="icon-02" onclick="hideDialog(this)"></i><h2>抱歉~!此功能仅限商家</h2><div class="solidline"></div><span>接单功能目前仅限于商家使用</span><p class="red" onclick="toIndex()">返回首页看看吧&#62;&#62;</p></div></div>';
	if(grayBg.length>0){
		grayBg.show();
	}else{
		body.append("<div class='grayBg'></div>");
	}
	if(errorTip.length>0){
		errorTip.show();
	}else{
		body.append(errorTipHtml);
	}
}

//返回首页事件
function toIndex(){
	window.location.href="index.html"
}