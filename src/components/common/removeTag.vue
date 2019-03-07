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
