<template>
  <div class="message-list">
    <div v-if="messages.length === 0" class="no-messages">
      暂无消息，开始聊天吧！
    </div>
    <div v-else>
      <div v-for="message in messages" :key="message.id" class="message-item">
        <div class="message-header">
          <span class="user-name">{{ message.user }}</span>
          <span class="timestamp">{{ formatTime(message.timestamp) }}</span>
        </div>
        <div class="message-content">
          {{ message.content }}
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
    }
  },
  methods: {
    // 格式化时间戳为友好的时间格式
    formatTime(timestamp) {
      const date = new Date(timestamp);
      return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
    }
  }
}
</script>

<style scoped>
.message-list {
  padding: 1rem;
  height: 70vh; /* 设置固定高度 */
  overflow-y: auto; /* 允许垂直滚动 */
  display: flex;
  flex-direction: column;
}

.no-messages {
  text-align: center;
  color: #666;
  margin-top: 2rem;
}

.message-item {
  margin-bottom: 1rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: #f0f0f0;
}

.message-header {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.25rem;
}

.user-name {
  font-weight: bold;
  color: #5865F2; /* Discord品牌色 */
}

.timestamp {
  font-size: 0.8rem;
  color: #999;
}

.message-content {
  word-break: break-word;
}
</style> 