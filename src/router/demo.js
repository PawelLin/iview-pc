
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
    }
]
