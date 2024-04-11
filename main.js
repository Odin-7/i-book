import Vue from 'vue'
import App from './App'
import uView from '@/uni_modules/uview-ui'

Vue.use(uView)
uni.$u.config.unit = 'rpx'

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()


