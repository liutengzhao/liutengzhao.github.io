// 配置项（盐值和加密后的密码）
const CONFIG = {
    salt: "1a44410ee7c1a848c506a92f39402931", 
    storedHash: "c0335845bc37f6407e258368bbfef23005d568af3554bf17b29e7ad27f15051b", 
  };
  // 生成密码哈希（验证访问者输入的密码）
  function generateHash(password) {
    return CryptoJS.SHA256(password + CONFIG.salt).toString();
  }
  // 登录验证
  function login() {
    const inputHash = generateHash(document.getElementById('password').value);
    if(inputHash === CONFIG.storedHash) {
      sessionStorage.setItem('isLoggedIn', 'true');
      window.location.href = 'zhuye.html';
    } else {
      alert("密码错误");
    }
  }
 