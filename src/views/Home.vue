<template>
    <div class="markdown-body home">
        <README />
        <!-- <Start /><br>
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
        <img @click="showImagePreview('https://cn.vuejs.org/images/logo.png')" src="https://cn.vuejs.org/images/logo.png" style="width:200px" />
        <video @click="showVideoPreview(mp4)" :src="mp4" style="width:400px;"></video>
        <img alt="Vue logo" src="../assets/logo.png">
        <div>
            <Button @click="updatePwd1">修改密码vue</Button>
            <Button @click="updatePwd2">修改密码js</Button>
            <Button @click="load">异步资源下载</Button>
            <Button><router-link to="/system/auth/user?aa=1">user</router-link></Button>
        </div> -->
        <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import showUpdatePwd1 from '_c/extend/update-pwd'
import showUpdatePwd2 from '_c/extend/update-pwd/bak'
import showScreenPreview from '_c/extend/screen-preview'
import mp4 from '@/assets/test.mp4'
import Start from '_c/start.vue'
import README from '../../README.md'
import 'github-markdown-css'

export default {
    name: 'home',
    components: {
        HelloWorld,
        Start,
        README
    },
    data () {
        return {
            mp4
        }
    },
    created () {
        // showScreenPreview({
        //     type: 'video',
        //     src: 'src'
        // })
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
        showImagePreview (src) {
            showScreenPreview({
                type: 'image',
                src
            })
        },
        showVideoPreview (src) {
            showScreenPreview({
                type: 'video',
                src
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

<style lang="less" scoped>
.home {
    padding: 0 18px;
}
</style>
