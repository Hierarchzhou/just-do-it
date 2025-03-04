<template>
  <div class="chat-container">
    <!-- 用户名输入界面，当用户未设置昵称时显示 -->
    <UserNameInput 
      v-if="!username" 
      @set-username="setUsername" 
    />
    
    <!-- 聊天界面，当用户已设置昵称时显示 -->
    <div v-else class="chat-interface">
      <header class="chat-header">
        <h2 class="chat-title">Vue聊天室</h2>
        <div class="user-info-container">
          <ThemeSelector />
          <div class="user-info">
            <img :src="userAvatar" alt="头像" class="user-avatar" style="width: 24px; height: 24px; border-radius: 50%;">
            <span class="current-username">{{ username }}</span>
          </div>
        </div>
      </header>
      
      <div class="chat-main">
        <MessageList 
          :messages="messages" 
          :currentUsername="username" 
          ref="messageList" 
        />
        <OnlineUsers 
          :onlineUsers="onlineUsers" 
          :currentUsername="username" 
        />
      </div>
      
      <MessageInput @send-message="sendMessage" />
    </div>
  </div>
</template>

<script>
import UserNameInput from './UserNameInput.vue';
import MessageList from './MessageList.vue';
import MessageInput from './MessageInput.vue';
import ThemeSelector from './ThemeSelector.vue';
import OnlineUsers from './OnlineUsers.vue';
import axios from 'axios';

export default {
  name: 'ChatContainer',
  components: {
    UserNameInput,
    MessageList,
    MessageInput,
    ThemeSelector,
    OnlineUsers
  },
  data() {
    return {
      username: '', // 用户昵称
      userAvatar: '', // 用户头像
      messages: [], // 消息列表
      onlineUsers: [], // 在线用户列表
      apiUrl: 'http://localhost:3001/api/messages', // 消息API地址
      usersApiUrl: 'http://localhost:3001/api/users', // 用户API地址
      pollingInterval: null, // 用于轮询消息的计时器
      onlinePollingInterval: null, // 用于轮询在线用户的计时器
      currentTheme: localStorage.getItem('chat-theme') || 'discord', // 当前主题
    }
  },
  created() {
    // 从localStorage获取用户信息
    const savedUsername = localStorage.getItem('chat-username');
    const savedAvatar = localStorage.getItem('chat-avatar');
    
    if (savedUsername) {
      this.username = savedUsername;
    }
    
    if (savedAvatar) {
      this.userAvatar = savedAvatar;
    } else {
      // 设置默认头像
      this.userAvatar = '/avatars/default.png';
      localStorage.setItem('chat-avatar', this.userAvatar);
    }
    
    // 如果用户已登录，注册用户
    if (this.username) {
      this.registerUser();
    }
  },
  mounted() {
    // 如果用户已登录，获取消息和在线用户
    if (this.username) {
      this.fetchMessages();
      this.fetchOnlineUsers();
      
      // 设置轮询
      this.pollingInterval = setInterval(this.fetchMessages, 3000);
      this.onlinePollingInterval = setInterval(this.fetchOnlineUsers, 5000);
    }
    
    // 应用保存的主题
    document.body.classList.add(`theme-${this.currentTheme}`);
  },
  beforeUnmount() {
    // 清除轮询
    clearInterval(this.pollingInterval);
    clearInterval(this.onlinePollingInterval);
  },
  methods: {
    // 设置用户名和头像
    setUsername(userData) {
      this.username = userData.username;
      this.userAvatar = userData.avatar;
      
      // 保存到localStorage
      localStorage.setItem('chat-username', this.username);
      localStorage.setItem('chat-avatar', this.userAvatar);
      
      // 注册用户
      this.registerUser();
      
      // 获取消息和在线用户
      this.fetchMessages();
      this.fetchOnlineUsers();
      
      // 设置轮询
      this.pollingInterval = setInterval(this.fetchMessages, 3000);
      this.onlinePollingInterval = setInterval(this.fetchOnlineUsers, 5000);
    },
    
    // 注册用户
    async registerUser() {
      try {
        await axios.post(`${this.usersApiUrl}/register`, {
          username: this.username,
          avatar: this.userAvatar
        });
        console.log('用户注册成功');
      } catch (error) {
        console.error('用户注册失败:', error);
      }
    },
    
    // 获取消息
    async fetchMessages() {
      try {
        const response = await axios.get(this.apiUrl);
        this.messages = response.data;
        // 滚动到底部
        this.$nextTick(() => {
          if (this.$refs.messageList) {
            this.$refs.messageList.scrollToBottom();
          }
        });
      } catch (error) {
        console.error('获取消息失败:', error);
        // 开发阶段如果API未就绪，使用模拟数据
        if (this.messages.length === 0) {
          this.messages = [
            { 
              id: 1, 
              sender: 'System', 
              content: '欢迎来到聊天室!', 
              timestamp: new Date().toISOString(),
              avatar: '/avatars/default.png'
            }
          ];
        }
      }
    },
    
    // 获取在线用户
    async fetchOnlineUsers() {
      try {
        const response = await axios.get(`${this.usersApiUrl}/online`);
        this.onlineUsers = response.data;
      } catch (error) {
        console.error('获取在线用户失败:', error);
        // 开发阶段如果API未就绪，使用模拟数据
        if (this.onlineUsers.length === 0) {
          this.onlineUsers = [
            { username: this.username, avatar: this.userAvatar }
          ];
        }
      }
    },
    
    // 发送消息
    async sendMessage(content) {
      if (!content.trim()) return;
      
      try {
        const response = await axios.post(this.apiUrl, {
          sender: this.username,
          content: content,
          avatar: this.userAvatar
        });
        
        // 将新消息添加到消息列表
        this.messages.push(response.data);
        
        // 滚动到底部
        this.$nextTick(() => {
          if (this.$refs.messageList) {
            this.$refs.messageList.scrollToBottom();
          }
        });
      } catch (error) {
        console.error('发送消息失败:', error);
        
        // 开发阶段如果API未就绪，使用模拟数据
        const mockMessage = {
          id: Date.now(),
          sender: this.username,
          content: content,
          timestamp: new Date().toISOString(),
          avatar: this.userAvatar
        };
        
        this.messages.push(mockMessage);
        
        // 滚动到底部
        this.$nextTick(() => {
          if (this.$refs.messageList) {
            this.$refs.messageList.scrollToBottom();
          }
        });
      }
    }
  }
}
</script>

<style scoped>
.chat-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--chat-background); /* 使用主题变量 */
  color: var(--text-color); /* 使用主题变量 */
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
}

.chat-interface {
  display: flex;
  flex-direction: column;
  height: 100%;
  backdrop-filter: blur(5px); /* 添加模糊效果 */
}

.chat-header {
  padding: 1rem 1.5rem;
  background-color: var(--primary-color); /* 使用主题变量 */
  color: var(--header-color); /* 使用主题变量 */
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: var(--header-shadow);
  position: relative;
  z-index: 2;
}

.chat-title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  letter-spacing: 0.5px;
}

.user-info-container {
  display: flex;
  align-items: center;
}

.user-info {
  display: flex;
  align-items: center;
  margin-left: 1rem;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 0.5rem 0.75rem;
  border-radius: 2rem;
  backdrop-filter: blur(5px);
}

.user-avatar {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid rgba(255, 255, 255, 0.3);
}

.current-username {
  font-weight: bold;
  margin-left: 0.5rem;
}

.chat-main {
  display: flex;
  flex: 1;
  overflow: hidden;
  position: relative;
}

/* 添加一个覆盖层，用于实现电影质感 */
.chat-container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.2));
  pointer-events: none; /* 确保不会阻止点击事件 */
  z-index: 0;
}

/* 添加电影颗粒效果 */
.chat-container::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url('data:image/png;base64,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');
  opacity: 0.05;
  pointer-events: none;
  z-index: 1;
  mix-blend-mode: overlay;
}

/* 文艺电影主题特定样式 */
:global(.theme-cinematic) .chat-title {
  font-family: 'Playfair Display', serif;
  font-weight: 700;
  letter-spacing: 1px;
}

:global(.theme-cinematic) .chat-header {
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
}

:global(.theme-cinematic) .user-info {
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(138, 113, 88, 0.3);
}

:global(.theme-cinematic) .user-avatar {
  border: 1px solid rgba(138, 113, 88, 0.5);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
}
</style> 