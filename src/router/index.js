import Vue from 'vue'
import Router from 'vue-router'
import routes from './routes'
// import iView from 'iview'

Vue.use(Router)
const router = new Router({
    routes,
    // mode: 'history',
    base: process.env.BASE_URL
})

router.beforeEach((to, from, next) => {
    // iView.LoadingBar.start()
    next()
})

router.afterEach(to => {
    // iView.LoadingBar.finish()
})

export default router
