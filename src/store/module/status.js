export default {
    state: {
        tagStatus: localStorage.getItem('tagStatus') || '0'
    },
    getters: {
    },
    mutations: {
        openMoreTag (state) {
            state.tagStatus = '1'
            localStorage.setItem('tagStatus', state.tagStatus)
        },
        closeMoreTag (state) {
            state.tagStatus = '0'
            localStorage.setItem('tagStatus', state.tagStatus)
        }
    },
    actions: {
    }
}
