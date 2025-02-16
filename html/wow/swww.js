 // document.getElementById('Password').addEventListener('click', function () {
    //     var title = document.querySelector('.title');
    //     var loginBtn = document.getElementById('loginBtn');
    //     var rememberMeLabel = document.querySelector('.Remember');
    //     var passwordBtn = document.getElementById('Password');
    //     if (title.innerText === 'Login') {
    //         title.innerText = 'Register';
    //         loginBtn.value = 'Register';
    //         rememberMeLabel.style.opacity = '0';
    //         passwordBtn.innerText = '去登录';
    //         document.getElementById('username').value = '';
    //         document.getElementById('password').value = '';
    //         document.getElementById('username').placeholder = 'New Username';
    //         document.getElementById('password').placeholder = 'New Password';
    //         document.getElementById('password').type = 'password';
    //     } else {
    //         title.innerText = 'Login';
    //         loginBtn.value = 'Login';
    //         rememberMeLabel.style.opacity = '1';
    //         passwordBtn.innerText = '去注册';
    //         document.getElementById('username').placeholder = 'Username';
    //         document.getElementById('password').placeholder = 'Password';
    //         document.getElementById('password').type = 'password';
    //     }
    // });
// 配置项（盐值和加密后的密码）
const CONFIG = {
    salt: "2a$12$Xa4z7M3sP9qN0bQwKjYyZ.", // 随机生成的长盐值
    storedHash: "d6b62b90184ba557b05161e81e2150570007e3ff4fe118bd13b705c64dc8fed6", // 运行 generateHash('你的密码') 生成哈希存入 storedHash
  /*   encryptedContent: "U2FsdGVkX1+dGqtWJ9Rrf01KCMj/JFkCez9mZPO8tsxriwqGTR5qrjDUPVruTlEw" // 使用在线工具加密内容：CryptoJS.AES.encrypt("你的内容", "密码").toString() */
  };
  // 生成密码哈希（初始化时使用）
  function generateHash(password) {
    return CryptoJS.SHA256(password + CONFIG.salt).toString();
  }
  // 登录验证
  function login() {
    const inputHash = generateHash(document.getElementById('password').value);
    if(inputHash === CONFIG.storedHash) {
      sessionStorage.setItem('isLoggedIn', 'true');
      window.location.href = 'index11.html';
    /*   sessionStorage.setItem('authenticated', 'true');
      showPrivateContent();//密码哈希匹配成功登录后调用函数解密内容，密匙也是登录密码 */
    } else {
      alert("密码错误");
    }
  }
  // 显示加密内容，解密内容函数
  /* function showPrivateContent() {
    try {
      const bytes = CryptoJS.AES.decrypt(
        CONFIG.encryptedContent,//使用暗文和密匙转译成内容
        document.getElementById('password').value
      );
      const content = bytes.toString(CryptoJS.enc.Utf8);
      document.getElementById('login').style.display = 'none';
      document.getElementById('privateContent').innerHTML = content;
      document.getElementById('privateContent').style.display = 'block';
    } catch(e) {
      alert("解密失败");
    }
  } */
 
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
  });
  
  document.addEventListener('keydown', function(e) {
    if (e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && e.key === 'I') ||  // Ctrl+Shift+I
        (e.ctrlKey && e.shiftKey && e.key === 'J') ||  // Ctrl+Shift+J
        (e.ctrlKey && e.key === 'U')) {                // Ctrl+U
      e.preventDefault();
      return false;
    }
  });
  
  setInterval(() => {
    console.clear();
  }, 1000);

  
(function() {
  let devtools = false;
  let threshold = 160;

  function detectDevTools() {
    devtools = false;
    let widthThreshold = window.outerWidth - window.innerWidth > threshold;
    let heightThreshold = window.outerHeight - window.innerHeight > threshold;
    if (widthThreshold || heightThreshold) {
      devtools = true;
    }
    return devtools;
  }

  setInterval(function() {
    if (detectDevTools()) {
      window.location.href = 'https://1207.top/';
    }
  }, 100);

  window.addEventListener('resize', function() {
    if (detectDevTools()) {
      window.location.href = 'https://1207.top/';
    }
  });

  window.addEventListener('focus', function() {
    if (detectDevTools()) {
      window.location.href = 'https://1207.top/';
    }
  });

  window.addEventListener('blur', function() {
    if (detectDevTools()) {
      window.location.href = 'https://1207.top/';
    }
  });
})();