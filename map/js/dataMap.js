/*
 * 实例开发
*/
$(function () {
	var dataStatus = [
];

	$('#container').vectorMap({ map: 'china_zh',
		color: "#B4B4B4",
		onLabelShow: function (event, label, code) {
			$.each(dataStatus, function (i, items) {
				if (code == items.cha) {
					label.html(items.name + items.des);
				}
			});
		}
	})

	$.each(dataStatus, function (i, items) {
		if (items.des >= 30000 && items.des < 100000 ) {
			var josnStr = "{" + items.cha + ":'#00FF00'}";
			$('#container').vectorMap('set', 'colors', eval('(' + josnStr + ')'));
		}

if (items.des >= 100000 && items.des < 200000 ) {
			var josnStr = "{" + items.cha + ":'#FFA500'}";
			$('#container').vectorMap('set', 'colors', eval('(' + josnStr + ')'));
		}

if(items.des >= 200000) {
		  var josnStr = "{" + items.cha + ":'#FF3030'}";
			$('#container').vectorMap('set', 'colors', eval('(' + josnStr + ')'));
		}
	});
	//$('.jvectormap-zoomin').click(); //放大
});  

$(document).ready(function(e) {
    
}); 