<template>
    <div class="ivu-table-wrapper ivu-table-wrapper-with-border self-table-show">
        <table cellspacing="0" cellpadding="0" class="ivu-table ivu-table-small ivu-table-border">
            <tr v-for="(item, index) in keys" :key="item.key">
                <template v-for="(ite, inde) in item">
                    <th v-if="ite && ite.title" :key="`title-${index}-${inde}`" colspan="1" :rowspan="ite.rowspan" :class="isForm && ite.required ? 'ivu-form-item-required' : ''">
                        <label class="ivu-form-item-label">{{ite.title}}</label>
                    </th>
                    <td v-if="ite && (ite.key || ite.slot)" :key="`key-${index}-${inde}`" :colspan="ite.colspan" :rowspan="ite.rowspan">
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
        // console.log(this.setData(this.transData(this.columns), this.number))
    },
    watch: {
        columns (columns) {
            // this.keys = this.setData(this.transData(), this.number)
        }
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
                if (_list[index].length) {
                    let total = _list[index].map(item => item.colspan).reduce((total, num) => total + num)
                    // 判断_list[index]的总colspan值是否超出num
                    if ((total + item.colspan) > num) {
                        index++
                        _list[index] = _list[index] || []
                        _list[index][this.getNextIndex(_list[index])] = item
                        listIndex = this.getNextIndex(_list[index])
                        return
                    }
                }
                if (!_list[index][listIndex]) {
                    _list[index][listIndex] = item
                    listIndex = this.getNextIndex(_list[index])
                }
                if (_list[index].map(item => item.colspan).reduce((total, num) => total + num) === num) {
                    index++
                    listIndex = this.getNextIndex(_list[index])
                }
            })
            return _list
        },
        // 获取当前list下一个要设置的下标index
        getNextIndex (list) {
            let index = ''
            if (list) {
                for (let i = 0; i < list.length; i++) {
                    if (!list[i]) {
                        index = i
                        break
                    }
                }
                if (index === '') {
                    index = list.length
                }
            }
            return index || 0
        }
    }
}
</script>
