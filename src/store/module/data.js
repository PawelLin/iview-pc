export default {
    state: {
    },
    getters: {
    },
    mutations: {
        setData (state, data = {}) {
            state = Object.assign(state, { ...data })
        },
        delData (state, keys) {
            // Object.keys(state).forEach(item => {
            //     if (keys.indexOf(item) === -1) {
            //         delete state[item]
            //     }
            // })
            // console.log(state)
            // console.log(keys)
        }
    },
    actions: {
    }
}
