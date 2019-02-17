setTimeout(
    () => {
        next(null, {
            code: '0000',
            data: {
                menuList: [
                    { id: 1, parentId: 0, name: '首页', icon: 'ios-home', url: 'home' },
                    { id: 2, parentId: 0, name: '系统管理', icon: 'md-settings', url: 'system' },
                    { id: 21, parentId: 2, name: '权限管理', icon: 'ios-people', url: 'system_auth' },
                    { id: 211, parentId: 21, name: '用户管理', icon: 'ios-person', url: 'system_auth_user' },
                    { id: 212, parentId: 21, name: '角色管理', icon: 'md-person', url: 'system_auth_role' },
                    { id: 3, parentId: 0, name: '常用组件', icon: 'ios-cog', url: 'demo' },
                    { id: 31, parentId: 3, name: '输入框', icon: 'md-create', url: 'demo_input' },
                    { id: 32, parentId: 3, name: '自定义组件', icon: 'ios-flower', url: 'demo_component' },
                    { id: 33, parentId: 3, name: '自定义过滤器', icon: 'ios-color-filter', url: 'demo_filters' },
                    { id: 34, parentId: 3, name: '自定义指令', icon: 'ios-color-filter', url: 'demo_directives' },
                ],
                buttonList: []
            }
        })
    }, 0)
