<template>
    <div class="video">
        <video ref="video" @loadstart="loadstart" @loadeddata="loadeddata" src="@/assets/test.mp4" controls></video>
        <div class="operation">
            <div class="button-bar">
                <Icon @click="handlePlay" class="play" :type="play ? 'ios-pause' : 'ios-play'" size="18" />
                <span class="time">{{show.currentTime}} / {{show.duration}}</span>
                <div class="volume">
                    <Icon type="md-volume-up" size="18" />
                </div>
                <Icon class="screen" type="md-expand" size="18" />
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
            play: false,
            show: {
                currentTime: '00:00',
                duration: '00:00'
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
        this.volumeMove = false
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
            minute = minute.length === 1 ? `0${minute}` : minute
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
        bottom: 200px;
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
            padding-bottom: 20px;
        }
    }
}
</style>
