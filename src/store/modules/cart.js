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
    },
    // 小选框
    toggleCheck (state, goodsId) {
      // 让对应id的项 状态取反
      const goods = state.cartList.find(item => item.goods_id === goodsId)
      goods.isChecked = !goods.isChecked
    },
    // 全选框 控制小选
    toggleAllCheck (state, isAllChecked) {
      state.cartList.forEach(item => {
        item.isChecked = isAllChecked
      })
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
  getters: {
    // 所有商品总数
    cartTotal (state) {
      return state.cartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的商品项
    selCartList (state) {
      return state.cartList.filter(item => item.isChecked)
    },
    // 选中的所有商品总数
    selCount (state, getters) {
      return getters.selCartList.reduce((sum, item) => sum + item.goods_num, 0)
    },
    // 选中的总价
    selPrice (state, getters) {
      return getters.selCartList.reduce((sum, item) => {
        return sum + item.goods_num * item.goods.goods_price_min
      }, 0).toFixed(2)
    },

    // 全选中
    isAllChecked (state) {
      return state.cartList.every(item => item.isChecked)
    }
  }
}
