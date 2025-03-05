import { createStore } from 'vuex'
import { userStatusStore } from './userStatus'

export default createStore({
  modules: {
    userStatus: userStatusStore
  }
}) 