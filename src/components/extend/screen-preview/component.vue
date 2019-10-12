<template>
    <div class="screen-preview">
        <transition name="fade">
            <div v-show="show" class="ivu-modal-mask" @click.self="handleHide"></div>
        </transition>
        <transition name="ease-in">
            <img v-if="type === 'image'" @load="handleLoaded" v-show="show" class="media" :src="src" style="transform: translate(-50%, -50%) scale(1);" v-move="{ limit: true }">
            <Video v-else @load="handleLoaded" v-show="show" class="media" :src="src" style="transform: translate(-50%, -50%) scale(1);"/>
        </transition>
    </div>
</template>

<script>
import Video from './video.vue'
export default {
    components: {
        Video
    },
    props: {
        src: {
            type: [Object, String],
            required: true
        },
        type: {
            type: String,
            required: true
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
            show: false
        }
    },
    mounted () {
        document.body.style.overflow = 'hidden'
    },
    methods: {
        handleHide () {
            document.body.removeChild(this.$el)
            document.body.style.overflow = ''
            this.$destroy()
        },
        handleLoaded () {
            this.show = true
        }
    }
}
</script>

<style lang="less" scoped>
.screen-preview {
    user-select: none;
    .media{
        position: absolute;
        width: 400px;
        top: 50%;
        left: 50%;
        z-index: 1001;
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
