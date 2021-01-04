import { Input } from 'iview'
function NumberInput (Input) {
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
            this.regExp = new RegExp(`^(0|[1-9]\\d*)$`)
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
                this.$listeners['on-change'] && this.$listeners['on-change'](e)
            }
        },
        render (h) {
            const slots = Object.keys(this.$slots).map(key => {
                this.$slots[key][0].context = this._self
                return this.$slots[key][0]
            })
            const listeners = {}
            const notListeners = ['input', 'on-change']
            Object.keys(this.$listeners).forEach(key => {
                if (notListeners.indexOf(key) === -1) listeners[key] = this.$listeners[key]
            })
            return h(Input, {
                nativeOn: {
                    input: this._input
                },
                on: listeners,
                props: this.$props
            }, slots)
        }
    }
}

export default NumberInput(Input)
