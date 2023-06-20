<template>
    <Select filterable @on-query-change="handleQueryChange" @on-change="handleChange">
        <Option v-for="item in list" :value="item[values]" :key="item[values]">{{item[label]}}</Option>
    </Select>
</template>

<script>
export default {
    name: 'InputSelect',
    props: {
        options: {
            type: Array,
            default () {
                return []
            }
        },
        values: {
            type: String,
            default: 'id'
        },
        label: {
            type: String,
            default: 'name'
        }
    },
    data () {
        return {
            list: [],
            isChoose: false
        }
    },
    watch: {
        options: {
            handler (item) {
                this.list = item
            },
            deep: true
        }
    },
    created () {
        this.list = this.options
    },
    methods: {
        handleQueryChange (value) {
            if (this.isChoose || !value) {
                this.isChoose = false
                this.list = this.options
                return
            }
            this.list = this.options.filter(item => item.name.includes(value))
        },
        handleChange (value) {
            this.isChoose = true
            this.$emit('input', value)
        }
    }
}
</script>
