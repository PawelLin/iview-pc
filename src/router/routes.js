/**
 * meta: {
 *  title: { String } 标签栏的默认文字，可在路由跳转时设置params: { rename: '标签名称' }
 *  active: { String } 不在左侧菜单的菜单，需设置左侧菜单高亮其上级菜单
 *  notCache: (false) 设为true后页面在切换标签后不会缓存，如果需要缓存，无需设置这个字段，而且需要设置页面组件name属性和路由配置的name一致
 *  beforeCloseName: (-) 设置该字段，则在关闭当前tab页时会去'@/router/before-close.js'里寻找该字段名对应的方法，作为关闭前的钩子函数
 * }
 */
import demoRoutes from './demo'
export default [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/login.vue')
    },
    {
        path: '/',
        redirect: '/home',
        component: () => import('_c/main/main.vue'),
        children: [
            {
                path: '/home',
                name: 'home',
                component: () => import('@/views/Home.vue')
            },
            {
                path: '/system/auth/user',
                name: 'system_auth_user',
                component: () => import('@/views/system/auth/user/list.vue')
            },
            {
                path: '/system/auth/user/detail',
                name: 'system_auth_user_detail',
                meta: {
                    title: '用户详情',
                    active: 'system_auth_user',
                    notCache: true
                },
                component: () => import('@/views/system/auth/user/detail.vue')
            },
            {
                path: '/system/auth/role',
                name: 'system_auth_role',
                component: () => import('@/views/system/auth/role.vue'),
                meta: {
                    beforeCloseName: 'before_close_normal'
                }
            },
            ...demoRoutes
        ]
    },
    {
        path: '/loading',
        name: 'loading',
        component: () => import('_c/error/loading.vue')
    },
    {
        path: '/401',
        name: 'error_401',
        component: () => import('_c/error/401.vue')
    },
    {
        path: '/500',
        name: 'error_500',
        component: () => import('_c/error/500.vue')
    },
    {
        path: '*',
        name: 'error_404',
        component: () => import('_c/error/404.vue')
    },
]
