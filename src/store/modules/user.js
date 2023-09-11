// 用户信息
import { getInfo, setInfo } from '@/utils/storege'

export default {
  namespaced: true,
  state () {
    return { // 个人登录权证
      userInfo: getInfo()
    }
  },
  mutations: {
    setUserInfo (state, obj) {
      state.userInfo = obj
      setInfo(obj)
    }
  },
  actions: {
    logout (context) {
      context.commit('setUserInfo', {})
      context.commit('cart/setCartList', [], { root: true })
    }
  }
}
