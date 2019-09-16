<template>
    <div class="ivu-table-wrapper self-table-show">
        <!-- <table cellspacing="0" cellpadding="0" class="ivu-table ivu-table-small ivu-table-border">
            <tr v-for="(item, index) in keys" :key="item.key">
                <template v-for="(ite, inde) in item">
                    <th :key="`title-${index}-${inde}`" colspan="1" :rowspan="ite.rowspan" :class="isForm && ite.required ? 'ivu-form-item-required' : ''">
                        <label class="ivu-form-item-label">{{ite.title}}</label>
                    </th>
                    <td :key="`key-${index}-${inde}`" :colspan="ite.colspan" :rowspan="ite.rowspan">
                        <span v-if="!ite.slot">colspan: {{ite.colspan}} rowspan: {{ite.rowspan}}</span>
                        <TableShowSlot v-else :slot="ite.slot" :row="data" />
                    </td>
                </template>
            </tr>
        </table> -->
        <table cellspacing="0" cellpadding="0" class="ivu-table ivu-table-small ivu-table-border">
            <tr v-for="(item, index) in keys" :key="item.key">
                <template v-for="(ite, inde) in item">
                    <th v-if="ite.title" :key="`title-${index}-${inde}`" colspan="1" :rowspan="ite.rowspan" :class="isForm && ite.required ? 'ivu-form-item-required' : ''">
                        <label class="ivu-form-item-label">{{ite.title}}</label>
                    </th>
                    <td v-if="ite.key || ite.slot" :key="`key-${index}-${inde}`" :colspan="ite.colspan" :rowspan="ite.rowspan">
                        <span v-if="!ite.slot">{{data[ite.key]}}</span>
                        <TableShowSlot v-else :slot="ite.slot" :row="data" />
                    </td>
                </template>
            </tr>
        </table>
    </div>
</template>

<script>
import TableShowSlot from './slot'
export default {
    name: 'TableShow',
    components: {
        TableShowSlot
    },
    provide () {
        return {
            tableRoot: this
        }
    },
    props: {
        data: {
            type: Object,
            default () {
                return {}
            }
        },
        columns: {
            type: Array,
            default () {
                return []
            }
        },
        isForm: {
            type: Boolean,
            default: false
        },
        number: {
            type: [Number, String],
            default: 4
        }
    },
    data () {
        return {
            keys: []
        }
    },
    created () {
        this.keys = this.setData(this.transData(this.columns), this.number)
    },
    watch: {
        columns (columns) {
            this.keys = this.setData(this.transData(), this.number)
        }
        // number (num) {
        //     this.keys = this.setData(this.columns, Number(num || 1))
        // }
    },
    methods: {
        transData (list) {
            let _list = []
            list = JSON.parse(JSON.stringify(list))
            list.forEach(({ title, key, slot, colspan = 1, rowspan = 1 }) => {
                title && _list.push({ title, rowspan: 1, colspan: 1 })
                key && _list.push({ key, rowspan, colspan })
                slot && _list.push({ slot, rowspan, colspan })
            })
            return _list
        },
        setData (list, num) {
            let index = 0 // 当前list的下标
            let listIndex = 0 // 当前子list的下标
            let _list = []
            list.forEach(item => {
                _list[index] = _list[index] || []
                // 补空位
                if (item.rowspan > 1) {
                    for (let i = 1; i < item.rowspan; i++) {
                        _list[index + i] = _list[index + i] || []
                        for (let j = 0; j < item.colspan; j++) {
                            _list[index + i][_list[index].length + j] = { rowspan: 1, colspan: 1 }
                        }
                    }
                }
                // 判断_list[index]的总colspan值是否超出num
                if (_list[index].length) {
                    let total = _list[index].map(item => item.colspan).reduce((total, num) => total + num)
                    if ((total + item.colspan) > num) {
                        index++
                        _list[index] = _list[index] || []
                        _list[index][0] = item
                        listIndex = 1
                        return
                    }
                }
                if (!_list[index][listIndex]) {
                    _list[index][listIndex] = item
                }
                listIndex++
                // filter过滤掉当前_list[index]的empty
                if (_list[index].length === num && _list[index].filter(item => item).length === _list[index].length) {
                    listIndex = 0
                    index++
                }
            })
            return _list
        },
        // 适用于rowspan都为1的列表
        setColspan (list, num) {
            list = JSON.parse(JSON.stringify(list))
            let index = 0
            let _list = []
            list.forEach(item => {
                item.colspan = item.colspan || 1
                item._colspan = item.colspan + 1
                let nums = num * 2 // 表格总列数
                let _index = Math.floor(index / num)
                let _item = _list[_index] = _list[_index] || []
                if (_item.length) {
                    let total = _item.map(item => item._colspan).reduce((total, num) => total + num)
                    if ((total + item._colspan) > nums) {
                        if (total !== nums) _item[_item.length - 1].colspan += (nums - total)
                        _index += 1
                        _list[_index] = _list[_index] || []
                        _list[_index].push(item)
                        index += num
                        return
                    }
                }
                _list[_index].push(item)
                index++
            })
            return _list
        },
    }
}
</script>
