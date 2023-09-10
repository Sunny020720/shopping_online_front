export default {
  methods: {
    loginConfrim () {
      // 判断用户是否登录（token
      // 1.没有登录
      if (!this.$store.getters.token) {
        this.$dialog.confirm({
          title: '温馨提示',
          message: '需要登陆',
          confirmButtonText: '去登陆',
          cancelButtonText: '取消'
        })
          .then(() => { // confirm
            // 希望跳转到登录后能跳回来，需要在跳转去携带参数（当前的路径地址）
            this.$router.replace({
              path: '/login',
              query: {
                backUrl: this.$route.fullPath
              }
            })
          })
          .catch(() => {}) // cancel
        return true
      }
      return false
    }
  }
}
