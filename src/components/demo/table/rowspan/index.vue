<template>
    <Card shadow>
        <Form :label-width="0">
            <Row :gutter="20">
                <Col span="6">
                    <FormItem>
                        <Button @click="modal = true" type="primary">数据变化图</Button>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <div class="ivu-table-wrapper self-table-list">
            <table cellspacing="0" cellpadding="0" class="ivu-table ivu-table-small ivu-table-border">
                <tr>
                    <th>A</th>
                    <th>B</th>
                    <th>C</th>
                    <th>D</th>
                    <th>E</th>
                    <th>F</th>
                    <th>G</th>
                    <th>H</th>
                    <th>I</th>
                    <th>J</th>
                </tr>
                <tr v-for="(item, index) in arr" :key="`tr-${index}`">
                    <td :rowspan="item.rowspans[1]" v-if="item.parent_parent_a">{{item.parent_parent_a}}</td>
                    <td :rowspan="item.rowspans[1]" v-if="item.parent_parent_b">{{item.parent_parent_b}}</td>
                    <td :rowspan="item.rowspans[1]" v-if="item.parent_parent_c">{{item.parent_parent_c}}</td>
                    <td :rowspan="item.rowspans[1]" v-if="item.parent_parent_abc">{{item.parent_parent_abc}}</td>
                    <td :rowspan="item.rowspans[0]" v-if="item.parent_e">{{item.parent_e}}</td>
                    <td :rowspan="item.rowspans[0]" v-if="item.parent_f">{{item.parent_f}}</td>
                    <td :rowspan="item.rowspans[0]" v-if="item.parent_g">{{item.parent_g}}</td>
                    <td :rowspan="item.rowspans[0]" v-if="item.parent_h">{{item.parent_h}}</td>
                    <td>{{item.i}}</td>
                    <td>{{item.j}}</td>
                </tr>
            </table>
        </div>
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
                        <td><pre>{{JSON.stringify(arr, null, 4)}}</pre></td>
                        <!-- <td><pre>{{JSON.stringify(columns, null, 4)}}</pre></td> -->
                        <!-- <td>
                            <pre>{{code}}</pre>
                            <Alert>
                                td显示规则
                                <ol slot="desc" style="list-style-position: inside;">
                                    <li>该列未设置rowspan为true，必须显示</li>
                                    <li>该列设置rowspan为true，数据对象的rowspan不等于空则显示</li>
                                </ol>
                            </Alert>
                        </td> -->
                    </tr>
                </table>
            </div>
        </Modal>
    </Card>
</template>

<script>
import data from './data'
export default {
    data () {
        return {
            data,
            arr: [],
            modal: false
        }
    },
    created () {
        this.arr = this.getList(JSON.parse(JSON.stringify(this.data)))
    },
    methods: {
        getList (list, arr = []) {
            list.forEach(item => {
                let obj1 = {}
                let key1 = ''
                Object.keys(item).forEach(key => {
                    if (key !== 'rowspans') {
                        if (Array.isArray(item[key])) {
                            key1 = key
                        } else {
                            obj1[`parent_${key}`] = item[key]
                        }
                    }
                })
                if (key1) {
                    let num = 0
                    obj1.rowspans = item.rowspans || []
                    obj1.rowspans.unshift(item[key1].length)
                    item[key1].forEach((ite, ind) => {
                        if (!ind) {
                            Object.assign(ite, obj1)
                        }
                        let listKey = Object.keys(ite).filter(key => key !== 'rowspans' && Array.isArray(ite[key]))[0]
                        if (listKey) num += ite[listKey].length
                    })
                    if (num) obj1.rowspans[obj1.rowspans.length - 1] = num
                    this.getList(item[key1], arr)
                } else {
                    arr.push(item)
                }
            })
            return arr
        }
    }
}
</script>
