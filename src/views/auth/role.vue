<template>
    <section>
        <Row :gutter="8">
            <Col span="8">
                <Card :padding="0" shadow>
                    <div slot="title">
                        角色列表
                        <Button @click="clearActiveMenu" class="btn-add" type="primary" size="small">新增</Button>
                    </div>
                    <CellGroup>
                        <Cell @click.native="getRoleMenuList(item, index)" v-for="(item, index) in list" :title="item.name" :key="item.id" class="role-cell">
                            <div class="role-opt" slot="extra">
                                <Button @click.stop="deleted(item)" type="error" size="small">删除</Button>
                            </div>
                        </Cell>
                    </CellGroup>
                </Card>
            </Col>
            <Col span="16">
                <Card shadow>
                    <span slot="title">{{isAdd ? '新增' : '修改'}}角色</span>
                    <Row :gutter="16">
                        <Col span="12">
                            <Form ref="formValidate" :model="form" :rules="ruleValidate" label-position="top">
                                <FormItem label="名称" prop="name">
                                    <Input v-model="form.name" :maxlength="20" />
                                </FormItem>
                                <FormItem label="备注" prop="remark">
                                    <Input v-model="form.remark" type="textarea" :maxlength="255"/>
                                </FormItem>
                                <FormItem>
                                    <Button @click="save" type="primary" long :loading="loading">保存</Button>
                                </FormItem>
                            </Form>
                        </Col>
                        <Col span="12">
                            <div class="ivu-form-item-required">
                                <p class="ivu-form-item-label" style="font-size: 12px">
                                    授权资源列表
                                    <transition name="opacity">
                                        <span v-show="treeEmpty" style="color: #ed4014">请选择</span>
                                    </transition>
                                </p>
                            </div>
                            <Tree class="tree" :class="{'tree-empty': treeEmpty}" ref="tree" :data="resourceList" @on-check-change="checkChange" show-checkbox v-maxheight="240"></Tree>
                        </Col>
                    </Row>
                </Card>
            </Col>
        </Row>
    </section>
</template>
<script>
export default {
    name: 'auth_role',
    data () {
        return {
            loading: false,
            isAdd: true,
            list: [],
            form: {
                id: '',
                name: '',
                remark: '',
                resourceIds: []
            },
            resourceList: [],
            allList: [],
            ruleValidate: {
                name: { required: true, message: '名称不能为空' }
            },
            treeEmpty: false,
            mustList: []
        }
    },
    created () {
        this.getList()
        this.getResourceList()
    },
    mounted () {
    },
    methods: {
        // 获取所有授权资源列表
        getResourceList () {
            this.$http.post('/system/resource/all').then(res => {
                this.allList = res.data.data
                this.setResourceList()
            }).catch(() => {})
        },
        // 初始化授权资源列表
        setResourceList () {
            this.resourceList = this.allList.filter(item => {
                this.$set(item, 'expand', true)
                this.$set(item, 'indeterminate', false)
                return item.parentId === 0
            })
            this.convertData(this.resourceList, this.allList)
        },
        convertData (list, allList) {
            list.forEach(item => {
                let children = allList.filter(ite => {
                    return ite.parentId === item.id
                })
                if (children.length > 0) {
                    if (item.required === 1) {
                        this.mustList.push(Object.assign({}, item))
                    }
                    this.$set(item, 'checked', false)
                    this.$set(item, 'children', children)
                    this.convertData(item.children, allList)
                } else {
                    if (item.required === 1) {
                        this.mustList.push(Object.assign(item))
                        item.checked = item.disabled = true
                    } else {
                        this.$set(item, 'checked', false)
                    }
                }
            })
        },
        // 获取角色的授权资源列表
        getRoleMenuList (item, index) {
            this.form = Object.assign(this.form, item)
            this.$http.post('/system/resource/role', {
                id: item.id
            }).then(res => {
                this.isAdd = false
                this.setActiveMenu(this.resourceList, res.data.data.map(item => item.name))
            }).catch(() => {})
        },
        // 设置选中的授权资源
        setActiveMenu (list, actives = []) {
            list.forEach(item => {
                if (item.children && item.children.length > 0) {
                    let len = item.children.filter(ite => {
                        return actives.indexOf(ite.name) > -1
                    }).length
                    item.checked = false
                    item.indeterminate = (actives.indexOf(item.name) > -1 && item.children.length !== len) || item.mand === 1
                    this.setActiveMenu(item.children, actives)
                } else {
                    item.checked = actives.indexOf(item.name) > -1
                }
            })
        },
        // 重置授权资源列表
        clearActiveMenu () {
            this.isAdd = true
            this.$refs.formValidate.resetFields()
            this.form.id = ''
            this.setActiveMenu(this.resourceList)
        },
        // 获取角色列表
        getList () {
            this.$http.post('/system/role/list').then(res => {
                this.list = res.data.data
            }).catch(() => {})
        },
        // 新增/修改角色
        save () {
            this.form.resourceIds = []
            this.$refs.tree.getCheckedAndIndeterminateNodes().forEach(item => {
                this.form.resourceIds.push(item.id)
            })
            this.mustList.forEach(item => {
                if (this.form.resourceIds.indexOf(item.id) === -1) {
                    this.form.resourceIds.push(item.id)
                }
            })
            this.treeEmpty = !this.form.resourceIds.length
            this.$refs.formValidate.validate(valid => {
                if (this.treeEmpty) return
                if (valid) {
                    let url = this.form.id ? '/system/role/update' : '/system/role/add'
                    this.loading = true
                    this.$http.post(url, {
                        ...this.form,
                        id: this.form.id || undefined
                    }).then(res => {
                        this.getList()
                        this.$Message.success('保存成功')
                        this.clearActiveMenu()
                    }).catch(() => {}).finally(() => {
                        this.loading = false
                    })
                }
            })
        },
        // 删除角色
        deleted (item) {
            this.$Modal.confirm({
                title: '提示',
                content: `确认删除${item.name}吗`,
                loading: true,
                onOk: () => {
                    this.$http.post('/system/role/delete', {
                        id: item.id
                    }).then(res => {
                        this.getList()
                        this.clearActiveMenu()
                        this.$Message.success('删除成功')
                    }).catch(() => {}).finally(() => {
                        this.$Modal.remove()
                    })
                }
            })
        },
        checkChange (arr) {
            this.treeEmpty = !arr.length && !this.mustList.length
        }
    }
}
</script>
<style lang="less" scoped>
.btn-add {
    margin-top: -3.5px;
    float: right;
}
.role-cell {
    border-bottom: 1px solid #e8eaec;
    &:hover {
        .role-opt {
            right: 0;
        }
    }
    .role-opt {
        transition: 0.2s right;
        position: relative;
        right: -102px;
    }
}
.tree {
    margin-top: 6px;
    padding-left: 10px;
    // border: 1px solid #dcdee2;
    border-radius: 4px;
    overflow: auto;
    transition: border 0.2s ease-in-out;
}
.tree-empty {
    border: 1px solid #ed4014;
}
.opacity-enter-active, .opacity-leave-active {
  transition: opacity 0.2s ease-in-out;
}
.opacity-enter, .opacity-leave-to {
  opacity: 0;
}
</style>
