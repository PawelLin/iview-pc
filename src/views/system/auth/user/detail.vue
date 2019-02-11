<template>
    <section>
        id: {{detail.id}}
        用户：{{detail.name}}
        角色：{{detail.role}}
    </section>
</template>

<script>
export default {
    name: 'system_auth_user_detail',
    data () {
        return {
            detail: {
                id: '',
                name: '',
                role: ''
            }
        }
    },
    created () {
        this.getDetail(this.$route.query.id)
    },
    methods: {
        getDetail (id) {
            this.$http.post('userDetail', { id }).then(res => {
                this.detail = Object.assign(res.data.data, { id })
            }).catch(() => {})
        }
    },
    beforeRouteUpdate (to, from, next) {
        this.getDetail(to.query.id)
        next()
    }
}
</script>
