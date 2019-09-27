<template>
    <div @click="handleHide">
        <transition name="fade">
            <template v-if="model">
                <div class="ivu-modal-mask"></div>
            </template>
        </transition>
    </div>
</template>

<script>
export default {
    props: {
        src: {
            type: [Object, String],
            // required: true
        },
        type: {
            type: String,
            // required: true
        },
        rotate: {
            type: Boolean,
            default: false
        },
        scale: {
            type: Boolean,
            default: true
        }
    },
    data () {
        return {
            model: false
        }
    },
    mounted () {
        this.model = true
    },
    methods: {
        handleHide () {
            document.body.removeChild(this.$el)
            this.$destroy()
        }
    }
}
</script>

<style lang="less" scoped>
.screen-preview {
}
</style>
