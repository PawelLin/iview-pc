import { on, off } from '@/libs/tools'
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
        const parent = binding.value && binding.value.body && document.querySelector(binding.value.body)
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
            const rect = el.getBoundingClientRect()
            const width = Math.abs(rect.left - rect.right)
            const height = Math.abs(rect.top - rect.bottom)
            const transforms = window.getComputedStyle(el).transform.replace(/\s/g, '').split(',')
            minLeft = (-parseFloat(transforms[4]) || 0) + (width - el.offsetWidth) / 2
            minTop = (-parseFloat(transforms[5]) || 0) + (height - el.offsetHeight) / 2
            maxLeft = ((parent && parent.offsetWidth) || window.innerWidth) - width + minLeft
            maxTop = ((parent && parent.offsetHeight) || window.innerHeight) - height + minTop
            x = e.clientX
            y = e.clientY
            l = el.offsetLeft
            t = el.offsetTop
            canMove = true
        }
        const handleMousemove = e => {
            if (!canMove) return
            // 鼠标移动前后距离差 + 拖动div原有的位置
            let left = e.clientX - x + l
            let top = e.clientY - y + t
            left = Math.min(Math.max(left, minLeft), maxLeft)
            top = Math.min(Math.max(top, minTop), maxTop)
            el.style.left = left + 'px'
            el.style.top = top + 'px'
        }
        const handleMouseup = e => {
            canMove = false
        }
        el.__vueMousemove__ = handleMousemove
        el.__vueMouseup__ = handleMouseup
        on(el, 'mousedown', handleMousedown)
        on(window, 'mousemove', handleMousemove)
        on(window, 'mouseup', handleMouseup)
    },
    unbind (el, binding) {
        off(window, 'mousemove', el.__vueMousemove__)
        off(window, 'mouseup', el.__vueMouseup__)
        delete el.__vueMousemove__
        delete el.__vueMouseup__
    }
}
