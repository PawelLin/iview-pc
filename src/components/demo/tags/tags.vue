<template>
    <Card :title="form.id ? '人物编辑' : '人物新增'" dis-hover>
        <Form ref="form" :model="form" :rules="rules" :label-width="60" inline>
            <FormItem label="姓名" prop="name">
                <Input type="text" v-model="form.name" placeholder="姓名"></Input>
            </FormItem>
            <FormItem label="性别" prop="sex">
                <Select v-model="form.sex">
                    <Option value="0">男</Option>
                    <Option value="1">女</Option>
                </Select>
            </FormItem>
            <FormItem>
                <Button type="primary" @click="handleSubmit()">提交</Button>
                <RemoveTag ref="removeTag" />
            </FormItem>
        </Form>
    </Card>
</template>

<script>
import { mapMutations } from 'vuex'
export default {
    name: 'demo_tags_detail',
    data () {
        return {
            form: {
                id: '',
                name: '',
                sex: ''
            },
            rules: {
                name: { required: true },
                sex: { required: true }
            }
        }
    },
    watch: {
        $route: {
            handler (to, from) {
                let key1 = `${to.name}${to.query.id || ''}`
                let key2 = `${from.name}${from.query.id || ''}`
                if (from.name === this.$options.name) {
                    this.setData({ [key2]: { ...this.form } })
                }
                if (to.query.id && !this.$store.state.data[key1]) {
                    this.init(to.query)
                } else {
                    if (!to.query.id) this.$refs.form.resetFields()
                    this.form = Object.assign(this.form, this.$store.state.data[key1] || this.initForm)
                }
            },
            deep: true
        }
    },
    created () {
        this.initForm = { ...this.form }
        this.init(this.$route.query)
    },
    methods: {
        ...mapMutations([
            'setData'
        ]),
        init (item) {
            if (item.id) {
                this.form = Object.assign(this.form, item)
            }
        },
        handleSubmit () {
            this.$refs.form.validate(valid => {
                if (valid) {
                    this.$Message.success('提交成功')
                    this.$refs.removeTag.handleRemove('demo_tags')
                }
            })
        }
    }
}
</script>
