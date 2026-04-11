        // 图片数据数组
        const imageData = [
            'https://img1.baidu.com/it/u=1718672745,1405878309&fm=253&fmt=auto&app=120&f=JPEG?w=500&h=1066',
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
            'https://img2.baidu.com/it/u=366668690,322440321&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=889',
        ];

        // 获取容器元素
        const container = document.getElementById('waterfall-container');

        // 加载所有图片函数
        function loadAllImages() {
            const fragment = document.createDocumentFragment();
            
            // 遍历数组生成所有图片元素
            for (let i = 0; i < imageData.length; i++) {
                const imageDiv = document.createElement('div');
                imageDiv.className = 'image';
                
                const img = document.createElement('img');
                img.src = imageData[i];
                img.alt = `图片 ${i + 1}`;
                img.loading = 'lazy'; // 启用懒加载
                
                imageDiv.appendChild(img);
                fragment.appendChild(imageDiv);
            }
            
            // 添加到容器中
            container.appendChild(fragment);
        }

        // 页面加载完成后初始化
        document.addEventListener('DOMContentLoaded', function() {
            // 加载所有图片
            loadAllImages();
        });

        // ... 保留原有的旋转相册脚本 ...



/* ********************旋转相册*********************** */
      // Author: Hoang Tran (https://www.facebook.com/profile.php?id=100004848287494)
      // Github verson (1 file .html): https://github.com/HoangTran0410/3DCarousel/blob/master/index.html

      // You can change global variables here:
      // 全局配置变量
      /* var radius = 240; // how big of the radius // 旋转半径大小 */
      var radius = 380; // how big of the radius // 旋转半径大小
      var autoRotate = true; // auto rotate or not // 是否自动旋转
      var rotateSpeed = -60; // unit: seconds/360 degrees // 旋转速度 (单位: 秒/360度)
      /* var imgWidth = 120; // width of images (unit: px) // 图片宽度 (单位: px) */
      var imgWidth = 200; // width of images (unit: px) // 图片宽度 (单位: px)
      /* var imgHeight = 170; // height of images (unit: px) // 图片高度 (单位: px) */
      var imgHeight = 280; // height of images (unit: px) // 图片高度 (单位: px)

      // Link of background music - set 'null' if you dont want to play background music
      // 背景音乐链接 - 设置为null则不播放背景音乐
      var bgMusicURL =
        "https://api.soundcloud.com/tracks/143041228/stream?client_id=587aa2d384f7333a886010d5f52f302a";
      var bgMusicControls = true; // Show UI music control // 显示音乐控制UI
      var bgMusicControls = false; // Show UI music control // 不显示音乐控制UI

      /*
     NOTE:
       + imgWidth, imgHeight will work for video
       + if imgWidth, imgHeight too small, play/pause button in <video> will be hidden
       + Music link are taken from: https://hoangtran0410.github.io/Visualyze-design-your-own-/?theme=HauMaster&playlist=1&song=1&background=28
       + Custom from code in tiktok video  https://www.facebook.com/J2TEAM.ManhTuan/videos/1353367338135935/
*/

      // ===================== start =======================
      // 初始化延迟执行
      setTimeout(init, 100);

      // 获取DOM元素
      var odrag = document.getElementById("drag-container");
      var ospin = document.getElementById("spin-container");
      var aImg = ospin.getElementsByTagName("img");
      var aVid = ospin.getElementsByTagName("video");
      var aEle = [...aImg, ...aVid]; // combine 2 arrays // 合并图片和视频数组

      // Size of images
      // 设置图片尺寸
      ospin.style.width = imgWidth + "px";
      ospin.style.height = imgHeight + "px";

      // Size of ground - depend on radius
      // 根据半径设置地面尺寸
      var ground = document.getElementById("ground");
      ground.style.width = radius * 3 + "px";
      ground.style.height = radius * 3 + "px";

      // 初始化函数 - 设置每张图片的位置
      function init(delayTime) {
        for (var i = 0; i < aEle.length; i++) {
          aEle[i].style.transform =
            "rotateY(" +
            i * (360 / aEle.length) +
            "deg) translateZ(" +
            radius +
            "px)";
          aEle[i].style.transition = "transform 1s";
          aEle[i].style.transitionDelay =
            delayTime || (aEle.length - i) / 4 + "s";
        }
      }

      // 应用变换函数 - 控制视角旋转
      function applyTranform(obj) {
        // Constrain the angle of camera (between 0 and 180)
        // 限制摄像机角度 (0到180度之间)
        if (tY > 180) tY = 180;
        if (tY < 0) tY = 0;

        // Apply the angle
        // 应用旋转角度
        obj.style.transform = "rotateX(" + -tY + "deg) rotateY(" + tX + "deg)";
      }

      // 控制旋转动画播放/暂停
      function playSpin(yes) {
        ospin.style.animationPlayState = yes ? "running" : "paused";
      }

      // 鼠标/触摸事件相关变量
      var sX,
        sY,
        nX,
        nY,
        desX = 0,
        desY = 0,
        tX = 0,
        tY = 10;

      // auto spin
      // 自动旋转设置
      if (autoRotate) {
        var animationName = rotateSpeed > 0 ? "spin" : "spinRevert";
        ospin.style.animation = `${animationName} ${Math.abs(
          rotateSpeed
        )}s infinite linear`;
      }

      // add background music
      // 添加背景音乐
      if (bgMusicURL) {
        document.getElementById("music-container").innerHTML += `
<audio src="${bgMusicURL}" ${
          bgMusicControls ? "controls" : ""
        } autoplay loop>    
<p>If you are reading this, it is because your browser does not support the audio element.</p>
</audio>
`;
      }

      // setup events
      // 鼠标拖拽事件处理
      document.onpointerdown = function(e) {
        clearInterval(odrag.timer);
        e = e || window.event;
        var sX = e.clientX,
          sY = e.clientY;

        this.onpointermove = function(e) {
          e = e || window.event;
          var nX = e.clientX,
            nY = e.clientY;
          desX = nX - sX;
          desY = nY - sY;
          tX += desX * 0.1;
          tY += desY * 0.1;
          applyTranform(odrag);
          sX = nX;
          sY = nY;
        };

        this.onpointerup = function(e) {
          odrag.timer = setInterval(function() {
            desX *= 0.95;
            desY *= 0.95;
            tX += desX * 0.1;
            tY += desY * 0.1;
            applyTranform(odrag);
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
      /* document.onmousewheel = function(e) {
        e = e || window.event;
        var d = e.wheelDelta / 20 || -e.detail;
        radius += d;
        init(1);
      }; */