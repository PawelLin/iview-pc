<template>
    <div class="video">
        <video ref="video" @loadstart="loadstart" @loadeddata="loadeddata" src="@/assets/test.mp4"></video>
        <div class="operation">
            <div class="button-bar">
                <Icon @click="handlePlay" class="play" :type="play ? 'ios-pause' : 'ios-play'" size="18" />
                <span class="time">{{show.currentTime}} / {{show.duration}}</span>
                    <div class="volume" @mouseover="volumnMouseover" @mouseleave="volumnMouseleave" :style="volumeStyle">
                        <transition name="slide-progress">
                            <Progress v-show="volumeShow" :moved.sync="volumeMoved" :top="16" @progressMousedown="volumeChange" @progressMousemove="volumeChange" @progressMouseup="volumnMouseup" loaded-color="rgba(255, 255, 255, 0.6)" class="progress" />
                        </transition>
                        <Icon @click="volumeClick" class="volume-icon" :type="volumeMoved ? 'md-volume-up' : 'md-volume-off'" size="18" />
                    </div>
                </transition>
                <Icon @mouseover="changeVolumeShow(true)" @mouseleave="changeVolumeShow(false)" class="screen" type="md-expand" size="18" />
            </div>
            <Progress :moved.sync="moved" :left="16" @progressMousedown="progressMousedown" @progressMousemove="progressMousemove" @progressMouseup="progressMouseup" class="progress" />
        </div>
    </div>
</template>

<script>
import { on, off } from '@/libs/tools'
import Progress from './progress.vue'
export default {
    components: {
        Progress
    },
    provide () {
        return {
            video: this
        }
    },
    props: {
        src: {
            type: [Object, String],
            required: true
        }
    },
    data () {
        return {
            moved: 0,
            volumeMoved: 1,
            volumeShow: false,
            volumeStyle: {},
            volumeMoving: false,
            play: false,
            show: {
                currentTime: '0:00',
                duration: '0:00'
            },
            time: {
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
        this.preIsPlay = ''
        this.preVolumeMoved = 1
    },
    mounted () {
        this.video = this.$refs.video
    },
    methods: {
        loadstart () {
            this.$emit('load')
        },
        loadeddata () {
            this.time.duration = this.video.duration
            this.show.duration = this.timeFormat(this.video.duration)
            on(this.video, 'timeupdate', this.timeUpdate)
            on(this.video, 'ended', () => { this.play = false })
        },
        timeUpdate (e) {
            const loaded = (e.target.currentTime - this.time.currentTime) / e.target.duration
            if (this.play) {
                this.moved = Math.min(Math.max(loaded + this.moved, 0), 1)
                this.show.currentTime = this.timeFormat(e.target.currentTime)
            }
            this.time.currentTime = e.target.currentTime
        },
        handlePlay () {
            this.play = !this.play
        },
        volumeClick () {
            if (this.volumeMoved) this.preVolumeMoved = this.volumeMoved
            this.video.volume = this.volumeMoved = this.volumeMoved ? 0 : this.preVolumeMoved
        },
        volumeChange (moved) {
            this.video.volume = moved
        },
        volumnMouseup () {
            console.log(123)
        },
        volumnMouseover () {
            this.volumeStyle = { width: '112px', background: 'rgba(25, 30, 31, 0.8)' }
            this.volumeShow = true
        },
        volumnMouseleave () {
            this.volumeStyle = { width: '50px', background: 'transparent' }
            this.volumeShow = false
        },
        changeVolumeShow (show) {
            this.volumeShow = show
        },
        progressMousedown (moved) {
            this.preIsPlay = this.play
            this.play = false
            this.timeSet(moved)
        },
        progressMousemove (moved) {
            this.timeSet(moved)
        },
        progressMouseup (e) {
            if (e.target.className.indexOf('play') === -1 && this.preIsPlay !== '') {
                this.play = this.preIsPlay
                this.preIsPlay = ''
            }
        },
        timeSet (moved) {
            this.video.currentTime = moved * this.time.duration
            this.show.currentTime = this.timeFormat(this.video.currentTime)
        },
        timeFormat (time) {
            let minute = Math.floor(time / 60).toString()
            let second = Math.floor(time % 60).toString()
            second = second.length === 1 ? `0${second}` : second
            return `${minute}:${second}`
        }
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
            .volume {
                position: relative;
                display: flex;
                align-items: center;
                padding: 0 36px 0 15px;
                width: 50px;
                height: 36px;
                border-radius: 20px;
                background: transparent;
                transition: all .3s linear;
                > .progress {
                    position: absolute;
                    right: 44px;
                    padding: 16px 0;
                    width: 53px;
                }
                &-icon {
                    position: absolute;
                    right: 0;
                    flex: 1;
                    padding: 9px 11px 9px 14px;
                    cursor: pointer;
                }
                .slide-progress-enter-active {
                    animation: bounce-in .3s linear;
                }
                .slide-progress-leave-active {
                    animation: bounce-out .3s linear;
                }
                @keyframes bounce-in {
                    0% {
                        right: 30px;
                        width: 13px;
                    }
                    50% {
                        right: 44px;
                        width: 33px;
                    }
                    100% {
                        right: 44px;
                        width: 53px;
                    }
                }
                @keyframes bounce-out {
                    0% {
                        right: 44px;
                        width: 53px;
                    }
                    50% {
                        right: 44px;
                        width: 13px;
                    }
                    100% {
                        right: 30px;
                        width: 13px;
                    }
                }
            }
            .screen {
                margin-right: 47px;
                margin-left: 18px;
            }
        }
        > .progress {
            margin-top: 10px;
            padding-bottom: 20px;
        }
    }
}
</style>
