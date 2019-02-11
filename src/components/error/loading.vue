<template>
    <section>
        <Spin size="large" fix>
            <Icon type="ios-loading" size=100 class="spin-rotate"></Icon>
            <!-- <div style="font-size: 20px">加载中</div> -->
        </Spin>
    </section>
</template>

<style lang="less" scoped>
.spin-rotate{
    animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    from { transform: rotate(0deg);}
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}
</style>
