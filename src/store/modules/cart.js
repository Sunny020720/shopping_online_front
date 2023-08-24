// 购物车列表数据
import { changeCount, deleteSelect, getCartList } from '@/api/cart'
import { Toast } from 'vant'

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
    },
    // 修改购物车数量
    changeCount (state, { goodsId, goodsNum }) {
      const obj = state.cartList.find(
        item => item.goods_id === goodsId)
      obj.goods_num = goodsNum
    }
  },
  actions: {
    // 获得购物车列表数据
    async getCartAction (context) {
      const { data } = await getCartList()
      // 后台返回数据不包括复选框的选中状态
      // 手动维护数据，给每一项添加一个isChecked状态
      data.list.forEach(item => {
        item.isChecked = true
      })
      context.commit('setCartList', data.list)
    },
    // 修改购物车商品数量
    async changeCountAction (context, obj) {
      const { goodsId, goodsNum, goodsSkuId } = obj
      // 同步后台
      await changeCount(goodsId, goodsNum, goodsSkuId)
      // 本地修改
      context.commit('changeCount', {
        goodsId,
        goodsNum
      })
    },
    // 删除购物车商品
    async delAction (context) {
      const selCartList = context.getters.selCartList
      const cartIds = selCartList.map(item => item.id)
      // 后台修改
      await deleteSelect(cartIds)
      Toast('删除成功')
      // 本地修改(重新渲染)
      context.dispatch('getCartAction')
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
