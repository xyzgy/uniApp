import Vue from 'vue'
import App from './App'
import xyzNavBar from './components/xyz-navbar.vue'
import xyzModal from './components/xyz-modal.vue'

Vue.component('xyzNavBar',xyzNavBar)
Vue.component('xyzModal',xyzModal)
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
