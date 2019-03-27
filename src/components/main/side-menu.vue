<template>
    <Menu ref="menu" accordion :active-name="activeNames" theme="dark" width="auto" :open-names="openNames" @on-select="toPage" style="min-width: 256px;">
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
        activeName: {
            type: String,
            default: ''
        }
    },
    data () {
        return {
            openNames: [],
            activeNames: ''
        }
    },
    watch: {
        activeName (name) {
            this.setMenuActive(name)
        }
    },
    created () {
        this.menuMap = {}
        this.routes = getRoutesOfMeta()
        this.setMenuNameMap(this.menus)
        this.setMenuActive(this.activeName)
    },
    methods: {
        toPage (name) {
            this.$router.push({ name })
        },
        setMenuNameMap (menus, menu) {
            menus.forEach(item => {
                if (item.parentId === 0) {
                    menu = [item.name]
                } else {
                    menu.push(item.name)
                }
                if (item.children.length) {
                    this.setMenuNameMap(item.children, menu)
                } else {
                    this.menuMap[menu.pop()] = menu.reverse()
                }
            })
        },
        setMenuActive (name) {
            let openNames = this.menuMap[name] || (this.routes[name] ? this.menuMap[this.routes[name].active] : [])
            this.openNames = openNames
            this.activeNames = this.menuMap[name] ? name : (this.routes[name] ? this.routes[name].active : '')
            this.$nextTick(() => {
                this.$refs.menu.updateOpened()
                this.$refs.menu.updateActiveName()
            })
        }
    }
}
</script>
