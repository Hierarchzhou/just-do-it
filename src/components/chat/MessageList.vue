<template>
  <div class="message-list" ref="messageContainer">
    <div v-if="messages.length === 0" class="no-messages">
      暂无消息，开始聊天吧！
    </div>
    <div v-else>
      <div 
        v-for="message in messages" 
        :key="message.id || message.timestamp" 
        class="message-item"
      >
        <div class="message-avatar">
          <img :src="message.avatar || '/avatars/default.png'" alt="头像" class="avatar-img" />
        </div>
        <div 
          class="message"
          :class="{ 'self': message.sender === currentUsername, 'other': message.sender !== currentUsername }"
        >
          <div class="message-header">
            <span class="message-sender">{{ message.sender }}</span>
            <span class="message-time">{{ formatTime(message.timestamp) }}</span>
          </div>
          <div class="message-content">{{ message.content }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MessageList',
  props: {
    messages: {
      type: Array,
      default: () => []
    },
    currentUsername: {
      type: String,
      default: ''
    }
  },
  methods: {
    formatTime(timestamp) {
      if (!timestamp) return '';
      
      const date = new Date(timestamp);
      const now = new Date();
      const diffMs = now - date;
      const diffMins = Math.floor(diffMs / 60000);
      const diffHours = Math.floor(diffMins / 60);
      const diffDays = Math.floor(diffHours / 24);
      
      // 今天的消息显示时间
      if (diffDays < 1) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      
      // 昨天的消息
      if (diffDays === 1) {
        return '昨天 ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }
      
      // 更早的消息显示完整日期
      return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    },
    
    scrollToBottom() {
      if (this.$refs.messageContainer) {
        this.$refs.messageContainer.scrollTop = this.$refs.messageContainer.scrollHeight;
      }
    }
  },
  updated() {
    this.scrollToBottom();
  }
}
</script>

<style scoped>
.message-list {
  flex: 1;
  overflow-y: auto;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  background-color: var(--chat-background); /* 使用主题变量 */
  position: relative;
}

.message-item {
  display: flex;
  margin-bottom: 1.5rem;
  align-items: flex-start;
}

.message-avatar {
  margin-right: 0.75rem;
  flex-shrink: 0;
}

.avatar-img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
  border: 2px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

.message {
  max-width: 80%;
  padding: 0.75rem 1rem;
  border-radius: 0.5rem;
  position: relative;
  animation: fadeIn 0.3s ease-out;
  box-shadow: var(--message-shadow);
  transition: transform 0.2s ease;
  background-color: var(--other-message-bg); /* 使用主题变量 */
  color: var(--other-message-color); /* 使用主题变量 */
}

.message:hover {
  transform: translateY(-2px);
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.message.self {
  background-color: var(--self-message-bg); /* 使用主题变量 */
  color: var(--self-message-color); /* 使用主题变量 */
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.5rem;
  font-size: 0.85rem;
  opacity: 0.8;
}

.message-sender {
  font-weight: bold;
}

.message-time {
  font-size: 0.75rem;
  opacity: 0.7;
  margin-left: 0.75rem;
}

.message-content {
  word-break: break-word;
  line-height: 1.4;
}

/* 文艺电影主题特定样式 */
:global(.theme-cinematic) .message {
  backdrop-filter: blur(5px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(40, 40, 40, 0.5); /* 半透明的深色 */
}

:global(.theme-cinematic) .message.self {
  background-color: rgba(166, 124, 82, 0.2); /* 半透明的金棕色 */
  border-color: rgba(166, 124, 82, 0.3);
}

:global(.theme-cinematic) .avatar-img {
  border: 2px solid rgba(166, 124, 82, 0.3);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
}

:global(.theme-cinematic) .message-sender {
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.5px;
}

:global(.theme-cinematic) .message-time {
  font-style: italic;
}

.no-messages {
  text-align: center;
  color: var(--timestamp-color); /* 使用主题变量 */
  margin-top: 2rem;
  font-style: italic;
  opacity: 0.7;
}
</style> 