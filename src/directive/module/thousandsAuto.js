import { on } from '@/libs/tools'
export default {
    inserted: (el, binding, vnode) => {
        let input = null
        for (let i of el.children) {
            if (i.tagName.toUpperCase() === 'INPUT') input = i
        }
        if (input) {
            let thousand = val => val.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')
            let number = val => val.replace(/[^\d]/g, '')
            let comma = val => val.replace(/[^,]/g, '')
            let zero = val => /^0/.test(val) ? '0' : val
            let value = zero(number(input.value))
            vnode.componentInstance.$emit('input', binding.value === 'number' ? value : thousand(value))
            const handleInput = e => {
                let selectionEnd = e.target.selectionEnd
                let _format = thousand(value)
                let val = zero(number(e.target.value))
                let char = /\d/.test(e.target.value.substr(selectionEnd - 1, 1))
                // 删除后，前后的value相同，说明删除的是逗号，需要处理成把逗号前面的数字也删除掉
                if (value === val && e.target.value.length < _format.length) {
                    value = number(_format.substr(0, selectionEnd - 1) + _format.substr(selectionEnd, _format.length))
                    selectionEnd -= 1
                } else {
                    value = val
                    selectionEnd -= (char ? 0 : 1)
                }
                vnode.componentInstance.$emit('input', binding.value === 'number' ? value : thousand(value))
                vnode.componentInstance.$nextTick(() => {
                    e.target.value = thousand(value)
                    selectionEnd += comma(e.target.value).length - comma(_format).length
                    selectionEnd = selectionEnd < 0 ? e.target.value.length : selectionEnd
                    e.target.setSelectionRange(selectionEnd, selectionEnd)
                })
            }
            const handleFocus = e => { // 同步value
                value = number(e.target.value)
            }
            on(input, 'input', handleInput)
            on(input, 'focus', handleFocus)
        }
    },
    update: (el, binding, vnode) => {
        let trans = val => val && parseInt(val.toString().replace(/,/g, '')).toString()
        let val = trans(vnode.componentInstance.value)
        let val1 = trans(vnode.componentInstance.$refs.input.value)
        if (val && val !== val1) {
            let valFormat = val.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')
            if (binding.value === 'number') {
                vnode.componentInstance.$emit('input', val)
                vnode.componentInstance.$nextTick(() => {
                    vnode.componentInstance.$refs.input.value = valFormat
                })
            } else {
                vnode.componentInstance.$emit('input', valFormat)
            }
        }
    }
}
