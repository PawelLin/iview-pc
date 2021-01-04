import { Input } from 'view-design'
function RegexInput (Input) {
    return {
        props: Input.props,
        data () {
            return {
                val: ''
            }
        },
        watch: {
            value (value) {
                this.val = value
            }
        },
        created () {
            this.val = this.value
            this.regExp = new RegExp(this.$attrs.regex)
        },
        methods: {
            _input (e) {
                this.selectionEnd = e.target.selectionEnd
                if (e.target.value && !this.regExp.test(e.target.value)) {
                    e.target.value = this.val
                    this.selectionEnd -= 1
                } else {
                    this.val = e.target.value
                }
                e.target.setSelectionRange(this.selectionEnd, this.selectionEnd)
                this.$emit('input', this.val)
            }
        },
        render (h) {
            return h(Input, {
                nativeOn: {
                    input: this._input
                },
                props: this.$props
            })
        }
    }
}

export default RegexInput(Input)
