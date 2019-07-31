<template>
    <div class="ivu-upload ivu-upload-select" @click="handleClick">
        <!-- 模拟Input组件的必填 -->
        <Input :value="value" disabled style="display: none;"></Input>
        <input ref="input" type="file" class="ivu-upload-input" @change="handleChange" :multiple="multiple" :accept="accept">
        <Button :type="type" icon="md-cloud-upload" :size="btnSize"><slot>点击上传</slot></Button>
    </div>
</template>

<script>
import ACCEPTS from './accept'
export default {
    name: 'FileUpload',
    props: {
        value: {
            type: String,
            default: ''
        },
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
            accept: ''
        }
    },
    watch: {
        files (files) {
            this.setAccept(files)
        }
    },
    beforeCreate () {
        this.MB1 = 1024 * 1024
    },
    created () {
        this.setAccept(this.files)
    },
    methods: {
        setAccept (files) {
            this.accept = files.map(type => ACCEPTS[type]).join(',')
        },
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
