<template>
    <section>
        <Card shadow>
            <Form :label-width="50" label-position="left">
                <Row :gutter="20">
                    <Col span="6">
                        <FormItem label="用户名">
                            <Input v-model="form.user" :maxlength="20"></Input>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem label="角色">
                            <Select v-model="form.role" filterable>
                                <Option v-for="item in roleList" :value="item.id" :key="item.id">{{item.name}}</Option>
                            </Select>
                        </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col class="text-right">
                        <FormItem>
                            <Button type="primary" icon="md-search">查询</Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <Table ref="table" :columns="columns" :data="list" size="small" border>
                <template slot="status" slot-scope="{ row }">
                    <Tag :color="color[row.status]">{{row.status | STATUS}}</Tag>
                </template>
                <template slot-scope="{ row }">
                    <Button type="primary" size="small">重置密码</Button>
                    <Button @click="toDetail(row.id)" type="primary" size="small">详情</Button>
                </template>
            </Table>
            <Page class="self-page" :total="page.totalCount" :current="page.pageNumber" @on-change="getList" show-total/>
        </Card>
    </section>
</template>

<script>
export default {
    name: 'system_auth_user',
    data () {
        return {
            form: {
                user: '',
                role: ''
            },
            roleList: [],
            list: [],
            page: {
                pageNumber: 1,
                totalCount: 0
            },
            columns: [
                { title: '用户名', key: 'name' },
                { title: '角色', key: 'role' },
                { title: '状态', slot: 'status' },
                { title: '操作', slot: 'default' }
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
            this.$http.post('/user', this.form).then(res => {
                this.list = res.data.data
                this.page = res.data.page
            }).catch(() => {})
        },
        getRole () {
            this.$http.post('/role').then(res => {
                this.roleList = res.data.data
            }).catch(() => {})
        },
        toDetail (id) {
            this.$router.push({
                name: 'system_auth_user_detail',
                query: { id },
                params: { rename: id == 1 ? '设置rename用户' : undefined }
            })
        }
    }
}
</script>
