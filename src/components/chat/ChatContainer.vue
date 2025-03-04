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
        <h1 class="chat-title">Discord风格聊天室</h1>
        <div class="user-info">
          当前用户: <span class="current-username">{{ username }}</span>
        </div>
      </header>
      
      <MessageList :messages="messages" />
      
      <MessageInput @send-message="sendMessage" />
    </div>
  </div>
</template>

<script>
import UserNameInput from './UserNameInput.vue';
import MessageList from './MessageList.vue';
import MessageInput from './MessageInput.vue';
import axios from 'axios';

export default {
  name: 'ChatContainer',
  components: {
    UserNameInput,
    MessageList,
    MessageInput
  },
  data() {
    return {
      username: '', // 用户昵称
      messages: [], // 消息列表
      apiUrl: '/api/messages', // API地址
      pollingInterval: null // 用于轮询的计时器
    }
  },
  created() {
    // 检查是否有保存的用户名
    const savedUsername = localStorage.getItem('chat-username');
    if (savedUsername) {
      this.username = savedUsername;
      this.fetchMessages(); // 获取消息
      this.startPolling(); // 开始轮询获取新消息
    }
  },
  beforeUnmount() {
    // 组件销毁前清除轮询
    this.stopPolling();
  },
  methods: {
    // 设置用户名
    setUsername(name) {
      this.username = name;
      localStorage.setItem('chat-username', name); // 保存用户名到本地存储
      
      this.fetchMessages(); // 获取消息
      this.startPolling(); // 开始轮询获取新消息
    },
    
    // 获取消息列表
    async fetchMessages() {
      try {
        const response = await axios.get(this.apiUrl);
        this.messages = response.data;
      } catch (error) {
        console.error('获取消息失败:', error);
        // 开发阶段如果API未就绪，使用模拟数据
        this.messages = [
          { id: 1, user: 'System', content: '欢迎来到聊天室!', timestamp: new Date().toISOString() }
        ];
      }
    },
    
    // 发送消息
    async sendMessage(content) {
      try {
        const newMessage = {
          user: this.username,
          content: content
        };
        
        // 发送消息到API
        const response = await axios.post(this.apiUrl, newMessage);
        
        // 将新消息添加到消息列表
        this.messages.push(response.data);
      } catch (error) {
        console.error('发送消息失败:', error);
        
        // 开发阶段如果API未就绪，模拟消息发送
        const mockMessage = {
          id: this.messages.length + 1,
          user: this.username,
          content: content,
          timestamp: new Date().toISOString()
        };
        this.messages.push(mockMessage);
      }
    },
    
    // 开始轮询获取新消息
    startPolling() {
      this.pollingInterval = setInterval(() => {
        this.fetchMessages();
      }, 3000); // 每3秒轮询一次
    },
    
    // 停止轮询
    stopPolling() {
      if (this.pollingInterval) {
        clearInterval(this.pollingInterval);
        this.pollingInterval = null;
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
}

.chat-interface {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.chat-header {
  padding: 1rem;
  background-color: #5865F2; /* Discord品牌色 */
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.chat-title {
  margin: 0;
  font-size: 1.25rem;
}

.user-info {
  font-size: 0.875rem;
}

.current-username {
  font-weight: bold;
}
</style> 