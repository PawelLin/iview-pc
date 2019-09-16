<template>
    <Form :model="tableForm" class="self-table-form">
        <TableShow :columns="columns" :data="data" is-form :number="tableForm.form1">
            <template slot="form1" slot-scope>
                <FormItem prop="form1" :rules="{ required: true, message: '请输入' }" style="ver">
                    <InputNumber :max="100" :min="1" v-model="tableForm.form1"></InputNumber>
                    * 2 = {{(tableForm.form1 || 1) * 2}} 列
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
            tableForm: {
                form1: 4
            },
            columns: [
                { title: '一列', key: 'title1' },
                { title: '一列', key: 'title1' },
                { title: '一列', key: 'title1' },
                { title: '一列', key: 'title1' },
                { title: '三列', key: 'title3', colspan: 3 },
                { title: '三列', key: 'title3', colspan: 3 },
                { title: '七列', key: 'title7', colspan: 7 },
                { title: '列数', slot: 'form1' }
            ],
            data: {
                title1: 'colspan: 1',
                title2: 'colspan: 2',
                title3: 'colspan: 3',
                title4: 'colspan: 4',
                title5: 'colspan: 5',
                title6: 'colspan: 6',
                title7: 'colspan: 7',
                title8: 'colspan: 8',
                title9: 'colspan: 9',
                form1: 4
            }
        }
    }
}
</script>
