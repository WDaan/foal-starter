import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import Toast from 'vue-toastification'
import 'vue-toastification/dist/index.css'
Vue.use(Toast, {
    maxToasts: 5,
    timeout: 2000
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
