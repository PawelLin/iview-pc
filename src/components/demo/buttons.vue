<template>
    <Card title="按钮权限说明 ( 位置：/mock/menu-button.md )" shadow>
        <MenuButton class="menu-button" />
    </Card>
</template>

<script>
import MenuButton from '../../../mock/menu-button.md'

export default {
    name: 'demo_buttons',
    components: {
        MenuButton
    },
    created () {
    }
}
</script>

<style lang="less" scoped>
.menu-button {
    border: 1px solid #dcdee2;
    /deep/ table {
        margin: 0;
        border: 0;
        border-collapse: collapse;
        border-spacing: 0;
        width: 100%;
        table-layout: fixed;
        th, td {
            padding: 0 18px;
        }
        th {
            height: 32px;
            background-color: #f8f8f9;
            & + th {
                border-left: 1px solid #e8eaec;
            }
        }
        td {
            height: 40px;
            & + td {
                border-left: 1px solid #e8eaec;
            }
        }
        tbody > tr > td {
            border-top: 1px solid #e8eaec;
        }
    }

}
</style>
