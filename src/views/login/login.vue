<template>
    <section class="login">
        <Card title="欢迎登录" class="form" shadow>
            <Form ref="form" :model="form" :rules="rules" @keydown.enter.native="submit">
                <FormItem prop="loginName" :style="{ marginTop: '8px' }">
                    <Input v-model="form.loginName" placeholder="请输入用户名" :maxlength="30">
                        <span slot="prepend">
                            <Icon :size="16" type="ios-person"></Icon>
                        </span>
                    </Input>
                </FormItem>
                <FormItem prop="password">
                    <Input v-model="form.password" placeholder="请输入密码" type="password" :maxlength="30">
                        <span slot="prepend">
                            <Icon :size="14" type="md-lock"></Icon>
                        </span>
                    </Input>
                </FormItem>
                <FormItem>
                    <Button @click="submit" type="primary" long>登录</Button>
                </FormItem>
            </Form>
        </Card>
    </section>
</template>

<script>
import { rsaEncrypt } from '@/libs/rsa'
import { setToken } from '@/libs/utils'
export default {
    name: 'login',
    data () {
        return {
            form: {
                loginName: '',
                password: ''
            },
            rules: {
                loginName: { required: true, message: '请输入用户名' },
                password: { required: true, message: '请输入密码' }
            }
        }
    },
    methods: {
        submit () {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.login()
                }
            })
        },
        login () {
            this.$http.post('/system/login', {
                loginName: this.form.loginName,
                password: rsaEncrypt(this.form.password)
            }).then(res => {
                localStorage.clear()
                this.setCache(res.data.data)
                this.$router.push({ name: 'home' })
            }).catch(() => {})
        },
        setCache (item) {
            setToken(item.token)
            localStorage.setItem('userName', item.realName)
        }
    }
}
</script>

<style lang="less" scoped>
.login {
    position: relative;
    height: 100%;
    background-color: #fff;
    background-image: url(../../assets/background.jpg);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 50%;
}
.form {
    margin: auto;
    top: 50%;
    width: 360px;
    transform: translateY(-65%);
}
</style>
