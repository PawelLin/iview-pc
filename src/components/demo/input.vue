<template>
    <Row>
        <Col span="14">
            <Form :label-width="130" inline>
                <Row>
                    <Col>
                        <FormItem label="文本输入框">
                            <Input v-model="form.text" :maxlength="30" />
                        </FormItem>
                    </Col>
                    <Col>
                        <FormItem label="数字输入框">
                            <Input v-model="form.number" v-number :maxlength="10" />
                        </FormItem>
                        <span class="desc">指令：v-number</span>
                    </Col>
                    <Col>
                        <FormItem label="金额输入框">
                            <Input v-model="form.money" v-money="[9, 2]" />
                        </FormItem>
                        <span class="desc">指令：v-money = " [ 9, 2 ] "</span>
                    </Col>
                    <Col>
                        <FormItem label="金额(含最大值)输入框">
                            <Input v-model="form.moneyMax" v-money="[9, 2, true]" />
                        </FormItem>
                        <span class="desc">指令：v-money = " [ 9, 2, true ] "</span>
                    </Col>
                    <Col>
                        <FormItem label="千分位输入框">
                            <Input v-model="form.thousands" v-thousands />
                        </FormItem>
                        <span class="desc">指令：v-thousands</span>
                    </Col>
                    <Col>
                        <FormItem label="千分位输入框">
                            <Input v-model="form.thousandsNum" v-thousands="'number'" />
                        </FormItem>
                        <span class="desc">指令：v-thousands = " 'number' "</span>
                    </Col>
                    <Col>
                        <FormItem label="千分位格式输入框">
                            <Input v-model="form.thousandsAuto" v-thousands-auto :maxlength="20"/>
                        </FormItem>
                        <span class="desc">指令：v-thousands-auto</span>
                    </Col>
                    <Col>
                        <FormItem label="千分位格式输入框">
                            <Input v-model="form.thousandsAutoNum" v-thousands-auto="'number'" />
                        </FormItem>
                        <span class="desc">指令：v-thousands-auto = " 'number' "</span>
                    </Col>
                    <Col>
                        <FormItem label="日期">
                            <DatePicker v-model="form.date" type="date" placeholder="选择日期" :options="options"></DatePicker>
                        </FormItem>
                        <span class="desc">从当前日期开始</span>
                    </Col>
                    <Col>
                        <FormItem label="开始日期">
                            <DatePicker v-model="form.startDate" type="date" placeholder="选择日期" :options="options1"></DatePicker>
                        </FormItem>
                        <span class="desc">开始日期和结束日期联动限制</span>
                    </Col>
                    <Col>
                        <FormItem label="结束日期">
                            <DatePicker v-model="form.endDate" type="date" placeholder="选择日期" :options="options2"></DatePicker>
                        </FormItem>
                        <span class="desc">开始日期和结束日期联动限制</span>
                    </Col>
                    <Col>
                        <FormItem label="开始日期">
                            <DatePicker v-model="form.startDate1" type="date" placeholder="选择日期" :options="options3"></DatePicker>
                        </FormItem>
                        <span class="desc">从当前日期开始并且开始日期和结束日期联动限制</span>
                    </Col>
                    <Col>
                        <FormItem label="结束日期">
                            <DatePicker v-model="form.endDate1" type="date" placeholder="选择日期" :options="options4"></DatePicker>
                        </FormItem>
                        <span class="desc">从当前日期开始并且开始日期和结束日期联动限制</span>
                    </Col>
                </Row>
            </Form>
        </Col>
        <Col span="8" class="value">
            <p>form.text = {{form.text}}</p>
            <p>form.number = {{form.number}}</p>
            <p>form.money = {{form.money}}</p>
            <p>form.moneyMax = {{form.moneyMax}}</p>
            <p>form.thousands = {{form.thousands}}</p>
            <p>form.thousandsNum = {{form.thousandsNum}}</p>
            <p>form.thousandsAuto = {{form.thousandsAuto}}</p>
            <p>form.thousandsAutoNum = {{form.thousandsAutoNum}}</p>
            <p>form.date = {{form.date}}</p>
            <p>form.startDate = {{form.startDate}}</p>
            <p>form.endDate = {{form.endDate}}</p>
            <p>form.endDate | dateFormat = {{form.endDate | dateFormat}}</p>
            <p>form.startDate1 = {{form.startDate1}}</p>
            <p>form.endDate1 = {{form.endDate1}}</p>
        </Col>
    </Row>
</template>

<script>
import { setTimeout } from 'timers'
export default {
    name: 'demo_input',
    data () {
        return {
            form: {
                text: '',
                number: '0',
                money: '0',
                moneyMax: '0',
                thousands: '0',
                thousandsNum: '0',
                thousandsAuto: '0123456',
                thousandsAutoNum: '0123456',
                date: '',
                startDate: '',
                endDate: '',
                startDate1: '',
                endDate1: ''
            },
            options: {
                disabledDate (date) {
                    return date && date.valueOf() < Date.now() - 86400000
                }
            }
        }
    },
    computed: {
        options1 () {
            return { disabledDate: date => !!this.form.endDate && (date && date.valueOf() > this.form.endDate.valueOf()) }
        },
        options2 () {
            return { disabledDate: date => date && date.valueOf() < this.form.startDate.valueOf() }
        },
        options3 () {
            return { disabledDate: date => (date && date.valueOf() < Date.now() - 86400000) || (this.form.endDate1 && date.valueOf() > this.form.endDate1.valueOf()) }
        },
        options4 () {
            return { disabledDate: date => date && (date.valueOf() < ((this.form.startDate1 && this.form.startDate1.valueOf()) || (Date.now() - 86400000))) }
        }
    },
    created () {
        setTimeout(() => {
            this.form.thousandsAuto = '123456789.01'
            this.form.thousandsAutoNum = '123456789.01'
        }, 1000)
    }
}
</script>

<style lang="less" scoped>
.desc {
    display: inline-block;
    padding: 10px 0;
    line-height: 1;
}
.value {
    line-height: 2;
}
</style>
