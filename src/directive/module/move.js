import { on, off, device } from '@/libs/tools'
export default {
    inserted: (el, binding, vnode) => {
        let maxLeft = 0
        let maxTop = 0
        let minLeft = 0
        let minTop = 0
        let x = 0
        let y = 0
        let l = 0
        let t = 0
        let canMove = false

        const handleMousedown = e => {
            e.preventDefault()
            /**
             * 通过getBoundingClientRect获取拖动div当前的坐标位置
             * width = 水平方向上的左右距离差，即当前水平宽度
             * height = 垂直方向上的上下距离差，即当前水平高度
             * 通过getComputedStyle获取的transform为矩阵，如 matrix(1, 0, 0, 1, -100, -100)
             * minLeft = 0 + translateX + (当前水平宽度 - 实际宽度) / 2
             * minTop = 0 + translateY + (当前水平高度 - 实际高度) / 2
             * maxLeft = 容器宽度 - 当前水平宽度 - translateX
             * maxTop = 容器高度 - 当前水平高度 - translateY
             */
            if (binding.value && binding.value.limit) {
                const parent = binding.value && binding.value.body && document.querySelector(binding.value.body)
                const rect = el.getBoundingClientRect()
                const width = Math.abs(rect.left - rect.right)
                const height = Math.abs(rect.top - rect.bottom)
                const transforms = window.getComputedStyle(el).transform.replace(/\s/g, '').split(',')
                minLeft = (-parseFloat(transforms[4]) || 0) + (width - el.offsetWidth) / 2
                minTop = (-parseFloat(transforms[5]) || 0) + (height - el.offsetHeight) / 2
                maxLeft = ((parent && parent.offsetWidth) || window.innerWidth) - width + minLeft
                maxTop = ((parent && parent.offsetHeight) || window.innerHeight) - height + minTop
            }
            if (!device.isPC) {
                e.clientX = e.targetTouches[0].clientX
                e.clientY = e.targetTouches[0].clientY
            }
            x = e.clientX
            y = e.clientY
            l = el.offsetLeft
            t = el.offsetTop
            canMove = true
        }
        const handleMousemove = e => {
            if (!canMove) return
            if (!device.isPC) {
                e.clientX = e.targetTouches[0].clientX
                e.clientY = e.targetTouches[0].clientY
            }
            // 鼠标移动前后距离差 + 拖动div原有的位置
            let left = e.clientX - x + l
            let top = e.clientY - y + t
            if (binding.value && binding.value.limit) {
                left = Math.min(Math.max(left, minLeft), maxLeft)
                top = Math.min(Math.max(top, minTop), maxTop)
            }
            el.style.left = left + 'px'
            el.style.top = top + 'px'
        }
        const handleMouseup = e => {
            canMove = false
        }
        const handleMousewheel = e => {
            const zoom = (e.wheelDelta > 0 || e.detail > 0) ? 0.2 : -0.2
            // const matrix = window.getComputedStyle(el).transform.match(/-?\d+(.\d+)?/g) || [1, 0, 0, 1, 0, 0]
            let transform = el.style.transform
            let scale = transform.match(/scale\((.*\d),(.*\d)\)/) || transform.match(/scale\((.*\d)\)/)
            let sizeX = (scale && parseFloat(scale[1])) || 1
            let sizeY = (scale && parseFloat(scale[2])) || 1
            let sizeXY = sizeX / sizeY
            const rect = el.getBoundingClientRect()
            const width = Math.abs(rect.left - rect.right)
            const height = Math.abs(rect.top - rect.bottom)
            const getTransform = () => scale ? transform.replace(scale[0], `scale(${sizeX}, ${sizeY})`) : transform + ` scale(${sizeX}, ${sizeY})`
            if (binding.value && binding.value.limit) {
                const initWidth = width / sizeX
                const initHeight = height / sizeY
                const parent = binding.value && binding.value.body && document.querySelector(binding.value.body)
                const parentWidth = (parent && parent.offsetWidth) || window.innerWidth
                const parentHeight = (parent && parent.offsetHeight) || window.innerHeight
                if ((initWidth * (sizeX + zoom)) > parentWidth) {
                    sizeX = parentWidth / initWidth
                    sizeY = sizeX / sizeXY
                    el.style.transform = getTransform()
                    return
                }
                if ((initHeight * (sizeY + zoom)) > parentHeight) {
                    sizeY = parentHeight / initHeight
                    sizeX = sizeY * sizeXY
                    el.style.transform = getTransform()
                    return
                }
            }
            if (width >= height) {
                sizeX = Math.min(Math.max(sizeX + zoom, 0.2), 10)
                sizeY = sizeX / sizeXY
            } else {
                sizeY = Math.min(Math.max(sizeY + zoom, 0.2), 10)
                sizeX = sizeY * sizeXY
            }
            el.style.transform = getTransform()
        }
        el.__vueMousemove__ = handleMousemove
        el.__vueMouseup__ = handleMouseup
        if (device.isPC) {
            on(el, 'mousedown', handleMousedown)
            on(el, 'mousewheel', handleMousewheel)
            on(el, 'DOMMouseScroll', handleMousewheel) // FireFox
            on(window, 'mousemove', handleMousemove)
            on(window, 'mouseup', handleMouseup)
        } else {
            on(el, 'touchstart', handleMousedown)
            on(window, 'touchmove', handleMousemove)
            on(window, 'touchend', handleMouseup)
        }
    },
    unbind (el, binding) {
        if (device.isPC) {
            off(window, 'mousemove', el.__vueMousemove__)
            off(window, 'mouseup', el.__vueMouseup__)
        } else {
            off(window, 'touchmove', el.__vueMousemove__)
            off(window, 'touchend', el.__vueMouseup__)
        }
        delete el.__vueMousemove__
        delete el.__vueMouseup__
    }
}
