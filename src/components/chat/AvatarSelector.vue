<template>
  <div class="avatar-selector">
    <div class="avatar-preview" @click="showOptions = !showOptions">
      <img :src="currentAvatar" alt="头像" class="avatar-img" />
      <div class="edit-overlay">
        <span class="edit-icon">✏️</span>
      </div>
    </div>
    
    <div v-if="showOptions" class="avatar-options">
      <div class="options-header">
        <h4>选择头像</h4>
        <button class="close-btn" @click="showOptions = false">×</button>
      </div>
      
      <div class="avatar-grid">
        <div 
          v-for="(avatar, index) in avatarOptions" 
          :key="index"
          class="avatar-option"
          :class="{ 'selected': avatar === currentAvatar }"
          @click="selectAvatar(avatar)"
        >
          <img :src="avatar" alt="头像选项" class="option-img" />
        </div>
      </div>
      
      <div class="custom-url">
        <input 
          v-model="customUrl" 
          type="text" 
          placeholder="输入自定义头像URL" 
          class="url-input"
        />
        <button @click="useCustomUrl" class="url-btn">使用</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AvatarSelector', // 组件名称
  props: {
    username: { // 用户名
      type: String,
      required: true
    },
    initialAvatar: { // 初始头像
      type: String,
      default: ''
    }
  },
  data() {
    return {
      showOptions: false, // 是否显示选项
      currentAvatar: this.initialAvatar || this.getDefaultAvatar(), // 当前选择的头像
      customUrl: '', // 自定义URL输入
      // 预设头像选项
      avatarOptions: [
        'https://ui-avatars.com/api/?name=A&background=5865F2&color=fff',
        'https://ui-avatars.com/api/?name=B&background=ED4245&color=fff',
        'https://ui-avatars.com/api/?name=C&background=43B581&color=fff',
        'https://ui-avatars.com/api/?name=D&background=FAA61A&color=fff',
        'https://ui-avatars.com/api/?name=E&background=9B59B6&color=fff',
        'https://ui-avatars.com/api/?name=F&background=3498DB&color=fff',
        'https://ui-avatars.com/api/?name=G&background=E67E22&color=fff',
        'https://ui-avatars.com/api/?name=H&background=1ABC9C&color=fff'
      ]
    }
  },
  methods: {
    // 获取默认头像
    getDefaultAvatar() {
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(this.username)}&background=random`;
    },
    
    // 选择头像
    selectAvatar(avatar) {
      this.currentAvatar = avatar;
      this.showOptions = false;
      this.$emit('avatar-selected', avatar); // 发送选择的头像到父组件
    },
    
    // 使用自定义URL
    useCustomUrl() {
      if (this.customUrl.trim()) {
        this.selectAvatar(this.customUrl.trim());
      }
    }
  }
}
</script>

<style scoped>
.avatar-selector {
  position: relative;
  display: inline-block;
}

.avatar-preview {
  position: relative;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  cursor: pointer;
  overflow: hidden;
}

.avatar-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.edit-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.2s;
}

.avatar-preview:hover .edit-overlay {
  opacity: 1;
}

.edit-icon {
  font-size: 16px;
}

.avatar-options {
  position: absolute;
  top: 45px;
  left: 0;
  width: 250px;
  background-color: var(--message-background);
  border: 1px solid var(--input-border-color);
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 10;
  padding: 1rem;
}

.options-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.5rem;
}

.options-header h4 {
  margin: 0;
  color: var(--text-color);
}

.close-btn {
  background: none;
  border: none;
  font-size: 1.25rem;
  cursor: pointer;
  color: var(--text-color);
}

.avatar-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.avatar-option {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.2s;
}

.avatar-option:hover {
  border-color: var(--primary-color);
}

.avatar-option.selected {
  border-color: var(--primary-color);
}

.option-img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.custom-url {
  display: flex;
  margin-top: 0.5rem;
}

.url-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid var(--input-border-color);
  border-radius: 0.25rem 0 0 0.25rem;
  background-color: var(--input-background);
  color: var(--input-text-color);
}

.url-btn {
  padding: 0.5rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 0 0.25rem 0.25rem 0;
  cursor: pointer;
}

.url-btn:hover {
  background-color: var(--secondary-color);
}
</style> 