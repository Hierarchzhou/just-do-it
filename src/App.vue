<template>
  <div class="app-container">
    <div v-if="!username" class="login-container">
      <LoginForm @login="setUsername" />
    </div>
    <div v-else class="discord-layout">
      <!-- 服务器列表 -->
      <ServerList />
      
      <!-- 在线用户列表 - 将在ChatContainer中移出并放在这里 -->
      <OnlineUsersSidebar 
        :onlineUsers="onlineUsers" 
        :currentUsername="username"
      />
      
      <!-- 聊天容器 -->
      <ChatContainer 
        :currentUser="{ username, avatar }" 
        @update-online-users="updateOnlineUsers"
      />
    </div>
  </div>
</template>

<script>
import LoginForm from './components/auth/LoginForm.vue'
import ChatContainer from './components/chat/ChatContainer.vue'
import ServerList from './components/chat/ServerList.vue'
import OnlineUsersSidebar from './components/chat/OnlineUsersSidebar.vue'

export default {
  name: 'App',
  components: {
    LoginForm,
    ChatContainer,
    ServerList,
    OnlineUsersSidebar
  },
  data() {
    return {
      username: '',
      avatar: '',
      onlineUsers: [] // 在线用户列表移到App组件中管理
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
    },
    
    // 更新在线用户列表
    updateOnlineUsers(users) {
      this.onlineUsers = users;
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

/* Discord布局 */
.discord-layout {
  display: flex;
  width: 100%;
  height: 100vh;
  overflow: hidden;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .chat-main {
    flex-direction: column;
  }
  
  .discord-layout {
    flex-direction: column;
  }
  
  .server-list {
    width: 100% !important;
    height: auto !important;
    flex-direction: row !important;
    padding: 8px !important;
  }
  
  .server-items {
    flex-direction: row !important;
    padding: 0 8px !important;
  }
  
  .server-item {
    margin-right: 8px !important;
    margin-bottom: 0 !important;
  }
}
</style>
