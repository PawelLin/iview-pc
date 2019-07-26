import { on } from '@/libs/tools'
const directives = {
    draggable: {
        inserted: (el, binding, vnode) => {
            let triggerDom = document.querySelector(binding.value.trigger)
            triggerDom.style.cursor = 'move'
            let bodyDom = document.querySelector(binding.value.body)
            let pageX = 0
            let pageY = 0
            let transformX = 0
            let transformY = 0
            let canMove = false
            const handleMousedown = e => {
                let transform = /\(.*\)/.exec(bodyDom.style.transform)
                if (transform) {
                    transform = transform[0].slice(1, transform[0].length - 1)
                    let splitxy = transform.split('px, ')
                    transformX = parseFloat(splitxy[0])
                    transformY = parseFloat(splitxy[1].split('px')[0])
                }
                pageX = e.pageX
                pageY = e.pageY
                canMove = true
            }
            const handleMousemove = e => {
                let xOffset = e.pageX - pageX + transformX
                let yOffset = e.pageY - pageY + transformY
                if (canMove) bodyDom.style.transform = `translate(${xOffset}px, ${yOffset}px)`
            }
            const handleMouseup = e => {
                canMove = false
            }
            on(triggerDom, 'mousedown', handleMousedown)
            on(document, 'mousemove', handleMousemove)
            on(document, 'mouseup', handleMouseup)
        },
        update: (el, binding, vnode) => {
            if (!binding.value.recover) return
            let bodyDom = document.querySelector(binding.value.body)
            bodyDom.style.transform = ''
        }
    },
    money: {
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
    },
    number: {
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
    },
    thousands: {
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
    },
    thousandsAuto: {
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
    },
    maxheight: {
        inserted: (el, binding, vnode) => {
            el.style.overflow = 'auto'
            el.style.maxHeight = window.innerHeight - binding.value + 'px'
        }
    }
}

export default directives
