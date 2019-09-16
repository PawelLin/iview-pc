<template>
    <div class="tags-nav">
        <Button @click="moveLeft" class="btn"><Icon size="18" type="ios-arrow-back" /></Button>
        <div class="scroll-outer" ref="scrollOuter">
            <div class="scroll-body" ref="scrollBody" :style="{ left: left + 'px' }">
                <Tag v-for="(item, index) in tagList" :key="index"
                    type="dot" :fade="false"
                    @click.native="toPage(item)"
                    @on-close="handleRemoveTag(item, index)"
                    @contextmenu.prevent.native="showContextMenu(item, $event)"
                    :color="setActiveTag(item)"
                    :closable="item.name !== home.name">
                    {{item.title}}
                </Tag>
            </div>
        </div>
        <transition name="transition-drop">
            <ul v-show="contextMenu.visible" class="contextmenu" v-clickoutside="hideContextMenu" :style="{ top: contextMenu.top + 'px', left: contextMenu.left + 'px' }">
                <li @click="closeMenuOther" class="ivu-dropdown-item">关闭其他</li>
                <li @click="closeMenuAll" class="ivu-dropdown-item">关闭所有</li>
            </ul>
        </transition>
        <Button @click="moveRight" class="btn"><Icon size="18" type="ios-arrow-forward" /></Button>
        <Dropdown transfer placement="bottom-end" class="drop-close">
            <Button class="btn btn-close"><Icon size="18" type="ios-close-circle-outline" /></Button>
            <DropdownMenu slot="list">
                <DropdownItem @click.native="closeOther()">关闭其他</DropdownItem>
                <DropdownItem @click.native="closeAll">关闭所有</DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </div>
</template>

<script>
import { mapMutations } from 'vuex'
import beforeClose from '@/router/before-close'
import { objInArr, objNotEqual } from '@/libs/tools'
import { getRoutesOfMeta } from '@/libs/utils'
export default {
    name: 'TagsNav',
    props: {
        list: {
            type: Array,
            default () {
                return []
            }
        },
        home: {
            type: Object,
            default () {
                return {}
            }
        }
    },
    data () {
        return {
            left: 0,
            disWidth: 0,
            tagMap: null,
            onlyName: true, // tag是否只根据name来判断
            contextMenu: {
                visible: false,
                top: 0,
                left: 0,
                route: null
            }
        }
    },
    computed: {
        tagList () {
            // 首次加载同步tag到store
            if (!this.$store.state.tag.list.length) {
                let tagList = localStorage.getItem('tagList')
                tagList = (tagList && JSON.parse(tagList)) || []
                this.setTagList(tagList)
            }
            return this.$store.state.tag.list
        }
    },
    watch: {
        list (item) {
            if (item.length > 0) {
                if (!this.tagMap) {
                    this.setTagMap(item)
                    // 如果直接访问的页面不在标签栏中，跳到homeName页
                    if (!this.tagList.find(item => !objNotEqual(item, this.$route, ['name', 'query'])) && this.$route.name !== this.home.name) {
                        this.$router.replace({ name: this.home.name })
                        return
                    }
                }
                this.addTag(this.$route)
            }
        },
        $route (to) {
            if (!this.onlyName) this.delData()
            this.addTag(to)
            this.hideContextMenu()
        },
        tagList (item) {
            // 同步store及localstorage
            this.setTagList(item)
            localStorage.setItem('tagList', JSON.stringify(item))
        }
    },
    created () {
        this.metaRoutes = getRoutesOfMeta()
    },
    methods: {
        ...mapMutations([
            'setTagList',
            'delData'
        ]),
        toPage (item) {
            this.$router.push({
                name: item.name,
                query: item.query,
                params: item.params
            })
        },
        setTagMap (list) {
            this.tagMap = {}
            list.forEach(item => {
                this.tagMap[item.name] = item.title
            })
        },
        setActiveTag (item) {
            // this.tagMap[item.name]有值说明是左侧菜单，只需要判断路由name
            let filter = this.tagFilter((this.tagMap && this.tagMap[item.name]) ? ['name'] : ['name', 'query'])
            return !objNotEqual(item, this.$route, filter) ? 'primary' : 'default'
        },
        addTag (route) {
            if (this.tagMap) {
                // 映射值 | 跳转路由定义params的rename值 | 路由配置的值 | 后端未返回首页home路由, 设置的值
                let title = this.tagMap[route.name] || route.params.rename || (this.metaRoutes[route.name] && this.metaRoutes[route.name].title) || this.home.title
                let params = {}
                // 直接访问的页面在tag不在左侧菜单，将路由的params跟本地存储的同步
                if (!this.tagMap[route.name]) {
                    let filter = this.tagFilter(['name', 'query'])
                    let tag = this.tagList.filter(item => !objNotEqual(item, this.$route, filter))[0]
                    params = (tag && tag.params) || route.params || {}
                    title = (tag && tag.params && tag.params.rename) || title
                }
                if (title) {
                    route = { name: route.name, title, params, query: route.query }
                    if (this.tagList.length === 0 && this.home && route.name !== this.home.name) {
                        this.tagList.push({ name: this.home.name, title: this.tagMap[this.home.name] || this.home.title, params: {}, query: {} })
                    }
                    // this.tagMap[item.name]有值说明是左侧菜单，只需要判断路由name
                    let filter = this.tagFilter(this.tagMap[route.name] ? ['name'] : '')
                    let tagIndex = objInArr(this.tagList, route, filter)
                    if (tagIndex === -1) {
                        this.tagList.push(route)
                        this.$nextTick(() => {
                            this.moveEnd()
                        })
                    } else {
                        // 左侧菜单同名不同参数路由切换实时更新本地localstorge
                        if (this.tagMap[route.name] || this.onlyName) this.tagList.splice(tagIndex, 1, route)
                        this.moveItemEnd(tagIndex)
                    }
                }
            }
        },
        handleRemoveTag (item, index) {
            let name = this.metaRoutes[item.name]
            if (name && (name = name.beforeCloseName) && name in beforeClose) {
                new Promise(beforeClose[name]).then(close => {
                    if (close) this.removeTag(item, index)
                })
            } else {
                this.removeTag(item, index)
            }
        },
        removeTag (item, index) {
            let filter = this.tagFilter(['name', 'query', 'params'])
            let list = this.tagList.filter((item, index1) => index1 !== index)
            this.setTagList(list)
            if (!objNotEqual(item, this.$route, filter)) {
                let pre = list[index - 1]
                this.$router.push({ name: pre.name, query: pre.query, params: pre.params })
            }
        },
        closeAll () {
            let list = this.tagList.filter(item => item.name === this.home.name)
            this.setTagList(list)
            this.left = 0
            this.$router.push({ name: this.home.name })
        },
        closeOther (route = this.$route) {
            let filter = this.tagFilter(['name', 'query', 'params'])
            let list = this.tagList.filter(item => {
                return !objNotEqual(item, route, filter) || item.name === this.home.name
            })
            this.setTagList(list)
            this.left = 0
        },
        moveLeft () {
            this.left = Math.min(this.left + 240, 0)
        },
        moveRight () {
            this.disWidth = this.$refs.scrollOuter.offsetWidth - this.$refs.scrollBody.offsetWidth
            this.left = this.disWidth > 0 ? 0 : Math.max(this.left - 240, this.disWidth)
        },
        moveEnd () {
            this.disWidth = this.$refs.scrollOuter.offsetWidth - this.$refs.scrollBody.offsetWidth
            this.left = this.disWidth > 0 ? 0 : this.disWidth
        },
        moveItemEnd (index) {
            let left = this.$refs.scrollBody.children[index].offsetLeft + this.$refs.scrollBody.children[index].offsetWidth
            this.disWidth = this.$refs.scrollOuter.offsetWidth - left - 4 // 4 = tag的margin-right
            this.left = this.disWidth > 0 ? 0 : this.disWidth
        },
        tagFilter (filter) {
            return this.onlyName ? ['name'] : filter
        },
        showContextMenu (item, e) {
            this.contextMenu.visible = false
            this.$nextTick(() => {
                this.contextMenu.left = e.clientX
                this.contextMenu.top = e.clientY + 20
                this.contextMenu.visible = true
                this.contextMenu.route = item
            })
        },
        hideContextMenu () {
            this.contextMenu.visible = false
        },
        closeMenuAll () {
            this.hideContextMenu()
            this.closeAll()
        },
        closeMenuOther () {
            let { name, query, params } = this.contextMenu.route
            this.hideContextMenu()
            this.closeOther(this.contextMenu.route)
            this.$router.replace({ name, query, params })
        }
    }
}
</script>

<style lang="less" scoped>
.tags-nav {
    display: flex;
    flex: 0 0 auto;
    height: 40px;
    background-color: #F0F0F0;
}
.scroll-outer {
    position: relative;
    flex: auto;
    padding-top: 2px;
    box-shadow: 0px 0 3px 2px rgba(100, 100, 100, 0.1) inset;
}
.scroll-body {
    position: absolute;
    left: 0;
    padding-left: 4px;
    white-space: nowrap;
    transition: left .3s ease;
}
.btn {
    padding-left: 5px;
    padding-right: 5px;
    height: 100%;
    border: none;
    border-top: 1px solid #F0F0F0;
    border-bottom: 1px solid #F0F0F0;
    border-radius: 0;
    z-index: 1;
}
.btn:hover, .btn:active, .btn:focus {
    border-top: 1px solid #F0F0F0;
    border-bottom: 1px solid #F0F0F0;
}
.btn:focus {
    box-shadow: 0 0 0 2px rgba(45,140,240,.2) inset;
}
.btn-close {
    padding-left: 6px;
    padding-right: 6px;
    border-left: 1px solid #F0F0F0;
}
.btn-close:hover {
    border-left: 1px solid #F0F0F0;
}
.drop-close {
    height: 100%;
    /deep/ .ivu-dropdown-rel {
        height: inherit;
    }
}
.contextmenu {
    position: absolute;
    margin: 0;
    padding: 5px 0;
    background: #fff;
    z-index: 1000;
    list-style-type: none;
    border-radius: 4px;
    box-shadow: 2px 2px 3px 0 rgba(0, 0, 0, .1);
    li {
        margin: 0;
        padding: 5px 15px;
        cursor: pointer;
        &:hover {
            background: #eee;
        }
    }
}
</style>
