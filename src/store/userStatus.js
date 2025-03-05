// 用户状态管理
export const userStatusStore = {
  namespaced: true,  // 启用命名空间
  
  state: {
    status: 'online',  // 默认在线状态
  },
  
  mutations: {
    // 更新用户状态
    UPDATE_STATUS(state, newStatus) {
      state.status = newStatus;
    },
  },
  
  actions: {
    // 设置用户状态
    setStatus({ commit }, status) {
      commit('UPDATE_STATUS', status);
    },
  },
  
  getters: {
    // 获取当前状态
    currentStatus: state => state.status,
  }
}; 