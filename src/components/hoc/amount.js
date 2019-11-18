import { Input } from 'iview'
function AmountInput (Input) {
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
            const num2 = this.$attrs.point || 2
            const num1 = (this.$props.maxlength || 12) - num2 - 1
            this.regExp = new RegExp(`^(0|[1-9]\\d{0,${num1 - 1}})?(\\.\\d{0,${num2}})?$`)
            this.regExp1 = new RegExp(`^9{${num1}}\\.$`)
        },
        methods: {
            _input (e) {
                this.selectionEnd = e.target.selectionEnd
                if (e.target.value && (!(this.regExp.test(e.target.value)) || this.regExp1.test(e.target.value))) {
                    const isDel = e.target.value.length < this.val.length
                    const delCharIsPoint = this.val.substr(this.selectionEnd, 1) === '.'
                    e.target.value = this.val
                    this.selectionEnd -= (isDel ? (delCharIsPoint ? -1 : 0) : 1)
                } else {
                    this.val = e.target.value
                }
                e.target.setSelectionRange(this.selectionEnd, this.selectionEnd)
                this.$emit('input', this.val)
            },
            _blur (e) {
                const val = e.target.value && `${parseFloat(e.target.value)}`
                if (this.val !== val) {
                    this.val = val
                    this.$emit('input', this.val)
                }
            }
        },
        render (h) {
            return h(Input, {
                nativeOn: {
                    input: this._input
                },
                on: {
                    'on-blur': this._blur
                },
                props: this.$props
            })
        }
    }
}

export default AmountInput(Input)
