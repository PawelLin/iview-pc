<template>
    <Dropdown v-if="(menu.children && menu.children.length > 0) || !isFirst" placement="right-start" class="menu-collapsed">
        <a v-if="!isChild" href="javascript:void(0)" class="drop-menu-a">
            <Icon :type="menu.icon"></Icon>
        </a>
        <DropdownItem v-else>
            <Icon :type="menu.icon"></Icon>
            {{menu.title}}
            <Icon type="ios-arrow-forward" />
        </DropdownItem>
        <DropdownMenu slot="list" class="drop-menu-list">
            <template v-for="item in (menu.children || [])">
                <collapsed-menu v-if="item.children && item.children.length > 0" :menu="item" :key="item.name" is-child/>
                <DropdownItem v-else @click.native="toPage(item.name)" :name="item.name" :key="item.name"><Icon :type="item.icon"></Icon>{{item.title}}</DropdownItem>
            </template>
        </DropdownMenu>
    </Dropdown>
    <Tooltip v-else :content="menu.title" placement="right">
        <a @click="toPage(menu.name)" href="javascript:void(0)" class="drop-menu-a">
            <Icon :type="menu.icon"></Icon>
        </a>
    </Tooltip>
</template>

<script>
export default {
    name: 'CollapsedMenu',
    props: {
        menu: {
            type: Object,
            default () {
                return {}
            }
        },
        isChild: Boolean,
        isFirst: Boolean
    },
    methods: {
        toPage (name) {
            this.$router.push({ name })
        }
    }
}
</script>

<style lang="less" scoped>
.menu-collapsed {
    display: block;
    /deep/ .ivu-dropdown {
        display: inline-block;
        .ivu-select-dropdown {
            width: auto;
        }
    }
}
.drop-menu-a {
    display: block;
    padding: 13px 24px 15px;
    color: #ffffff;
    /deep/ .ivu-icon {
        margin-top: -4px;
        font-size: 14px;
    }
}
.drop-menu-list {
    /deep/ .ivu-icon {
        margin: -2px 4px 0 0 ;
    }
}
</style>
