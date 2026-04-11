// 在页面跳转后显示加载提示并自动点击菜单
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const target = urlParams.get('target');
    
    if (target) {
        // 可选：显示一个轻微的提示
        console.log(`正在跳转到 ${target} 部分...`);
        
        const checkAndClick = function() {
            const menuItem = document.querySelector(`.menu-item[data-target="${target}"]`);
            if (menuItem) {
                // 触发点击事件，这会执行index.html中原有的完整逻辑
                menuItem.click();
                
                // 清除URL参数
                const newUrl = window.location.origin + window.location.pathname;
                window.history.replaceState({}, document.title, newUrl);
                
                return true;
            }
            return false;
        };
        
        // 立即尝试一次
        if (!checkAndClick()) {
            // 如果失败，设置定时器继续尝试
            const interval = setInterval(function() {
                if (checkAndClick()) {
                    clearInterval(interval);
                }
            }, 100);
            
            // 最大等待时间
            setTimeout(() => clearInterval(interval), 3000);
        }
    }
});