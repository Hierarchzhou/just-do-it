<template>
  <div class="app-container">
    <div v-if="!username" class="login-container">
      <LoginForm @login="setUsername" />
    </div>
    <div v-else>
      <ChatContainer :currentUser="{ username, avatar }" />
    </div>
  </div>
</template>

<script>
import LoginForm from './components/auth/LoginForm.vue'
import ChatContainer from './components/chat/ChatContainer.vue'

export default {
  name: 'App',
  components: {
    LoginForm,
    ChatContainer
  },
  data() {
    return {
      username: '',
      avatar: ''
    }
  },
  created() {
    // 从localStorage获取用户信息
    const savedUsername = localStorage.getItem('chat-username')
    const savedAvatar = localStorage.getItem('chat-avatar')
    
    if (savedUsername) {
      this.username = savedUsername
      this.avatar = savedAvatar || ''
    }
    
    // 应用保存的主题
    const savedTheme = localStorage.getItem('chat-theme') || 'discord'
    document.body.classList.add(`theme-${savedTheme}`)
  },
  methods: {
    setUsername(userData) {
      this.username = userData.username
      this.avatar = userData.avatar || ''
      
      // 保存用户信息到localStorage
      localStorage.setItem('chat-username', this.username)
      if (this.avatar) {
        localStorage.setItem('chat-avatar', this.avatar)
      }
    }
  }
}
</script>

<style>
/* 全局样式重置 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body, html {
  height: 100%;
  width: 100%;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

#app {
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
}

/* 背景图片设置 */
body::before {
  content: '';
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/src/assets/images/cinematic-bg.jpg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: 0;
  z-index: -1;
  transition: opacity 0.5s ease;
}

/* 文艺电影主题背景 */
body.theme-cinematic::before {
  opacity: 0.2;
}

.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 1rem;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .chat-main {
    flex-direction: column;
  }
  
  .online-users {
    width: 100% !important;
    border-left: none !important;
    border-top: 1px solid var(--border-color);
    max-height: 200px;
  }
}
</style>
