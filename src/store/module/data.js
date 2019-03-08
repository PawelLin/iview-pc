export default {
    state: {
    },
    getters: {
    },
    mutations: {
        setData (state, data = {}) {
            state = Object.assign(state, { ...data })
            console.log(state)
        },
        delData (state) {
            let routes = JSON.parse(localStorage.getItem('tagList')).map(item => `${item.name}${item.query.id || ''}`)
            Object.keys(state).forEach(item => {
                if (routes.indexOf(item) === -1) {
                    delete state[item]
                }
            })
        }
    },
    actions: {
    }
}
