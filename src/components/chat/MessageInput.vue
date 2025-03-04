<template>
  <div class="message-input-container">
    <textarea
      v-model="message"
      @keydown.enter.prevent="sendMessage"
      placeholder="输入消息..."
      class="message-input"
      ref="messageInput"
    ></textarea>
    <button @click="sendMessage" class="send-button">
      发送
    </button>
  </div>
</template>

<script>
export default {
  name: 'MessageInput',
  data() {
    return {
      message: '' // 存储用户输入的消息
    }
  },
  methods: {
    // 发送消息
    sendMessage() {
      if (this.message.trim()) {
        this.$emit('send-message', this.message); // 触发事件，将消息传递给父组件
        this.message = ''; // 清空输入框
        this.$nextTick(() => {
          this.$refs.messageInput.focus(); // 重新聚焦输入框
        });
      }
    }
  },
  mounted() {
    // 组件挂载后自动聚焦输入框
    this.$refs.messageInput.focus();
  }
}
</script>

<style scoped>
.message-input-container {
  display: flex;
  padding: 1rem;
  background-color: var(--input-background); /* 使用主题变量 */
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  position: relative;
  z-index: 2;
}

.message-input {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
  background-color: rgba(0, 0, 0, 0.2);
  color: var(--input-color); /* 使用主题变量 */
  font-size: 0.95rem;
  resize: none;
  height: 20px;
  line-height: 20px;
  transition: all 0.2s ease;
}

.message-input:focus {
  outline: none;
  border-color: var(--primary-color);
  box-shadow: 0 0 0 2px rgba(var(--primary-color-rgb, 138, 113, 88), 0.2);
}

.message-input::placeholder {
  color: var(--input-placeholder); /* 使用主题变量 */
  opacity: 0.7;
}

.send-button {
  margin-left: 0.75rem;
  padding: 0.5rem 1.25rem;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 1.5rem;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s ease;
}

.send-button:hover {
  background-color: var(--secondary-color);
  transform: translateY(-2px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.send-button:active {
  transform: translateY(0);
}

/* 文艺电影主题特定样式 */
:global(.theme-cinematic) .message-input-container {
  background-color: rgba(26, 26, 26, 0.7);
  border-top: 1px solid rgba(138, 113, 88, 0.2);
}

:global(.theme-cinematic) .message-input {
  background-color: rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(138, 113, 88, 0.3);
  font-family: 'Playfair Display', serif;
  letter-spacing: 0.5px;
}

:global(.theme-cinematic) .send-button {
  background: linear-gradient(to right, var(--primary-color), var(--secondary-color));
  border: 1px solid rgba(138, 113, 88, 0.3);
  font-family: 'Playfair Display', serif;
  letter-spacing: 1px;
  font-size: 0.9rem;
}
</style> 