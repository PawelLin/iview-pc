<template>
    <Form :label-width="100">
        <Row :gutter="20">
            <Col span="8">
                <Card title="全局样式" dis-hover>
                    <Row>
                        <Col>
                            <FormItem label="text-right">
                                <span class="desc">文本向右对齐</span>
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label="text-left">
                                <span class="desc">文本向左对齐</span>
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label="text-center">
                                <span class="desc">文本居中对齐</span>
                            </FormItem>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col span="8">
                <Card title="iview样式覆盖" dis-hover>
                    <Row>
                        <Col>
                            <FormItem label="self-page">
                                <span class="desc">覆盖Page组件样式，使用于Page组件上</span>
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label=".ivu-btn + .ivu-btn">
                                <span class="desc">相邻Button间距为5px</span>
                            </FormItem>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col span="8">
            </Col>
        </Row>
    </Form>
</template>

<script>
export default {
    name: 'demo_css'
}
</script>

<style lang="less" scoped>
.desc {
    display: inline-block;
    min-width: 350px;
}
</style>
