import Vue from 'vue'
import validate from '@/libs/validate'
import { rsaEncrypt } from '@/libs/rsa'

const updatePwd =  new Vue({
    data () {
        const validatePwd = (rule, value, callback) => {
            callback(!value ? new Error('密码不能为空') : !validate.isPwd(value) ? new Error('密码为6-12位的数字+字母') : undefined)
        }
        const validateConfirmPwd = (rule, value, callback) => {
            if (!value) {
                callback(new Error('确认密码不能为空'))
            } else if (!validate.isPwd(value)) {
                callback(new Error('确认密码为6-12位的数字+字母'))
            } else if (value !== this.form.pwd) {
                callback(new Error('密码与确认密码不一致'))
            } else {
                callback()
            }
        }
        return {
            form: {
                pwd: '',
                confirmPwd: ''
            },
            rules: {
                pwd: { required: true, validator: validatePwd },
                confirmPwd: { required: true, validator: validateConfirmPwd }
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
                        let pwd = create('Input', { props: { value: this.form.pwd, type: 'password', maxlength: 12 }, on: { input: val => { this.form.pwd = val } } })
                        let confirmPwd = create('Input', { props: { value: this.form.confirmPwd, type: 'password', maxlength: 12 }, on: { input: val => { this.form.confirmPwd = val } } })
                        let FormItem1 = create('FormItem', { props: { label: '密码', prop: 'pwd' } }, [pwd])
                        let FormItem2 = create('FormItem', { props: { label: '确认密码', prop: 'confirmPwd' } }, [confirmPwd])
                        let FormItem3 = create('FormItem', { attrs: { style: this.buttonStyle } }, [button])
                        let Form = create('Form', { ref: 'form', attrs: { style: this.formStyle, model: this.form, rules: this.rules }, props: { labelWidth: 80, labelPosition: 'left' } }, [FormItem1, FormItem2, FormItem3])
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
                    this.$http.post('/editPwd', {
                        pwd: rsaEncrypt(this.form.pwd),
                        confirmPwd: rsaEncrypt(this.form.confirmPwd)
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