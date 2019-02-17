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
        removeTag (state, route) {
            let tagIndex = objInArr(state.list, route, ['name', 'query', 'params'])
            let { name, params, query } = state.list[tagIndex - 1]
            state.list.splice(tagIndex, 1)
            router.replace({ name, params, query })
        }
    },
    actions: {
    }
}
