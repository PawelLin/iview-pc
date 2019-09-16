<template>
    <Card shadow>
        <Form :label-width="80">
            <Row :gutter="20">
                <Col span="6">
                    <FormItem label="A">
                        <Select v-model="form.A" multiple>
                            <Option value="A1">A1</Option>
                            <Option value="A2">A2</Option>
                            <Option value="A3">A3</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="B">
                        <Select v-model="form.B" multiple>
                            <Option value="B1">B1</Option>
                            <Option value="B2">B2</Option>
                            <Option value="B3">B3</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="C">
                        <Select v-model="form.C" multiple>
                            <Option value="C1">C1</Option>
                            <Option value="C2">C2</Option>
                            <Option value="C3">C3</Option>
                        </Select>
                    </FormItem>
                </Col>
                <Col span="6">
                    <FormItem label="D">
                        <Select v-model="form.D" multiple>
                            <Option value="D1">D1</Option>
                            <Option value="D2">D2</Option>
                            <Option value="D3">D3</Option>
                        </Select>
                    </FormItem>
                </Col>
            </Row>
        </Form>
        <Table :columns="columns" :data="list" size="small" border></Table>
    </Card>
</template>

<script>
import columns from './columns'
export default {
    name: 'demo_table_filter',
    data () {
        return {
            form: {
                A: '',
                B: '',
                C: '',
                D: ''
            },
            list: [
                {
                    A0: 'a0',
                    A1: 'a1',
                    A2: 'a2',
                    A3: 'a3',
                    B0: 'b0',
                    B1: 'b1',
                    B2: 'b2',
                    B3: 'b3',
                    C0: 'c0',
                    C1: 'c1',
                    C2: 'c2',
                    C3: 'c3',
                    D0: 'd0',
                    D1: 'd1',
                    D2: 'd2',
                    D3: 'd3'
                }
            ],
            columns: []
        }
    },
    watch: {
        form: {
            handler (form) {
                this.setColumns()
            },
            deep: true
        }
    },
    created () {
        this.columns = JSON.parse(JSON.stringify(columns))
        this.setColumns()
    },
    methods: {
        setColumns () {
            let columns1 = JSON.parse(JSON.stringify(columns))
            this.columns = this.getColumns(columns1, this.form)
        },
        getColumns (columns, form) {
            return columns.filter(item => {
                if (!item.needkey || form[item.needkey].indexOf(item.key) > -1) {
                    if (item.children && item.children.length) {
                        item.children = this.getColumns(item.children, form)
                        return item.children
                    } else {
                        return true
                    }
                } else {
                    return false
                }
            })
        }
    }
}
</script>
