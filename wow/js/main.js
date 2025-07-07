    // 基础点击事件绑定
    const viewAllBtn1 = document.getElementById('view-all-1');
        
    // 方案1：页面跳转
   // 直接跳转
   viewAllBtn1.addEventListener('click', () => {
       window.location.href = 'baidu.com'; // 替换为实际路径
   });
   
   // 新标签页打开
   /* viewAllBtn.addEventListener('click', () => {
       window.open('/games', '_blank');
   }); */

    // 方案2：动态加载更多内容
    /*
    viewAllBtn.addEventListener('click', async () => {
        try {
            // 显示加载状态
            viewAllBtn.innerHTML = '加载中...';
            
            // 模拟API请求
            const response = await fetch('/api/games?page=2');
            const data = await response.json();
            
            // 渲染新内容
            renderAdditionalGames(data);
            
            // 恢复按钮状态
            viewAllBtn.innerHTML = '查看全部';
        } catch (error) {
            console.error('加载失败:', error);
            viewAllBtn.innerHTML = '加载失败，重试';
        }
    });
    */

    // 方案3：显示隐藏内容
    /*
    let isExpanded = false;
    viewAllBtn.addEventListener('click', () => {
        const hiddenGames = document.querySelectorAll('.game-card.hidden');
        hiddenGames.forEach(card => card.classList.remove('hidden'));
        viewAllBtn.style.display = 'none';  // 隐藏按钮
    });
    */
/* 背景视频切换函数 */
document.querySelectorAll('.video-number').forEach((videoNumber) => {
    videoNumber.addEventListener('click', (event) => {
        event.preventDefault(); // 阻止默认的链接跳转行为
        const videoPath = videoNumber.getAttribute('data-video');
        changeVideo(videoPath);

        // 移除所有视频控制器的 active 类
        document.querySelectorAll('.video-number').forEach((num) => {
            num.classList.remove('active');
        });

        // 添加 active 类给当前点击的视频控制器
        videoNumber.classList.add('active');
    });
});
function changeVideo(videoPath) {
    const video = document.getElementById('bg-video');
    video.innerHTML = `<source src="${videoPath}" type="video/mp4">`;
    video.load();
    video.play();
}

/* 滚动通知和轮播图 */
// 轮播图功能
let currentSlide = 0
const slide = document.querySelector('.carousel-slide')
const indicators = document.querySelector('.carousel-indicators')

// 创建指示器
document.querySelectorAll('.carousel-item').forEach((_, index) => {
    const dot = document.createElement('div')
    dot.className = `indicator ${index === 0 ? 'active' : ''}`
    dot.addEventListener('click', () => goToSlide(index))
    indicators.appendChild(dot)
})

// 切换逻辑
function goToSlide(index) {
    currentSlide = index
    slide.style.transform = `translateX(-${index * 100}%)`
    document.querySelectorAll('.indicator').forEach((dot, i) => {
        dot.classList.toggle('active', i === index)
    })
}

// 自动播放
let autoPlay = setInterval(() => {
    currentSlide = (currentSlide + 1) % 4
    goToSlide(currentSlide)
}, 4000)

// 暂停自动播放（可选）
slide.addEventListener('mouseenter', () => clearInterval(autoPlay))
slide.addEventListener('mouseleave', () => {
    autoPlay = setInterval(() => {
        currentSlide = (currentSlide + 1) % 4
        goToSlide(currentSlide)
    }, 4000)
})



//滚动通知
// 滚动通知防抖处理
const noticeContent = document.querySelector('.notice-content')
const originalText = noticeContent.textContent

// 实现无限滚动
/* noticeContent.innerHTML = originalText + ' ' + originalText */

// 不使用无限滚动
noticeContent.innerHTML = originalText

//主页分类标签局部切换
function showContent(contentId) {
  // 移除所有激活状态
  document.querySelectorAll('.content-section, .category-tags .tag').forEach(element => {
    element.classList.remove('active');
  });

  // 设置新激活状态
  document.getElementById(contentId).classList.add('active');
  event.target.classList.add('active');

  // 阻止默认行为
  return false;
}
