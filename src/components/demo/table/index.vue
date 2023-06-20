<template>
    <Tabs type="card">
        <TabPane label="列表 - 条件过滤">
            <TableFilter />
        </TabPane>
        <TabPane label="列表 - 一列占多行">
            <TableRowspan />
        </TabPane>
        <TabPane label="列表 - 一列占多行(含小计合计)">
            <TableRowspanSummary />
        </TabPane>
        <TabPane label="水平 - 固定列&固定行">
            <TableShow />
        </TabPane>
        <TabPane label="水平 - 一行占多列">
            <TableColspan />
        </TabPane>
    </Tabs>
</template>

<script>
import TableFilter from './filter'
import TableRowspan from './rowspan'
import TableRowspanSummary from './rowspan-summary'
import TableShow from './show'
import TableColspan from './colspan'

export default {
    name: 'demo_table',
    components: {
        TableFilter,
        TableRowspan,
        TableRowspanSummary,
        TableShow,
        TableColspan
    }
}
</script>
