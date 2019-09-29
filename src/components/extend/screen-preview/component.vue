<template>
    <div class="screen-preview">
        <transition name="fade">
            <div v-show="show" class="ivu-modal-mask" @click.self="handleHide"></div>
        </transition>
        <transition name="ease-in">
            <img v-show="show" class="image" src="https://git.f-road.com.cn/uploads/-/system/user/avatar/36/avatar.png?width=400" alt="" v-move="{ limit: true }">
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
            show: ''
        }
    },
    mounted () {
        this.show = 'show'
        document.body.style.overflow = 'hidden'
    },
    methods: {
        handleHide () {
            document.body.removeChild(this.$el)
            document.body.style.overflow = ''
            this.$destroy()
        }
    }
}
</script>

<style lang="less" scoped>
.screen-preview {
    .image{
        position: absolute;
        top: 50%;
        left: 50%;
        z-index: 1001;
        transform: translate(-50%, -50%) scale(1);
    }
}
.ease-in-enter-active {
    animation: ease-in .2s forwards;
}
.ease-in-leave-active {
    animation: ease-in .2s forwards;
}
@keyframes ease-in {
    0% {
        transform: translate(-50%, -50%) scale(0.9);
    }
    100% {
        transform: translate(-50%, -50%) scale(1);
    }
}
</style>
