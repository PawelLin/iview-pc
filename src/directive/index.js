import directive from './directives'

const importDirective = Vue => {
    /**
     * 拖拽指令 v-draggable="options"
     * options = {
     *  trigger: /这里传入作为拖拽触发器的CSS选择器/,
     *  body:    /这里传入需要移动容器的CSS选择器/,
     *  recover: /拖动结束之后是否恢复到原来的位置/
     * }
     */
    Vue.directive('draggable', directive.draggable)
    Vue.directive('money', directive.money)
    Vue.directive('number', directive.number)
    Vue.directive('thousands', directive.thousands)
    Vue.directive('thousandsAuto', directive.thousandsAuto)
    Vue.directive('maxheight', directive.maxheight)
}

export default importDirective
