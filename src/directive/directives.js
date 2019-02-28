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
                let ref = binding.value[0]
                let refValue = binding.value[1]
                let refInput = ref.$refs[refValue][0] || ref.$refs[refValue]
                let num1 = binding.value[2] || 9
                let num2 = binding.value[3] || 2
                let regExp = new RegExp(`^(0|[1-9]\\d{0,${num1 - 1}})(\\.\\d{0,${num2}})?$`)
                let value = ''
                const handleInput = e => {
                    if (e.target.value && !(regExp.test(e.target.value))) {
                        e.target.value = value
                    } else {
                        value = e.target.value
                    }
                    refInput.handleInput(e)
                    ref.$nextTick(() => {
                        e.target.value = value
                    })
                }
                const handleBlur = e => {
                    e.target.value = e.target.value && `${parseFloat(e.target.value)}`
                    refInput.handleInput(e)
                }
                on(input, 'input', handleInput)
                on(input, 'blur', handleBlur)
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
                let ref = binding.value[0]
                let refValue = binding.value[1]
                let refInput = ref.$refs[refValue][0] || ref.$refs[refValue]
                let regExp = binding.value[2] || new RegExp(`^(0|[1-9]\\d*)$`)
                let value = ''
                const handleInput = e => {
                    if (e.target.value && !(regExp.test(e.target.value))) {
                        e.target.value = value
                    } else {
                        value = e.target.value
                    }
                    refInput.handleInput(e)
                    ref.$nextTick(() => {
                        e.target.value = value
                    })
                }
                on(input, 'input', handleInput)
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
                let ref = binding.value[0]
                let refValue = binding.value[1]
                let refInput = ref.$refs[refValue][0] || ref.$refs[refValue]
                let regExp = new RegExp(`[^,\\d]`)
                let value = ''
                const handleInput = e => {
                    if (e.target.value && (regExp.test(e.target.value))) {
                        e.target.value = value
                    } else {
                        value = e.target.value
                    }
                    refInput.handleInput(e)
                    ref.$nextTick(() => {
                        e.target.value = value
                    })
                }
                const handleBlur = e => {
                    // 显示为千分位，实际值是纯数字，可放开注释
                    // let val = e.target.value = e.target.value.replace(/,/g, '')
                    // refInput.handleInput(e)
                    // ref.$nextTick(() => {
                    //     e.target.value = value = (val && val.replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')) || ''
                    // })
                    let val = e.target.value.replace(/,/g, '')
                    e.target.value = value = (val && parseInt(val).toString().replace(/\d{1,3}(?=(\d{3})+$)/g, '$&,')) || ''
                    refInput.handleInput(e)
                }
                on(input, 'input', handleInput)
                on(input, 'blur', handleBlur)
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
