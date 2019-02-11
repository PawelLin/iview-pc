<template>
    <Form ref="formValidate" :model="form" :rules="rules" :label-width="100" label-position="left" inline>
        <Row>
            <Col>
                <FormItem label="文件上传" prop="file">
                    <FileUpload v-model="form.file" @change="uploadFile" :files="['xls', 'xlsx']"></FileUpload>
                </FormItem>
            </Col>
            <Col>
                <FormItem label="多文件上传" prop="files">
                    <FileUpload v-model="form.files" @change="uploadFiles" :files="['xls', 'xlsx', 'txt']" multiple></FileUpload>
                </FormItem>
            </Col>
            <Col>
                <FormItem label="筛选下拉框" prop="select">
                    <InputSelect v-model="form.select" :options="list" values="id" label="name"  />
                </FormItem>
                <span class="desc">只针对label的筛选</span>
            </Col>
            <Col>
                <FormItem label="自定义图标">
                    <Icon custom="iconfont icon-bank" size="20" color="#2d8cf0"/>
                </FormItem>
            </Col>
            <Col>
                <Button @click="handleSubmit" type="primary">提交</Button>
            </Col>
        </Row>
    </Form>
</template>

<script>
import InputSelect from '_c/input/select.vue'
import FileUpload from '_c/upload/file.vue'
export default {
    name: 'demo_component',
    components: {
        FileUpload,
        InputSelect
    },
    data () {
        return {
            form: {
                file: '',
                files: '',
                select: ''
            },
            list: [
                { id: '1', name: '角色1' },
                { id: '21', name: '角色2' },
                { id: '31', name: '角色3' },
                { id: '41', name: '角色4' }
            ],
            rules: {
                file: { required: true },
                files: { required: true },
                select: { required: true }
            }
        }
    },
    methods: {
        uploadFile (files) {
            let formData = new FormData()
            // let fileName = files[0].name
            formData.append('file', files[0])
            this.$http.post('/uploadFile', formData).then(res => {
                this.$Message.success('上传成功')
            }).catch(() => {})
        },
        uploadFiles (files) {
            console.log(files)
        },
        handleSubmit () {
            this.$refs.formValidate.validate(valid => {

            })
        }
    }
}
</script>

<style lang="less" scoped>
.desc {
    display: inline-block;
    padding: 10px 0;
    line-height: 1;
}
.value {
    line-height: 2;
}
</style>
