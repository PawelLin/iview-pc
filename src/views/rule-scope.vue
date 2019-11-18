<template>
    <Card border dis-hover>
        <span slot="title">转码规则范围</span>
        <Form ref="form" :model="form" :rules="rules" inline>
            <FormItem prop="minNum">
                <Input v-model="form.minNum">
                    <Select slot="prepend" v-model="form.min" class="select" placeholder="" @on-change="minChange">
                        <Option value="=">=</Option>
                        <Option value=">">&gt;</Option>
                        <Option value=">=">&gt;=</Option>
                    </Select>
                </Input>
            </FormItem>
            <FormItem prop="maxNum">
                <Input v-model="form.maxNum" :disabled="form.min === '='">
                    <Select slot="prepend" v-model="form.max" class="select" placeholder="" :disabled="form.min === '='" @on-change="maxChange">
                        <Option value="<">&lt;</Option>
                        <Option value="<=">&lt;=</Option>
                    </Select>
                </Input>
            </FormItem>
            <FormItem prop="score">
                <Input v-model="form.score">
                    <span slot="prepend">得分</span>
                </Input>
            </FormItem>
            <FormItem>
                <Button @click="handleAdd" type="primary">添加</Button>
            </FormItem>
        </Form>
        <Table :columns="columns" :data="data.list" size="small" border>
            <template slot="default" slot-scope="{ row }">
                <Button @click="handleDelete(row)" type="error" size="small">删除</Button>
            </template>
        </Table>
    </Card>
</template>

<script>
export default {
    props: {
        list: {
            type: Array,
            default () {
                return [
                    // { range: '>0', score: 1 },
                    // { range: '=0', score: 0 }
                ]
            }
        }
    },
    data () {
        const minNumValidator = (rule, value, callback) => {
            if (this.minNotPass) {
                this.minError = true
                this.minNotPass = false
                callback(new Error('范围与其他范围有交集'))
            } else {
                if (!value && !this.form.maxNum) {
                    this.minError = true
                    callback(new Error('请至少输入一个范围'))
                } else if (value && this.form.maxNum && (parseFloat(value) >= parseFloat(this.form.maxNum))) {
                    this.minError = true
                    callback(new Error('输入范围有误'))
                } else {
                    if (this.maxError) this.$refs.form.validateField('maxNum')
                    this.minError = false
                    callback()
                }
            }
        }
        const maxNumValidator = (rule, value, callback) => {
            if (this.maxNotPass) {
                this.maxError = true
                this.maxNotPass = false
                callback(new Error('范围与其他范围有交集'))
            } else {
                if (value && this.form.minNum && (parseFloat(value) <= parseFloat(this.form.minNum))) {
                    this.maxError = true
                    callback(new Error('输入范围有误'))
                } else {
                    if (this.minError) this.$refs.form.validateField('minNum')
                    this.maxError = false
                    callback()
                }
            }
        }
        const scoreValidator = (rule, value, callback) => {
            if (!value) {
                callback(new Error('请输入得分'))
            } else if (this.data.list.map(item => parseFloat(item.score)).indexOf(parseFloat(value)) > -1) {
                callback(new Error('得分已存在'))
            } else {
                callback()
            }
        }
        return {
            data: {
                list: []
            },
            form: {
                min: '>',
                minEqual: false,
                minNum: '',
                max: '<',
                maxEqual: false,
                maxNum: '',
                score: ''
            },
            rules: {
                minNum: { validator: minNumValidator },
                maxNum: { validator: maxNumValidator },
                score: { required: true, validator: scoreValidator }
            },
            columns: [
                { title: '范围', key: 'range' },
                { title: '得分', key: 'score' },
                { title: '操作', slot: 'default' }
            ]
        }
    },
    // watch: {
    //     data (data) {
    //         this.list = this.getRange(data)
    //     }
    // },
    beforeCreate () {
        this.minError = false
        this.maxError = false
        this.minNotPass = false
        this.maxNotPass = false
    },
    created () {
        this.data = this.getRange(this.list)
    },
    methods: {
        getRange (list) {
            let data = { equal: [], more: false, less: false, list: [] }
            list.forEach(item => {
                let [ range, minEqual, minNum, maxEqual, maxNum ] = item.range.match(/>?(=?)(\d+)?,?<?(=?)(\d+)?/)
                let type = range.replace(/\d|,|=/g, '')
                data.more = type === '>' || data.more
                data.less = type === '<' || data.less
                if (range === (minEqual + minNum)) {
                    type = 'equal'
                    data.equal.push(parseFloat(minNum))
                    data.list.push({ minNum, minEqual, maxNum, maxEqual, range, type, score: item.score })
                } else {
                    minEqual = minEqual === '='
                    maxEqual = maxEqual === '='
                    minNum = minNum ? parseFloat(minNum) : minNum
                    maxNum = maxNum ? parseFloat(maxNum) : maxNum
                    if (minEqual) data.equal.push(minNum)
                    if (maxEqual) data.equal.push(maxNum)
                    type = type === '>' ? 'more' : (type === '<' ? 'less' : 'moreless')
                    data.list.push({ minNum, minEqual, maxNum, maxEqual, range, type, score: item.score })
                }
            })
            return data
        },
        minChange (value) {
            this.form.minEqual = value === '=' || value === '>='
            if (value === '=') {
                this.form.maxNum = ''
            }
        },
        maxChange (value) {
            this.form.maxEqual = value === '<='
        },
        handleAdd () {
            this.$refs.form.validate(valid => {
                if (valid) {
                    let { min, minNum, minEqual, max, maxNum, maxEqual, score } = this.form
                    const type = min === '=' ? '=' : (((minNum ? min : '') + (maxNum ? max : ''))).replace(/=/g, '')
                    minNum = minNum ? parseFloat(minNum) : minNum
                    maxNum = maxNum ? parseFloat(maxNum) : maxNum
                    if (this.handleCalculate({ type, min, minNum, minEqual, max, maxNum, maxEqual, score })) {
                        this.$refs.form.resetFields()
                    }
                    if (this.minNotPass) this.$refs.form.validateField('minNum')
                    if (this.maxNotPass) this.$refs.form.validateField('maxNum')
                }
            })
            // this.$Message.success('通过')
        },
        handleCalculate ({ type, min, minNum, minEqual, max, maxNum, maxEqual, score }) {
            let range = ''
            switch (type) {
            case '=':
                if (this.handleEqual(minNum, type)) {
                    range = min + minNum
                    this.data.equal.push(minNum)
                    this.data.list.push({ minNum, minEqual, maxNum: undefined, maxEqual: false, range, type: 'equal', score })
                }
                break
            case '>':
                if (this.handleMore(minNum, minEqual)) {
                    range = min + minNum
                    this.data.more = true
                    if (minEqual) this.data.equal.push(minNum)
                    this.data.list.push({ minNum, minEqual, maxNum: undefined, maxEqual: false, range, type: 'more', score })
                }
                break
            case '<':
                if (this.handleLess(maxNum, maxEqual)) {
                    range = max + maxNum
                    this.data.less = true
                    if (maxEqual) this.data.equal.push(maxNum)
                    this.data.list.push({ maxNum, maxEqual, minNum: undefined, minEqual: false, range, type: 'less', score })
                }
                break
            default:
                if (this.handleMoreLess(minNum, minEqual, maxNum, maxEqual)) {
                    range = min + minNum + ',' + max + maxNum
                    if (minEqual) this.data.equal.push(minNum)
                    if (maxEqual) this.data.equal.push(maxNum)
                    this.data.list.push({ maxNum, maxEqual, minNum, minEqual, range, type: 'moreless', score })
                }
                break
            }
            return !!range
        },
        handleEqual (minNum, type) {
            // 相等闭合区间不能重复
            if (this.data.equal.indexOf(minNum) > -1) {
                return false
            } else {
                return this.handleListCheck({ minNum, type })
            }
        },
        handleMore (minNum, minEqual) {
            // 单左区间只能存在一个 || 新增单左闭合区间的临界值在临界值列表内
            if (this.data.more || (minEqual && this.data.equal.indexOf(minNum) > -1)) {
                this.minNotPass = true
                return false
            } else {
                return this.handleListCheck({ minNum })
            }
        },
        handleLess (maxNum, maxEqual) {
            // 单右区间只能存在一个 || 新增单右闭合区间的临界值在临界值列表内
            if (this.data.less || (maxEqual && this.data.equal.indexOf(maxNum) > -1)) {
                this.maxNotPass = true
                return false
            } else {
                return this.handleListCheck({ maxNum })
            }
        },
        handleMoreLess (minNum, minEqual, maxNum, maxEqual) {
            // 新增的左右闭区间的临界值在临界值列表内
            this.minNotPass = minEqual && this.data.equal.indexOf(minNum) > -1
            this.maxNotPass = maxEqual && this.data.equal.indexOf(maxNum) > -1
            if (this.minNotPass || this.maxNotPass) {
                return false
            } else {
                return this.handleListCheck({ minNum, minEqual, maxNum, maxEqual })
            }
        },
        handleListCheck ({ minNum, minEqual, maxNum, maxEqual, type }) {
            const all = this.data.list.filter(item => item.type !== 'equal')
            for (let i = 0; i < all.length; i++) {
                if (minNum !== undefined) {
                    // 新增的左区间在其他区间内
                    if (((all[i].minNum === undefined) || minNum > all[i].minNum || (minNum === all[i].minNum && all[i].minEqual)) &&
                        ((all[i].maxNum === undefined) || minNum < all[i].maxNum || (minNum === all[i].maxNum && all[i].maxEqual))) {
                        this.minNotPass = true
                    }
                }
                if (maxNum !== undefined) {
                    // 新增的右区间在其他区间内
                    if (((all[i].minNum === undefined) || maxNum > all[i].minNum || (maxNum === all[i].minNum && all[i].minEqual)) &&
                        ((all[i].maxNum === undefined) || maxNum < all[i].maxNum || (maxNum === all[i].maxNum && all[i].maxEqual))) {
                        this.maxNotPass = true
                    }
                }
                if (type !== '=') {
                    this.minNotPass = minNum === all[i].minNum
                    this.maxNotPass = maxNum === all[i].maxNum
                }
                if (this.minNotPass || this.maxNotPass) {
                    return false
                }
            }
            return true
        },
        handleDelete (row) {
            this.data.list.splice(row._index, 1)
            if (row.type === 'more') this.data.more = false
            if (row.type === 'less') this.data.less = false
        }
    }
}
</script>

<style lang="less" scoped>
.select {
    width: 40px;
    /deep/ .ivu-select-selected-value {
        padding-right: 8px;
        font-size: 14px;
    }
    /deep/ .ivu-icon {
        display: none;
    }
}
</style>
