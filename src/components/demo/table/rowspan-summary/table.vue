<template>
    <div class="ivu-table-wrapper self-table-list">
        <table cellspacing="0" cellpadding="0" class="ivu-table ivu-table-small ivu-table-border">
            <tr>
                <th v-for="(item, index) in columns" v-show="!item.hide" :key="`columns-title-${index}`" :width="item.width">{{item.title}}</th>
            </tr>
            <tr v-for="(item, index) in list" :key="`tr-${index}`">
                <template v-for="(ite, inde) in columns">
                    <td v-if="!ite.rowspan || (ite.rowspan && item.rowspan)" v-show="!ite.hide" :rowspan="ite.rowspan && item.rowspan" :key="`columns-key-${inde}`">
                        {{setTd(item, ite.key)}}
                    </td>
                </template>
            </tr>
            <tr v-if="!list.length">
                <td :colspan="columnsLength" style="text-align: center;">暂无数据</td>
            </tr>
        </table>
    </div>
</template>

<script>
export default {
    name: 'RowspanSummaryTable',
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
        }
    },
    data () {
        return {
            list: []
        }
    },
    computed: {
        columnsLength () {
            return this.columns.filter(item => !item.hide).length
        }
    },
    // watch: {
    //     data (data) {
    //         const arr = []
    //         this.getList(data, arr)
    //         this.list = arr
    //     }
    // },
    created () {
        const arr = []
        this.getList(this.data, arr)
        this.list = arr
        this.$emit('result', this.list)
    },
    methods: {
        getList (data, arr) {
            data.info && data.info.forEach(item => {
                const itemLen = item.info.length
                item.info.forEach((ite, index) => {
                    ite.rowspan = itemLen === 1 ? 1 : (index ? '' : itemLen)
                    arr.push(ite)
                    if (itemLen - index === 1) {
                        if (item.count) {
                            item.count.rowspan = 1
                            arr.push(item.count)
                        }
                    }
                })
            })
            if (data.count) {
                data.count.rowspan = 1
                arr.push(data.count)
            }
        },
        setTd (item, keys) {
            return Array.isArray(keys) ? keys.map(key => item[key]).filter(value => value)[0] : item[keys]
        }
    }
}
</script>
