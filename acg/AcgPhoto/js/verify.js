// 假设使用一个简单的会话存储来检查用户是否已经登录，没登陆就跳回登录页
  if (!sessionStorage.getItem('isLoggedIn')) {
    window.location.href = 'index.html';
}