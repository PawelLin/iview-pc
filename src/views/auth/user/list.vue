<template>
    <section>
        <Card shadow>
            <Form :label-width="50" label-position="left">
                <Row :gutter="20">
                    <Col span="6">
                        <FormItem label="用户名">
                            <Input v-model="form.realName" :maxlength="20"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="角色">
                            <Select v-model="form.roleId" filterable>
                                <Option value="">全部</Option>
                                <Option v-for="item in roleList" :value="item.id" :key="item.id">{{item.name}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col class="text-right">
                        <FormItem>
                            <Button @click="getList()" type="primary" icon="md-search">查询</Button>
                            <Button @click="handleInfo()" type="primary" icon="md-add">新增</Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <Table ref="table" :columns="columns" :data="list" size="small" border>
                <template slot="status" slot-scope="{ row }">
                    <Tag :color="color[row.status]">{{row.status | STATUS}}</Tag>
                </template>
                <template slot-scope="{ row }">
                    <Button @click="handleReset(row.id)" type="primary" size="small">重置密码</Button>
                    <Button @click="handleInfo(row.id)" type="primary" size="small">修改</Button>
                    <Button @click="handleDelete(row.id)" type="error" size="small">删除</Button>
                </template>
            </Table>
            <Page class="self-page" :total="page.totalCount" :current="page.pageNumber" @on-change="getList" show-total/>
        </Card>
    </section>
</template>

<script>
export default {
    name: 'auth_user',
    data () {
        return {
            form: {
                realName: '',
                roleId: ''
            },
            roleList: [],
            list: [],
            page: {
                pageNumber: 1,
                totalCount: 0
            },
            columns: [
                { title: '用户名', key: 'realName' },
                { title: '登录名', key: 'loginName' },
                { title: '角色', key: 'roleName' },
                { title: '所属机构', key: 'orgName', minWidth: 60 },
                { title: '手机', key: 'mobile' },
                { title: '状态', slot: 'status' },
                { title: '操作', slot: 'default', minWidth: 60 }
            ]
        }
    },
    beforeCreate () {
        this.color = { '0': 'green', '1': 'red', '2': 'orange' }
    },
    created () {
        this.getList()
        this.getRole()
    },
    methods: {
        getList (pageNumber = 1) {
            this.$http.post('/system/user/list', this.form).then(res => {
                this.list = res.data.data
                this.page = res.data.page
            }).catch(() => {})
        },
        getRole () {
            this.$http.post('/system/role/list').then(res => {
                this.roleList = res.data.data
            }).catch(() => {})
        },
        handleInfo (id) {
            this.$router.push({
                name: 'system_auth_user_detail',
                query: { id },
                params: { rename: id ? '更新用户' : '新增用户' }
            })
        },
        handleReset (id) {
            this.$Modal.confirm({
                title: '提示',
                content: '确认重置密码吗',
                loading: true,
                onOk: () => {
                    this.$http.post('/system/password/reset', {
                        id
                    }).then(res => {
                        this.$Message.success('重置密码成功')
                    }).catch(() => {}).finally(() => { this.$Modal.remove() })
                }
            })
        },
        handleDelete (id) {
            this.$Modal.confirm({
                title: '提示',
                content: '确认删除吗',
                loading: true,
                onOk: () => {
                    this.$http.post('/system/user/delete', {
                        id
                    }).then(res => {
                        this.$Message.success('删除成功')
                    }).catch(() => {}).finally(() => { this.$Modal.remove() })
                }
            })
        }
    }
}
</script>
