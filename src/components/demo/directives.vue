<template>
    <Form class="demo-filters" :label-width="100">
        <Row>
            <Col>
                <FormItem label="v-money">
                    <span class="desc">限制input只能输入金额格式的数字</span>
                    用法：v-money = " [ num1, num2 ] "
                </FormItem>
            </Col>
            <Col>
                <FormItem label="v-number">
                    <span class="desc">限制input只能输入数字</span>
                    用法：v-number
                </FormItem>
            </Col>
            <Col>
                <FormItem label="v-thousands">
                    <span class="desc">限制input只能输入数字和逗号，失去焦点自动格式化千分位</span>
                    用法：v-thousands = " 'number' "
                </FormItem>
            </Col>
            <Col>
                <FormItem label="v-maxheight">
                    <span class="desc">设置dom的最大高度</span>
                    用法：v-maxheight = " other-height "
                </FormItem>
            </Col>
        </Row>
    </Form>
</template>

<script>
export default {
    name: 'demo_directives'
}
</script>

<style lang="less" scoped>
.desc {
    display: inline-block;
    min-width: 350px;
}
</style>
