import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: null
  },
  getters: {
    GET_STORAGE(state: any) {
      if (!state.info) {
        state.info = JSON.parse(Vue.ls.get('USER_INFO'))
      }
      return state.info
    }
  },
  mutations: {
    SET_LOGIN(state: any, info: any) {
      const userInfo = JSON.parse(Vue.ls.get('USER_INFO'))

      if (!userInfo) {
        Vue.ls.set('USER_INFO', JSON.stringify(info))
        state.info = info
        return
      }
      state.info = userInfo
    }
  },
  actions: {
  },
  modules: {
  }
})
