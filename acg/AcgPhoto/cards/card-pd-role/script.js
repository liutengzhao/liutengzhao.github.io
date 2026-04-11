/* 星空背景 */
        function Star(id, x, y) {
            this.id = id;
            this.x = x;
            this.y = y;
            this.r = Math.floor(Math.random() * 2) + 1;
            var alpha = (Math.floor(Math.random() * 10) + 1) / 10 / 2;
            this.color = "rgba(255,255,255," + alpha + ")";
        }

        Star.prototype.draw = function () {
            ctx.fillStyle = this.color;
            ctx.shadowBlur = this.r * 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.fill();
        }

        Star.prototype.move = function () {
            this.y -= .15;
            if (this.y <= -10) this.y = HEIGHT + 10;
            this.draw();
        }

        Star.prototype.die = function () {
            stars[this.id] = null;
            delete stars[this.id];
        }

        function Dot(id, x, y, r) {
            this.id = id;
            this.x = x;
            this.y = y;
            this.r = Math.floor(Math.random() * 5) + 1;
            this.maxLinks = 2;
            this.speed = .5;
            this.a = .5;
            this.aReduction = .005;
            this.color = "rgba(255,255,255," + this.a + ")";
            this.linkColor = "rgba(255,255,255," + this.a / 4 + ")";

            this.dir = Math.floor(Math.random() * 140) + 200;
        }

        Dot.prototype.draw = function () {
            ctx.fillStyle = this.color;
            ctx.shadowBlur = this.r * 2;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
            ctx.closePath();
            ctx.fill();
        }

        Dot.prototype.link = function () {
            if (this.id == 0) return;
            var previousDot1 = getPreviousDot(this.id, 1);
            var previousDot2 = getPreviousDot(this.id, 2);
            var previousDot3 = getPreviousDot(this.id, 3);
            if (!previousDot1) return;
            ctx.strokeStyle = this.linkColor;
            ctx.moveTo(previousDot1.x, previousDot1.y);
            ctx.beginPath();
            ctx.lineTo(this.x, this.y);
            if (previousDot2 != false) ctx.lineTo(previousDot2.x, previousDot2.y);
            if (previousDot3 != false) ctx.lineTo(previousDot3.x, previousDot3.y);
            ctx.stroke();
            ctx.closePath();
        }

        function getPreviousDot(id, stepback) {
            if (id == 0 || id - stepback < 0) return false;
            if (typeof dots[id - stepback] != "undefined") return dots[id - stepback];
            else return false; //getPreviousDot(id - stepback);
        }

        Dot.prototype.move = function () {
            this.a -= this.aReduction;
            if (this.a <= 0) {
                this.die();
                return
            }
            this.color = "rgba(255,255,255," + this.a + ")";
            this.linkColor = "rgba(255,255,255," + this.a / 4 + ")";
            this.x = this.x + Math.cos(degToRad(this.dir)) * this.speed,
                this.y = this.y + Math.sin(degToRad(this.dir)) * this.speed;

            this.draw();
            this.link();
        }

        Dot.prototype.die = function () {
            dots[this.id] = null;
            delete dots[this.id];
        }

        var canvas = document.getElementById('canvas'),
            ctx = canvas.getContext('2d'),
            WIDTH,
            HEIGHT,
            mouseMoving = false,
            mouseMoveChecker,
            mouseX,
            mouseY,
            stars = [],
            initStarsPopulation = 200, // 增加星光数量
            dots = [],
            dotsMinDist = 2,
            maxDistFromCursor = 50;

        setCanvasSize();
        init();

        function setCanvasSize() {
            WIDTH = document.documentElement.clientWidth;
            HEIGHT = document.documentElement.clientHeight;

            canvas.setAttribute("width", WIDTH);
            canvas.setAttribute("height", HEIGHT);

            // Reinitialize stars
            stars = [];
            for (var i = 0; i < initStarsPopulation; i++) {
                stars[i] = new Star(i, Math.floor(Math.random() * WIDTH), Math.floor(Math.random() * HEIGHT));
            }
        }

        function init() {
            ctx.strokeStyle = "white";
            ctx.shadowColor = "white";
            for (var i = 0; i < initStarsPopulation; i++) {
                stars[i] = new Star(i, Math.floor(Math.random() * WIDTH), Math.floor(Math.random() * HEIGHT));
                //stars[i].draw();
            }
            ctx.shadowBlur = 0;
            animate();
        }

        function animate() {
            ctx.clearRect(0, 0, WIDTH, HEIGHT);

            for (var i in stars) {
                stars[i].move();
            }
            for (var i in dots) {
                dots[i].move();
            }
            drawIfMouseMoving();
            requestAnimationFrame(animate);
        }

        window.onmousemove = function (e) {
            mouseMoving = true;
            mouseX = e.clientX;
            mouseY = e.clientY;
            clearInterval(mouseMoveChecker);
            mouseMoveChecker = setTimeout(function () {
                mouseMoving = false;
            }, 100);
        }

        function drawIfMouseMoving() {
            if (!mouseMoving) return;

            if (dots.length == 0) {
                dots[0] = new Dot(0, mouseX, mouseY);
                dots[0].draw();
                return;
            }

            var previousDot = getPreviousDot(dots.length, 1);
            var prevX = previousDot.x;
            var prevY = previousDot.y;

            var diffX = Math.abs(prevX - mouseX);
            var diffY = Math.abs(prevY - mouseY);

            if (diffX < dotsMinDist || diffY < dotsMinDist) return;

            var xVariation = Math.random() > .5 ? -1 : 1;
            xVariation = xVariation * Math.floor(Math.random() * maxDistFromCursor) + 1;
            var yVariation = Math.random() > .5 ? -1 : 1;
            yVariation = yVariation * Math.floor(Math.random() * maxDistFromCursor) + 1;
            dots[dots.length] = new Dot(dots.length, mouseX + xVariation, mouseY + yVariation);
            dots[dots.length - 1].draw();
            dots[dots.length - 1].link();
        }

        function degToRad(deg) {
            return deg * (Math.PI / 180);
        }

        window.addEventListener('resize', setCanvasSize);



/* 动态生成卡片 */
  // 动态生成卡片。当数组内的图片数量小于 count 参数指定的数量时，代码会循环使用数组中的图片来达到设定的数量。
        function generateCards(count = 28) {
            const container = document.getElementById('lxWaterfallGrid');
            const images = [
            'http://img.blog.1207.top/img/202509181854955.png',
            'http://img.blog.1207.top/img/202509182047076.png',
            'http://img.blog.1207.top/img/202509181926313.png',
            'http://img.blog.1207.top/img/202509182017401.png',
            'http://img.blog.1207.top/img/202509182019059.png',
            'http://img.blog.1207.top/img/202509182018919.png',
            'http://img.blog.1207.top/img/202509182022113.png',
            'http://img.blog.1207.top/img/202509182022376.png',
            
            'http://img.blog.1207.top/img/202509182021939.png',
            'http://img.blog.1207.top/img/202509182020559.png',
            'http://img.blog.1207.top/img/202509182019265.png',
            'http://img.blog.1207.top/img/202509182019715.png',
            
            'http://img.blog.1207.top/img/202509182020570.png',
            'http://img.blog.1207.top/img/202509182023225.png',
            'http://img.blog.1207.top/img/202509182022837.png',
            'http://img.blog.1207.top/img/202509182023897.png',

            'http://img.blog.1207.top/img/202509182021772.png',
            'http://img.blog.1207.top/img/202509182023246.png',
            'http://img.blog.1207.top/img/202509182023502.png',
            'http://img.blog.1207.top/img/202509182026265.png',
            'http://img.blog.1207.top/img/202509182027916.png',
            'http://img.blog.1207.top/img/202509182027925.png',
            'http://img.blog.1207.top/img/202509182030992.png',
            'http://img.blog.1207.top/img/202509182029513.png',

            'http://img.blog.1207.top/img/202509182028536.png',
            'http://img.blog.1207.top/img/202509182028657.png',
            'http://img.blog.1207.top/img/202509182030338.png',
            'http://img.blog.1207.top/img/202509182030793.png',
            
            
            
            
            
                /* 'https://img1.baidu.com/it/u=1718672745,1405878309&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=1066',
                'https://img1.baidu.com/it/u=2135157027,3481743505&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img1.baidu.com/it/u=2294102331,361278002&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img1.baidu.com/it/u=71693106,2921418536&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img0.baidu.com/it/u=1630820150,2278044817&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img0.baidu.com/it/u=3971503191,695539494&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img2.baidu.com/it/u=3386220224,941211432&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=1066',
                'https://img2.baidu.com/it/u=3763265703,466659408&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=1066',
                'https://img2.baidu.com/it/u=1191568341,2703703676&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=1066',
                'https://img0.baidu.com/it/u=2722050206,507049949&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img2.baidu.com/it/u=1299427470,489829048&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img0.baidu.com/it/u=3798349387,493071264&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img1.baidu.com/it/u=2657773088,4248881943&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img2.baidu.com/it/u=1162959617,1189336023&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img1.baidu.com/it/u=465191627,4178641371&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=1066',
                'https://img0.baidu.com/it/u=4206800576,741468747&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=1066',
                'https://img0.baidu.com/it/u=1523684319,3012512983&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img0.baidu.com/it/u=3926206637,2363561777&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img2.baidu.com/it/u=1678669779,2104724840&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img1.baidu.com/it/u=152838451,2578337599&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img1.baidu.com/it/u=2869137611,3006763869&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=1066',
                'https://img0.baidu.com/it/u=3037865030,3799295120&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img2.baidu.com/it/u=1861247343,154337235&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=1066',
                'https://img0.baidu.com/it/u=2325200222,1651801450&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img2.baidu.com/it/u=619310919,2115097596&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img0.baidu.com/it/u=2478546793,3955793251&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img0.baidu.com/it/u=3327676179,20922425&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img0.baidu.com/it/u=91526605,3131498430&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=1066',
                'https://img0.baidu.com/it/u=4230167976,50446070&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img0.baidu.com/it/u=2378539192,2977276279&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img2.baidu.com/it/u=222309367,3801930633&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img1.baidu.com/it/u=1459319279,2746207459&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img1.baidu.com/it/u=2527642336,3893475298&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img2.baidu.com/it/u=4096143718,3275690621&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img0.baidu.com/it/u=4121778611,69613948&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img2.baidu.com/it/u=3233312087,2132923522&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img1.baidu.com/it/u=2079025662,669942918&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img2.baidu.com/it/u=1678669779,2104724840&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img0.baidu.com/it/u=1379339448,386908087&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=1066',
                'https://img0.baidu.com/it/u=4232524853,3441508361&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img1.baidu.com/it/u=2856144506,299526186&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img1.baidu.com/it/u=3772281515,778129982&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img0.baidu.com/it/u=602391661,1866827618&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img0.baidu.com/it/u=1379339448,386908087&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=1066',
                'https://img1.baidu.com/it/u=1433625435,1716074134&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img2.baidu.com/it/u=3163559383,4233541560&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img2.baidu.com/it/u=329856657,288327467&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img1.baidu.com/it/u=2702120246,1239077782&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img0.baidu.com/it/u=112533531,1010533431&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img1.baidu.com/it/u=1363992686,2853040087&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img2.baidu.com/it/u=731377012,4029682190&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img2.baidu.com/it/u=1974630770,795393818&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img0.baidu.com/it/u=1747155406,1193275367&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=1066',
                'https://img2.baidu.com/it/u=2165563775,3831200622&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img0.baidu.com/it/u=1852123239,307436813&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img1.baidu.com/it/u=2445247900,1514598255&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img2.baidu.com/it/u=3157255670,586506326&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img2.baidu.com/it/u=3364743826,4159646412&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img1.baidu.com/it/u=1307334377,3347255021&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img1.baidu.com/it/u=351890986,1042362448&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img0.baidu.com/it/u=2406738779,2022778926&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img0.baidu.com/it/u=157804351,3955800387&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img1.baidu.com/it/u=2981734814,1076023047&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=500',
                'https://img0.baidu.com/it/u=1811817814,380574949&fm=253&fmt=auto&app=120&f=JPEG?w=800&h=1422',
                'https://img2.baidu.com/it/u=3777852582,1269456205&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1400',
                'https://img1.baidu.com/it/u=3834385376,1447971873&fm=253&fmt=auto&app=138&f=JPEG?w=277&h=499',
                'https://img0.baidu.com/it/u=2814433763,3981619271&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1200',
                'https://img1.baidu.com/it/u=2540871753,1469242089&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1129',
                'https://img2.baidu.com/it/u=8272389,3379812263&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1082',
                'https://img1.baidu.com/it/u=1480479705,1897728720&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1066',
                'https://img1.baidu.com/it/u=3135229416,3429800723&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1200',
                'https://img0.baidu.com/it/u=2558954355,1689261492&fm=253&fmt=auto&app=138&f=JPEG?w=800&h=1360',
                'https://img0.baidu.com/it/u=2595094901,490922387&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=1082',
                'https://img2.baidu.com/it/u=366668690,322440321&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889', */
                


            ];

            for (let i = 0; i < count; i++) {
                const card = document.createElement('div');
                card.className = 'lx-waterfall-card';
                card.innerHTML = `
                    <img src="${images[i % images.length]}" alt="图片">
                `;
                container.appendChild(card);
            }
        }

        // 图片加载检测
        function waitForImages() {
            return new Promise(resolve => {
                const images = document.querySelectorAll('img');
                let loaded = 0;

                const checkLoad = () => {
                    if (++loaded === images.length) resolve();
                };

                images.forEach(img => {
                    if (img.complete) checkLoad();
                    else img.addEventListener('load', checkLoad);
                });
            });
        }

        // 创建观察器
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const animations = ['lx-animate-bottom', 'lx-animate-left', 'lx-animate-right'];
                    const randomAnim = animations[Math.floor(Math.random() * 3)];
                    entry.target.classList.add(randomAnim);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.2 });

        // 初始化
        window.addEventListener('DOMContentLoaded', async () => {
            generateCards();

            await waitForImages();

            document.querySelectorAll('.lx-waterfall-card').forEach(card => {
                observer.observe(card);
            });

            // 窗口调整处理
            let resizeTimer;
            window.addEventListener('resize', () => {
                clearTimeout(resizeTimer);
                resizeTimer = setTimeout(() => {
                    // 可添加布局调整逻辑
                }, 250);
            });
        });