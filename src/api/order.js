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
      isUsePoint: 0,
      ...obj // 将传递过来的参数对象动态展开
    }
  })
}
