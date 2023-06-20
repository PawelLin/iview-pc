<template>
    <Form :label-width="120">
        <Row :gutter="20">
            <Col span="12">
                <Card title="tools.js" dis-hover>
                    <Row>
                        <Col>
                            <FormItem label="objEqual">
                                <span class="desc">判断两个对象是否相等 ( 这两个对象的值只能是数字或字符串 )</span>
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label="objNotEqual">
                                <span class="desc">判断两个对象是否不相等 ( 这两个对象的值可以是数字/字符串/对象[Object] )</span>
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label="objInArr">
                                <span class="desc">判断数组是否包含对象 （ 对象的值可以是数字/字符串/对象[Object] ）</span>
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label="on">
                                <span class="desc">绑定事件</span>
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label="off">
                                <span class="desc">解绑事件</span>
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label="dateFormat">
                                <span class="desc">日期格式化</span>
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label="numberFormat">
                                <span class="desc">金额数字格式化</span>
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label="assignHas">
                                <span class="desc">只合并对象拥有的属性</span>
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label="shortName">
                                <span class="desc">字符串长度超过num缩略显示</span>
                            </FormItem>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col span="12">
                <Card title="utils.js" dis-hover>
                    <Row>
                        <Col>
                            <FormItem label="setToken">
                                <span class="desc">设置鉴权token</span>
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label="getToken">
                                <span class="desc">获取鉴权token</span>
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label="getRoutesOfMeta">
                                <span class="desc">获取设置了meta值的路由</span>
                            </FormItem>
                        </Col>
                        <Col>
                            <FormItem label="getRoutesOfCache">
                                <span class="desc">获取未设置notCache=true的路由</span>
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
    name: 'demo_tools'
}
</script>

<style lang="less" scoped>
.desc {
    display: inline-block;
    min-width: 350px;
}
</style>
