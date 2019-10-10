<template>
    <section class="title" :style="{ paddingRight: collapsed ? '0px' : '20px' }">
        <!-- <img src="../../assets/images/bank.png" alt="银行" width="21"> -->
        <Icon custom="iconfont icon-bank" size="21" color="white"/>
        <h2 v-show="!collapsed">农村信用社联合社</h2>
    </section>
</template>

<script>
export default {
    name: 'TitleBar',
    props: {
        collapsed: {
            type: Boolean,
            default: false
        }
    }
}
</script>

<style lang="less" scoped>
.title {
    height: 64px;
    line-height: 64px;
    text-align: center;
    color: #ffffff;
    white-space: nowrap;
    i {
        margin-top: -5px;
        vertical-align: middle;
    }
    h2 {
        margin-left: 6px;
        display: inline-block;
        vertical-align: middle;
        min-width: 144px;
    }
}
</style>
