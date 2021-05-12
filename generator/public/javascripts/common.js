(function(){
	function createXMLHttp(){
		var xmlhttp;
		if(window.XMLHttpRequest){
			xmlhttp = new XMLHttpRequest();
		}else{
			xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
		}
		return xmlhttp;
	}
	/*readyState
	0: 请求未初始化
	1: 服务器连接已建立
	2: 请求已接收
	3: 请求处理中
	4: 请求已完成，且响应已就绪*/
	function callbackStatus(callback){
		if(this.readyState == 4 && this.status == 200){
			//console.log(this)
			callback(JSON.parse(this.responseText));
		}
	}
	var fn_obj = {
		ajax : function(params){
			var url = params.url || '';
			var type = params.type || 'get';
			var async = params.async || true;
			var data = params.data || {};
			var callback = params.callback || function(){};
			var xmlhttp = createXMLHttp();
			xmlhttp.onreadystatechange = callbackStatus.bind(xmlhttp,callback);
			//xmlhttp.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			xmlhttp.open(type,url,async);
			xmlhttp.send(data);

		}
	};

	this.hmd = {};
	Object.assign(hmd,fn_obj);
}());
(function(){
	function $$(css,el){
		el = el || document;
		return el.querySelector(css);
	}

	function _(css,el){
		el = el || document;
		return el.querySelectorAll(css);
	}

	$$('#btn').onclick = function(){
		hmd.ajax({
			url : '/users/getUserInfo',
			callback : function(data){
				console.log(data)
			}
		});
	}
}());