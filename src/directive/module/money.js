import { on } from '@/libs/tools'
export default {
    inserted: (el, binding, vnode) => {
        let input = null
        for (let i of el.children) {
            if (i.tagName.toUpperCase() === 'INPUT') input = i
        }
        if (input) {
            let num1 = (binding.value && binding.value[0]) || 9
            let num2 = (binding.value && binding.value[1]) || 2
            let regExp = new RegExp(`^(0|[1-9]\\d{0,${num1 - 1}})(\\.\\d{0,${num2}})?$`)
            let regExp1 = new RegExp(`^9{${num1}}\\.$`)
            let value = ''
            const handleInput = e => {
                if (e.target.value && (!(regExp.test(e.target.value)) || regExp1.test(e.target.value))) {
                    e.target.value = value
                } else {
                    value = e.target.value
                }
                vnode.componentInstance.$emit('input', value)
                vnode.componentInstance.$nextTick(() => {
                    e.target.value = value
                })
            }
            const handleBlur = e => {
                e.target.value = e.target.value && `${parseFloat(e.target.value)}`
                vnode.componentInstance.$emit('input', e.target.value)
            }
            const handleFocus = e => { // 同步value
                value = e.target.value
            }
            on(input, 'input', handleInput)
            on(input, 'blur', handleBlur)
            on(input, 'focus', handleFocus)
        }
    }
}
