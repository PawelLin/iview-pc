<template>
    <Card title="迭代日志" shadow>
        <Timeline class="time-line">
            <TimelineItem>
                <p class="title">
                    <span>2019.02.11</span>
                    <!-- <code class="online">2019-08-01</code> -->
                </p>
                <ul class="content">
                    <li>项目初始化及公共功能开发 - <code>e2cf0190b8052b00a0c5526f727d152f9b0e6c2d</code></li>
                </ul>
            </TimelineItem>
            <TimelineItem>
                <p class="title">
                    <span>2019.02.17</span>
                </p>
                <ul class="content">
                    <li>新增动态页面标签栏</li>
                </ul>
            </TimelineItem>
            <TimelineItem>
                <p class="title">
                    <span>2019.03.08</span>
                </p>
                <ul class="content">
                    <li>新增手动关闭页面标签方法</li>
                    <li>新增同组件对应多个页面标签的标签栏类型</li>
                </ul>
            </TimelineItem>
            <TimelineItem>
                <p class="title">
                    <span>2019.07.24</span>
                </p>
                <ul class="content">
                    <li>新增迭代日志</li>
                    <li>优化输入框指令，不再依赖this，从vnode获取</li>
                </ul>
            </TimelineItem>
            <TimelineItem>
                <p class="title">
                    <span>2019.07.26</span>
                </p>
                <ul class="content">
                    <li>新增公共请求说明模块</li>
                    <li>新增文件下载公共请求</li>
                </ul>
            </TimelineItem>
            <TimelineItem>
                <p class="title">
                    <span>2019.07.31</span>
                </p>
                <ul class="content">
                    <li>文件上传组件新增accept属性</li>
                </ul>
            </TimelineItem>
            <TimelineItem>
                <p class="title">continue...</p>
            </TimelineItem>
        </Timeline>
    </Card>
</template>

<script>
export default {
    name: 'demo_logs'
}
</script>

<style lang="less" scoped>
.time-line /deep/ .ivu-timeline-item-content {
    top: -6px;
}
.title {
    margin-bottom: 10px;
    font-size: 18px;
    color: #515a6e;
    > span {
        margin-right: 10px;
        vertical-align: middle;
    }
}
.content {
    padding-left: 22px;
    font-size: 16px;
    > li + li {
        margin-top: 5px;
    }
}
code {
    display: inline-block;
    background: #f7f7f7;
    font-family: Consolas,Monaco,Andale Mono,Ubuntu Mono,monospace;
    margin: 0 3px;
    padding: 0px 5px;
    border-radius: 3px;
    color: #666;
    border: 1px solid #eee;
    font-size: 13px;
    &.online {
        border: 1px solid #8ce6b0;
        background-color: #edfff3;
    }
}
</style>
