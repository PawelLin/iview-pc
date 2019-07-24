<template>
    <section>
        <Alert>
            第一种：每个tag只存在一个
            <template slot="desc">在/components/main/tags-nav.vue内设置onlyName=<font>true</font>，即新增tag时只针对路由的<font>name</font>值过滤，demo见用户管理，注：需先前往<font>@/components/main/tags-nav.vue</font>设置好<font>onlyName=true</font></template>
        </Alert>
        <Alert>
            第二种：除了左侧菜单的tag，其他tag可存在多个
            <template slot="desc">在/components/main/tags-nav.vue内设置onlyName=<font>false</font>，即新增tag时针对路由的<font>name, query, params</font>值过滤，demo见下方示例，注：需先前往<font>@/components/main/tags-nav.vue</font>设置好<font>onlyName=false</font></template>
        </Alert>
        <Card title="多tag示例" dis-hover>
            <Table :columns="columns" :data="list" border size="small">
                <template slot-scope="{ row }">
                    <Button @click="handleInfo(row)" type="primary" size="small">编辑</Button>
                </template>
            </Table>
            <Button @click="handleInfo()" slot="extra" type="primary" size="small">新增</Button>
        </Card>
    </section>
</template>

<script>
export default {
    name: 'demo_tags',
    data () {
        return {
            columns: [
                { title: '姓名', key: 'name' },
                { title: '性别', key: 'sexDesc' },
                { title: '操作', slot: 'default' }
            ],
            list: [
                { id: '1', name: '项羽', sex: '0', sexDesc: '男' },
                { id: '2', name: '虞姬', sex: '1', sexDesc: '女' }
            ]
        }
    },
    methods: {
        handleInfo (row = {}) {
            this.$router.push({
                name: 'demo_tags_detail',
                query: { id: row.id, name: row.name, sex: row.sex },
                params: { rename: row.id ? '人物编辑' : '人物新增' }
            })
        }
    }
}
</script>

<style lang="less" scoped>
font {
    color: #ed4014;
}
</style>
