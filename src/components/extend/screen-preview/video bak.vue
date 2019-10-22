<template>
    <div class="video">
        <video ref="video" @loadstart="loadstart" @loadeddata="loadeddata" @suspend="suspend" src="@/assets/test.mp4"></video>
        <div class="operation">
            <div class="button-bar">
                <Icon @click="handlePlay" class="play" :type="play ? 'ios-pause' : 'ios-play'" size="18" />
                <span class="time">{{showTime.currentTime}} / {{showTime.duration}}</span>
                <div class="volume">
                    <Icon type="md-volume-up" size="18" />
                </div>
                <Icon class="screen" type="md-expand" size="18" />
            </div>
            <div ref="progress" class="progress" @mousedown.prevent.stop="progressMousedown" @mouseover="changeProgressPointShow(true)" @mouseleave="changeProgressPointShow(false)">
                <div ref="progressBar" class="progress-bar">
                    <div :style="{ width: `${time.loaded * 100}%` }" class="progress-loaded"></div>
                </div>
                <div class="progress-move">
                    <transition name="fade">
                        <!-- <span ref="progressPoint" class="progress-point" :style="{ marginLeft: `${time.loaded * 100}%` }"></span> -->
                        <span v-show="progressPointShow" ref="progressPoint" class="progress-point" :style="{ marginLeft: `${time.loaded * 100}%` }"></span>
                    </transition>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { on, off } from '@/libs/tools'
export default {
    props: {
        src: {
            type: [Object, String],
            required: true
        }
    },
    data () {
        return {
            progressPointShow: false,
            play: false,
            showTime: {
                currentTime: '00:00',
                duration: '00:00'
            },
            time: {
                loaded: 0,
                currentTime: 0,
                duration: 0
            }
        }
    },
    watch: {
        play (play) {
            if (this.play) this.video.play()
            else this.video.pause()
        }
    },
    beforeCreate () {
        this.preIsPlay = false
        this.volumeMove = false
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
        this.video = this.$refs.video
        on(window, 'mousemove', this.progressMousemove)
        on(window, 'mouseup', this.progressMouseup)
    },
    methods: {
        loadstart () {
            this.$emit('load')
        },
        loadeddata () {
            this.time.duration = this.video.duration
            this.showTime.duration = this.timeFormat(this.video.duration)
            on(this.video, 'timeupdate', this.timeUpdate)
            on(this.video, 'ended', () => { this.play = false })
        },
        suspend (e) {
            // console.log(123)
        },
        timeUpdate (e) {
            const loaded = (e.target.currentTime - this.time.currentTime) / e.target.duration
            this.time.loaded = Math.min(loaded + this.time.loaded, 1)
            this.time.currentTime = e.target.currentTime
            this.showTime.currentTime = this.timeFormat(e.target.currentTime)
        },
        handlePlay () {
            this.play = !this.play
        },
        progressMousedown (e) {
            this.progress.move = true
            this.preIsPlay = this.play
            this.play = false
            const { left: videoLeft } = this.$refs.video.getBoundingClientRect()
            const { left: barLeft, width: barWidth } = this.$refs.progressBar.getBoundingClientRect()
            const { width: pointWidth } = this.$refs.progressPoint.getBoundingClientRect()
            const minLeft = this.progress.minLeft = barLeft - videoLeft
            let left = e.clientX - videoLeft - pointWidth / 2
            this.time.loaded = Math.min(Math.max((left - minLeft) / (barWidth - pointWidth), 0), 1)
            this.video.currentTime = this.time.currentTime = this.time.loaded * this.time.duration
            this.showTime.currentTime = this.timeFormat(this.time.currentTime)
            this.progress.left = left
            this.progress.x = e.clientX
            this.progress.barWidth = barWidth
            this.progress.pointWidth = pointWidth
        },
        progressMousemove (e) {
            if (!this.progress.move) return
            this.progressPointShow = true
            const { minLeft, barWidth, pointWidth } = this.progress
            let left = e.clientX - this.progress.x + this.progress.left
            this.time.loaded = Math.min(Math.max((left - minLeft) / (barWidth - pointWidth), 0), 1)
            this.video.currentTime = this.time.currentTime = this.time.loaded * this.time.duration
            this.showTime.currentTime = this.timeFormat(this.time.currentTime)
        },
        progressMouseup (e) {
            this.progressPointShow = e.target.className.indexOf('progress') !== -1
            this.progress.move = false
            if (e.target.className.indexOf('play') === -1) this.play = this.preIsPlay
        },
        changeProgressPointShow (show) {
            if (this.progress.move) return
            this.progressPointShow = show
        },
        timeFormat (time) {
            let minute = Math.floor(time / 60).toString()
            minute = minute.length === 1 ? `0${minute}` : minute
            let second = Math.floor(time % 60).toString()
            second = second.length === 1 ? `0${second}` : second
            return `${minute}:${second}`
        }
    },
    beforeDestroy () {
        off(window, 'mousemove', this.progressMousemove)
        off(window, 'mouseup', this.progressMouseup)
    }
}
</script>

<style lang="less" scoped>
.video {
    position: relative;
    > video {
        width: 100%;
    }
    .operation {
        position: absolute;
        bottom: 5px;
        left: 0;
        width: 100%;
        background: linear-gradient(0deg, black, transparent);
        .button-bar {
            padding: 0 16px;
            display: flex;
            color: #ffffff;
            align-items: center;
            .play {
                cursor: pointer;
            }
            .time {
                flex: 1;
                margin-left: 14.1px;
                font-size: 15px;
            }
            .screen {
                margin-right: 47px;
                margin-left: 30px;
            }
        }
        .progress {
            position: relative;
            margin-top: 13px;
            padding: 0 16px 20px;
            cursor: pointer;
            &-bar {
                position: relative;
                width: 100%;
                height: 4px;
                border-radius: 5px;
                background-color: rgba(255, 255, 255, .3);
                > .progress-loaded {
                    width: 100%;
                    height: 100%;
                    border-radius: 5px;
                    background-color: #ffffff;
                }
            }
            &-move {
                position: absolute;
                top: 0px;
                left: 16px;
                right: 28px;
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
    }
}
</style>
