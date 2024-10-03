<template>
    <section>
        <h2>{{ editable ? '编辑页面' : '只读页面' }}{{$route.params.id}}</h2>
    </section>
</template>

<script>
import { EditableSingleLimit } from './utils'
export default {
    data () {
        return {
            editable: false
        }
    },
    created () {
        const { id: value } = this.$route.params
        const editableSingleLimit = new EditableSingleLimit({ value })
        this.editable = editableSingleLimit.getEditable()
        document.title = this.editable ? `编辑${value}` : `只读${value}`
    }
}
</script>
