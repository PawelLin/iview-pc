<template>
    <Form ref="formValidate" :model="form" :rules="rules" :label-width="100" label-position="left" inline>
        <Row>
            <Col>
                <FormItem label="文件上传" prop="fileName">
                    <FileUpload v-model="form.fileName" @change="uploadFile" :files="['xls', 'xlsx']"></FileUpload>
                    <Tag v-show="form.fileName" style="margin-left:10px;cursor: default;">{{form.fileName | shortName(16, form.fileType)}}{{form.fileType}}</Tag>
                </FormItem>
            </Col>
            <Col>
                <FormItem label="多文件上传" prop="filesName">
                    <FileUpload v-model="form.filesName" @change="uploadFiles" :files="['xls', 'xlsx', 'txt', 'jpg', 'mp4', 'mp3']" multiple></FileUpload>
                    <Tag v-for="item in form.filesTags" :key="`${item.name}${item.type}`" style="margin-left:10px;cursor: default;">
                        {{item.name | shortName(16, item.type)}}{{item.type}}
                    </Tag>
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
                    <Icon custom="iconfont icon-line" size="20" color="#2d8cf0"/>
                    <Icon custom="iconfont icon-bank" size="20" color="#2d8cf0"/>
                </FormItem>
                <span class="desc">使用的自定义图标来自<a target="_blank" href="https://www.iconfont.cn/">iconfont</a>，新增图标需重新生成图标字体包</span>
            </Col>
            <Col>
                <Button @click="handleSubmit" type="primary">提交</Button>
            </Col>
        </Row>
    </Form>
</template>

<script>
import InputSelect from '@/components/input/select.vue'
import FileUpload from '@/components/upload/file.vue'
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
                fileName: '',
                fileType: '',
                files: '',
                filesName: '',
                filesTags: [],
                select: ''
            },
            list: [
                { id: '1', name: '角色1' },
                { id: '21', name: '角色2' },
                { id: '31', name: '角色3' },
                { id: '41', name: '角色4' }
            ],
            rules: {
                fileName: { required: true, message: '请选择文件' },
                filesName: { required: true, message: '请选择文件' },
                select: { required: true, message: '请选择' }
            }
        }
    },
    methods: {
        uploadFile (files) {
            let formData = new FormData()
            this.form.fileName = files[0].name
            this.form.fileType = files[0].name.substr(files[0].name.lastIndexOf('.'))
            formData.append('file', files[0])
            // this.$http.post('/uploadFile', formData).then(res => {
            //     this.$Message.success('上传成功')
            // }).catch(() => {})
        },
        uploadFiles (files) {
            this.form.filesTags = []
            this.form.filesName = ''
            let formData = new FormData()
            for (let i = 0; i < files.length; i++) {
                this.form.filesName += files[i].name
                formData.append('file', files[i], files[i].name)
                this.form.filesTags.push({ name: files[i].name, type: files[i].name.substr(files[i].name.lastIndexOf('.')) })
            }
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
