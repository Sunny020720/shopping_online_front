import request from '@/utils/request'

// 添加商品到购物车
export const addCart = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/add', {
    goodsId, // =>商品id iphone8
    goodsSkuId, // =>商品规格id 红色的iphone8
    goodsNum
  })
}

// 获取购物车商品列表
export const getCartList = () => {
  return request.get('/cart/list')
}

// 更新购物车商品数量
export const changeCount = (goodsId, goodsNum, goodsSkuId) => {
  return request.post('/cart/update', {
    goodsSkuId,
    goodsNum,
    goodsId
  })
}
