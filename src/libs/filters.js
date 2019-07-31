import { dateFormat, numberFormat, shortName } from './tools'
import * as emnus from './enums'

const emnusFilters = {}
Object.keys(emnus).forEach(key => {
    emnusFilters[key] = val => emnus[key][val]
})

const filters = {
    dateFormat,
    numberFormat,
    shortName,
    ...emnusFilters
}

const importFilter = Vue => {
    Object.keys(filters).forEach(key => {
        Vue.filter(key, filters[key])
    })
}

export default importFilter
