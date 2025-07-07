// 假设使用一个简单的会话存储来检查用户是否已经登录，没登陆就跳回登录页
  if (!sessionStorage.getItem('isLoggedIn')) {
    window.location.href = 'index.html';
}

  function toggleMenu() {
    const drawerMenu = document.getElementById('drawerMenu');
    drawerMenu.classList.toggle('active');
  }
  
  // 添加点击事件监听器，点击抽屉外的任何非抽屉区域时关闭抽屉
  document.body.addEventListener('click', function(event) {
    const drawerMenu = document.getElementById('drawerMenu');
    if (!drawerMenu.contains(event.target) && !event.target.classList.contains('fas') && !event.target.classList.contains('close-icon')) {
      drawerMenu.classList.remove('active');
    }
  });
  
  //二级菜单栏
  document.querySelectorAll('.nav-item').forEach(item => {
        let timer;
        const submenu = item.querySelector('.submenu-wrapper');
  
        item.addEventListener('mouseenter', () => {
          clearTimeout(timer);
          item.classList.add('active');
        });
  
        item.addEventListener('mouseleave', (e) => {
          if (!e.relatedTarget?.closest('.submenu-wrapper')) {
            timer = setTimeout(() => {
              item.classList.remove('active');
            }, 200);
          }
        });
  
        if (submenu) {
          submenu.addEventListener('mouseleave', () => {
            timer = setTimeout(() => {
              item.classList.remove('active');
            }, 200);
          });
        }
      });



//左下角旋转音乐播放
const songs = [
  { id: 'item-1', img: 'http://img.blog.1207.top/img/202503302037312.webp', title: 'How You Like That', artist: 'BLACKPINK', audio: 'https://example.com/song1.mp3', iframeSrc: 'http://music.163.com/outchain/player?type=2&id=1372315225&auto=1&height=66' },
  { id: 'item-2', img: 'http://img.blog.1207.top/img/202503302036011.webp', title: 'DDU-DU DDU-DU', artist: 'BLACKPINK', audio: 'https://example.com/song2.mp3', iframeSrc: 'http://music.163.com/outchain/player?type=2&id=1334672916&auto=1&height=66' },
  { id: 'item-3', img: 'http://img.blog.1207.top/img/202503302037312.webp', title: 'Kill This Love', artist: 'BLACKPINK', audio: 'https://example.com/song3.mp3', iframeSrc: 'http://music.163.com/outchain/player?type=2&id=1913478990&auto=1&height=66' }
];

let currentSongIndex = 0;
const musicIframe = document.getElementById('music-iframe');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');

function updatePlayer() {
  const currentSong = songs[currentSongIndex];
  musicIframe.src = currentSong.iframeSrc;
  $(`input[name="music"]`).prop('checked', false);
  $(`#${currentSong.id}`).prop('checked', true);
  $('body').toggleClass('background');
}

prevButton.addEventListener('click', function() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  updatePlayer();
});

nextButton.addEventListener('click', function() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  updatePlayer();
});

$('input[name="music"]').on('change', function() {
  currentSongIndex = songs.findIndex(song => song.id === this.id);
  updatePlayer();
});

$(document).ready(function() {
  updatePlayer();
});




//右下角评论留言
         // 配置参数
         const config = {
            maxComments: 5,          // 最大显示条数
            commentHeight: 40,       // 每条评论高度
            spawnInterval: 3000,     // 新评论间隔(ms)
            texts: [                 // 示例评论库
                "这个特效太酷了！",
                "666，完全被惊艳到了！",
                "动画流畅如德芙！",
                "颜色搭配很舒服~",
                "移动效果非常流畅",
                "怎么做到的？",
                "前端小白前来学习",
                "已收藏，慢慢研究",
                "交互动画完美！",
                "这个必须点赞！"
            ]
        };

        // 评论管理类
        class CommentManager {
            constructor() {
                this.container = document.getElementById('comment-container');
                this.comments = [];
                
                // 自动生成颜色
                this.hue = Math.random() * 360;
                this.saturation = 70 + Math.random() * 30;
            }

            // 生成随机颜色
            getRandomColor() {
                this.hue = (this.hue + 50 + Math.random() * 60) % 360;
                return `hsl(${this.hue}, ${this.saturation}%, 50%)`;
            }

            // 创建新评论
            createComment(text) {
                const comment = document.createElement('div');
                comment.className = 'comment-item';
                comment.textContent = text;
                
                // 动态宽度
                const minWidth = 100;
                const width = Math.min(
                    minWidth + text.length * 8, 
                    this.container.offsetWidth * 0.8
                );
                comment.style.width = width + 'px';
                
                // 随机颜色
                comment.style.backgroundColor = this.getRandomColor();
                
                // 初始位置
                comment.style.bottom = `-${config.commentHeight}px`;
                comment.style.opacity = '0';
                
                return comment;
            }

            // 添加评论
            addComment(text) {
                const newComment = this.createComment(text);
                this.container.appendChild(newComment);
                
                // 入场动画
                setTimeout(() => {
                    newComment.style.opacity = '1';
                    newComment.style.bottom = '0';
                }, 10);

                // 更新所有评论位置
                this.comments.forEach((comment, index) => {
                    const target = (index + 1) * config.commentHeight;
                    comment.style.bottom = `${target}px`;
                });

                this.comments.unshift(newComment);

                // 数量控制
                if (this.comments.length > config.maxComments) {
                    const oldComment = this.comments.pop();
                    oldComment.style.opacity = '0';
                    setTimeout(() => {
                        oldComment.remove();
                    }, 500);
                }
            }
        }

        // 初始化
        const manager = new CommentManager();

        // 自动生成评论
        setInterval(() => {
            const randomText = config.texts[
                Math.floor(Math.random() * config.texts.length)
            ];
            manager.addComment(randomText);
        }, config.spawnInterval);

        // 初始填充
        setTimeout(() => {
            manager.addComment("欢迎来到评论区！");
        }, 100);



/* 隐藏歌曲和评论 */
function toggleSongList() {
            const component = document.getElementById('SongList');
            component.classList.toggle('hidden');
        }
function toggleTalkList() {
            // 通过类名获取所有匹配的组件
            const components = document.getElementsByClassName('TalkList');
            
            // 遍历所有找到的组件并添加hidden类
            for(let i = 0; i < components.length; i++) {
                components[i].classList.toggle('hidden');
            }
        }       



//复选框全屏展示，覆盖界面，动态景深增强
  const midground = document.getElementById('midgroundText');
  const foreground = document.getElementById('foregroundCard');

  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;

    // 动态调整中景和前景的位置
    midground.style.transform = `translateZ(${Math.min(scrollTop * 0.01, 0.5)}px)`;
    foreground.style.transform = `translateZ(${Math.min(scrollTop * 0.02, 1)}px)`;
  });
     /*  */
       document.getElementById('Password').addEventListener('click', function () {
             var title = document.querySelector('.title');
             var loginBtn = document.getElementById('loginBtn');
             var rememberMeLabel = document.querySelector('.Remember');
             var passwordBtn = document.getElementById('Password');
             if (title.innerText === 'Login') {
                 title.innerText = 'Register';
                 loginBtn.value = 'Register';
                 rememberMeLabel.style.opacity = '0';
                 passwordBtn.innerText = '去登录';
                 document.getElementById('username').value = '';
                 document.getElementById('password').value = '';
                 document.getElementById('username').placeholder = 'New Username';
                 document.getElementById('password').placeholder = 'New Password';
                 document.getElementById('password').type = 'password';
             } else {
                 title.innerText = 'Login';
                 loginBtn.value = 'Login';
                 rememberMeLabel.style.opacity = '1';
                 passwordBtn.innerText = '去注册';
                 document.getElementById('username').placeholder = 'Username';
                 document.getElementById('password').placeholder = 'Password';
                 document.getElementById('password').type = 'password';
             }
     
         });




/* 苹果灵动岛 */
 let pgnavigation=document.querySelector('.pgnavigation');
 pgnavigation.onclick=function(){
 pgnavigation.classList.toggle('active')
}
/* C1.左侧隐藏式手机导航栏 */
document.getElementById('toggleButton').addEventListener('click', function() {
var uiChallenge = document.querySelector('.shouji-daohang');
uiChallenge.classList.toggle('visible');
});

document.querySelector('.shoujidaohang-back').addEventListener('click', function() {
var uiChallenge = document.querySelector('.shouji-daohang');
uiChallenge.classList.toggle('visible');
});

