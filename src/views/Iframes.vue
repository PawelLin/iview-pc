<template>
    <section class="iframe">
        <iframe v-show="$route.query.iframe === item" v-for="item in list" :src="getPath(item)" frameborder="0" :key="item" width="100%" height="100%"></iframe>
    </section>
</template>

<script>
export default {
    name: 'iframes',
    data () {
        return {
        }
    },
    computed: {
        list () {
            return this.$store.state.tag.list.filter(item => item.query.iframe).map(item => item.query.iframe)
        }
    },
    methods: {
        getPath (iframe) {
            return iframe.includes('http') ? iframe : `/anhui/admin/bank/${iframe}`
        }
    }
}
</script>

<style lang="less" scoped>
.iframe {
    height: 100%;
}
</style>
