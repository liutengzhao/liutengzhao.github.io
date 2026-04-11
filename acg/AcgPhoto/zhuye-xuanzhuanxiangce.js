// 通用旋转相册函数
function initCarousel(carouselId, config) {
    // 默认配置
    const defaultConfig = {
        radius: 240,
        autoRotate: true,
        rotateSpeed: -60,
        imgWidth: 120,
        imgHeight: 170,
        bgMusicURL: null,
        bgMusicControls: false
    };
    
    // 合并配置
    const cfg = {...defaultConfig, ...config};
    
    // 获取DOM元素
    const odrag = document.getElementById(`drag-container-${carouselId}`);
    const ospin = document.getElementById(`spin-container-${carouselId}`);
    const aImg = ospin.getElementsByTagName("img");
    const aVid = ospin.getElementsByTagName("video");
    const aEle = [...aImg, ...aVid];
    const ground = document.getElementById(`ground-${carouselId}`);
    const musicContainer = document.getElementById(`music-container-${carouselId}`);
    
    // 设置尺寸
    ospin.style.width = cfg.imgWidth + "px";
    ospin.style.height = cfg.imgHeight + "px";
    ground.style.width = cfg.radius * 3 + "px";
    ground.style.height = cfg.radius * 3 + "px";
    
    // 初始化函数
    function init(delayTime) {
        for (let i = 0; i < aEle.length; i++) {
            aEle[i].style.transform =
                "rotateY(" +
                i * (360 / aEle.length) +
                "deg) translateZ(" +
                cfg.radius +
                "px)";
            aEle[i].style.transition = "transform 1s";
            aEle[i].style.transitionDelay =
                delayTime || (aEle.length - i) / 4 + "s";
        }
    }
    
    // 应用变换函数
    function applyTranform(obj, tX, tY) {
        if (tY > 180) tY = 180;
        if (tY < 0) tY = 0;
        obj.style.transform = "rotateX(" + -tY + "deg) rotateY(" + tX + "deg)";
    }
    
    // 控制旋转动画播放/暂停
    function playSpin(yes) {
        ospin.style.animationPlayState = yes ? "running" : "paused";
    }
    
    // 事件相关变量
    let sX, sY, nX, nY, desX = 0, desY = 0, tX = 0, tY = 10;
    
    // 自动旋转设置
    if (cfg.autoRotate) {
        const animationName = cfg.rotateSpeed > 0 ? "spin" : "spinRevert";
        ospin.style.animation = `${animationName} ${Math.abs(cfg.rotateSpeed)}s infinite linear`;
    }
    
    // 添加背景音乐
    if (cfg.bgMusicURL) {
        musicContainer.innerHTML += `
            <audio src="${cfg.bgMusicURL}" ${cfg.bgMusicControls ? "controls" : ""} autoplay loop>    
            <p>If you are reading this, it is because your browser does not support the audio element.</p>
            </audio>
        `;
    }
    
    // 鼠标拖拽事件处理
    document.querySelector(`[data-carousel="${carouselId}"]`).onpointerdown = function(e) {
        clearInterval(odrag.timer);
        e = e || window.event;
        sX = e.clientX;
        sY = e.clientY;
        
        this.onpointermove = function(e) {
            e = e || window.event;
            nX = e.clientX;
            nY = e.clientY;
            desX = nX - sX;
            desY = nY - sY;
            tX += desX * 0.1;
            tY += desY * 0.1;
            applyTranform(odrag, tX, tY);
            sX = nX;
            sY = nY;
        };
        
        this.onpointerup = function(e) {
            odrag.timer = setInterval(function() {
                desX *= 0.95;
                desY *= 0.95;
                tX += desX * 0.1;
                tY += desY * 0.1;
                applyTranform(odrag, tX, tY);
                playSpin(false);
                if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
                    clearInterval(odrag.timer);
                    playSpin(true);
                }
            }, 17);
            this.onpointermove = this.onpointerup = null;
        };
        
        return false;
    };
    
    // 鼠标滚轮缩放事件
    document.querySelector(`[data-carousel="${carouselId}"]`).onmousewheel = function(e) {
        e = e || window.event;
        const d = e.wheelDelta / 20 || -e.detail;
        cfg.radius += d;
        init(1);
    };
    
    // 初始化
    setTimeout(init, 100);
    
    // 返回公共方法
    return {
        play: () => playSpin(true),
        pause: () => playSpin(false),
        getConfig: () => ({...cfg}),
        updateConfig: (newConfig) => {
            Object.assign(cfg, newConfig);
            // 更新尺寸
            ospin.style.width = cfg.imgWidth + "px";
            ospin.style.height = cfg.imgHeight + "px";
            ground.style.width = cfg.radius * 3 + "px";
            ground.style.height = cfg.radius * 3 + "px";
            // 重新初始化位置
            init();
            // 更新动画
            if (cfg.autoRotate) {
                const animationName = cfg.rotateSpeed > 0 ? "spin" : "spinRevert";
                ospin.style.animation = `${animationName} ${Math.abs(cfg.rotateSpeed)}s infinite linear`;
            }
        }
    };
}

// 定义断点范围
const BREAKPOINTS = [
    { min: 0, max: 480, name: 'mobile-small' },
    { min: 481, max: 768, name: 'mobile' },
    { min: 769, max: 1024, name: 'tablet' },
    { min: 1025, max: Infinity, name: 'desktop' }
];

// 响应式相册配置 - 定义每个断点的基础值。添加相册时需要添加基础配置、最后初始化函数中初始化
function getResponsiveConfig(carouselId, deviceType) {
    const configs = {
        1: {
            'mobile-small': {
                radius: 150,
                autoRotate: true,
                rotateSpeed: -30,
                imgWidth: 80,
                imgHeight: 110
            },
            'mobile': {
                radius: 200,           // 旋转半径
                autoRotate: true,      // 是否自动旋转
                rotateSpeed: -40,      // 旋转速度（负数为逆时针）
                imgWidth: 100,         // 图片宽度
                imgHeight: 140,        // 图片高度
                bgMusicURL: null       // 背景音乐链接（可选）
            },
            'tablet': {
                radius: 250,
                autoRotate: true,
                rotateSpeed: -50,
                imgWidth: 120,
                imgHeight: 170
            },
            'desktop': {
                radius: 380,
                autoRotate: true,
                rotateSpeed: -60,
                imgWidth: 150,
                imgHeight: 200
            }
        },
        2: {
            'mobile-small': {
                radius: 120,
                autoRotate: true,
                rotateSpeed: -25,
                imgWidth: 70,
                imgHeight: 100
            },
            'mobile': {
                radius: 150,
                autoRotate: true,
                rotateSpeed: -30,
                imgWidth: 80,
                imgHeight: 120
            },
            'tablet': {
                radius: 180,
                autoRotate: true,
                rotateSpeed: -35,
                imgWidth: 100,
                imgHeight: 140
            },
            'desktop': {
                radius: 200,
                autoRotate: true,
                rotateSpeed: -40,
                imgWidth: 120,
                imgHeight: 160
            }
        },
        /* 拼装模型 */
        3: {
            'mobile-small': {
                radius: 120,
                autoRotate: true,
                rotateSpeed: 25,
                imgWidth: 70,
                imgHeight: 100
            },
            'mobile': {
                radius: 180,
                autoRotate: true,
                rotateSpeed: 30,
                imgWidth: 100,
                imgHeight: 140
            },
            'tablet': {
                radius: 240,
            autoRotate: true,
            rotateSpeed: 35,
            imgWidth: 120,
            imgHeight: 160
            },
            'desktop': {
                radius: 300,
            autoRotate: true,
            rotateSpeed: 40,
            imgWidth: 150,
            imgHeight: 200
            }
        },
        4: {
            'mobile-small': {
                radius: 180,
                autoRotate: true,
                rotateSpeed: 30,
                imgWidth: 85,
                imgHeight: 125
            },
            'mobile': {
                radius: 240,
                autoRotate: true,
                rotateSpeed: 30,
                imgWidth: 120,
                imgHeight: 160
            },
            'tablet': {
                radius: 310,
                autoRotate: true,
                rotateSpeed: 35,
                imgWidth: 140,
                imgHeight: 180
            },
            'desktop': {
                radius: 380,
                autoRotate: true,
                rotateSpeed: 40,
                imgWidth: 180,
                imgHeight: 220
            }
        }
    };
    
    return configs[carouselId] 
        && configs[carouselId][deviceType] 
        || configs[1][deviceType] 
        || configs[1]['desktop'];
}

// 根据窗口宽度动态计算参数 - 实现真正的平滑变化
function getDynamicConfig(carouselId, windowWidth) {
    // 找到当前所在的断点区间
    const currentBreakpoint = BREAKPOINTS.find(bp => 
        windowWidth >= bp.min && windowWidth <= bp.max
    );
    
    // 如果窗口宽度小于最小断点，使用最小断点配置
    if (!currentBreakpoint) {
        const minBreakpoint = BREAKPOINTS[0].name;
        return getResponsiveConfig(carouselId, minBreakpoint);
    }
    
    // 如果窗口宽度正好等于断点边界值，直接返回对应配置
    if (windowWidth === currentBreakpoint.min || windowWidth === currentBreakpoint.max) {
        return getResponsiveConfig(carouselId, currentBreakpoint.name);
    }
    
    // 确定相邻的两个断点
    let lowerBreakpoint, upperBreakpoint;
    
    if (windowWidth <= 480) {
        // 在最小断点范围内
        return getResponsiveConfig(carouselId, 'mobile-small');
    } else if (windowWidth <= 768) {
        // 在 mobile-small 和 mobile 之间
        lowerBreakpoint = 'mobile-small';
        upperBreakpoint = 'mobile';
    } else if (windowWidth <= 1024) {
        // 在 mobile 和 tablet 之间
        lowerBreakpoint = 'mobile';
        upperBreakpoint = 'tablet';
    } else {
        // 在 tablet 和 desktop 之间
        lowerBreakpoint = 'tablet';
        upperBreakpoint = 'desktop';
    }
    
    // 获取相邻断点的配置
    const lowerConfig = getResponsiveConfig(carouselId, lowerBreakpoint);
    const upperConfig = getResponsiveConfig(carouselId, upperBreakpoint);
    
    // 计算插值比例
    let ratio;
    if (lowerBreakpoint === 'mobile-small' && upperBreakpoint === 'mobile') {
        ratio = (windowWidth - 481) / (768 - 481);
    } else if (lowerBreakpoint === 'mobile' && upperBreakpoint === 'tablet') {
        ratio = (windowWidth - 769) / (1024 - 769);
    } else if (lowerBreakpoint === 'tablet' && upperBreakpoint === 'desktop') {
        // 对于桌面端，我们设定一个合理的最大宽度进行计算
        const maxWidth = 1920;
        const currentRangeMin = 1025;
        ratio = (windowWidth - currentRangeMin) / (maxWidth - currentRangeMin);
        ratio = Math.min(1, ratio); // 确保不超过1
    } else {
        ratio = 0;
    }
    
    // 确保比例在0-1之间
    ratio = Math.max(0, Math.min(1, ratio));
    
    // 线性插值计算参数
    function interpolate(min, max) {
        return Math.round(min + (max - min) * ratio);
    }
    
    // 返回插值后的配置
    return {
        radius: interpolate(lowerConfig.radius, upperConfig.radius),
        autoRotate: lowerConfig.autoRotate,
        rotateSpeed: interpolate(lowerConfig.rotateSpeed, upperConfig.rotateSpeed),
        imgWidth: interpolate(lowerConfig.imgWidth, upperConfig.imgWidth),
        imgHeight: interpolate(lowerConfig.imgHeight, upperConfig.imgHeight)
    };
}

// 初始化所有相册
document.addEventListener('DOMContentLoaded', function() {
    // 创建相册实例对象存储
    const carousels = {};
    
    // 获取当前窗口宽度
    const windowWidth = window.innerWidth;
    
    // 使用动态计算初始化所有相册（实现平滑启动）
    carousels.carousel1 = initCarousel(1, getDynamicConfig(1, windowWidth));
    carousels.carousel2 = initCarousel(2, getDynamicConfig(2, windowWidth));
    carousels.carousel3 = initCarousel(3, getDynamicConfig(3, windowWidth));
    carousels.carousel4 = initCarousel(4, getDynamicConfig(4, windowWidth));
    
    // 存储上一次的窗口宽度
    let previousWidth = windowWidth;
    
    // 添加窗口大小变化监听器
    let resizeTimer;
    window.addEventListener('resize', function() {
        // 清除之前的定时器
        clearTimeout(resizeTimer);
        
        // 延迟执行以避免频繁触发
        resizeTimer = setTimeout(function() {
            const currentWidth = window.innerWidth;
            
            // 总是使用动态计算实现平滑变化
            Object.keys(carousels).forEach(key => {
                const carouselId = parseInt(key.replace('carousel', ''));
                carousels[key].updateConfig(getDynamicConfig(carouselId, currentWidth));
            });
            
            // 更新窗口宽度
            previousWidth = currentWidth;
        }, 50); // 更短的延迟以获得更流畅的体验
    });
});