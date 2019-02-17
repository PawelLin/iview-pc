<template>
    <Header class="header">
        <h2>IVIEW业务管理系统</h2>
        <Dropdown @on-click="handleClick">
            <a href="javascript:;" style="color: #515a6e;">
                <Icon style="margin-top:-2px;" type="ios-contact" size="22"/>
                <span class="text">{{userName}}</span>
                <Icon type="md-arrow-dropdown" size="14"/>
            </a>
            <DropdownMenu slot="list">
                <DropdownItem name="updatePwd">
                    <Icon type="md-create" size="12"/>
                    <span class="text">修改密码</span>
                </DropdownItem>
                <DropdownItem name="logout">
                    <Icon type="ios-log-out" size="12"/>
                    <span class="text">退出登录</span>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </Header>
</template>

<script>
import showUpdatePwd from '_c/main/update-pwd'
export default {
    name: 'HeaderBar',
    data () {
        return {
            userName: ''
        }
    },
    created () {
        this.userName = localStorage.getItem('userName')
    },
    methods: {
        updatePwd () {
            showUpdatePwd(true).then(() => {
                this.$Message.success('修改密码成功')
            })
        },
        logout () {
            this.$http.post('/system/logout', {}).then(res => {
                this.clearCache()
                this.$Message.success('退出登录成功')
                this.$router.push({ name: 'login' })
            }).catch(() => {})
        },
        clearCache () {
            localStorage.removeItem('userName')
        },
        handleClick (name) {
            this[name]()
        }
    }
}
</script>

<style lang="less" scoped>
.header {
    padding-left: 28px;
    padding-right: 28px;
    display: flex;
    background-color: #ffffff;
    justify-content: space-between;
    .text {
        margin-left: 5px;
        vertical-align: middle;
    }
}
</style>
