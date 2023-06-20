<template>
    <Form :model="tableForm" class="self-table-form">
        <TableShow :columns="columns" :data="data" is-form>
            <template slot="form1" slot-scope>
                <FormItem prop="form1" :rules="{ required: true, message: '请输入' }" style="ver">
                    <InputNumber :max="100" :min="1" v-model="tableForm.form1"></InputNumber>
                    * 2 = {{(tableForm.form1 || 1) * 2}}
                </FormItem>
            </template>
            <template slot="img" slot-scope="row">
                <img :src="row.img" alt="头像" style="max-height: 80px;">
            </template>
        </TableShow>
    </Form>
</template>

<script>
import TableShow from './show.vue'
export default {
    components: {
        TableShow
    },
    data () {
        return {
            tableForm: {},
            columns: [
                { key: 'title1', colspan: 2 },
                { title: '', slot: 'img', rowspan: 3 },
                { title: '', slot: 'img', rowspan: 3 },
                { key: 'title2', colspan: 2 },
                { key: 'title3', colspan: 2 },
                { title: 'title4', key: 'title4' },
                { title: '', slot: 'img', colspan: 2, rowspan: 4 },
                { title: 'title6', key: 'title6' },
                // { title: '', key: 'title5', colspan: 2 },
                { title: '', slot: 'img', colspan: 2, rowspan: 3 },
                { title: 'title1', key: 'title1' },
                // { title: 'title2', key: 'title2' },
                // { title: 'title3', key: 'title3' },
                // { title: 'title2', key: 'title2' },
                // { title: 'title3', key: 'title3' },
                // { title: 'title4', key: 'title4' },
                // { title: 'title5', key: 'title5' },
                // { title: '', slot: 'img', colspan: 2, rowspan: 3 },
                // { title: 'title1', key: 'title1' },
                // { title: 'title2', key: 'title2' },
                // { title: 'title3', key: 'title3' },
                // { title: 'title4', key: 'title4' },
                // { title: 'title5', key: 'title5' },
                // { title: 'title1', key: 'title1' },
                // { title: '', slot: 'img', colspan: 2, rowspan: 3 },
                // { title: 'title2', key: 'title2' },
                // { title: 'title3', key: 'title3' },
                // { title: 'title4', key: 'title4' },
                // { title: 'title5', key: 'title5' }
            ],
            data: {
                title1: 'title1',
                title2: 'title2',
                title3: 'title3',
                title4: 'title4',
                title5: 'title5',
                title6: 'title6',
                title7: 'title7',
                title8: 'title8',
                title9: 'title9',
                img: 'https://git.f-road.com.cn/uploads/-/system/user/avatar/36/avatar.png?width=400',
                form1: 2
            }
        }
    }
}
</script>
