<template>
  <div class="message-input-container">
    <input 
      v-model="message" 
      @keyup.enter="sendMessage"
      type="text" 
      placeholder="输入消息..." 
      class="message-input"
    />
    <button @click="sendMessage" class="send-button">发送</button>
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
    sendMessage() {
      // 检查消息是否为空
      if (!this.message.trim()) {
        return;
      }
      
      // 发送消息到父组件
      this.$emit('send-message', this.message);
      
      // 清空输入框
      this.message = '';
    }
  }
}
</script>

<style scoped>
.message-input-container {
  display: flex;
  padding: 1rem;
  background-color: #f5f5f5;
  border-top: 1px solid #ddd;
}

.message-input {
  flex: 1;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 0.25rem;
  margin-right: 0.5rem;
  font-size: 1rem;
  outline: none;
}

.message-input:focus {
  border-color: #5865F2; /* Discord品牌色 */
  box-shadow: 0 0 0 2px rgba(88, 101, 242, 0.2);
}

.send-button {
  padding: 0.5rem 1rem;
  background-color: #5865F2; /* Discord品牌色 */
  color: white;
  border: none;
  border-radius: 0.25rem;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.2s;
}

.send-button:hover {
  background-color: #4752c4;
}

.send-button:active {
  background-color: #3c45a5;
}
</style> 