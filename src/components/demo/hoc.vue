<template>
    <Row>
        <Col span="12">
            <Form inline>
                <Row>
                    <Col>
                        <FormItem>
                            <NumberInput v-model="form.number" :maxlength="10" icon="md-create" search clearable
                                @on-change="handleNumberChange"
                                @on-enter="handleNumberEnter"
                                @on-click="handleNumberClick"
                                @on-focus="handleNumberFocus"
                                @on-blur="handleNumberBlur"
                                @on-keyup="handleNumberKeyup"
                                @on-keydown="handleNumberKeydown"
                                @on-keypress="handleNumberKeypress"
                                @on-search="handleNumberSearch"
                                @on-clear="handleNumberClear"
                            >
                                <span slot="prepend">数字输入框</span>
                                <!-- <span slot="append">NumberInput(Input)</span> -->
                            </NumberInput>
                        </FormItem>
                    </Col>
                    <Col>
                        <FormItem label="金额输入框">
                            <AmountInput v-model="form.money" />
                        </FormItem>
                        <span class="desc">AmountInput(Input)</span>
                    </Col>
                    <Col>
                        <FormItem label="千分位输入框">
                            <ThousandInput v-model="form.thousand" />
                        </FormItem>
                        <span class="desc">ThousandInput(Input)</span>
                    </Col>
                    <Col>
                        <FormItem label="自定义输入框">
                            <RegexInput v-model="form.regex" :maxlength="20" :regex="/^[a-zA-Z]*$/" />
                        </FormItem>
                        <span class="desc">RegexInput(Input)</span>
                    </Col>
                </Row>
            </Form>
        </Col>
        <Col span="8" class="value">
            <pre class="pre">
                {{formJson}}
            </pre>
        </Col>
    </Row>
</template>

<script>
import NumberInput from '_c/hoc/number'
import AmountInput from '_c/hoc/amount'
import ThousandInput from '_c/hoc/thousand'
import RegexInput from '_c/hoc/regex'
export default {
    name: 'demo_hoc',
    components: {
        NumberInput,
        AmountInput,
        ThousandInput,
        RegexInput
    },
    data () {
        return {
            form: {
                number: '111',
                money: '222',
                thousand: '333',
                regex: 'abc'
            }
        }
    },
    computed: {
        formJson () {
            return JSON.stringify({ form: this.form }, null, 4).replace(/^{/, '').replace(/}$/, '')
        }
    },
    methods: {
        handleNumberChange (e) {
            console.log('number change', e)
        },
        handleNumberEnter () {
            console.log('number enter')
        },
        handleNumberClick () {
            console.log('number click')
        },
        handleNumberFocus () {
            console.log('number focus')
        },
        handleNumberBlur () {
            console.log('number blur')
        },
        handleNumberKeyup (e) {
            console.log('number keyup', e)
        },
        handleNumberKeydown (e) {
            console.log('number keydown', e)
        },
        handleNumberKeypress (e) {
            console.log('number keypress', e)
        },
        handleNumberSearch (value) {
            console.log('number search', value)
        },
        handleNumberClear () {
            console.log('number clear')
        }
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
    line-height: 2.4;
}
.pre {
    margin-top: -25px;
}
</style>
