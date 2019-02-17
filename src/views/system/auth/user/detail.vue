<template>
    <Card shadow>
        <span slot="title">用户信息</span>
        <Form ref="form" :model="form" :rules="rules" :label-width="80">
            <Row>
                <Col span="8">
                    <FormItem prop="loginName" label="登录名">
                        <Input v-model="form.loginName"></Input>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem prop="realName" label="用户名">
                        <Input v-model="form.realName"></Input>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <FormItem prop="roleId" label="角色">
                        <Select v-model="form.roleId" filterable>
                            <Option v-for="item in roleList" :value="item.id" :key="item.id">{{item.name}}</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem prop="orgCode" label="所属机构">
                        <Select v-model="form.orgCode" filterable>
                            <Option v-for="item in orgList" :value="item.orgCode" :key="item.orgCode">{{item.orgName}}</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row>
                <Col span="8">
                    <FormItem prop="mobile" label="手机号">
                        <Input v-model="form.mobile"></Input>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem prop="status" label="状态">
                        <Select v-model="form.status" :disabled="!form.id">
                            <Option value="0">启用</Option>
                            <Option value="1">禁用</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
            <Row class="flex-middle">
                <Col span="8">
                    <FormItem label="备注">
                        <Input v-model="form.description" type="textarea"></Input>
                    </FormItem>
                </Col>
                <Col span="8">
                    <FormItem>
                        <Button @click="handleSubmit" type="primary">提交</Button>
                        <Button @click="removeTag($route)" type="primary">取消</Button>
                    </FormItem>
                </Col>
            </Row>
        </Form>
    </Card>
</template>

<script>
import { mapMutations } from 'vuex'
import { getOrgList } from '@/libs/service'
export default {
    name: 'system_auth_user_detail',
    data () {
        return {
            form: {
                id: '',
                loginName: '',
                realName: '',
                roleId: '',
                orgCode: '',
                mobile: '',
                status: '0',
                description: ''
            },
            roleList: [],
            orgList: [],
            rules: {
                loginName: { required: true },
                realName: { required: true },
                roleId: { required: true },
                orgCode: { required: true },
                mobile: { required: true },
                status: { required: true }
            }
        }
    },
    watch: {
        $route: {
            handler(to, from) {
                // let key1 = `${to.name}${to.query.id || ''}`
                // let key2 = `${from.name}${from.query.id || ''}`
                // if (from.name === this.name) {
                //     this.setData({ [key2]: { ...this.form } })
                // }
                // if (to.query.id && !this.$store.state.data[key1]) {
                //     this.getDetail(to.query.id).then(res => {
                //         this.form = Object.assign(this.form, res.data.data)
                //     }).catch(() => {})
                // } else {
                //     if (!to.query.id) this.$refs.form.resetFields()
                //     this.form = Object.assign(this.form, this.$store.state.data[key1] || this.initForm)
                // }
                // let routes = JSON.parse(localStorage.getItem('tagList')).filter(item => item.name === from.name).map(item => `${item.name}${item.query.id || ''}`)
                // this.delData(routes)
            },
            deep: true
        }
    },
    created () {
        this.initForm = { ...this.form }
        this.init(this.$route.query.id)
    },
    methods: {
        ...mapMutations([
            'removeTag',
            'setData',
            'delData'
        ]),
        init (id) {
            let ajax = [getOrgList(), this.getRole()]
            if (id) ajax.push(this.getDetail(id))
            Promise.all(ajax).then(res => {
                this.orgList = res[0].data.data
                this.roleList = res[1].data.data
                if (id) this.form = Object.assign(this.form, res[2].data.data)
                else {
                    this.$nextTick(() => {
                        this.$refs.form.resetFields()
                    })
                }
            }).catch(() => {})
        },
        getRole () {
            return this.$http.post('/system/role/list')
        },
        getDetail (id) {
            return this.$http.post('/system/user/info', { id })
        },
        handleSubmit () {
            this.$refs.form.validate(valid => {
                if (valid) {
                    let url = this.form.id ? '/system/user/update' : '/system/user/add'
                    this.$http.post(url, {
                        ...this.form,
                        id: this.form.id || undefined
                    }).then(res => {
                        this.$Message.success('提交成功')
                        this.removeTag(this.$route)
                    }).catch(() => {})
                }
            })
        }
    }
}
</script>
