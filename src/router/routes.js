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
                path: '/auth/user',
                name: 'auth_user',
                component: () => import('@/views/auth/user/list.vue')
            },
            {
                path: '/auth/user/add',
                name: 'auth_user_add',
                meta: {
                    title: '用户新增',
                    active: 'auth_user'
                    // notCache: true
                },
                component: () => import('@/views/auth/user/add.vue')
            },
            {
                path: '/auth/user/edit',
                name: 'auth_user_edit',
                meta: {
                    title: '用户编辑',
                    active: 'auth_user'
                    // notCache: true
                },
                component: () => import('@/views/auth/user/edit.vue')
            },
            {
                path: '/auth/role',
                name: 'auth_role',
                component: () => import('@/views/auth/role.vue'),
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
    }
]
