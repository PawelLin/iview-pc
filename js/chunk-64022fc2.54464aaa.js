(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-64022fc2"],{1127:function(t,e,r){},"62b5":function(t,e,r){"use strict";r.r(e);var s=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("section",[r("Row",{attrs:{gutter:8}},[r("Col",{attrs:{span:"8"}},[r("Card",{attrs:{padding:0,shadow:""}},[r("div",{attrs:{slot:"title"},slot:"title"},[t._v("\n                    角色列表\n                    "),r("Button",{staticClass:"btn-add",attrs:{type:"primary",size:"small"},on:{click:t.clearActiveMenu}},[t._v("新增")])],1),r("CellGroup",t._l(t.list,(function(e,s){return r("Cell",{key:e.id,staticClass:"role-cell",attrs:{title:e.name},nativeOn:{click:function(r){return t.getRoleMenuList(e,s)}}},[r("div",{staticClass:"role-opt",attrs:{slot:"extra"},slot:"extra"},[r("Button",{attrs:{type:"error",size:"small"},on:{click:function(r){return r.stopPropagation(),t.deleted(e)}}},[t._v("删除")])],1)])})),1)],1)],1),r("Col",{attrs:{span:"16"}},[r("Card",{attrs:{shadow:""}},[r("span",{attrs:{slot:"title"},slot:"title"},[t._v(t._s(t.isAdd?"新增":"修改")+"角色")]),r("Row",{attrs:{gutter:16}},[r("Col",{attrs:{span:"12"}},[r("Form",{ref:"formValidate",attrs:{model:t.form,rules:t.ruleValidate,"label-position":"top"}},[r("FormItem",{attrs:{label:"名称",prop:"name"}},[r("Input",{attrs:{maxlength:20},model:{value:t.form.name,callback:function(e){t.$set(t.form,"name",e)},expression:"form.name"}})],1),r("FormItem",{attrs:{label:"备注",prop:"remark"}},[r("Input",{attrs:{type:"textarea",maxlength:255},model:{value:t.form.remark,callback:function(e){t.$set(t.form,"remark",e)},expression:"form.remark"}})],1),r("FormItem",[r("Button",{attrs:{type:"primary",long:"",loading:t.loading},on:{click:t.save}},[t._v("保存")])],1)],1)],1),r("Col",{attrs:{span:"12"}},[r("div",{staticClass:"ivu-form-item-required"},[r("p",{staticClass:"ivu-form-item-label"},[t._v("\n                                授权资源列表\n                                "),r("transition",{attrs:{name:"opacity"}},[r("span",{directives:[{name:"show",rawName:"v-show",value:t.treeEmpty,expression:"treeEmpty"}],staticStyle:{color:"#ed4014"}},[t._v("请选择")])])],1)]),r("Tree",{directives:[{name:"maxheight",rawName:"v-maxheight",value:250,expression:"250"}],ref:"tree",staticClass:"tree",class:{"tree-empty":t.treeEmpty},attrs:{data:t.resourceList,"show-checkbox":""},on:{"on-check-change":t.checkChange}})],1)],1)],1)],1)],1)],1)},n=[],i=(r("8e6e"),r("456d"),r("bd86"));r("7f7f"),r("ac6a");function a(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,s)}return r}function o(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?a(r,!0).forEach((function(e){Object(i["a"])(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):a(r).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var c={name:"auth_role",data:function(){return{loading:!1,isAdd:!0,list:[],form:{id:"",name:"",remark:"",resourceIds:[]},resourceList:[],allList:[],ruleValidate:{name:{required:!0,message:"名称不能为空"}},treeEmpty:!1,mustList:[]}},created:function(){this.getList(),this.getResourceList()},mounted:function(){},methods:{getResourceList:function(){var t=this;this.$http.post("/system/resource/all").then((function(e){t.allList=e.data.data,t.setResourceList()})).catch((function(){}))},setResourceList:function(){var t=this;this.resourceList=this.allList.filter((function(e){return t.$set(e,"expand",!0),t.$set(e,"indeterminate",!1),0===e.parentId})),this.convertData(this.resourceList,this.allList)},convertData:function(t,e){var r=this;t.forEach((function(t){var s=e.filter((function(e){return e.parentId===t.id}));s.length>0?(1===t.required&&r.mustList.push(Object.assign({},t)),r.$set(t,"checked",!1),r.$set(t,"children",s),r.convertData(t.children,e)):1===t.required?(r.mustList.push(Object.assign(t)),t.checked=t.disabled=!0):r.$set(t,"checked",!1)}))},getRoleMenuList:function(t,e){var r=this;this.form=Object.assign(this.form,t),this.$http.post("/system/resource/role",{id:t.id}).then((function(t){r.isAdd=!1,r.setActiveMenu(r.resourceList,t.data.data.map((function(t){return t.name})))})).catch((function(){}))},setActiveMenu:function(t){var e=this,r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:[];t.forEach((function(t){if(t.children&&t.children.length>0){var s=t.children.filter((function(t){return r.indexOf(t.name)>-1})).length;t.checked=!1,t.indeterminate=r.indexOf(t.name)>-1&&t.children.length!==s||1===t.mand,e.setActiveMenu(t.children,r)}else t.checked=r.indexOf(t.name)>-1}))},clearActiveMenu:function(){this.isAdd=!0,this.$refs.formValidate.resetFields(),this.form.id="",this.setActiveMenu(this.resourceList)},getList:function(){var t=this;this.$http.post("/system/role/list").then((function(e){t.list=e.data.data})).catch((function(){}))},save:function(){var t=this;this.form.resourceIds=[],this.$refs.tree.getCheckedAndIndeterminateNodes().forEach((function(e){t.form.resourceIds.push(e.id)})),this.mustList.forEach((function(e){-1===t.form.resourceIds.indexOf(e.id)&&t.form.resourceIds.push(e.id)})),this.treeEmpty=!this.form.resourceIds.length,this.$refs.formValidate.validate((function(e){if(!t.treeEmpty&&e){var r=t.form.id?"/system/role/update":"/system/role/add";t.loading=!0,t.$http.post(r,o({},t.form,{id:t.form.id||void 0})).then((function(e){t.getList(),t.$Message.success("保存成功"),t.clearActiveMenu()})).catch((function(){})).finally((function(){t.loading=!1}))}}))},deleted:function(t){var e=this;this.$Modal.confirm({title:"提示",content:"确认删除".concat(t.name,"吗"),loading:!0,onOk:function(){e.$http.post("/system/role/delete",{id:t.id}).then((function(t){e.getList(),e.clearActiveMenu(),e.$Message.success("删除成功")})).catch((function(){})).finally((function(){e.$Modal.remove()}))}})},checkChange:function(t){this.treeEmpty=!t.length&&!this.mustList.length}}},l=c,u=(r("e34c"),r("2877")),d=Object(u["a"])(l,s,n,!1,null,"24163725",null);e["default"]=d.exports},e34c:function(t,e,r){"use strict";var s=r("1127"),n=r.n(s);n.a}}]);
//# sourceMappingURL=chunk-64022fc2.54464aaa.js.map