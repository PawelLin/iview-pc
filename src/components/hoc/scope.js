function ScopeInput (Input) {
    return {
        props: Input.props,
        render (h) {
            const slots = Object.keys(this.$slots).map(key => {
                this.$slots[key][0].context = this._self
                return this.$slots[key][0]
            })
            return h(Input, {
                on: this.$listeners,
                props: this.$props
            }, slots)
        }
    }
}

export default ScopeInput
