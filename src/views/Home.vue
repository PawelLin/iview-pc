<template>
    <div class="home text-center">
        <img alt="Vue logo" src="../assets/logo.png">
        <div>
            <Button @click="updatePwd">修改密码</Button>
            <Button @click="load">异步资源下载</Button>
            <Button><router-link to="/system/auth/user?aa=1">user</router-link></Button>
        </div>
        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import showUpdatePwd from '_c/main/update-pwd'

export default {
    name: 'home',
    components: {
        HelloWorld
    },
    created () {
        let ss = '(([1-9]?\\d|1\\d{2})|2[0-4]\\d|25[0-5])'
        let aa = `^(${ss}\\.){3}${ss}(\\/${ss})?$`
        // console.log(new RegExp(aa).test('192.168.1.255/1123/123'))
    },
    methods: {
        load () {
            let newWindow = window.open('/loading')
            this.$http.post('/test', {}).then(res => {
                setTimeout(() => {
                    newWindow.location.replace('http://www.baidu.com')
                }, 2000)
            }).catch(() => {
                newWindow.close()
            })
        },
        updatePwd () {
            showUpdatePwd().then(() => {
                this.$Message.success('修改密码成功')
            })
        }
    }
}
</script>
