  let layer = document.querySelector('.layer');
  window.addEventListener('scroll', function(){
    let value = window.scrollY;
    layer.style.left = value*2 +'px';
  })/* 这段代码监听滚动事件，根据滚动位置移动飞机图像，创建动画效果。 */