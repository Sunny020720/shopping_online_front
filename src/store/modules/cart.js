// 购物车列表数据
import { getCartList } from '@/api/cart'

export default {
  namespaced: true,
  state () {
    return {
      cartList: []
    }
  },
  mutations: {
    // 设置cartList
    setCartList (state, newList) {
      state.cartList = newList
    }
  },
  actions: {
    async getCartAction (context) {
      const { data } = await getCartList()
      // 后台返回数据不包括复选框的选中状态
      // 手动维护数据，给每一项添加一个isChecked状态
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    }
  },
  getters: {}
}
