<template>
    <div ref="progress" :style="progressStyle" class="progress" @mousedown.stop="progressMousedown" @mouseover="changeProgressPointShow(true)" @mouseleave="changeProgressPointShow(false)">
        <div ref="progressBar" class="progress-bar">
            <div :style="progressLoadedStyle" class="progress-loaded"></div>
        </div>
        <div class="progress-move" :style="progressMoveStyle">
            <transition name="fade">
                <span v-show="progressPointShow" ref="progressPoint" class="progress-point" :style="{ marginLeft: `${moved * 100}%` }"></span>
            </transition>
        </div>
    </div>
</template>

<script>
import { on, off } from '@/libs/tools'

export default {
    props: {
        moved: {
            type: Number,
            default: 0
        },
        left: {
            type: Number,
            default: 0
        },
        top: {
            type: Number,
            default: 0
        },
        loadedColor: {
            type: String,
            default: '#ffffff'
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    inject: ['video'],
    data () {
        return {
            progressPointShow: false
        }
    },
    computed: {
        progressStyle () {
            return { paddingLeft: `${this.left}px`, paddingRight: `${this.left}px` }
        },
        progressLoadedStyle () {
            return { width: `${this.moved * 100}%`, background: this.loadedColor }
        },
        progressMoveStyle () {
            return { left: `${this.left}px`, right: `${this.left + 12}px`, top: `${this.top}px` }
        }
    },
    beforeCreate () {
        this.progress = {
            move: false,
            x: 0,
            left: 0,
            minLeft: 0,
            barWidth: 0,
            pointWidth: 0
        }
    },
    mounted () {
        on(window, 'mousemove', this.progressMousemove)
        on(window, 'mouseup', this.progressMouseup)
    },
    methods: {
        progressMousedown (e) {
            if (this.disabled) return
            this.progress.move = true
            const { left: videoLeft } = this.video.$refs.video.getBoundingClientRect()
            const { left: barLeft, width: barWidth } = this.$refs.progressBar.getBoundingClientRect()
            const { width: pointWidth } = this.$refs.progressPoint.getBoundingClientRect()
            const minLeft = this.progress.minLeft = barLeft - videoLeft
            let left = e.clientX - videoLeft - pointWidth / 2
            const moved = Math.min(Math.max((left - minLeft) / (barWidth - pointWidth), 0), 1)
            this.progress.left = left
            this.progress.x = e.clientX
            this.progress.barWidth = barWidth
            this.progress.pointWidth = pointWidth
            this.$emit('update:moved', moved)
            this.$emit('progressMousedown', moved)
        },
        progressMousemove (e) {
            if (this.disabled) return
            if (!this.progress.move) return
            this.progressPointShow = true
            const { minLeft, barWidth, pointWidth } = this.progress
            let left = e.clientX - this.progress.x + this.progress.left
            const moved = Math.min(Math.max((left - minLeft) / (barWidth - pointWidth), 0), 1)
            this.$emit('update:moved', moved)
            this.$emit('progressMousemove', moved)
        },
        progressMouseup (e) {
            if (this.disabled) return
            this.progressPointShow = this.$refs.progress.contains(e.target)
            this.progress.move = false
            this.$emit('progressMouseup', e)
        },
        changeProgressPointShow (show) {
            if (this.disabled) return
            if (this.progress.move) return
            this.progressPointShow = show
        }
    },
    beforeDestroy () {
        off(window, 'mousemove', this.progressMousemove)
        off(window, 'mouseup', this.progressMouseup)
    }
}
</script>

<style lang="less" scoped>
.progress {
    position: relative;
    cursor: pointer;
    &-bar {
        position: relative;
        width: 100%;
        height: 4px;
        border-radius: 5px;
        background-color: rgba(255, 255, 255, .3);
        > .progress-loaded {
            width: 0%;
            height: 100%;
            border-radius: 5px;
            background-color: #ffffff;
        }
    }
    &-move {
        position: absolute;
        top: 0px;
        left: 0px;
        right: 12px;
        margin-top: -4px;
    }
    &-point {
        position: absolute;
        top: 0px;
        left: 0px;
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background-color: #ffffff;
    }
}
</style>
