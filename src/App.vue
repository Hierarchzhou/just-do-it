<template>
  <div id="app">
    <ChatContainer />
  </div>
</template>

<script>
import ChatContainer from './components/chat/ChatContainer.vue'

export default {
  name: 'App',
  components: {
    ChatContainer
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
</style>
