<template>
    <Layout class="layout">
        <Sider v-model="collapsed" collapsible :width="256" class="left-sider" :class="collapsed ? 'left-scroll' : ''">
            <title-bar :collapsed="collapsed" />
            <side-menu v-show="!collapsed" :menus="menus" :list="list" />
            <div v-show="collapsed">
                <collapsed-menu v-for="item in menus" :menu="item" :key="item.url" is-first/>
            </div>
        </Sider>
        <Layout>
            <header-bar />
            <tags-nav :home="home" :list="list"/>
            <Content class="content">
                <keep-alive :include="cacheList">
                    <router-view/>
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
            home: {
                name: 'home'
            },
            cacheList: []
        }
    },
    created () {
        this.cacheList = getRoutesOfCache()
        // this.getMenu()
    },
    methods: {
        getMenu () {
            this.$http.post('/menu').then(res => {
                this.list = res.data.data.menus
                this.setMenu(res.data.data.menus)
            })
        },
        setMenu (list) {
            this.menus = list.filter(item => {
                return item.parentId === 0
            })
            this.convertData(this.menus, list)
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
        }
    },
    beforeRouteEnter (to, from, next) {
        axios.post('/menu', {
        }).then(res => {
            Vue.prototype.$BUTTONS = res.data.data.buttons || []
            next(vm => {
                vm.list = res.data.data.menus
                vm.setMenu(res.data.data.menus)
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
    padding: 18px;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>
