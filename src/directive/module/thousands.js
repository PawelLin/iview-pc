import { on } from '@/libs/tools'
export default {
    inserted: (el, binding, vnode) => {
        let input = null
        for (let i of el.children) {
            if (i.tagName.toUpperCase() === 'INPUT') input = i
        }
        if (input) {
            let regExp = new RegExp(`[^,\\d]`)
            let regExp1 = new RegExp('^0\\d|,$')
            let value = ''
            const handleInput = e => {
                if (e.target.value && ((regExp.test(e.target.value)) || regExp1.test(e.target.value))) {
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
                let val = e.target.value.replace(/,/g, '')
                let valFormat = (val && val.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')) || ''
                if (binding.value === 'number') {
                    vnode.componentInstance.$emit('input', val)
                    e.target.value = value = valFormat
                } else {
                    e.target.value = value = valFormat
                    vnode.componentInstance.$emit('input', value)
                }
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
