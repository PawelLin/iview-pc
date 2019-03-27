<template>
    <Button @click="handleRemove" :size="size" :type="type"><slot>取消</slot></Button>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
    props: {
        size: {
            type: String,
            default: 'default'
        },
        type: {
            type: String,
            default: 'default'
        },
        to: {
            type: String,
            default: ''
        }
    },
    created () {
        /**
         * remove当前tag常见于新增，编辑请求响应成功后调用
         * 若在响应成功前切换tag，动态获取this.$route会获取当前已切换的tag，导致需要remove的tag删除失败，故此处先获取并赋值route
         */
        let { name, query, params } = this.$route
        this.route = { name, query, params }
    },
    methods: {
        ...mapMutations([
            'removeTag'
        ]),
        handleRemove (to) {
            this.removeTag({ route: this.route, to: this.to || to })
        }
    }
}
</script>
