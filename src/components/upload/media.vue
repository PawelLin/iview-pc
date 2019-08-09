<template>
    <section class="media-upload">
        <!-- 模拟Input组件的必填 -->
        <Input :value="value.join('')" disabled style="display: none;"></Input>
        <div v-for="(item, index) in list" class="list" :key="`${item.name}${index}`">
            <img v-if="item.type === 'image'" :src="item.src">
            <video v-else-if="item.type === 'video'" :src="item.src"></video>
            <Icon v-else type="ios-musical-notes" size="40" />
            <div class="operate">
                <Icon :type="item.type === 'image' ? 'ios-eye-outline' : 'ios-play'" @click.native="handleView(item)"></Icon>
                <Icon type="ios-trash-outline" @click.native="handleRemove(item, index)"></Icon>
            </div>
        </div>
        <a v-if="list.length < max" class="add" href="javascript:;" @click="handleAdd">
            <Icon type="ios-add" size="40" />
            <input @change="handleChange" ref="file" type="file" :accept="accept">
        </a>
        <Modal
            v-model="modal.show"
            title="预览"
            footer-hide
            :mask-closable="false"
            @on-visible-change="modalChange">
            <div class="contain">
                <img v-if="modal.type === 'image'" class="media" :src="modal.src">
                <video v-if="modal.type === 'video'" class="media" :src="modal.src" controls></video>
                <audio v-if="modal.type === 'audio'" class="media" :src="modal.src" controls></audio>
            </div>
        </Modal>
    </section>
</template>

<script>
export default {
    name: 'MediaUpload',
    props: {
        value: {
            type: Array,
            default: () => []
        },
        type: {
            type: String, // image,video,audio
            default: ''
        },
        max: {
            type: Number,
            default: 5
        },
        size: {
            type: Number,
            default: 30
        },
        compress: {
            type: Boolean,
            default: false
        }
    },
    data () {
        return {
            list: JSON.parse(JSON.stringify(this.value)), // js中数组和对象通过引用传入，数组或对象类型的prop，子组件改变该prop会影响父组件，此处直接改变引用
            modal: {
                show: false,
                src: '',
                type: ''
            }
        }
    },
    computed: {
        accept () {
            return (this.type && this.type.split(',').map(item => `${item}/*`).join(',')) || 'image/*,video/*,audio/*'
        }
    },
    watch: {
        value (list) {
            if (list.length !== this.list.length) {
                this.list = JSON.parse(JSON.stringify(list))
            }
        }
    },
    beforeCreate () {
        this.MB1 = 1024 * 1024
        this.enums = { image: '图片', video: '视频', audio: '音频' }
    },
    created () {
        this.types = this.type.split(',')
        window.URL = window.URL || window.webkitURL
    },
    methods: {
        handleAdd () {
            this.$refs.file.click()
        },
        handleChange (e) {
            let media = {}
            let file = e.target.files[0]
            let types = file.type.split('/')
            if (this.type && this.types.indexOf(types[0]) === -1) {
                this.$Message.warning(`只能上传${this.types.map(item => this.enums[item]).join(',')}类的文件`)
            } else if (file.size > this.size * this.MB1) {
                this.$Message.warning(`文件大小不能超过${this.size}M`)
            } else {
                media.type = types[0]
                if (this.compress && types[1] === 'jpeg') {
                    this.handleCompress(file).then(data => {
                        media.src = data.src
                        media.file = data.file
                        this.list.push(media)
                        this.$emit('input', this.list)
                    })
                } else {
                    media.src = window.URL.createObjectURL(file)
                    this.list.push(media)
                    this.$emit('input', this.list)
                }
            }
            e.target.value = ''
        },
        handleView (media) {
            this.modal.type = media.type
            this.modal.src = media.src
            this.modal.show = true
        },
        handleRemove (media, index) {
            this.list.splice(index, 1)
            window.URL.revokeObjectURL(media.src)
            this.$emit('input', this.list)
        },
        modalChange (status) {
            if (!status) {
                this.modal.type = ''
                this.modal.src = ''
            }
        },
        handleCompress (file) {
            return new Promise((resolve, reject) => {
                let reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                    let img = new Image()
                    img.src = reader.result
                    img.onload = () => {
                        let canvas = document.createElement('canvas')
                        let ctx = canvas.getContext('2d')
                        canvas.width = img.width
                        canvas.height = img.height
                        ctx.clearRect(0, 0, canvas.width, canvas.height)
                        ctx.fillStyle = 'white'
                        ctx.fillRect(0, 0, canvas.width, canvas.height)
                        ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
                        let DataURL = canvas.toDataURL('image/jpeg', 0.8)
                        resolve({ src: DataURL, file: this.dataURItoBlob(DataURL) })
                    }
                }
            })
        },
        dataURItoBlob (dataURL) {
            dataURL = dataURL.split(',')
            let data = window.atob(dataURL[1])
            let mime = dataURL[0].match(/:(.*?);/)[1]
            let ia = new Uint8Array(data.length)
            for (let i = 0; i < data.length; i++) {
                ia[i] = data.charCodeAt(i)
            }
            return new Blob([ia], { type: mime })
        }
    },
    beforeDestroy () {
        this.list.forEach(media => {
            window.URL.revokeObjectURL(media.src)
        })
    }
}
</script>

<style lang="less" scoped>
.media-upload {
    display: flex;
    > .list {
        position: relative;
        margin-right: 10px;
        width: 120px;
        height: 120px;
        line-height: 120px;
        border: 1px dashed #dcdee2;
        border-radius: 4px;
        text-align: center;
        > img, > video, > audio {
            width: 100%;
            height: 100%;
            border-radius: 4px;
            user-select: none;
        }
        > .operate {
            position: absolute;
            display: none;
            justify-content: space-around;
            align-items: center;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            text-align: center;
            background: rgba(0, 0, 0, .6);
            border-radius: 4px;
            opacity: 0;
            /deep/ i {
                font-size: 30px;
                color: #ffffff;
                cursor: pointer;
            }
        }
        &:hover {
            > .operate {
                display: flex;
                opacity: 1;
            }
        }
    }
}
.add {
    width: 120px;
    height: 120px;
    line-height: 120px;
    text-align: center;
    color: #515a6e;
    border: 1px dashed #dcdee2;
    border-radius: 4px;
    transition: border-color .2s ease;
    > input {
        display: none;
    }
    &:hover {
        border: 1px dashed #2d8cf0;
    }
}
.contain {
    text-align: center;
    > .media {
        text-align: center;
        max-width: 100%;
        max-height: 400px;
        outline: none;
    }
}
</style>
