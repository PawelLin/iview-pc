<template>
    <Modal v-model="modal" title="修改密码" @on-visible-change="modalChange" :width="416" :closable="closable" :mask-closable="closable">
        <Form ref="form" :model="form" :rules="rules" :label-width="80" label-position="left">
            <FormItem label="原密码" prop="origPassword">
                <Input v-model="form.origPassword" type="password" :maxlength="12" />
            </FormItem>
            <FormItem label="密码" prop="newPassword">
                <Input v-model="form.newPassword" type="password" :maxlength="12" />
            </FormItem>
            <FormItem label="确认密码" prop="confirmPassword">
                <Input v-model="form.confirmPassword" type="password" :maxlength="12" />
            </FormItem>
        </Form>
        <div slot="footer">
            <Button @click="handleSubmit" type="primary" :loading="loading">确定</Button>
        </div>
    </Modal>
</template>

<script>
import validate from '@/libs/validate'
import { rsaEncrypt } from '@/libs/rsa'

export default {
    props: {
        closable: {
            type: Boolean,
            default: true
        },
        callback: Function
    },
    data () {
        const validateOrigPassword = (rule, value, callback) => {
            callback(!value ? new Error('原密码不能为空') : undefined)
        }
        const validateNewPassword = (rule, value, callback) => {
            callback(!value ? new Error('密码不能为空') : !validate.isPwd(value) ? new Error('密码为6-12位的数字+字母') : undefined)
        }
        const validateConfirmPassword = (rule, value, callback) => {
            if (!value) {
                callback(new Error('确认密码不能为空'))
            } else if (!validate.isPwd(value)) {
                callback(new Error('确认密码为6-12位的数字+字母'))
            } else if (value !== this.form.newPassword) {
                callback(new Error('密码与确认密码不一致'))
            } else {
                callback()
            }
        }
        return {
            modal: false,
            loading: false,
            form: {
                origPassword: '',
                newPassword: '',
                confirmPassword: ''
            },
            rules: {
                origPassword: { required: true, validator: validateOrigPassword },
                newPassword: { required: true, validator: validateNewPassword },
                confirmPassword: { required: true, validator: validateConfirmPassword }
            }
        }
    },
    mounted () {
        this.modal = true
    },
    methods: {
        modalChange (show) {
            if (!show) {
                document.body.removeChild(this.$el)
                this.$destroy()
            }
        },
        handleSubmit () {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.loading = true
                    this.$http.post('/system/password/update', {
                        origPassword: rsaEncrypt(this.form.origPassword),
                        newPassword: rsaEncrypt(this.form.newPassword)
                    }).then(() => {
                        this.modal = false
                        this.callback && this.callback(true)
                    }).catch(() => {}).finally(() => {
                        this.loading = false
                    })
                }
            })
        }
    }
}
</script>