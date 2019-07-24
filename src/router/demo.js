
export default [
    {
        path: '/demo/input',
        name: 'demo_input',
        component: () => import('_c/demo/input.vue')
    },
    {
        path: '/demo/component',
        name: 'demo_component',
        component: () => import('_c/demo/component.vue')
    },
    {
        path: '/demo/filters',
        name: 'demo_filters',
        component: () => import('_c/demo/filters.vue')
    },
    {
        path: '/demo/directives',
        name: 'demo_directives',
        component: () => import('_c/demo/directives.vue')
    },
    {
        path: '/demo/tags',
        name: 'demo_tags',
        component: () => import('_c/demo/tags/list.vue')
    },
    {
        path: '/demo/tags/detail',
        name: 'demo_tags_detail',
        meta: {
            active: 'demo_tags'
        },
        component: () => import('_c/demo/tags/tags.vue')
    },
    {
        path: '/demo/css',
        name: 'demo_css',
        component: () => import('_c/demo/css.vue')
    },
    {
        path: '/demo/tools',
        name: 'demo_tools',
        component: () => import('_c/demo/tools.vue')
    },
    {
        path: '/demo/logs',
        name: 'demo_logs',
        component: () => import('_c/demo/logs.vue')
    }
]
