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
                    <th>数据项key</th>
                    <th>数据项名称</th>
                    <th>数据项描述</th>
                    <th>表达式</th>
                    <th>清单项key</th>
                    <th>清单项名称</th>
                    <th>清单项描述</th>
                    <th>数据源</th>
                    <th>模式</th>
                    <th>说明</th>
                </tr>
                <tr v-for="(item, index) in arr" :key="`tr-${index}`">
                    <td :rowspan="item.rowspans[1]" v-if="item.parent_parent_key">{{item.parent_parent_key}}</td>
                    <td :rowspan="item.rowspans[1]" v-if="item.parent_parent_name">{{item.parent_parent_name}}</td>
                    <td :rowspan="item.rowspans[1]" v-if="item.parent_parent_description">{{item.parent_parent_description}}</td>
                    <td :rowspan="item.rowspans[1]" v-if="item.parent_parent_expersion">{{item.parent_parent_expersion}}</td>
                    <td :rowspan="item.rowspans[0]" v-if="item.parent_key">{{item.parent_key}}</td>
                    <td :rowspan="item.rowspans[0]" v-if="item.parent_name">{{item.parent_name}}</td>
                    <td :rowspan="item.rowspans[0]" v-if="item.parent_description">{{item.parent_description}}</td>
                    <td :rowspan="item.rowspans[0]" v-if="item.parent_source">{{item.parent_source}}</td>
                    <td>{{item.model}}</td>
                    <td>{{item.explain}}</td>
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
