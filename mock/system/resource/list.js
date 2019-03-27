setTimeout(
    () => {
        next(null, {
            code: '0000',
            data: {
                menuList: [
                    // { id: 1, parentId: 0, title: '首页', icon: 'ios-home', name: 'home' },
                    { id: 2, parentId: 0, title: '权限管理', icon: 'ios-people', name: 'auth' },
                    { id: 21, parentId: 2, title: '用户管理', icon: 'ios-person', name: 'auth_user' },
                    { id: 22, parentId: 2, title: '角色管理', icon: 'md-person', name: 'auth_role' },
                    { id: 3, parentId: 0, title: '常用组件', icon: 'ios-cog', name: 'demo' },
                    { id: 31, parentId: 3, title: '输入框', icon: 'md-create', name: 'demo_input' },
                    { id: 32, parentId: 3, title: '自定义组件', icon: 'ios-flower', name: 'demo_component' },
                    { id: 33, parentId: 3, title: '自定义过滤器', icon: 'ios-color-filter', name: 'demo_filters' },
                    { id: 34, parentId: 3, title: '自定义指令', icon: 'ios-color-filter', name: 'demo_directives' },
                    { id: 35, parentId: 3, title: '两种TAG', icon: 'ios-color-filter', name: 'demo_tags' },
                    { id: 36, parentId: 3, title: '自定义公共样式', icon: 'ios-color-filter', name: 'demo_css' },
                ],
                buttonList: ['user_add']
            }
        })
    }, 0)
