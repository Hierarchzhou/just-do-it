<template>
  <div class="username-input-container">
    <h2 class="title">欢迎来到聊天室</h2>
    
    <div class="avatar-selection">
      <h3>选择头像</h3>
      <div class="avatar-options">
        <!-- 默认头像选项 -->
        <div 
          v-for="(avatar, index) in defaultAvatars" 
          :key="index"
          class="avatar-option"
          :class="{ selected: selectedAvatar === avatar }"
          @click="selectAvatar(avatar)"
        >
          <img :src="avatar" alt="头像选项" class="avatar-img" />
        </div>
        
        <!-- 自定义头像上传 -->
        <div 
          class="avatar-option custom-avatar"
          :class="{ selected: isCustomAvatarSelected }"
        >
          <label for="avatar-upload" class="custom-avatar-label">
            <img :src="customAvatarPreview || '/avatars/default.png'" alt="自定义头像" class="avatar-img" />
            <div class="upload-icon" v-if="!customAvatarPreview">+</div>
          </label>
          <input 
            type="file" 
            id="avatar-upload" 
            class="avatar-upload" 
            accept="image/*"
            @change="handleAvatarUpload"
          />
        </div>
      </div>
    </div>
    
    <div class="input-group">
      <label for="username">请输入您的昵称</label>
      <input 
        type="text" 
        id="username"
        v-model="username" 
        placeholder="输入昵称..." 
        @keyup.enter="setUsername"
        class="username-input"
        @input="updateUsernameAvatar"
      />
    </div>
    
    <div class="theme-selection">
      <h3>选择主题</h3>
      <div class="theme-options">
        <div 
          v-for="theme in themes" 
          :key="theme.id"
          class="theme-option"
          :class="{ selected: selectedTheme === theme.id }"
          @click="selectTheme(theme.id)"
        >
          <div class="theme-color" :class="`theme-preview-${theme.id}`"></div>
          <span class="theme-name">{{ theme.name }}</span>
        </div>
      </div>
    </div>
    
    <button 
      @click="setUsername" 
      class="enter-button"
      :disabled="!username.trim()"
    >
      进入聊天室
    </button>
  </div>
</template>

<script>
import { getRandomAvatarUrl, getRandomDefaultAvatarUrl } from '../../utils/avatarUtils';

export default {
  name: 'UserNameInput',
  data() {
    return {
      username: '', // 用户昵称
      selectedAvatar: '', // 选中的头像
      customAvatarPreview: null, // 自定义头像预览
      isCustomAvatarSelected: false, // 是否选择了自定义头像
      selectedTheme: 'discord', // 默认主题
      themes: [
        { id: 'discord', name: 'Discord' },
        { id: 'dark', name: '暗黑' }
      ],
      defaultAvatars: [] // 默认头像列表
    }
  },
  created() {
    // 从 localStorage 获取保存的主题
    const savedTheme = localStorage.getItem('chat-theme');
    if (savedTheme) {
      this.selectedTheme = savedTheme;
      this.selectTheme(savedTheme);
    }
    
    // 生成6个默认头像
    this.generateDefaultAvatars();
  },
  methods: {
    // 生成默认头像
    generateDefaultAvatars() {
      // 清空数组
      this.defaultAvatars = [];
      
      // 生成6个随机头像
      for (let i = 0; i < 6; i++) {
        this.defaultAvatars.push(getRandomDefaultAvatarUrl());
      }
      
      // 默认选择第一个头像
      this.selectedAvatar = this.defaultAvatars[0];
    },
    
    // 根据用户名更新头像
    updateUsernameAvatar() {
      if (this.username.trim() && !this.isCustomAvatarSelected) {
        // 如果用户输入了用户名，并且没有选择自定义头像，则根据用户名生成头像
        this.selectedAvatar = getRandomAvatarUrl(this.username);
      }
    },
    
    // 设置用户名和头像
    setUsername() {
      if (this.username.trim()) {
        // 如果没有选择头像，则根据用户名生成一个
        if (!this.selectedAvatar) {
          this.selectedAvatar = getRandomAvatarUrl(this.username);
        }
        
        // 将用户名和头像传递给父组件
        this.$emit('set-username', {
          username: this.username,
          avatar: this.selectedAvatar
        });
        
        // 保存主题选择
        localStorage.setItem('chat-theme', this.selectedTheme);
        document.body.classList.add(`theme-${this.selectedTheme}`);
      }
    },
    
    // 选择头像
    selectAvatar(avatar) {
      this.selectedAvatar = avatar;
      this.isCustomAvatarSelected = false;
    },
    
    // 选择主题
    selectTheme(themeId) {
      this.selectedTheme = themeId;
      
      // 移除所有主题类
      document.body.classList.remove('theme-discord', 'theme-dark');
      
      // 添加选中的主题类
      document.body.classList.add(`theme-${themeId}`);
    },
    
    // 处理头像上传
    handleAvatarUpload(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      // 检查文件类型
      if (!file.type.match('image.*')) {
        alert('请上传图片文件');
        return;
      }
      
      // 检查文件大小 (限制为 2MB)
      if (file.size > 2 * 1024 * 1024) {
        alert('图片大小不能超过 2MB');
        return;
      }
      
      // 创建文件读取器
      const reader = new FileReader();
      
      // 读取完成后的回调
      reader.onload = (e) => {
        this.customAvatarPreview = e.target.result;
        this.selectedAvatar = e.target.result;
        this.isCustomAvatarSelected = true;
      };
      
      // 读取文件
      reader.readAsDataURL(file);
    }
  }
}
</script>

<style scoped>
.username-input-container {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
  background-color: rgba(0, 0, 0, 0.3);
  border-radius: 0.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  color: var(--text-color);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.title {
  text-align: center;
  margin-bottom: 2rem;
  font-size: 1.75rem;
  color: var(--header-color);
}

.input-group {
  margin-bottom: 1.5rem;
}

.input-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

.username-input {
  width: 100%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(0, 0, 0, 0.2);
  color: var(--text-color);
  font-size: 1rem;
  box-sizing: border-box;
}

.username-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb, 138, 113, 88), 0.2);
}

.avatar-selection, .theme-selection {
  margin-bottom: 1.5rem;
}

.avatar-selection h3, .theme-selection h3 {
  margin-bottom: 0.75rem;
  font-size: 1.1rem;
  font-weight: 500;
}

.avatar-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 1.5rem;
}

.avatar-option {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s ease;
  position: relative;
}

.avatar-option:hover {
  transform: scale(1.05);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.avatar-option.selected {
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb, 138, 113, 88), 0.3);
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.custom-avatar {
  position: relative;
  background-color: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.custom-avatar-label {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.upload-icon {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 1.5rem;
  color: var(--text-color);
  opacity: 0.7;
}

.avatar-upload {
  position: absolute;
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  z-index: -1;
}

.theme-options {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.theme-option {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.5rem;
  border: 1px solid transparent;
  transition: all 0.2s ease;
}

.theme-option:hover {
  background-color: rgba(255, 255, 255, 0.05);
}

.theme-option.selected {
  border-color: var(--primary-color);
  background-color: rgba(255, 255, 255, 0.1);
}

.theme-color {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-bottom: 0.5rem;
}

.theme-preview-discord {
  background: linear-gradient(135deg, #7289da, #5c6bc0);
}

.theme-preview-dark {
  background: linear-gradient(135deg, #bb86fc, #1e1e1e);
}

.theme-name {
  font-size: 0.85rem;
}

.enter-button {
  width: 100%;
  padding: 0.75rem 1rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  margin-top: 1rem;
}

.enter-button:hover:not(:disabled) {
  background-color: var(--secondary-color);
  transform: translateY(-2px);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
}

.enter-button:active:not(:disabled) {
  transform: translateY(0);
}

.enter-button:disabled {
  background-color: rgba(128, 128, 128, 0.3);
  cursor: not-allowed;
}
</style> 