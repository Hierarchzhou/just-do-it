<template>
  <div class="username-container">
    <div class="username-card">
      <h2 class="title">欢迎来到聊天室</h2>
      <p class="subtitle">请输入您的昵称开始聊天</p>
      
      <input 
        v-model="username" 
        @keyup.enter="setUsername"
        type="text" 
        placeholder="输入昵称..." 
        class="username-input"
      />
      
      <p v-if="error" class="error-message">{{ error }}</p>
      
      <button @click="setUsername" class="enter-button">进入聊天室</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UserNameInput',
  data() {
    return {
      username: '', // 存储用户输入的昵称
      error: null // 存储错误信息
    }
  },
  methods: {
    setUsername() {
      // 验证用户名是否为空
      if (!this.username.trim()) {
        this.error = '昵称不能为空';
        return;
      }
      
      // 验证用户名长度
      if (this.username.length > 20) {
        this.error = '昵称不能超过20个字符';
        return;
      }
      
      // 清除错误信息
      this.error = null;
      
      // 发送用户名到父组件
      this.$emit('set-username', this.username);
    }
  }
}
</script>

<style scoped>
.username-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
}

.username-card {
  background-color: white;
  border-radius: 0.5rem;
  padding: 2rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;
  text-align: center;
}

.title {
  color: #5865F2; /* Discord品牌色 */
  margin-bottom: 0.5rem;
}

.subtitle {
  color: #666;
  margin-bottom: 1.5rem;
}

.username-input {
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  font-size: 1rem;
  margin-bottom: 1rem;
  outline: none;
}

.username-input:focus {
  border-color: #5865F2; /* Discord品牌色 */
  box-shadow: 0 0 0 2px rgba(88, 101, 242, 0.2);
}

.error-message {
  color: #e74c3c;
  margin-bottom: 1rem;
  font-size: 0.875rem;
}

.enter-button {
  width: 100%;
  padding: 0.75rem;
  background-color: #5865F2; /* Discord品牌色 */
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.enter-button:hover {
  background-color: #4752c4;
}

.enter-button:active {
  background-color: #3c45a5;
}
</style> 