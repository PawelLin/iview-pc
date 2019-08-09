import { on } from '@/libs/tools'
export default {
    inserted: (el, binding, vnode) => {
        let input = null
        for (let i of el.children) {
            if (i.tagName.toUpperCase() === 'INPUT') input = i
        }
        if (input) {
            let regExp = binding.value || new RegExp(`^(0|[1-9]\\d*)$`)
            let value = ''
            const handleInput = e => {
                if (e.target.value && !(regExp.test(e.target.value))) {
                    e.target.value = value
                } else {
                    value = e.target.value
                }
                vnode.componentInstance.$emit('input', value)
                vnode.componentInstance.$nextTick(() => {
                    e.target.value = value
                })
            }
            const handleFocus = e => { // 同步value
                value = e.target.value
            }
            on(input, 'input', handleInput)
            on(input, 'focus', handleFocus)
        }
    }
}
