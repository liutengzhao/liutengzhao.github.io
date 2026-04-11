// 检查登录状态并显示或隐藏“隐藏”选项
function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem('isLoggedIn');
    const hiddenOption = document.getElementById('ym');
    const hiddenOption2 = document.getElementById('ym2');

    if (isLoggedIn === 'true') {
        hiddenOption.style.display = '';
        hiddenOption2.style.display = '';
    } else {
        hiddenOption.style.display = 'none';
        hiddenOption2.style.display = 'none';
    }
}
// 在页面加载时检查登录状态
document.addEventListener('DOMContentLoaded', () => {
    checkLoginStatus();
});


/* 登录对话框点击事件 */
// 获取元素
const loginBtns = document.querySelectorAll('.login-btn');
const mask = document.querySelector('.mask');
const dialog = document.querySelector('.dialog-box');
const closeBtn = document.querySelector('.close-btn');

// 显示对话框
function showDialog() {
    mask.classList.add('active');
    dialog.classList.add('active');
}

// 隐藏对话框
function hideDialog() {
    mask.classList.remove('active');
    dialog.classList.remove('active');
}

// 绑定登录按钮事件
loginBtns.forEach(btn => {
    btn.addEventListener('click', showDialog);
});

// 绑定关闭事件
closeBtn.addEventListener('click', hideDialog);
mask.addEventListener('click', hideDialog);

// 阻止对话框内部点击冒泡
dialog.addEventListener('click', (e) => {
    e.stopPropagation();
});

// 显示登陆成功提示框
function showNotification(message, type = 'success') {
    const notification = document.getElementById('notification');
    const notificationMessage = document.getElementById('notification-message');
    notificationMessage.textContent = message;
    notification.classList.add(type);
    notification.style.display = 'block';

    // 自动隐藏提示框
    setTimeout(() => {
        hideNotification();
    }, 3000);
}

// 隐藏提示框
function hideNotification() {
    const notification = document.getElementById('notification');
    notification.style.display = 'none';
    notification.classList.remove('success', 'error');
}

// 关闭提示框
function closeNotification() {
    hideNotification();
}


// 配置项（盐值和加密后的密码）
const CONFIG = {
    usernameSalt: "02f67240410d9ad3ce8cc50109bd7bf4", // 随机生成的长盐值
    storedUsernameHash: "b5cb088d17db02fd6371df606c83916601406e9b8039655f8a42f15122148f40", // 运行 generateHash('user123') 生成哈希存入 storedUsernameHash
    passwordSalt: "a4d0543cb24b5c8cc54e9761dd82dc6b", // 随机生成的长盐值
    storedHash: "a7b48a497fd35163a1327169172669f8e57bf9d68513de4ef328d39eec8ccc4a", // 运行 generateHash('你的密码') 生成哈希存入 storedHash
};

// 生成密码哈希（初始化时使用）
function generateHash(password, salt) {
    return CryptoJS.SHA256(password + salt).toString();
}

// 登录验证
function login(username, password) {
    const inputUsernameHash = generateHash(username, CONFIG.usernameSalt);
    const inputHash = generateHash(password, CONFIG.passwordSalt);
    if (inputUsernameHash === CONFIG.storedUsernameHash && inputHash === CONFIG.storedHash) {
        sessionStorage.setItem('isLoggedIn', 'true');
        // 在页面加载时检查登录状态
        document.addEventListener('DOMContentLoaded', () => {
            checkLoginStatus();
        });
        showNotification("登录成功");
    } else {
        showNotification("用户名或密码错误", "error");
    }
}

// 表单提交处理
document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const form = e.target;

    // 输入验证增强
    if (!validateForm(form)) return;

    // 加载状态显示
    toggleLoading(true);

    // 获取用户名和密码
    const username = form.querySelector('input[type="text"]').value;
    const password = form.querySelector('input[type="password"]').value;

    try {
/*      // 模拟API请求
        await new Promise(resolve => setTimeout(resolve, 1500)); */
        // 执行登录验证
        hideDialog();
        login(username, password);
    } catch (error) {
        showNotification('登录失败', 'error');
    } finally {
        toggleLoading(false);
    }
});

// 表单验证函数
function validateForm(form) {
    const username = form.querySelector('input[type="text"]');
    const password = form.querySelector('input[type="password"]');

    if (username.value.length < 4) {
        showError(username, '用户名至少4个字符');
        return false;
    }

    if (password.value.length < 8) {
        showError(password, '密码至少8位');
        return false;
    }

    return true;
}

// 加载状态切换
function toggleLoading(isLoading) {
    const btn = document.querySelector('.submit-btn');
    btn.disabled = isLoading;
    btn.innerHTML = isLoading ?
        `<div class="loader"></div> 登录中...` :
        `立即登录`;
}

// 自动聚焦首个输入框
document.querySelector('input[type="text"]').focus();

// 错误提示功能
function showError(input, message) {
    const error = document.createElement('div');
    error.className = 'error-message';
    error.textContent = message;
    input.parentNode.appendChild(error);
    input.classList.add('error');
    setTimeout(() => error.remove(), 3000);
}

// 回车提交支持
document.querySelectorAll('input').forEach(input => {
    input.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.querySelector('form').requestSubmit();
        }
    });
});

/* 基于客户端存储技术实现的本地访问次数限制方案 */
// 初始化本地计数器
const MAX_ATTEMPTS = 3;
const COOLDOWN_TIME = 300000; // 5分钟（单位：毫秒）

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();

    // 从 localStorage 获取当前尝试次数
    const currentAttempts = parseInt(
        localStorage.getItem('loginAttempts') || 0
    );

    if (currentAttempts >= MAX_ATTEMPTS) {
        showCooldownAlert();
        return;
    }

    // 执行登录验证逻辑
    handleLogin().then(success => {
        if (!success) {
            // 失败时递增计数器
            localStorage.setItem('loginAttempts', currentAttempts + 1);
            updateAttemptsDisplay();
        }
    });
});

// 剩余次数显示更新
function updateAttemptsDisplay() {
    const remain = MAX_ATTEMPTS - localStorage.getItem('loginAttempts');
    document.querySelector('.attempts-counter').textContent =
        `剩余尝试次数：${remain}`;
}

// 冷却状态提示
function showCooldownAlert() {
    const lastAttemptTime = parseInt(
        localStorage.getItem('lastAttemptTime') || Date.now()
    );
    const remainingTime = COOLDOWN_TIME - (Date.now() - lastAttemptTime);

    // 显示动态倒计时
    const timer = setInterval(() => {
        const minutes = Math.ceil(remainingTime / 60000);
        document.querySelector('.cooldown-timer').textContent =
            `${minutes}分钟后可重试`;
    }, 1000);

    // 超时恢复功能
    setTimeout(() => {
        clearInterval(timer);
        localStorage.removeItem('loginAttempts');
        document.querySelector('.submit-btn').disabled = false;
    }, remainingTime);
}