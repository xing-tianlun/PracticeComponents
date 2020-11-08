function getStyle(obj,st) {
	if(window,getComputedStyle) {
		return getComputedStyle(obj,null)[st];
	}else {
		return obj.currentStyle[st];
	}
}
function ani(obj,st,val) {
	var MarginLeft = getStyle(obj,st);
	var Value = val;
	var x = 0;
	if(Value > parseInt(MarginLeft)) {   // 上一张
		var move = setInterval(function() {
			x += 10;
			if(x >= Value - parseInt(MarginLeft)) {
				clearInterval(move);
				obj.style[st] = Value + "px"
			}
			obj.style[st] = parseInt(MarginLeft) + x + "px";
		},30)
	}else {        // 下一张
		var move = setInterval(function() {
			x += 10;
			if(parseInt(MarginLeft) - x <= Value) {
				clearInterval(move);
				obj.style[st] = Value + "px";
			}
			obj.style[st] = parseInt(MarginLeft) - x + "px";
		},30)
	}
}
