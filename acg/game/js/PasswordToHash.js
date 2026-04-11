import CryptoJS from 'crypto-js';

// 生成一个随机的盐值
const newSalt = CryptoJS.lib.WordArray.random(16).toString(CryptoJS.enc.Hex);
console.log('Generated Salt(新的随机盐值):', newSalt);

// 配置项（新的随机盐值和加密后的密码）
const CONFIG = {
    salt: null, // 初始值为 null
    storedHash: null // 初始值为 null
};


function generateHash(password) {
    return CryptoJS.SHA256(password + newSalt).toString();
}

// 示例：生成密码哈希。
// 生成密码哈希，函数参数设为账号或者密码，用完清除
const password = '12071207'; // 替换为你的原始密码
const storedHash = generateHash(password);
console.log('Generated Hash(原始密码与新的随机盐值合成的加密哈希值):', storedHash);
/* 
// 更新 CONFIG 中的 storedHash
CONFIG.salt = newSalt;
CONFIG.storedHash = storedHash;
console.log('Updated CONFIG(新的一组配置):', CONFIG);
 */
/* 在 VSCode 的终端中运行此文件（在这个文件的母文件夹右键点击在集成终端中打开，输入以下代码并回车）：
node PasswordToHash.js */