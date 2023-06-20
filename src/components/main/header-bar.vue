<template>
    <Header class="header">
        <h2>IVIEW业务管理系统</h2>
        <Dropdown @on-click="handleClick" class="dropdown">
            <a href="javascript:;" style="color: #515a6e;">
                <Icon style="vertical-align: middle;" type="ios-contact" size="22"/>
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
        <Poptip
            confirm
            title="切换标签模式将清空当前标签列表，确认切换吗？"
            width="400"
            placement="bottom-end"
            @on-ok="handleTagChange">
            <i-switch :value="tagStatus" :before-change="tagStatusBeforeChange" @on-change="tagStatusChange" class="tag-switch" size="large" false-color="#2db7f5">
                <span slot="open">多标签</span>
                <span slot="close">单标签</span>
            </i-switch>
        </Poptip>
    </Header>
</template>

<script>
import { mapMutations } from 'vuex'
import showUpdatePwd from '_c/extend/update-pwd'
export default {
    name: 'HeaderBar',
    data () {
        return {
            userName: ''
        }
    },
    computed: {
        tagStatus () {
            return this.$store.state.status.tagStatus === '1'
        }
    },
    created () {
        this.userName = localStorage.getItem('userName')
    },
    methods: {
        ...mapMutations([
            'openMoreTag',
            'closeMoreTag'
        ]),
        handleTagChange () {
            this.tagResolve()
        },
        tagStatusBeforeChange () {
            return new Promise(resolve => {
                this.tagResolve = resolve
            })
        },
        tagStatusChange (status) {
            if (status) {
                this.openMoreTag()
            } else {
                this.closeMoreTag()
            }
        },
        updatePwd () {
            showUpdatePwd({
                callback (reslut) {
                    this.$Message.success('修改密码成功')
                }
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
    align-items: center;
    .text {
        margin-left: 5px;
        vertical-align: middle;
    }
}
.dropdown {
    margin-left: auto;
}
.tag-switch {
    width: 65px;
    &.ivu-switch-checked::after {
        margin-left: 9px;
    }
}
</style>
