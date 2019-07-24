<template>
    <Form :label-width="120">
        <Row :gutter="20">
            <Col span="12">
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
            <Col span="12">
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
                        <Col>
                            <FormItem label=".ivu-form-item-error input[type=file] + .ivu-btn">
                                <span class="desc">Form包含设置了prop的FileUpload，必填样式定义</span>
                            </FormItem>
                        </Col>
                    </Row>
                </Card>
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
