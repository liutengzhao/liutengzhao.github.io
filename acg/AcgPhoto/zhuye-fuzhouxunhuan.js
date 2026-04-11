document.addEventListener('DOMContentLoaded', () => {
    const track1 = document.querySelector('.honeycomb-track1');
    const track2 = document.querySelector('.honeycomb-track2');
    const images1 = [
        'http://img.blog.1207.top/img/202509241335279.png',
        'http://img.blog.1207.top/img/202509241335942.png',
        'http://img.blog.1207.top/img/202509241335661.png',
        'http://img.blog.1207.top/img/202509241336829.png',
        'http://img.blog.1207.top/img/202509241337244.png',
        'http://img.blog.1207.top/img/202509241334707.png',
    ];
    const images2 = [
        'http://img.blog.1207.top/img/202509241335773.png',
        'http://img.blog.1207.top/img/202509241333571.png',
        'http://img.blog.1207.top/img/202509241337585.png',
        'http://img.blog.1207.top/img/202509241334461.png',
        'http://img.blog.1207.top/img/202509241338010.png',
        'http://img.blog.1207.top/img/202509241334552.png',
    ];

    // 创建八边形单元格
    function createHoneycombCells() {
        // 双倍数量实现无缝循环
        [...images1, ...images1].forEach((img, index) => {
            const cell = document.createElement('div');
            cell.className = 'honeycomb-cell flex-shrink-0';
            cell.style.backgroundImage = `url(${img})`;
            cell.setAttribute('alt', `蜂巢图片 ${index % images1.length + 1}`);
            track1.appendChild(cell);
        });

        [...images2, ...images2].forEach((img, index) => {
            const cell = document.createElement('div');
            cell.className = 'honeycomb-cell flex-shrink-0';
            cell.style.backgroundImage = `url(${img})`;
            cell.setAttribute('alt', `蜂巢图片 ${index % images2.length + 1}`);
            track2.appendChild(cell);
        });
    }

    createHoneycombCells();

    // 重置动画位置实现无缝循环
    track1.addEventListener('animationiteration', () => {
        track1.style.transition = 'none';
        track1.style.transform = 'translateX(0)';
        setTimeout(() => {
            track1.style.transition = 'transform 0s linear';
        });
    });

    track2.addEventListener('animationiteration', () => {
        track2.style.transition = 'none';
        track2.style.transform = 'translateX(0)';
        setTimeout(() => {
            track2.style.transition = 'transform 0s linear';
        });
    });
});