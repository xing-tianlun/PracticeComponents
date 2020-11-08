/**
 * 创建分页区域
 * page: 当前页码
 * pageNumber: 总页数
 * mostNumber: 中间最多的数字的数量
 * container: 分页创建好后放到页面中哪个容器中
 */
function createPager(page, pageNumber, mostNumber, container) {
  // 把之前容器里面的东西清除掉
  container.innerHTML = "";

  var divPager = document.createElement("div");
  divPager.className = "pager";
  // 这个函数是用于帮忙创建a元素的
  // className: 类样式
  // text: 内文本
  // newPage: 创建的a元素，点击后，跳到第几页
  function _createAnchor(className, text, newPage) {
    var a = document.createElement("a");
    a.className = className;
    a.innerText = text;
    divPager.appendChild(a);
    a.onclick = function () {
      // 什么情况下不能跳转
      // 1. 新的页码 < 1，  2. 新的页码 > pageNumber  3. 新的页码 = page
      if (newPage < 1 || newPage > pageNumber || newPage === page) {
        return;
      }
      // 重新创建一遍
      createPager(newPage, pageNumber, mostNumber, container);
      // 别的事情
    };
  }
  // 首页和上一页
  if (page === 1) {
    _createAnchor("disabled", "首页", 1);
    _createAnchor("disabled", "上一页", page - 1);
  } else {
    _createAnchor("", "首页", 1);
    _createAnchor("", "上一页", page - 1);
  }

  // 中间的数字（你等着）
  var min = page - mostNumber / 2;
  min = Math.floor(min); // 取整
  if (min < 1) {
    min = 1;
  }
  var max = min + mostNumber - 1;
  if (max > pageNumber) {
    max = pageNumber;
  }

  // 循环生成页码
  for (var i = min; i <= max; i++) {
    if (i === page) {
      _createAnchor("active", i, i);
    } else {
      _createAnchor("", i, i);
    }
  }

  // 尾页和下一页
  if (page === pageNumber) {
    // 最后一页
    _createAnchor("disabled", "下一页", page + 1);
    _createAnchor("disabled", "尾页", pageNumber);
  } else {
    _createAnchor("", "下一页", page + 1);
    _createAnchor("", "尾页", pageNumber);
  }

  // 非常简单的显示当前页码
  var span = document.createElement("span");
  span.innerText = page + " / " + pageNumber;
  divPager.appendChild(span);

  container.appendChild(divPager);
}
