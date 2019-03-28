<template>
    <div class="start">
        <img :width="imgWidth" :height="imgHeight" src="@/assets/images/star-gray.png" alt="start">
        <div class="start-light" :style="{ width: `${width}%`, backgroundSize: `${backgroundSize}% 100%` }"></div>
    </div>
</template>

<script>
export default {
    props: {
        nums: {
            type: Number,
            default: 0
        },
        imgWidth: {
            type: String,
            default: 'auto'
        },
        imgHeight: {
            type: String,
            default: 'auto'
        }
    },
    computed: {
        width () {
            return this.nums * 20 + ((this.nums % 1 !== 0) ? (this.nums - 2.5) : 0)
        },
        backgroundSize () {
            return this.nums === 0 ? 100 : (10000 / this.width)
        }
    }
}
// 4.5 2
// 3.5 1
// 2.5 0
// 1.5 -1
// 0.5 -2
</script>

<style lang="less" scoped>
.start {
    position: relative;
    display: inline-block;
    font-size: 0;
    &-light {
        position: absolute;
        top: 0;
        left: 0;
        width: 0%;
        height: 100%;
        background: url('../assets/images/star.png');
        background-size: 100% 100%;
        background-repeat: no-repeat;
    }
}
</style>
