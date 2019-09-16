<template>
    <div class="ivu-table-wrapper self-table-list">
        <table cellspacing="0" cellpadding="0" class="ivu-table ivu-table-small ivu-table-border" style="width: 100%">
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
</template>

<script>
import data from './data'
export default {
    data () {
        return {
            arr: []
        }
    },
    created () {
        this.arr = this.getList(data)
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
