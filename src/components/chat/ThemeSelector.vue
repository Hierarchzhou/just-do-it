<template>
  <div class="theme-selector">
    <label for="theme-select">主题风格：</label>
    <select 
      id="theme-select" 
      v-model="selectedTheme" 
      @change="changeTheme" 
      class="theme-select"
    >
      <option v-for="theme in themes" :key="theme.id" :value="theme.id">
        {{ theme.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'ThemeSelector',
  data() {
    return {
      selectedTheme: localStorage.getItem('chat-theme') || 'discord', // 从本地存储获取主题，默认为discord主题
      themes: [
        { id: 'discord', name: 'Discord风格' }, // Discord风格主题
        { id: 'dark', name: '暗黑模式' }  // 暗黑模式主题
      ]
    }
  },
  created() {
    // 组件创建时应用保存的主题
    this.applyTheme(this.selectedTheme);
  },
  methods: {
    // 切换主题
    changeTheme() {
      this.applyTheme(this.selectedTheme); // 应用选择的主题
      localStorage.setItem('chat-theme', this.selectedTheme); // 保存主题选择到本地存储
      this.$emit('theme-changed', this.selectedTheme); // 发送主题变更事件到父组件
    },
    
    // 应用主题
    applyTheme(themeId) {
      // 移除所有主题类
      document.body.classList.remove(
        'theme-discord', 
        'theme-dark'
      );
      // 添加选择的主题类
      document.body.classList.add(`theme-${themeId}`);
    }
  }
}
</script>

<style scoped>
.theme-selector {
  display: flex;
  align-items: center;
  margin-left: 1rem;
}

.theme-select {
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  border: 1px solid #ccc;
  background-color: white;
  margin-left: 0.5rem;
  cursor: pointer;
}

/* 在暗黑模式下的样式 */
:global(.theme-dark) .theme-select {
  background-color: #2c2f33;
  color: white;
  border-color: #1e2124;
}
</style> 