import request from '@/utils/request'

// 订单结算确认
// mode: cart
// mode: buyNow
export const checkOrder = (mode, obj) => {
  return request.get('/checkout/order', {
    params: {
      mode,
      delivery: 5,
      couponId: 0,
      isUsePoints: 0,
      ...obj // 将传递过来的参数对象动态展开
    }
  })
}
// 提交订单
export const submitOrder = (mode, obj) => {
  return request.post('/checkout/submit', {
    mode,
    delivery: 10, // 物流方式  配送方式 (10快递配送 20门店自提)
    couponId: 0, // 优惠券 id
    payType: 10, // 余额支付
    isUsePoints: 0, // 是否使用积分
    ...obj
  })
}
