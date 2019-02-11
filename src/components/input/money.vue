<template>
<div>
    <Input @on-change="change($event)" @on-keydown="keydown($event)">
    </Input>
</div>
</template>

<script>
export default {
    data () {
        return {
            value: '',
            maxlength: 9
        }
    },
    created () {
        this.regExp = new RegExp(`^(0|[1-9]\\d{0,${this.maxlength - 1}})(\\.\\d{0,2})?$`)
    },
    methods: {
        keydown (e) {
            this.$nextTick(() => {
                if (e.target.value && !(this.regExp.test(e.target.value))) {
                    e.target.value = this.value
                } else {
                    this.value = e.target.value
                }
                this.$emit('input', this.value)
            })
        },
        change (e) {
            this.$nextTick(() => {
                if (e.target.value && !(this.regExp.test(e.target.value))) {
                    e.target.value = this.value
                } else {
                    this.value = e.target.value
                }
            })
        }
    }
}
</script>
