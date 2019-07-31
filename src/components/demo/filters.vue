<template>
    <Form class="demo-filters" :label-width="100">
        <Row>
            <Col>
                <FormItem label="日期格式化">
                    <Breadcrumb separator="=>">
                        <BreadcrumbItem>new Date | dateFormat</BreadcrumbItem>
                        <BreadcrumbItem>{{new Date() | dateFormat}}</BreadcrumbItem>
                    </Breadcrumb>
                </FormItem>
            </Col>
            <Col>
                <FormItem label="金额格式化">
                    <Breadcrumb separator="=>">
                        <BreadcrumbItem>123456 | numberFormat</BreadcrumbItem>
                        <BreadcrumbItem>{{123456 | numberFormat}}</BreadcrumbItem>
                    </Breadcrumb>
                </FormItem>
            </Col>
            <Col>
                <FormItem label="enums枚举">
                    <Breadcrumb separator="=>">
                        <BreadcrumbItem> 1 | STATUS</BreadcrumbItem>
                        <BreadcrumbItem>{{1 | STATUS}}</BreadcrumbItem>
                    </Breadcrumb>
                </FormItem>
            </Col>
        </Row>
    </Form>
</template>

<script>
export default {
    name: 'demo_filters'
}
</script>

<style lang="less" scoped>
.demo-filters {
    /deep/ .ivu-breadcrumb-item-separator{
        padding: 0 5px;
        color: #ff5500;
        font-weight: bold;
    }
    /deep/ .ivu-breadcrumb > span:first-child > .ivu-breadcrumb-item-link {
        display: inline-block;
        min-width: 150px;
        text-align: right;
    }
}
</style>
