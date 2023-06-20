<template>
    <Form ref="formValidate" :model="form" :rules="rules" :label-width="100" label-position="left" inline>
        <Row>
            <Col span="8">
                <Row>
                    <Col>
                        <FormItem label="文件上传" prop="fileName">
                            <FileUpload v-model="form.fileName" @change="uploadFile" :files="['xls', 'xlsx']"></FileUpload>
                            <Tag v-show="form.fileName" style="margin-left:10px;cursor: default;">{{form.fileName | shortName(16)}}</Tag>
                        </FormItem>
                    </Col>
                    <Col>
                        <FormItem label="多文件上传" prop="filesName">
                            <FileUpload v-model="form.filesName" @change="uploadFiles" :files="['xls', 'xlsx', 'txt', 'jpg', 'mp4', 'mp3']" multiple></FileUpload>
                            <Tag v-for="item in form.filesTags" :key="`${item.name}`" style="margin-left:10px;cursor: default;">
                                {{item.name | shortName(16)}}
                            </Tag>
                        </FormItem>
                    </Col>
                    <Col>
                        <FormItem label="媒体类上传" prop="mediaList">
                            <MediaUpload v-model="form.mediaList" :media-list="form.mediaList" type="audio,image,video" compress></MediaUpload>
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
                        <RemoveTag>[返回并删除Tag]组件</RemoveTag>
                    </Col>
                </Row>
            </Col>
        </Row>
    </Form>
</template>

<script>
import InputSelect from '@/components/input/select.vue'
import FileUpload from '@/components/upload/file.vue'
import MediaUpload from '@/components/upload/media.vue'
export default {
    name: 'demo_component',
    components: {
        FileUpload,
        MediaUpload,
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
                mediaList: [],
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
                mediaList: { required: true, message: '请选择文件' },
                select: { required: true, message: '请选择' }
            },
            columns: [
                { title: 'title1', key: 'title1', colspan: 1, rowspan: 1 },
                { title: '', slot: 'img', colspan: 2, rowspan: 3 },
                { title: 'title2', key: 'title2', colspan: 1, rowspan: 1 },
                { title: 'title3', key: 'title3', colspan: 1, rowspan: 1 },
                { title: 'title4', key: 'title4', colspan: 1, rowspan: 1 },
                { title: 'title5', key: 'title5', colspan: 1, rowspan: 1 }
            ],
            data: {
                title1: 'title1',
                title2: 'title2',
                title3: 'title3',
                title4: 'title4',
                title5: 'title5',
                title6: 'title6',
                title7: 'title7',
                title8: 'title8',
                title9: 'title9',
                img: 'https://git.f-road.com.cn/uploads/-/system/user/avatar/36/avatar.png?width=400',
                form1: 2
            },
            tableForm: {
                form1: 4
            }
        }
    },
    methods: {
        uploadFile (files) {
            console.log(files[0])
            let formData = new FormData()
            this.form.fileName = files[0].name
            formData.append('file', files[0])
            this.$http.post('/uploadFile', formData).then(res => {
                this.$Message.success('上传成功')
            }).catch(() => {})
        },
        uploadFiles (files) {
            this.form.filesName = ''
            let formData = new FormData()
            formData.append('aa', '123')
            for (let i = 0; i < files.length; i++) {
                this.form.filesName += files[i].name
                formData.append('bb', files[i], files[i].name)
                this.form.filesTags.push({ name: files[i].name })
            }
            this.$http.post('/uploadFile', formData).then(res => {
                this.$Message.success('上传成功')
            }).catch(() => {})
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
