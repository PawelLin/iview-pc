<template>
    <Menu ref="menu" accordion :active-name="activeName" theme="dark" width="auto" :open-names="openNames" @on-select="toPage" style="min-width: 256px;">
        <side-menu-item v-for="item in menus" :menu="item" :key="item.url"/>
    </Menu>
</template>

<script>
import sideMenuItem from './side-menu-item.vue'
import { getRoutesOfMeta } from '@/libs/utils'
export default {
    name: 'SideMenu',
    components: {
        sideMenuItem
    },
    props: {
        menus: {
            type: Array,
            default () {
                return []
            }
        },
        list: {
            type: Array,
            default () {
                return []
            }
        }
    },
    data () {
        return {
            menuMap: null,
            openNames: [],
            activeName: ''
        }
    },
    computed: {
    },
    watch: {
        list (item) {
            if (item.length > 0) {
                if (!this.menuMap) this.menuMap = this.getLastMenu(item)
                this.setMenu(this.$route.name)
            }
        },
        $route (to) {
            this.setMenu(to.name)
        }
    },
    created () {
        this.routes = getRoutesOfMeta()
    },
    methods: {
        toPage (name) {
            this.$router.push({ name })
        },
        getLastMenu (list) {
            let menu = {}
            list.forEach(item => {
                let _list = list.filter(ite => {
                    return ite.parentId === item.id
                })
                if (_list.length === 0) {
                    menu[item.name] = []
                    this.setActiveMenuMap(menu, item.name, item, list)
                }
            })
            return menu
        },
        setActiveMenuMap (menu, name, item, list) {
            let _list = list.filter(ite => {
                return item.parentId === ite.id
            })
            if (_list.length > 0) {
                menu[name].push(_list[0].name)
                this.setActiveMenuMap(menu, name, _list[0], list)
            } else {
                menu[name].reverse()
            }
        },
        setMenu (name) {
            if (this.menuMap) {
                let openNames = this.menuMap[name] || (this.routes[name] ? this.menuMap[this.routes[name].active] : [])
                this.openNames = openNames
                this.activeName = this.menuMap[name] ? name : (this.routes[name] ? this.routes[name].active : '')
                this.$nextTick(() => {
                    this.$refs.menu.updateOpened()
                    this.$refs.menu.updateActiveName()
                })
            }
        }
    }
}
</script>
