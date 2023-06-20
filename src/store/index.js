import Vue from 'vue'
import Vuex from 'vuex'

import tag from './module/tag'
import data from './module/data'
import status from './module/status'

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
        data,
        status
    }
})
