<template>
  <div class="online-users-sidebar">
    <!-- 频道头部 -->
    <div class="sidebar-header">
      <h3 class="sidebar-title">在线用户 ({{ onlineUsers.length }})</h3>
    </div>
    
    <!-- 用户列表 -->
    <div class="users-list">
      <!-- 当前用户 -->
      <div class="user-item current-user" v-if="currentUsername">
        <div class="user-avatar-container">
          <img 
            :src="getCurrentUserAvatar()" 
            alt="当前用户头像" 
            class="user-avatar"
          />
          <div class="user-status online"></div>
        </div>
        <div class="user-info">
          <div class="user-name">{{ currentUsername }} <span class="user-tag">(我)</span></div>
          <div class="user-status-text">在线</div>
        </div>
      </div>
      
      <!-- 分隔线 -->
      <div class="sidebar-divider"></div>
      
      <!-- 其他在线用户 -->
      <div 
        v-for="user in otherUsers" 
        :key="user.username"
        class="user-item"
      >
        <div class="user-avatar-container">
          <img 
            :src="user.avatar || '/avatars/default.png'" 
            alt="用户头像" 
            class="user-avatar"
          />
          <div class="user-status online"></div>
        </div>
        <div class="user-info">
          <div class="user-name">{{ user.username }}</div>
          <div class="user-status-text">在线</div>
        </div>
      </div>
      
      <!-- 无用户时的提示 -->
      <div v-if="otherUsers.length === 0 && !currentUsername" class="no-users">
        暂无其他用户在线
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OnlineUsersSidebar',
  props: {
    // 在线用户列表
    onlineUsers: {
      type: Array,
      default: () => []
    },
    // 当前用户名
    currentUsername: {
      type: String,
      default: ''
    }
  },
  computed: {
    // 除了当前用户之外的其他用户
    otherUsers() {
      return this.onlineUsers.filter(user => user.username !== this.currentUsername);
    }
  },
  methods: {
    // 获取当前用户的头像
    getCurrentUserAvatar() {
      const currentUser = this.onlineUsers.find(user => user.username === this.currentUsername);
      return currentUser ? currentUser.avatar : '/avatars/default.png';
    }
  }
}
</script>

<style scoped>
.online-users-sidebar {
  width: 240px; /* Discord频道列表宽度 */
  height: 100vh;
  background-color: #2f3136; /* Discord频道列表背景色 */
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  border-right: 1px solid #202225;
}

.sidebar-header {
  padding: 16px;
  border-bottom: 1px solid rgba(79, 84, 92, 0.48);
  box-shadow: 0 1px 0 rgba(4, 4, 5, 0.2);
}

.sidebar-title {
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.users-list {
  flex: 1;
  overflow-y: auto;
  padding: 8px 0;
}

.user-item {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 4px;
  margin: 0 8px;
  transition: background-color 0.2s ease;
}

.user-item:hover {
  background-color: rgba(79, 84, 92, 0.16);
}

.user-item.current-user {
  background-color: rgba(79, 84, 92, 0.32);
}

.user-avatar-container {
  position: relative;
  margin-right: 12px;
}

.user-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  object-fit: cover;
}

.user-status {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  bottom: 0;
  left: 0;
  border: 2px solid #2f3136;
}

.user-status.online {
  background-color: #43b581; /* Discord在线状态颜色 */
}

.user-info {
  flex: 1;
  overflow: hidden;
}

.user-name {
  color: #ffffff;
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.user-tag {
  color: #b9bbbe;
  font-size: 12px;
  font-weight: normal;
}

.user-status-text {
  color: #b9bbbe;
  font-size: 12px;
  margin-top: 2px;
}

.sidebar-divider {
  height: 1px;
  background-color: rgba(79, 84, 92, 0.48);
  margin: 8px 10px;
}

.no-users {
  padding: 16px;
  color: #b9bbbe;
  font-style: italic;
  text-align: center;
}

/* 滚动条样式 */
.users-list::-webkit-scrollbar {
  width: 4px;
}

.users-list::-webkit-scrollbar-thumb {
  background-color: #202225;
  border-radius: 2px;
}

.users-list::-webkit-scrollbar-track {
  background-color: transparent;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .online-users-sidebar {
    width: 100%;
    height: auto;
    max-height: 200px;
    border-right: none;
    border-bottom: 1px solid #202225;
  }
  
  .users-list {
    display: flex;
    flex-wrap: wrap;
    padding: 8px;
  }
  
  .user-item {
    width: auto;
    margin: 4px;
  }
}
</style> 