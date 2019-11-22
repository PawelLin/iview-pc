<template>
    <section>
        <Card shadow>
            <Form :label-width="80">
                <Row :gutter="20">
                    <Col span="6">
                        <FormItem label="C">
                            <Select v-model="form.C" @on-change="handleChange">
                                <Option value="1">show</Option>
                                <Option value="0">hide</Option>
                            </Select>
                        </FormItem>
                    </Col>
                    <Col span="6">
                        <FormItem>
                            <Button @click="modal = true" type="primary">数据变化图</Button>
                        </FormItem>
                    </Col>
                </Row>
            </Form>
            <RowspanSummaryTable :data="list" :columns="columns" @result="getResultList" />
        </Card>
        <Modal v-model="modal" title="数据变化" width="80" footer-hide>
            <div class="ivu-table-wrapper self-table-list">
                <table cellspacing="0" cellpadding="0" class="ivu-table ivu-table-small ivu-table-border">
                    <tr>
                        <th>原始数据</th>
                        <th>转化数据</th>
                        <th>columns</th>
                        <th>html</th>
                    </tr>
                    <tr>
                        <td><pre>{{JSON.stringify(data, null, 4)}}</pre></td>
                        <td><pre>{{JSON.stringify(list1, null, 4)}}</pre></td>
                        <td><pre>{{JSON.stringify(columns, null, 4)}}</pre></td>
                        <td>
                            <pre>{{code}}</pre>
                            <Alert>
                                td显示规则
                                <ol slot="desc" style="list-style-position: inside;">
                                    <li>该列未设置rowspan为true，必须显示</li>
                                    <li>该列设置rowspan为true，数据对象的rowspan不等于空则显示</li>
                                </ol>
                            </Alert>
                        </td>
                    </tr>
                </table>
            </div>
        </Modal>
    </section>
</template>

<script>
import RowspanSummaryTable from './table.vue'
import data from './data'
export default {
    components: {
        RowspanSummaryTable
    },
    data () {
        return {
            form: {
                C: '0'
            },
            data,
            list: JSON.parse(JSON.stringify(data)),
            list1: null,
            columns: [
                { title: 'A', key: ['a1', 'a2'], rowspan: true },
                { title: 'B', key: 'b', rowspan: true },
                { title: 'C', key: 'c', hide: true },
                { title: 'D', key: 'd' }
            ],
            modal: false,
            code: `<tr v-for="(item, index) in list" :key="\`tr-\${index}\`">
    <template v-for="(ite, inde) in columns">
        <td v-if="!ite.rowspan || (ite.rowspan && item.rowspan)"
            v-show="!ite.hide"
            :rowspan="ite.rowspan && item.rowspan"
            :key="\`columns-key-\${inde}\`"
        >
            {{setTd(item, ite.key)}}
        </td>
    </template>
</tr>`
        }
    },
    methods: {
        handleChange (value) {
            this.columns[2].hide = value === '0'
        },
        getResultList (list) {
            this.list1 = list
        }
    }
}
</script>
