<template>
    <Card shadow>
        <Table :columns="columns" :data="list" size="small" border>
            <template slot="remark" slot-scope="{ row }">
                <Alert class="remark" v-if="row.name === 'v-move'">
                    请勿设置拖动dom的<span class="color-red">right</span>和<span class="color-red">bottom</span>属性
                    <div slot="desc">
                        <p>right: 0px === left: 100%; transform: translateX(-100%)</p>
                        <p>bottom: 0px === top: 100%; transform: translateY(-100%)</p>
                    </div>
                </Alert>
            </template>
        </Table>
        <div ref="move" class="move" v-move :style="{ transform }">
            <Icon type="md-move" size="80" color="#2d8cf0"></Icon>
            <div class="move-icons">
                <Icon @click="setTranfrom" type="md-refresh-circle" size="30" color="#2d8cf0"/>
            </div>
        </div>
        <div class="move-contain">
            <Icon class="move-icon" type="md-move" size="80" v-move="{ body: '.move-contain', limit: true }"></Icon>
        </div>
    </Card>
</template>

<script>
export default {
    name: 'demo_directives',
    data () {
        return {
            columns: [
                { title: '指令', key: 'name', width: 200 },
                { title: '说明', key: 'note' },
                { title: '使用', key: 'use' },
                { title: '备注', slot: 'remark' }
            ],
            list: [
                { name: 'v-money', note: '限制input只能输入金额格式的数字', use: 'v-money = " [ num1, num2 ] "' },
                { name: 'v-number', note: '限制input只能输入数字或regex限定的字符', use: 'v-number = " regex "' },
                { name: 'v-thousands', note: '限制input只能输入数字和逗号，失去焦点自动格式化千分位', use: 'v-thousands = " \'number\' "' },
                { name: 'v-thousands-auto', note: '限制input只能输入数字，边输入边格式化千分位', use: 'v-thousands-auto = " \'number\' "' },
                { name: 'v-maxheight', note: '设置dom的最大高度', use: 'v-maxheight = " other-height "' },
                { name: 'v-move', note: '拖动', use: 'v-move [ = "{ body: \'#mask\', limit: true }"]' }
            ],
            transform: 'translate(-100%, calc(-100% - 300px))'
        }
    },
    methods: {
        setTranfrom () {
            const regx = /rotate\(\d+\w+\)/
            let transform = this.$refs.move.style.transform
            let rotate = transform.match(regx)
            let size = (rotate && parseFloat(rotate[0].replace('rotate(', ''))) || 0
            size += 30
            this.transform = rotate ? transform.replace(regx, `rotate(${size}deg)`) : transform + ` rotate(${size}deg)`
        }
    }
}
</script>

<style lang="less" scoped>
.color-red {
    color: #ed4014;
}
.remark {
    margin-top: 10px;
}
.move {
    position: fixed;
    top: 100%;
    left: 100%;
    padding: 10px 0;
    width: 120px;
    // transform: translate(-100%, calc(-100% - 300px));
    text-align: center;
    background-color: #ffffff;
    border: 1px solid #2d8cf0;
    // transition: transform .2s;
    z-index: 9999;
    cursor: move;
    > .move-icons > * {
        cursor: pointer;
    }
}
.move-contain {
    position: fixed;
    width: 300px;
    height: 300px;
    bottom: 0;
    right: 0;
    border: 1px solid rgba(55, 55, 55, 0.6);
    > .move-icon {
        position: absolute;
        top: 50%;
        // left: 100%;
        // transform: translate(-100%, -50%);
        background-color: #ffffff;
        cursor: move;
    }
}
</style>
