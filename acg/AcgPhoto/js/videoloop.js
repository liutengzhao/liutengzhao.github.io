 // 视频列表 - 添加您想要循环播放的视频
        const videoList = [
            './img/12.mp4',  // 替换为您的实际视频文件名
            './img/14.mp4',
            './img/13.mp4',
            './img/15.mp4',
        ];
        
        let currentVideoIndex = 0;
        let activeVideoElement = null;
        const container = document.getElementById('video-container');
        
        // 创建视频元素的函数
        function createVideoElement(src) {
            const video = document.createElement('video');
            video.className = 'background-video';
            video.autoplay = true;
            video.muted = true;
            video.loop = false; // 不循环单个视频，而是切换到下一个
            
            const source = document.createElement('source');
            source.src = src;
            source.type = 'video/mp4';
            
            video.appendChild(source);
            return video;
        }
        
        // 播放下一个视频
        function playNextVideo() {
            // 如果当前有活动视频，则淡出
            if (activeVideoElement) {
                activeVideoElement.classList.remove('active');
                
                // 等待淡出效果完成后移除元素（可选，也可以保留元素）
                setTimeout(() => {
                    // 可以选择移除旧视频元素或保留以供复用
                    // 如果移除，需要重新创建
                }, 2000);
            }
            
            // 更新索引
            currentVideoIndex = (currentVideoIndex + 1) % videoList.length;
            
            // 创建新视频元素
            const newVideo = createVideoElement(videoList[currentVideoIndex]);
            container.appendChild(newVideo);
            
            // 等待DOM更新后再添加active类实现淡入效果
            setTimeout(() => {
                newVideo.classList.add('active');
                activeVideoElement = newVideo;
            }, 50);
            
            // 设置视频播放结束事件
            newVideo.addEventListener('ended', playNextVideo);
            
            // 错误处理
            newVideo.addEventListener('error', () => {
                console.error('视频加载错误:', videoList[currentVideoIndex]);
                // 移除错误的视频元素
                if (newVideo.parentNode) {
                    newVideo.parentNode.removeChild(newVideo);
                }
                // 直接播放下一个
                playNextVideo();
            });
        }
        
        // 初始化：播放第一个视频
        function initVideo() {
            const firstVideo = createVideoElement(videoList[0]);
            container.appendChild(firstVideo);
            
            // 短暂延迟后添加active类，确保淡入效果
            setTimeout(() => {
                firstVideo.classList.add('active');
                activeVideoElement = firstVideo;
            }, 50);
            
            // 设置第一个视频的结束事件
            firstVideo.addEventListener('ended', playNextVideo);
        }
        
        // 页面加载完成后初始化视频
        window.addEventListener('load', initVideo);