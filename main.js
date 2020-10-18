import Vue from 'vue'
import App from './App'

import cuCustom from './colorui/components/cu-custom.vue'
import Request from './pocky-request/index.js'
Vue.component('cu-custom',cuCustom)

Vue.config.productionTip = false
Vue.prototype.axios = Request();
App.mpType = 'app'

Vue.prototype.checkLogin = function(){
	const token = uni.getStorageSync('tokenlo')
	if(token === ''){ // 本地没有token表示未登录
		console.log('未登录返回到登录页')
		uni.reLaunch({url:'/pages/index/index'})
		return false
	}
}

const app = new Vue({
    ...App
})
app.$mount()
