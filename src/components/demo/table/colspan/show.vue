<template>
    <div class="ivu-table-wrapper self-table-show">
        <table cellspacing="0" cellpadding="0" class="ivu-table ivu-table-small ivu-table-border">
            <tr v-for="(item, index) in keys" :key="item.key">
                <template v-for="(ite, inde) in item">
                    <th :key="`title-${index}-${inde}`" colspan="1" :class="isForm && ite.required ? 'ivu-form-item-required' : ''">
                        <label class="ivu-form-item-label">{{ite.title}}</label>
                    </th>
                    <td :key="`key-${index}-${inde}`" :colspan="ite.colspan">
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
        this.keys = this.setData(this.columns, this.number)
    },
    watch: {
        columns (columns) {
            this.keys = this.setData(columns, this.number)
        },
        number (num) {
            this.keys = this.setData(this.columns, Number(num || 1))
        }
    },
    methods: {
        // 适用于rowspan都为1的列表
        setData (list, num) {
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
        }
    }
}
</script>
