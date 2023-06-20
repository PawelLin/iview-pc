(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-985307e6"],{"07cb":function(e,t,o){e.exports=o.p+"media/test.3f123d8f.mp4"},"10fd":function(e,t,o){"use strict";t["a"]={isMobile:function(e){return/^1\d{10}$/.test(e)},isInteger:function(e){return/^\d{1,10}$/.test(e)},isAmount:function(e){return/^\d{1,10}(\.\d{1,2})?$/.test(e)},isRate:function(e){return/^((([1-9]\d{0,1}|0)(\.\d{1,4})?)|100)$/.test(e)},isLoginName:function(e){return/^[\dA-Za-z]{4,20}$/.test(e)},isEmail:function(e){return/^[0-9a-zA-Z_-]{1,30}@([0-9a-zA-Z_-]{1,28}\.[0-9a-zA-Z_-]+)+$/.test(e)},isPwd:function(e){return/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,}$/.test(e)}}},"163a":function(e,t,o){"use strict";var s=o("b235"),r=o.n(s);r.a},"1f9e":function(e,t,o){},"23fe":function(e,t,o){},"43fe":function(e,t,o){"use strict";var s=o("4ea3"),r=o.n(s);r.a},"4ea3":function(e,t,o){},"54e4":function(e,t,o){},"5e1c":function(e,t,o){"use strict";var s=o("23fe"),r=o.n(s);r.a},8912:function(e,t,o){"use strict";var s=o("2b0e"),r=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("Modal",{attrs:{title:"修改密码",width:416,closable:e.closable,"mask-closable":e.closable},on:{"on-visible-change":e.modalChange},model:{value:e.modal,callback:function(t){e.modal=t},expression:"modal"}},[o("Form",{ref:"form",attrs:{model:e.form,rules:e.rules,"label-width":80,"label-position":"left"}},[o("FormItem",{attrs:{label:"原密码",prop:"origPassword"}},[o("Input",{attrs:{type:"password",maxlength:12},model:{value:e.form.origPassword,callback:function(t){e.$set(e.form,"origPassword",t)},expression:"form.origPassword"}})],1),o("FormItem",{attrs:{label:"密码",prop:"newPassword"}},[o("Input",{attrs:{type:"password",maxlength:12},model:{value:e.form.newPassword,callback:function(t){e.$set(e.form,"newPassword",t)},expression:"form.newPassword"}})],1),o("FormItem",{attrs:{label:"确认密码",prop:"confirmPassword"}},[o("Input",{attrs:{type:"password",maxlength:12},model:{value:e.form.confirmPassword,callback:function(t){e.$set(e.form,"confirmPassword",t)},expression:"form.confirmPassword"}})],1)],1),o("div",{attrs:{slot:"footer"},slot:"footer"},[o("Button",{attrs:{type:"primary",loading:e.loading},on:{click:e.handleSubmit}},[e._v("确定")])],1)],1)},n=[],i=o("10fd"),a=o("7532"),l={props:{closable:{type:Boolean,default:!0},callback:Function},data:function(){var e=this,t=function(e,t,o){o(t?void 0:new Error("原密码不能为空"))},o=function(e,t,o){o(t?i["a"].isPwd(t)?void 0:new Error("密码为6-12位的数字+字母"):new Error("密码不能为空"))},s=function(t,o,s){o?i["a"].isPwd(o)?o!==e.form.newPassword?s(new Error("密码与确认密码不一致")):s():s(new Error("确认密码为6-12位的数字+字母")):s(new Error("确认密码不能为空"))};return{modal:!1,loading:!1,form:{origPassword:"",newPassword:"",confirmPassword:""},rules:{origPassword:{required:!0,validator:t},newPassword:{required:!0,validator:o},confirmPassword:{required:!0,validator:s}}}},mounted:function(){this.modal=!0},methods:{modalChange:function(e){var t=this;e||setTimeout((function(){document.body.removeChild(t.$el),t.$destroy()}),150)},handleSubmit:function(){var e=this;this.$refs.form.validate((function(t){t&&(e.loading=!0,e.$http.post("/system/password/update",{origPassword:Object(a["a"])(e.form.origPassword),newPassword:Object(a["a"])(e.form.newPassword)}).then((function(){e.modal=!1,e.callback&&e.callback(!0)})).catch((function(){})).finally((function(){e.loading=!1})))}))}}},u=l,d=o("2877"),c=Object(d["a"])(u,r,n,!1,null,null,null),m=c.exports;function p(e){var t=s["default"].extend(m),o=new t({propsData:e}).$mount();document.body.appendChild(o.$el)}t["a"]=p},"957d":function(e,t,o){"use strict";var s=o("e46a"),r=o.n(s);r.a},"9f17":function(e,t,o){"use strict";var s=o("54e4"),r=o.n(s);r.a},b235:function(e,t,o){},b3cb:function(e,t,o){"use strict";var s=o("1f9e"),r=o.n(s);r.a},bb51:function(e,t,o){"use strict";o.r(t);var s=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"markdown-body home"},[o("README")],1)},r=[],n=(o("a481"),function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"hello"},[o("h1",[e._v(e._s(e.msg))]),e._m(0),o("h3",[e._v("Installed CLI Plugins")]),e._m(1),o("h3",[e._v("Essential Links")]),e._m(2),o("h3",[e._v("Ecosystem")]),e._m(3)])}),i=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("p",[e._v("\n        For a guide and recipes on how to configure / customize this project,"),o("br"),e._v("\n        check out the\n        "),o("a",{attrs:{href:"https://cli.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-cli documentation")]),e._v(".\n    ")])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ul",[o("li",[o("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-babel",target:"_blank",rel:"noopener"}},[e._v("babel")])]),o("li",[o("a",{attrs:{href:"https://github.com/vuejs/vue-cli/tree/dev/packages/%40vue/cli-plugin-eslint",target:"_blank",rel:"noopener"}},[e._v("eslint")])])])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ul",[o("li",[o("a",{attrs:{href:"https://vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Core Docs")])]),o("li",[o("a",{attrs:{href:"https://forum.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Forum")])]),o("li",[o("a",{attrs:{href:"https://chat.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("Community Chat")])]),o("li",[o("a",{attrs:{href:"https://twitter.com/vuejs",target:"_blank",rel:"noopener"}},[e._v("Twitter")])]),o("li",[o("a",{attrs:{href:"https://news.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("News")])])])},function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("ul",[o("li",[o("a",{attrs:{href:"https://router.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-router")])]),o("li",[o("a",{attrs:{href:"https://vuex.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vuex")])]),o("li",[o("a",{attrs:{href:"https://github.com/vuejs/vue-devtools#vue-devtools",target:"_blank",rel:"noopener"}},[e._v("vue-devtools")])]),o("li",[o("a",{attrs:{href:"https://vue-loader.vuejs.org",target:"_blank",rel:"noopener"}},[e._v("vue-loader")])]),o("li",[o("a",{attrs:{href:"https://github.com/vuejs/awesome-vue",target:"_blank",rel:"noopener"}},[e._v("awesome-vue")])])])}],a={name:"HelloWorld",props:{msg:String}},l=a,u=(o("43fe"),o("2877")),d=Object(u["a"])(l,n,i,!1,null,"57b93f13",null),c=d.exports,m=o("8912"),p=o("2b0e"),v=o("10fd"),h=o("7532"),f=new p["default"]({data:function(){var e=this,t=function(e,t,o){o(t?void 0:new Error("原密码不能为空"))},o=function(e,t,o){o(t?v["a"].isPwd(t)?void 0:new Error("密码为6-12位的数字+字母"):new Error("密码不能为空"))},s=function(t,o,s){o?v["a"].isPwd(o)?o!==e.form.newPassword?s(new Error("密码与确认密码不一致")):s():s(new Error("确认密码为6-12位的数字+字母")):s(new Error("确认密码不能为空"))};return{form:{origPassword:"",newPassword:"",confirmPassword:""},rules:{origPassword:{required:!0,validator:t},newPassword:{required:!0,validator:o},confirmPassword:{required:!0,validator:s}},loading:!1}},beforeCreate:function(){this.divStyle="margin: -16px -20px 0;",this.formStyle="padding: 14px 16px 0;",this.buttonStyle="position: absolute;right: 0;",this.titleStyle=" padding: 14px 16px;\n                            border-bottom: 1px solid #e8eaec;\n                            font-size: 14px;\n                            color: #17233d;\n                            font-weight: 700;\n                            overflow: hidden;\n                            text-overflow: ellipsis;\n                            white-space: nowrap;"},methods:{handleRender:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]&&arguments[0];return new Promise((function(o,s){e.$Modal.info({closable:t,render:function(t){var s=e.$createElement,r=s("Button",{props:{type:"primary",size:"large",loading:e.loading},on:{click:function(){e.updatePwd(o)}}},"确定"),n=s("div",{attrs:{style:e.titleStyle}},"修改密码"),i=s("Input",{props:{value:e.form.origPassword,type:"password",maxlength:12},on:{input:function(t){e.form.origPassword=t}}}),a=s("Input",{props:{value:e.form.newPassword,type:"password",maxlength:12},on:{input:function(t){e.form.newPassword=t}}}),l=s("Input",{props:{value:e.form.confirmPassword,type:"password",maxlength:12},on:{input:function(t){e.form.confirmPassword=t}}}),u=s("FormItem",{props:{label:"原密码",prop:"origPassword"}},[i]),d=s("FormItem",{props:{label:"密码",prop:"newPassword"}},[a]),c=s("FormItem",{props:{label:"确认密码",prop:"confirmPassword"}},[l]),m=s("FormItem",{attrs:{style:e.buttonStyle}},[r]),p=s("Form",{ref:"form",attrs:{style:e.formStyle,model:e.form,rules:e.rules},props:{labelWidth:80,labelPosition:"left"}},[u,d,c,m]);return s("div",{attrs:{style:e.divStyle}},[n,p])},onOk:function(){}})}))},updatePwd:function(e){var t=this;this.$refs.form.validate((function(o){o&&(t.loading=!0,t.$http.post("/system/password/update",{origPassword:Object(h["a"])(t.form.origPassword),newPassword:Object(h["a"])(t.form.newPassword)}).then((function(){e(),t.$Modal.remove()})).catch((function(){})).finally((function(){t.$refs.form.resetFields(),t.loading=!1})))}))}}}),g=f.handleRender,w=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticClass:"screen-preview"},[o("transition",{attrs:{name:"fade"}},[o("div",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"}],staticClass:"ivu-modal-mask",on:{click:function(t){return t.target!==t.currentTarget?null:e.handleHide(t)}}})]),o("transition",{attrs:{name:"ease-in"}},["image"===e.type?o("img",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"},{name:"move",rawName:"v-move",value:{limit:!0},expression:"{ limit: true }"}],staticClass:"media",staticStyle:{transform:"translate(-50%, -50%) scale(1)"},attrs:{src:e.src},on:{load:e.handleLoaded}}):o("Video",{directives:[{name:"show",rawName:"v-show",value:e.show,expression:"show"},{name:"move",rawName:"v-move",value:{limit:!0},expression:"{ limit: true }"}],staticClass:"media",staticStyle:{transform:"translate(-50%, -50%) scale(1)"},attrs:{src:e.src},on:{load:e.handleLoaded}})],1)],1)},b=[],y=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"video"},[s("video",{ref:"video",attrs:{src:o("07cb")},on:{loadstart:e.loadstart,loadeddata:e.loadeddata}}),s("div",{staticClass:"operation",nativeOn:{mousedown:function(e){e.stopPropagation()}}},[s("div",{staticClass:"button-bar"},[s("Icon",{ref:"play",staticClass:"play",attrs:{type:e.play?"ios-pause":"ios-play",size:"18"},on:{click:e.handlePlay}}),s("span",{staticClass:"time"},[e._v(e._s(e.show.currentTime)+" / "+e._s(e.show.duration))]),s("div",{ref:"volume",staticClass:"volume",style:e.volumeStyle,on:{mouseover:e.volumeMouseover,mouseleave:e.volumeMouseleave}},[s("transition",{attrs:{name:"slide-progress"}},[s("Progress",{directives:[{name:"show",rawName:"v-show",value:e.volumeShow,expression:"volumeShow"}],staticClass:"progress",attrs:{moved:e.volumeMoved,top:16,disabled:"progress"===e.disabled,"loaded-color":"rgba(255, 255, 255, 0.6)"},on:{"update:moved":function(t){e.volumeMoved=t},progressMousedown:e.volumeMousedown,progressMousemove:e.volumeMousemove,progressMouseup:e.volumeMouseup}})],1),s("Icon",{ref:"volumeIcon",staticClass:"volume-icon",attrs:{type:e.volumeMoved?"md-volume-up":"md-volume-off",size:"18"},on:{click:e.volumeClick}})],1),s("Icon",{staticClass:"screen",attrs:{type:"md-expand",size:"18"},on:{mouseover:function(t){return e.changeVolumeShow(!0)},mouseleave:function(t){return e.changeVolumeShow(!1)}}})],1),s("Progress",{staticClass:"progress",attrs:{moved:e.moved,left:16,disabled:"volume"===e.disabled},on:{"update:moved":function(t){e.moved=t},progressMousedown:e.progressMousedown,progressMousemove:e.progressMousemove,progressMouseup:e.progressMouseup}})],1)])},P=[],_=(o("6b54"),o("90de")),M=function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{ref:"progress",staticClass:"progress",style:e.progressStyle,on:{mousedown:function(t){return t.stopPropagation(),e.progressMousedown(t)},mouseover:function(t){return e.changeProgressPointShow(!0)},mouseleave:function(t){return e.changeProgressPointShow(!1)}}},[o("div",{ref:"progressBar",staticClass:"progress-bar"},[o("div",{staticClass:"progress-loaded",style:e.progressLoadedStyle})]),o("div",{staticClass:"progress-move",style:e.progressMoveStyle},[o("transition",{attrs:{name:"fade"}},[o("span",{directives:[{name:"show",rawName:"v-show",value:e.progressPointShow,expression:"progressPointShow"}],ref:"progressPoint",staticClass:"progress-point",style:{marginLeft:100*e.moved+"%"}})])],1)])},S=[],x=(o("c5f6"),{props:{moved:{type:Number,default:0},left:{type:Number,default:0},top:{type:Number,default:0},loadedColor:{type:String,default:"#ffffff"},disabled:{type:Boolean,default:!1}},inject:["video"],data:function(){return{progressPointShow:!1}},computed:{progressStyle:function(){return{paddingLeft:"".concat(this.left,"px"),paddingRight:"".concat(this.left,"px")}},progressLoadedStyle:function(){return{width:"".concat(100*this.moved,"%"),background:this.loadedColor}},progressMoveStyle:function(){return{left:"".concat(this.left,"px"),right:"".concat(this.left+12,"px"),top:"".concat(this.top,"px")}}},beforeCreate:function(){this.progress={move:!1,x:0,left:0,minLeft:0,barWidth:0,pointWidth:0}},mounted:function(){Object(_["g"])(window,"mousemove",this.progressMousemove),Object(_["g"])(window,"mouseup",this.progressMouseup)},methods:{progressMousedown:function(e){if(!this.disabled){this.progress.move=!0;var t=this.video.$refs.video.getBoundingClientRect(),o=t.left,s=this.$refs.progressBar.getBoundingClientRect(),r=s.left,n=s.width,i=this.$refs.progressPoint.getBoundingClientRect(),a=i.width,l=this.progress.minLeft=r-o,u=e.clientX-o-a/2,d=Math.min(Math.max((u-l)/(n-a),0),1);this.progress.left=u,this.progress.x=e.clientX,this.progress.barWidth=n,this.progress.pointWidth=a,this.$emit("update:moved",d),this.$emit("progressMousedown",d)}},progressMousemove:function(e){if(!this.disabled&&this.progress.move){this.progressPointShow=!0;var t=this.progress,o=t.minLeft,s=t.barWidth,r=t.pointWidth,n=e.clientX-this.progress.x+this.progress.left,i=Math.min(Math.max((n-o)/(s-r),0),1);this.$emit("update:moved",i),this.$emit("progressMousemove",i)}},progressMouseup:function(e){this.disabled||(this.progressPointShow=this.$refs.progress.contains(e.target),this.progress.move=!1,this.$emit("progressMouseup",e))},changeProgressPointShow:function(e){this.disabled||this.progress.move||(this.progressPointShow=e)}},beforeDestroy:function(){Object(_["f"])(window,"mousemove",this.progressMousemove),Object(_["f"])(window,"mouseup",this.progressMouseup)}}),k=x,C=(o("957d"),Object(u["a"])(k,M,S,!1,null,"09686954",null)),$=C.exports,A={components:{Progress:$},provide:function(){return{video:this}},props:{src:{type:[Object,String],required:!0}},data:function(){return{moved:0,volumeMoved:1,volumeShow:!1,volumeStyle:{},volumeMoving:!1,play:!1,show:{currentTime:"0:00",duration:"0:00"},time:{currentTime:0,duration:0},disabled:""}},watch:{play:function(e){this.play?this.video.play():this.video.pause()}},beforeCreate:function(){this.preIsPlay="",this.preVolumeMoved=1,this.volumeMoving=!1},mounted:function(){this.video=this.$refs.video},methods:{loadstart:function(){this.$emit("load")},loadeddata:function(){var e=this;this.time.duration=this.video.duration,this.show.duration=this.timeFormat(this.video.duration),Object(_["g"])(this.video,"timeupdate",this.timeUpdate),Object(_["g"])(this.video,"ended",(function(){e.play=!1}))},timeUpdate:function(e){var t=(e.target.currentTime-this.time.currentTime)/e.target.duration;this.play&&(this.moved=Math.min(Math.max(t+this.moved,0),1),this.show.currentTime=this.timeFormat(e.target.currentTime)),this.time.currentTime=e.target.currentTime},handlePlay:function(){this.play=!this.play},volumeClick:function(){this.volumeMoved&&(this.preVolumeMoved=this.volumeMoved),this.video.volume=this.volumeMoved=this.volumeMoved?0:this.preVolumeMoved},volumeMousedown:function(e){this.disabled="volume",this.video.volume=e},volumeMousemove:function(e){this.volumeMousedown(e),this.volumeMoving=!0},volumeMouseup:function(e){this.disabled="",this.volumeMoving=!1,this.$refs.volume.contains(e.target)||this.volumeMouseleave()},volumeMouseover:function(){"progress"!==this.disabled&&(this.volumeStyle={width:"112px",background:"rgba(25, 30, 31, 0.8)"},this.volumeShow=!0)},volumeMouseleave:function(){this.volumeMoving||(this.volumeStyle={width:"43px",background:"transparent"},this.volumeShow=!1)},changeVolumeShow:function(e){this.volumeShow=e},progressMousedown:function(e){this.disabled="progress",this.preIsPlay=this.play,this.play=!1,this.timeSet(e)},progressMousemove:function(e){this.timeSet(e)},progressMouseup:function(e){this.$refs.volumeIcon.$el.contains(e.target)?(this.disabled="volumne",this.volumeMouseover()):this.disabled="",this.$refs.play.$el.contains(e.target)||""===this.preIsPlay||(this.play=this.preIsPlay,this.preIsPlay="")},timeSet:function(e){this.video.currentTime=e*this.time.duration,this.show.currentTime=this.timeFormat(this.video.currentTime)},timeFormat:function(e){var t=Math.floor(e/60).toString(),o=Math.floor(e%60).toString();return o=1===o.length?"0".concat(o):o,"".concat(t,":").concat(o)}}},E=A,I=(o("163a"),Object(u["a"])(E,y,P,!1,null,"a27cba62",null)),O=I.exports,j={components:{Video:O},props:{src:{type:[Object,String],required:!0},type:{type:String,required:!0},rotate:{type:Boolean,default:!1},scale:{type:Boolean,default:!0}},data:function(){return{show:!1}},mounted:function(){document.body.style.overflow="hidden"},methods:{handleHide:function(){document.body.removeChild(this.$el),document.body.style.overflow="",this.$destroy()},handleLoaded:function(){this.show=!0}}},F=j,H=(o("5e1c"),Object(u["a"])(F,w,b,!1,null,"7e80b8b4",null)),z=H.exports;function R(e){var t=p["default"].extend(z),o=new t({propsData:e}).$mount();document.body.appendChild(o.$el)}var T=R,N=o("07cb"),V=o.n(N),Z=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"start"},[s("img",{attrs:{width:e.imgWidth,height:e.imgHeight,src:o("d7a7"),alt:"start"}}),s("div",{staticClass:"start-light",style:{width:e.width+"%",backgroundSize:e.backgroundSize+"% 100%"}})])},L=[],W={props:{nums:{type:Number,default:0},imgWidth:{type:String,default:"auto"},imgHeight:{type:String,default:"auto"}},computed:{width:function(){return 20*this.nums+(this.nums%1!==0?this.nums-2.5:0)},backgroundSize:function(){return 0===this.nums?100:1e4/this.width}}},q=W,B=(o("b3cb"),Object(u["a"])(q,Z,L,!1,null,"61f31d78",null)),J=B.exports,D=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},U=[function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("section",[o("h1",[e._v("iview-pc")]),o("p",[o("a",{attrs:{href:"https://github.com/vuejs/vue"}},[o("img",{attrs:{src:"https://img.shields.io/badge/vue-2.6.10-brightgreen.svg?style=flat-square",alt:"vue"}})]),o("a",{attrs:{href:"https://github.com/iview/iview"}},[o("img",{attrs:{src:"https://img.shields.io/badge/iview-4.0.2-brightgreen.svg?style=flat-square",alt:"iview ui"}})])]),o("h2",[e._v("介绍")]),o("p",[e._v("iview-pc是基于Vue2，参考iView Admin开发的一套管理系统。")]),o("ul",[o("li",[o("a",{attrs:{href:"https://pawellin.github.io/iview-pc/#/login"}},[e._v("在线访问")])])]),o("h2",[e._v("功能")]),o("ul",[o("li",[e._v("登录/登出")]),o("li",[e._v("组件\n"),o("ul",[o("li",[e._v("文件上传")]),o("li",[e._v("只针对label的筛选下拉框")])])]),o("li",[e._v("固定功能\n"),o("ul",[o("li",[e._v("用户管理")]),o("li",[e._v("角色管理")])])]),o("li",[e._v("表格扩展\n"),o("ul",[o("li",[e._v("条件过滤")]),o("li",[e._v("一列占多行")]),o("li",[e._v("固定列&固定行")]),o("li",[e._v("一行占多列")])])]),o("li",[e._v("错误页面\n"),o("ul",[o("li",[e._v("403页面")]),o("li",[e._v("404页面")]),o("li",[e._v("500页面")])])]),o("li",[e._v("高级路由\n"),o("ul",[o("li",[e._v("动态路由")]),o("li",[e._v("带参页面")])])]),o("li",[e._v("收缩侧边栏")]),o("li",[e._v("tag标签导航")])]),o("h2",[e._v("文件结构")]),o("pre",{pre:!0},[o("code",{pre:!0,attrs:{"v-pre":"",class:"language-shell"}},[e._v(".\n├── mock  模拟数据\n├── plugins  webpack扩展插件\n├── public  打包所需静态资源\n└── src\n    └── assets  项目静态资源\n        ├── icons  自定义图标资源\n        └── images  图片资源\n    ├── components  通用公共组件\n        ├── demo  自定义模块使用展示\n        ├── error  错误页面\n        ├── input  表单扩展\n        ├── main  公共页面\n        └── upload  文件上传\n    ├── directive  自定义指令\n        ├── clickoutside 节点以外点击\n        ├── draggable 拖拽\n        ├── maxheight 设置最大高度\n        ├── money Input金额输入\n        ├── number Input数字输入\n        ├── thousands Input千分位输入\n        └── thousands Input千分位自动格式输入\n    ├── libs  封装工具函数\n        ├── rsa  加解密\n        ├── axios  http封装\n        ├── enums  枚举值\n        ├── filters  过滤器\n        ├── mixins  全局混合\n        ├── service  公共api\n        ├── tools  工具函数\n        ├── utils  功能方法\n        └── validate  验证方法\n    ├── router  路由配置 (可配置iframe)\n    ├── store  Vuex配置\n    └── view  页面文件\n        ├── login  登录页面\n        └── system  系统模块\n")])]),o("h2",[e._v("Install")]),o("pre",{pre:!0},[o("code",{pre:!0,attrs:{"v-pre":"",class:"language-bush"}},[e._v("npm install\n")])]),o("h2",[e._v("Run")]),o("h3",[e._v("Development")]),o("pre",{pre:!0},[o("code",{pre:!0,attrs:{"v-pre":"",class:"language-bush"}},[e._v("npm run dev\n")])]),o("h3",[e._v("Production(Build)")]),o("pre",{pre:!0},[o("code",{pre:!0,attrs:{"v-pre":"",class:"language-bush"}},[e._v("npm run build\n")])])])}],X={},K=Object(u["a"])(X,D,U,!1,null,null,null),Q=K.exports,Y=(o("e4cb"),{name:"home",components:{HelloWorld:c,Start:J,README:Q},data:function(){return{mp4:V.a}},created:function(){},methods:{load:function(){var e=window.open("/loading");this.$http.post("/test",{}).then((function(t){setTimeout((function(){e.location.replace("http://www.baidu.com")}),2e3)})).catch((function(){e.close()}))},showImagePreview:function(e){T({type:"image",src:e})},showVideoPreview:function(e){T({type:"video",src:e})},updatePwd1:function(){Object(m["a"])({closable:!0,callback:function(e){console.log(e)}})},updatePwd2:function(){g(!0)}}}),G=Y,ee=(o("9f17"),Object(u["a"])(G,s,r,!1,null,"6b612945",null));t["default"]=ee.exports},d7a7:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAKwAAAAaCAYAAAAqorewAAAAAXNSR0IArs4c6QAAA9RJREFUeAHtW01LW0EUNS8RS5JVhBbaWpA2BaEfP6Ab4yogSmjFRf9bF924kC7yoaAuzKqLQLvpprRSLArdKS2E2mgTe27Ni/PGmZv33uRlkZmCvPsx996T08NkEsepqRj/tra2nmxvbz+NUZpIicPD0zpJ/Hj8S72ZrdVqj1Kp1Boyr8i+uWK8EYeH53vS+Iks2JmZmUWfItH2Y+N+ihhEe9w4/HkiBtH28+N+ihhEe9w4/HkiBtH288OekQTbaDSK3W73vt+UbIr5/rifDg/P+CTyE0mw6XR6UaZIFZPXJOWrZqtiSc2X+6pmq2JyXVK+arYqltR8ua9qtiom14l+aMHu7e0VLy8v74nFZFOMcnI8ad/h4RmeVH5CCxZv/yUdRVxOV2Ma52ZyOdO5unpuJpfT9TONczO5nOlcXT03k8vJ/UIJFmeh571e765c7PuUozW+n/TT4eEZnmR+UuJLxwvNQu2zOFcUpqenC7ALnufNcmIV67H2B9aeoP704uLiFPWnsE9WVlZ+i+vC2g4Pz5SN/KR2d3dzOIe+pLMoxHaLpyheFkL+g/7H7Xa7tr6+3ua6ODyOH1kfon487IQPsBM+TEqsNJx6Q7DFbDY7J4ORfYdHZiTo286Pl8vlDqDgwyAto/doBs0a1tnh4RmynR+vVCr9PTo62sCvW4eKiadSn6XeNINm6VddZRweniHb+Rl86Nrc3Ezn8/k1vHUv8JRFy0Ksn3F2fYezazdKpcPDs2UrPwPBEj0Qq7ezs1PBmfMZT1e4LI4Bn8rlchWi7YWrCK5yeIJ8yJ6N/AS+hyVhtVotEthHmZyoPvXo94olVprn8PCs28hPYIcV6cF919fwH4uxCPbX5eXljQjrhy51eHiKbOEnsMOKlODt/KfoR7FNanVzTHqa1Do8Ogb4uAnnXK1WsDjH3uYh6bMmtbquJj1Nah0eHQN83IRzrlYrWJyPYgvWpFZHg0lPk1qHR8cAHzfhnKtVCrbZbObxCTTLQ9JnqZZ66FdEyzg8PF828aMU7NnZ2R2eouHZUfTwp4yi1yh6ODw+A/xzFFzremRUo2lLxi6pStFXTQf4eU9JrHmBH+Xl7f62/k3ZJGLQ4eEJs4kfrWBlivDJ7bDT6exXKpVjIfe9Wq3O4Y/JlnBQnhfiJOzYZ2CxD9mqXg7PNUs28aMULMQ3OH9iBz2Gv4/vVZUXZPoCfluv1+choiWQ9/9GFm6AxT4DX/9XXFkOj8xI0LeJH6VgcYWtmclkfoGIL7h8HepSzOrqKgn6DS4VF1G7cH5+/iFIa3zP4eG5s4mffzAbC4g5Rl42AAAAAElFTkSuQmCC"},e46a:function(e,t,o){},e4cb:function(e,t,o){}}]);
//# sourceMappingURL=chunk-985307e6.676cad5d.js.map