export default {
    inserted: (el, binding, vnode) => {
        el.style.overflow = 'auto'
        el.style.maxHeight = window.innerHeight - binding.value + 'px'
    }
}
