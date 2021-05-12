$(function(){
	$(".you").click(function(){
		nextscroll();
	});
	function nextscroll(){
		var vcon = $(".v_cont");
		var offset = ($(".v_cont li").width())*-1;
		vcon.stop().animate({marginLeft:offset},"slow",function(){
			var firstItem = $(".v_cont ul li").first();
			vcon.find(".flder").append(firstItem);
			$(this).css("margin-left","0px");
		});
	};
	$(".zuo").click(function(){
		var vcon = $(".v_cont");
		var offset = ($(".v_cont li").width()*-1);
		var lastItem = $(".v_cont ul li").last();
		vcon.find(".flder").prepend(lastItem);
		vcon.css("margin-left",offset);
		vcon.animate({marginLeft:"0px"},"slow")
	});
});