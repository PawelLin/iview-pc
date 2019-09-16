export default {
    name: 'TableShowSlot',
    functional: true,
    inject: ['tableRoot'],
    props: {
        row: Object,
        slot: ''
    },
    render: (h, ctx) => {
        return h('div', ctx.injections.tableRoot.$scopedSlots[ctx.props.slot](ctx.props.row))
    }
}
