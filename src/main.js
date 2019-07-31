import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import iView from 'iview'
import axios from '@/libs/axios'
import mixins from '@/libs/mixins'
import importDirective from '@/directive'
import importComponent from '@/components'
import importFilter from '@/libs/filters'
import '@/assets/icons/iconfont.css'
import 'iview/dist/styles/iview.css'
import './index.less'

Vue.config.productionTip = false

importDirective(Vue)
importComponent(Vue)
importFilter(Vue)

Vue.use(iView)
Vue.mixin(mixins)

Vue.prototype.$http = axios

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
