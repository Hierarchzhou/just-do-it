/**
 * 头像工具函数
 * 这个文件包含与用户头像相关的工具函数
 */

// 默认头像颜色数组 - Discord风格的颜色
const avatarColors = [
  '7289da', // Discord蓝
  '43b581', // Discord绿
  'faa61a', // Discord黄
  'f04747', // Discord红
  '593695', // Discord紫
  '747f8d'  // Discord灰
];

/**
 * 获取基于用户名的随机头像URL
 * @param {string} username - 用户名
 * @param {number} size - 头像尺寸（像素）
 * @returns {string} - 头像URL
 */
export function getRandomAvatarUrl(username, size = 200) {
  // 基于用户名生成一个一致的随机数，这样同一用户名总是得到相同的头像
  const randomIndex = Math.abs(hashCode(username)) % avatarColors.length;
  const color = avatarColors[randomIndex];
  
  // 使用UI Avatars服务生成基于文字的头像
  // 这个服务会根据用户名生成一个包含用户名首字母的头像
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(username)}&background=${color}&color=fff&size=${size}`;
}

/**
 * 获取随机的默认头像URL
 * @returns {string} - 随机默认头像URL
 */
export function getRandomDefaultAvatarUrl() {
  // 随机选择一个颜色
  const randomIndex = Math.floor(Math.random() * avatarColors.length);
  const color = avatarColors[randomIndex];
  
  // 生成一个随机的两个字母组合
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  const letter1 = letters.charAt(Math.floor(Math.random() * letters.length));
  const letter2 = letters.charAt(Math.floor(Math.random() * letters.length));
  
  // 使用UI Avatars服务生成头像
  return `https://ui-avatars.com/api/?name=${letter1}${letter2}&background=${color}&color=fff&size=200`;
}

/**
 * 简单的字符串哈希函数
 * @param {string} str - 要哈希的字符串
 * @returns {number} - 哈希值
 */
function hashCode(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash |= 0; // 转换为32位整数
  }
  return hash;
}

/**
 * 检查URL是否是有效的图片URL
 * @param {string} url - 要检查的URL
 * @returns {boolean} - 是否是有效的图片URL
 */
export function isValidImageUrl(url) {
  if (!url) return false;
  return /\.(jpeg|jpg|gif|png|svg)$/i.test(url) || url.startsWith('https://ui-avatars.com/');
} 