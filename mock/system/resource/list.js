setTimeout(
    () => {
        next(null, {
            code: '0000',
            data: {
                menuList: [
                    // { id: 1, parentId: 0, title: '首页', icon: 'ios-home', name: 'home' },
                    { id: 9992, parentId: 0, title: '权限管理', icon: 'ios-people', name: 'auth' },
                    { id: 99921, parentId: 9992, title: '用户管理', icon: 'ios-person', name: 'auth_user' },
                    { id: 99922, parentId: 9992, title: '角色管理', icon: 'md-person', name: 'auth_role' },
                    { id: 9993, parentId: 0, title: '开发通用', icon: 'ios-construct', name: 'demo' },
                    { id: 99931, parentId: 9993, title: '输入框', icon: 'md-create', name: 'demo_input' },
                    { id: 99932, parentId: 9993, title: '两种TAG', icon: 'ios-pricetags', name: 'demo_tags' },
                    { id: 99933, parentId: 9993, title: '自定义组件', icon: 'ios-flower', name: 'demo_component' },
                    { id: 99934, parentId: 9993, title: '自定义过滤器', icon: 'ios-color-filter', name: 'demo_filters' },
                    { id: 99935, parentId: 9993, title: '自定义指令', icon: 'ios-key', name: 'demo_directives' },
                    { id: 99936, parentId: 9993, title: '自定义公共样式', icon: 'logo-css3', name: 'demo_css' },
                    { id: 99937, parentId: 9993, title: '自定义工具方法', icon: 'ios-hammer', name: 'demo_tools' },
                    { id: 99938, parentId: 9993, title: '自定义公共请求', icon: 'md-repeat', name: 'demo_service' },
                    { id: 99939, parentId: 9993, title: '各种表格', icon: 'ios-grid-outline', name: 'demo_table' },
                    { id: 9994, parentId: 0, title: '迭代日志', icon: 'ios-bookmark-outline', name: 'demo_logs' },
                ],
                buttonList: ['example_tag', 'user_add']
            }
        })
    }, 0)
