<template>
    <div class="home text-center">
        <Start /><br>
        <Start :nums="0.5" /><br>
        <Start :nums="1" /><br>
        <Start :nums="1.5" /><br>
        <Start :nums="2" /><br>
        <Start :nums="2.5" /><br>
        <Start :nums="3" /><br>
        <Start :nums="3.5" /><br>
        <Start :nums="4" /><br>
        <Start :nums="4.5" /><br>
        <Start :nums="5" /><br>
        <img @click="showScreenPreview" src="https://git.f-road.com.cn/uploads/-/system/user/avatar/36/avatar.png?width=400" />
        <img alt="Vue logo" src="../assets/logo.png">
        <div>
            <Button @click="updatePwd1">修改密码vue</Button>
            <Button @click="updatePwd2">修改密码js</Button>
            <Button @click="load">异步资源下载</Button>
            <Button><router-link to="/system/auth/user?aa=1">user</router-link></Button>
        </div>
        <HelloWorld msg="Welcome to Your Vue.js App"/>
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import showUpdatePwd1 from '_c/extend/update-pwd'
import showUpdatePwd2 from '_c/extend/update-pwd/bak'
import showScreenPreview from '_c/extend/screen-preview'
import Start from '_c/start.vue'

export default {
    name: 'home',
    components: {
        HelloWorld,
        Start
    },
    created () {
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
        showScreenPreview () {
            showScreenPreview({
                src: 'https://git.f-road.com.cn/uploads/-/system/user/avatar/36/avatar.png'
            })
        },
        updatePwd1 () {
            showUpdatePwd1({
                closable: true,
                callback (result) {
                    console.log(result)
                }
            })
        },
        updatePwd2 () {
            showUpdatePwd2(true)
        }
    }
}
</script>
