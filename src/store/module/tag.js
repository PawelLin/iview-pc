import { objInArr } from '@/libs/tools'
import router from '@/router'

export default {
    state: {
        list: []
    },
    getters: {
    },
    mutations: {
        setTagList (state, list = []) {
            state.list = list
        },
        removeTag (state, { route, to }) {
            let tagIndex = objInArr(state.list, route, ['name', 'query', 'params'])
            let { name, params, query } = state.list[tagIndex - 1]
            state.list.splice(tagIndex, 1)
            if (to) {
                let toRoute = state.list.filter(item => item.name === to)[0]
                if (toRoute) {
                    router.replace({
                        name: toRoute.name,
                        params: { ...toRoute.params, activated: true },
                        query: toRoute.query
                    })
                    return
                }
            }
            router.replace({ name, params, query })
        }
    },
    actions: {
    }
}
