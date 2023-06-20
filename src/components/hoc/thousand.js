import AmountInput from './amount'
function ThousandInput (Input) {
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
        },
        methods: {
            _input (e) {
                this.val = e.target.value
                e.target.value = Number(this.val).toLocaleString()
                this.$emit('input', this.val)
                this.$nextTick(() => {
                    e.target.value = Number(this.val).toLocaleString()
                })
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

export default ThousandInput(AmountInput)
