<template>
    <Form :label-width="120">
        <Row :gutter="20">
            <Col span="12">
                <Card title="service.js" dis-hover>
                    <Row>
                        <Col v-for="item in list" :key="item.method">
                            <FormItem :label="item.label">
                                <span class="desc">{{item.method}}</span>
                                <Button class="button" @click="common(item)" type="primary" size="small">{{item.button}}</Button>
                            </FormItem>
                        </Col>
                    </Row>
                </Card>
            </Col>
            <Col span="12" v-show="title">
                <Card dis-hover>
                    <p slot="title">{{title}}-响应数据</p>
                    <div>{{content}}</div>
                </Card>
            </Col>
        </Row>
    </Form>
</template>

<script>
import { getOrgList, downloadBlob, downloadForm } from '@/libs/service'
export default {
    name: 'demo_service',
    data () {
        return {
            title: '',
            content: '',
            list: [
                { label: '获取机构列表', method: 'getOrgList', button: '获取' },
                { label: '文件下载-blob', method: 'downloadBlob', button: '下载', download: true },
                { label: '文件下载-form', method: 'downloadForm', button: '下载', download: true }
            ]
        }
    },
    methods: {
        common (item) {
            this.title = item.download ? '' : item.label
            this[item.method]()
        },
        getOrgList () {
            getOrgList().then(res => {
                this.content = res.data.data
            })
        },
        downloadBlob () {
            downloadBlob('/file')
        },
        downloadForm () {
            downloadForm('/file')
        }
    }
}
</script>

<style lang="less" scoped>
.desc {
    display: inline-block;
    min-width: 120px;
}
.button {
    margin-right: 10px;
}
</style>
