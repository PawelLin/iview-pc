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
    activated () {
        /**
         * 未关闭详情页面，通过点击列表重新进入详情页面，更新route信息
         */
        this.setRoute()
    },
    created () {
        /**
         * remove当前tag常见于新增，编辑请求响应成功后调用
         * 若在响应成功前切换tag，动态获取this.$route会获取当前已切换的tag，导致需要remove的tag删除失败，故此处先获取并赋值route
         */
        this.setRoute()
    },
    methods: {
        ...mapMutations([
            'removeTag'
        ]),
        setRoute () {
            let { name, query, params } = this.$route
            this.route = { name, query, params }
        },
        handleRemove (to) {
            this.removeTag({ route: this.route, to: this.to || to })
        }
    }
}
</script>
