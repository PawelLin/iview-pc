<template>
    <Layout class="layout">
        <Sider v-model="collapsed" collapsible :width="256" class="left-sider" :class="collapsed ? 'left-scroll' : ''">
            <title-bar :collapsed="collapsed" />
            <template v-if="menus.length">
                <side-menu v-show="!collapsed" :menus="menus" :activeName="activeName" />
                <div v-show="collapsed">
                    <collapsed-menu v-for="item in menus" :menu="item" :key="item.url" is-first/>
                </div>
            </template>
        </Sider>
        <Layout>
            <header-bar />
            <tags-nav :home="home" :list="list" />
            <Content class="content" :class="notFill ? 'not-fill' : null">
                <keep-alive :include="cacheList">
                    <router-view :key="fullPath" />
                </keep-alive>
            </Content>
        </Layout>
    </Layout>
</template>

<script>
import axios from 'axios'
import Vue from 'vue'
import titleBar from './title-bar.vue'
import sideMenu from './side-menu.vue'
import collapsedMenu from './collapsed-menu.vue'
import tagsNav from './tags-nav.vue'
import headerBar from './header-bar.vue'
import { getRoutesOfCache } from '@/libs/utils'
export default {
    name: 'Main',
    components: {
        titleBar,
        sideMenu,
        collapsedMenu,
        tagsNav,
        headerBar
    },
    data () {
        return {
            collapsed: false,
            menus: [],
            list: [],
            activeName: '',
            home: {
                name: 'home',
                title: '首页'
            }
        }
    },
    computed: {
        cacheList () {
            return Array.from(new Set(this.$store.state.tag.list.map(item => item.name).filter(item => this.cacheRoutes.includes(item))))
        },
        fullPath () {
            return this.$route.fullPath
        },
        notFill () {
            return !this.$route.meta.fill
        }
    },
    watch: {
        $route (route) {
            this.activeName = this.getRouteName(route)
        }
    },
    created () {
        this.activeName = this.getRouteName(this.$route)
        this.cacheRoutes = getRoutesOfCache()
    },
    methods: {
        setMenu (list) {
            let menus = list.filter(item => {
                return item.parentId === 0
            })
            this.convertData(menus, list)
            this.menus = menus
        },
        convertData (list, allList) {
            list.forEach(item => {
                item.children = allList.filter(ite => {
                    return ite.parentId === item.id
                })
                if (item.children.length > 0) {
                    this.convertData(item.children, allList)
                }
            })
        },
        getRouteName (route) {
            return route.query.iframe || route.name
        }
    },
    beforeRouteEnter (to, from, next) {
        axios.post('/system/resource/list', {
        }).then(res => {
            Vue.prototype.$BUTTONS = res.data.data.buttonList || []
            next(vm => {
                vm.list = res.data.data.menuList
                vm.setMenu(vm.list)
            })
        }).catch(() => {
            Vue.prototype.$BUTTONS = []
            next(false)
        })
    }
}
</script>

<style lang="less" scoped>
.layout {
    height: 100%;
}
.left-sider {
    padding-bottom: 48px;
    overflow: hidden;
    z-index: 2;
    /deep/ .ivu-layout-sider-children {
        margin-right: -18px;
        overflow-y: scroll;
        overflow-x: hidden;
    }
}
.left-scroll {
    overflow: visible;
    /deep/ .ivu-layout-sider-children {
        margin-right: 0;
        overflow-y: visible;
    }
}
.content {
    overflow-y: auto;
    overflow-x: hidden;
    &.not-fill {
        padding: 18px;
    }
}
</style>
