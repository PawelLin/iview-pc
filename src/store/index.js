import Vue from 'vue'
import Vuex from 'vuex'

import tag from './module/tag'
import data from './module/data'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        //
    },
    mutations: {
        //
    },
    actions: {
        //
    },
    modules: {
        tag,
        data
    }
})
