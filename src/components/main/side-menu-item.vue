<template>
    <Submenu v-if="menu.children && menu.children.length > 0" :name="menu.name" :key="menu.name">
        <template slot="title">
            <Icon :type="menu.icon" class="icon"></Icon>
            <span>{{menu.title}}</span>
        </template>
        <side-menu-item v-for="men in menu.children" :menu="men" :key="men.url"/>
    </Submenu>
    <MenuItem v-else :name="menu.name" :key="menu.name">
        <Icon :type="menu.icon" class="icon"></Icon>
        <span>{{menu.title}}</span>
    </MenuItem>
</template>

<script>
export default {
    name: 'SideMenuItem',
    props: {
        menu: {
            type: Object,
            default () {
                return {}
            }
        }
    }
}
</script>

<style lang="less" scoped>
.icon {
    margin: -3px 8px 0 0;
}
</style>
