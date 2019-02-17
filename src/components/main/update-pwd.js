import Vue from 'vue'
import validate from '@/libs/validate'
import { rsaEncrypt } from '@/libs/rsa'

const updatePwd =  new Vue({
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
            form: {
                origPassword: '',
                newPassword: '',
                confirmPassword: ''
            },
            rules: {
                origPassword: { required: true, validator: validateOrigPassword },
                newPassword: { required: true, validator: validateNewPassword },
                confirmPassword: { required: true, validator: validateConfirmPassword }
            },
            loading: false
        }
    },
    beforeCreate () {
        this.divStyle = 'margin: -16px -20px 0;'
        this.formStyle = 'padding: 14px 16px 0;'
        this.buttonStyle = 'position: absolute;right: 0;'
        this.titleStyle = ` padding: 14px 16px;
                            border-bottom: 1px solid #e8eaec;
                            font-size: 14px;
                            color: #17233d;
                            font-weight: 700;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;`
    },
    methods: {
        handleRender (closable = false) {
            return new Promise((resolve, reject) => {
                this.$Modal.info({
                    closable: closable,
                    render: (h) => {
                        let create = this.$createElement
                        let button = create('Button', { props: { type: 'primary', size: 'large', loading: this.loading }, on: { click: () => { this.updatePwd(resolve) } } }, '确定')
                        let title = create('div', { attrs: { style: this.titleStyle } }, '修改密码')
                        let origPassword = create('Input', { props: { value: this.form.origPassword, type: 'password', maxlength: 12 }, on: { input: val => { this.form.origPassword = val } } })
                        let newPassword = create('Input', { props: { value: this.form.newPassword, type: 'password', maxlength: 12 }, on: { input: val => { this.form.newPassword = val } } })
                        let confirmPassword = create('Input', { props: { value: this.form.confirmPassword, type: 'password', maxlength: 12 }, on: { input: val => { this.form.confirmPassword = val } } })
                        let FormItem0 = create('FormItem', { props: { label: '原密码', prop: 'origPassword' } }, [origPassword])
                        let FormItem1 = create('FormItem', { props: { label: '密码', prop: 'newPassword' } }, [newPassword])
                        let FormItem2 = create('FormItem', { props: { label: '确认密码', prop: 'confirmPassword' } }, [confirmPassword])
                        let FormItem3 = create('FormItem', { attrs: { style: this.buttonStyle } }, [button])
                        let Form = create('Form', { ref: 'form', attrs: { style: this.formStyle, model: this.form, rules: this.rules }, props: { labelWidth: 80, labelPosition: 'left' } }, [FormItem0, FormItem1, FormItem2, FormItem3])
                        return create('div', { attrs: { style: this.divStyle } }, [title, Form])
                    },
                    onOk: () => {
                    }
                })
            })
        },
        updatePwd (resolve) {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.loading = true
                    this.$http.post('/system/password/update', {
                        origPassword: rsaEncrypt(this.form.origPassword),
                        newPassword: rsaEncrypt(this.form.newPassword)
                    }).then(() => {
                        resolve()
                        this.$Modal.remove()
                    }).catch(() => {}).finally(() => {
                        this.$refs.form.resetFields()
                        this.loading = false
                    })
                }
            })
        }
    }
})

export default updatePwd.handleRender