<template>
    <div class="ivu-upload ivu-upload-select" @click="handleClick">
        <input ref="input" type="file" class="ivu-upload-input" @change="handleChange" :multiple="multiple">
        <Button :type="type" icon="md-cloud-upload" :size="btnSize"><slot>点击上传</slot></Button>
    </div>
</template>

<script>
export default {
    name: 'FileUpload',
    props: {
        type: {
            type: String,
            default: 'default'
        },
        btnSize: {
            type: String,
            default: 'small'
        },
        files: {
            type: Array,
            default: () => []
        },
        size: {
            type: Number,
            default: 2
        },
        multiple: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            MB1: 1024 * 1024,
            list: []
        }
    },
    methods: {
        handleClick () {
            this.$refs.input.click()
        },
        handleChange (e) {
            this.$Loading.start()
            const files = e.target.files
            if (!files || files.length === 0) return
            let fileName = files[0].name
            let fileType = fileName.substr(fileName.lastIndexOf('.') + 1).toLowerCase()
            if (this.files.length && this.files.indexOf(fileType) === -1) {
                this.$Message.warning(`只能上传${this.files}的文件`)
            } else if (files[0].size > this.size * this.MB1) {
                this.$Message.warning(`文件大小不能超过${this.size}M`)
            } else {
                this.$emit('change', files)
            }
            this.$Loading.finish()
            e.target.value = ''
        }
    }
}
</script>

<style lang="less" scoped>
.file-contain /deep/ {
    .ivu-tag {
        position: relative;
        padding-right: 20px;
        /deep/ i {
            position: absolute;
            top: 4px;
            right: 4px;
        }
    }
}
</style>
