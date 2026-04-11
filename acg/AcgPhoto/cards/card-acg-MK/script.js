        /* 飞机 */
        let plane=document.getElementById('plane');
        let deg=0,ex=0,ey=0,vx=0,vy=0,count=0;
        window.addEventListener('mousemove',(e)=>{
            ex=e.x-plane.offsetLeft-plane.clientWidth/2;
            ey=e.y-plane.offsetTop-plane.clientHeight/2;
            deg=360*Math.atan(ey/ex)/(2*Math.PI)+45;
            if(ex<0){
                deg+=180;
            }
            count=0;
        })
        function draw(){
            plane.style.transform='rotate('+deg+'deg)';
            if(count<100){
                vx+=ex/100;
                vy+=ey/100;
            }
            /* plane.style.left=vx+'px';
            plane.style.top=vy+'px'; */
            // 添加滚动偏移计算
let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
plane.style.left = (vx + window.scrollX) + 'px';
plane.style.top = (vy + scrollTop) + 'px';
            count++;
        }
        setInterval(draw, 1);




           /* 七彩颜色旋转 */
   const vortex = document.querySelector('.vortex');
        let hue = 0;

        function updateColor() {
            hue = (hue + 0.5) % 360;
            vortex.style.setProperty('--hue', hue);
            requestAnimationFrame(updateColor);
        }

        updateColor();


/*******************************************************/
/*******************************************************/
/* 原神抽卡 */
     // 添加随机小光点星光
     function createStarPoint() {
            const starPoint = document.createElement('div');
            starPoint.className = 'star-point';
            starPoint.style.left = `${Math.random() * 100}%`;
            starPoint.style.top = `${Math.random() * 100}%`;
            return starPoint;
        }

        function addStarPoints(count) {
            const cardFront = document.querySelector('.card-front');
            for (let i = 0; i < count; i++) {
                cardFront.appendChild(createStarPoint());
            }
        }

        // 添加20个小光点星光
        addStarPoints(20);



//星光穿梭背景特效

// 获取所有 canvas 元素
const canvases = document.querySelectorAll('.canvas');

canvases.forEach(canvas => {
    const ctx = canvas.getContext('2d');

    // 每个 canvas 独立的配置和状态
    let stars = [];
    let speed = 5;
    let mouseX = 0, mouseY = 0;
    const FOV = 100;
    const STAR_COUNT = 1000;

    let baseSize = Math.min(window.innerWidth, window.innerHeight);
    let sizeRatio = {
        width: window.innerWidth / baseSize,
        height: window.innerHeight / baseSize
    };

    class Star {
        constructor() {
            this.reset(true);
            this.history = [];
        }

        reset(init = false) {
            this.x = (Math.random() - 0.5) * sizeRatio.width * baseSize;
            this.y = (Math.random() - 0.5) * sizeRatio.height * baseSize;
            this.z = Math.random() * 2000;
            this.originZ = this.z;
            this.size = Math.random() * 2 + 0.7;
            this.hue = 40 + Math.random() * 20;

            if (!init) {
                this.z = Math.random() * 2000;
            }
        }

        update() {
            this.z -= speed;
            if (this.z <= 0) this.reset();
        }

        getProjection() {
            const factor = FOV / (FOV + this.z);
            return {
                x: this.x * factor + canvas.width / 2 + mouseX * this.z * 0.0002,
                y: this.y * factor + canvas.height / 2 + mouseY * this.z * 0.0002,
                scale: factor * Math.min(sizeRatio.width, sizeRatio.height)
            };
        }
    }

    function initStars() {
        stars = [];
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push(new Star());
        }
    }

    initStars();

    // 鼠标移动事件监听器
    canvas.addEventListener('mousemove', e => {
        mouseX = (e.clientX - canvas.width / 2) / baseSize;
        mouseY = (e.clientY - canvas.height / 2) / baseSize;
    });

    // 滚轮控制速度
    canvas.addEventListener('wheel', e => {
        speed += e.deltaY * 0.02;
        speed = Math.min(Math.max(speed, 5), 50);
    });

    // 动画函数
    function animate() {
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        stars.forEach(star => {
            star.update();
            const pos = star.getProjection();

            // 绘制拖尾
            star.history.forEach((hist, i) => {
                ctx.beginPath();
                ctx.fillStyle = `hsla(${star.hue}, 100%, 50%, ${0.2 * i / star.history.length})`;
                ctx.arc(
                    hist.x * (canvas.width / baseSize) * sizeRatio.width,
                    hist.y * (canvas.height / baseSize) * sizeRatio.height,
                    star.size * (0.5 + i * 0.2), // 可调整此值来修改拖尾粗细
                    0,
                    Math.PI * 2
                );
                ctx.fill();
            });

            // 绘制主星体
            ctx.beginPath();
            ctx.fillStyle = `hsl(${star.hue}, 100%, ${70 - star.z * 0.05}%)`;
            ctx.arc(pos.x, pos.y, star.size * pos.scale, 0, Math.PI * 2);
            ctx.fill();
        });

        requestAnimationFrame(animate);
    }

    animate();

    // 响应式调整尺寸
    function resizeCanvas() {
        const oldWidth = canvas.width;
        const oldHeight = canvas.height;

        baseSize = Math.min(window.innerWidth, window.innerHeight);
        sizeRatio = {
            width: window.innerWidth / baseSize,
            height: window.innerHeight / baseSize
        };

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const scaleX = canvas.width / oldWidth || 1;
        const scaleY = canvas.height / oldHeight || 1;

        stars.forEach(star => {
            star.x *= scaleX;
            star.y *= scaleY;
            star.originZ *= (scaleX + scaleY) / 2;
        });
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
});
