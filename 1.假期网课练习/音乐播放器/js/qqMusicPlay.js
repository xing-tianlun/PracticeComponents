window.addEventListener('load',play);
function play() {
  var main = document.querySelector('#main'),
      playM = document.querySelector('.playM'),
      music = document.querySelector('audio'),
      pan = document.querySelector('.pan'),
      lin = document.querySelector('.lin'),
      playtime = document.querySelector('.playtime'),
      alltime = document.querySelector('.alltime'),
      line = document.querySelector('.line'),
      lineCon = document.querySelector('.lineCon'),
      point = document.querySelector('.point'),
      songtime = music.duration,
      lineLong = line.offsetWidth;
  var timer;
  console.log(point);
  function timetype(T) { // 获取的时间改变格式的函数
    var min = parseInt(T / 60);
    var second = parseInt(T - min * 60);
    if(second < 10) {
      second = "0" + second;
    }
    return min + ":" + second;
  }
  alltime.innerText = timetype(songtime);
  playM.onclick = function() { // 实现点击按钮实现歌曲播放暂停
    if(music.paused) {
      music.play();
      console.log('开始');
      playM.src = 'img/img7-2.png';
      pan.className = 'pan active';
      lin.className = 'lin active';
      timer = setInterval(function() {
        playtime.innerText = timetype(music.currentTime);
        lineCon.style.width = parseInt(lineLong / (songtime/music.currentTime)) + 'px';
        point.style.left = parseInt(lineLong / (songtime/music.currentTime)) - 12 + 'px';
        if(music.currentTime == songtime) {
          music.currentTime = 0;
          playtime.innerText = timetype(music.currentTime);
          playM.src = 'img/img7.png'
          point.style.left ='-12px';
          lineCon.style.width = '0px';
          pan.className = 'pan';
          lin.className = 'lin';
          clearInterval(timer);
        }
      },10);
    }else {
      music.pause();
      console.log('暂停');
      playM.src = 'img/img7.png'
      pan.className = 'pan';
      lin.className = 'lin';
      clearInterval(timer);
    }
  }
  console.log(main.offsetLeft,line.offsetLeft);
  point.onmousedown = function(e) { // 实现拖动进度点改变歌曲的播放的时间
    console.log(1)
    document.onmousemove = function(e) {
      music.pause();
      playM.src = 'img/img7.png';
      pan.className = 'pan';
      lin.className = 'lin';
      var nleft = e.clientX - main.offsetLeft - line.offsetLeft;
      var maxleft = line.offsetWidth;
      if(nleft <= -12) {
        nleft = 12
      }else if(nleft >= maxleft) {
        nleft = maxleft;
      }
      point.style.left = nleft - 12 + 'px';
      lineCon.style.width = nleft + 'px';
      music.currentTime = parseInt(songtime / (lineLong / nleft));
      playtime.innerText = timetype(music.currentTime);
      return parseInt(songtime / (lineLong / nleft));
    }
    document.onmouseup = function() {
      document.onmousedown = null;
      document.onmousemove = null;
    }
    return false
  }
  console.log(line.offsetWidth);
  line.onclick = function(e) { // 实现点击进度条歌曲长度跳转
    var lineclick = e.clientX - main.offsetLeft - line.offsetLeft;
    point.style.left = lineclick - 12 + 'px';
    lineCon.style.width = lineclick + 'px';
    music.currentTime = parseInt(songtime / (lineLong / lineclick));
    playtime.innerText = timetype(music.currentTime);
  }
  
}