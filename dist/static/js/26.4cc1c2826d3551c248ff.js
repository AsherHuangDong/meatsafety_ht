webpackJsonp([26],{BBf9:function(t,e){},UXGj:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={data:function(){var t=this;return{msg:"",showDel:!1,obj:{},innerObj:{page:1,pageSize:10,total:0,name:"",status:-1},youKe:{page:1,pageSize:10,emailAccountOrmobile:""},youKeList:[],userStatus:[{value:-1,label:"全部"},{value:1,label:"启用"},{value:2,label:"禁用"}],innerList:[],columns:[{type:"index",title:"序号",key:"",align:"center"},{title:"姓名",key:"name",align:"center"},{title:"手机号",key:"mobile",align:"center"},{title:"邮箱",key:"emailAccount",align:"center"},{title:"单位",key:"position",align:"center"},{title:"注册时间",key:"createTime",align:"center"},{title:"状态",key:"",align:"center",render:function(t,e){return t("div",{},1==e.row.isDisable?"启用":"禁用")}},{title:"操作",key:"",align:"center",render:function(e,a){return e("div",{},[e("a",{style:{color:"#00C1DE","margin-right":"10px"},on:{click:function(){t.$router.push({path:"/inneruserdetail",query:{id:a.row.userId}})}}},"查看"),e("a",{style:{color:"#00C1DE","margin-right":"10px"},on:{click:function(){t.$router.push({path:"/inneruseredit",query:{id:a.row.userId}})}}},"修改"),e("a",{style:{color:"#00C1DE","margin-right":"10px"},on:{click:function(){1==a.row.isDisable?t.msg="禁用":t.msg="启用",t.showDel=!0,t.obj=a.row}}},1==a.row.isDisable?"禁用":"启用")])}}],columns1:[{type:"index",title:"序号",key:"",align:"center"},{title:"手机号",key:"mobile",align:"center"},{title:"邮箱",key:"emailAccount",align:"center"},{title:"注册时间",key:"createTime",align:"center"}]}},watch:{$route:function(t,e){console.log(e),"inneruseradd"!=e.name&&"inneruseredit"!=e.name||this.getData()}},methods:{changePage:function(t){this.innerObj.page=t,this.getData()},changePage1:function(t){this.youKe.page=t,this.getYouKe()},add:function(){this.$router.push({path:"/inneruseradd"})},del:function(){var t=this,e=new FormData;e.append("userId",this.obj.userId),1==this.obj.isDisable?e.append("isDisable",0):e.append("isDisable",1),this.$axios.post("/api/user/updateUserByIsDisable",e).then(function(e){100==e.data.code?(t.$Message.success("已"+t.msg),t.showDel=!1,t.getData()):t.$Message.error(e.data.msg)})},cancel:function(){this.showDel=!1},getData:function(){var t=this,e=new FormData;this.innerObj.name&&e.append("name",this.innerObj.name),-1!=this.innerObj.status&&e.append("status",this.innerObj.status),e.append("page",this.innerObj.page),e.append("pageSize",this.innerObj.pageSize),this.$axios.post("/api/user/getUserByPageAndDisable",e).then(function(e){console.log("res",e),t.innerList=e.data.data.records,t.innerObj.total=e.data.data.total})},getYouKe:function(){var t=this,e=new FormData;this.youKe.emailAccountOrmobile&&e.append("emailAccountOrmobile",this.youKe.emailAccountOrmobile),e.append("page",this.youKe.page),e.append("pageSize",this.youKe.pageSize),this.$axios.post("/api/user/getUserByPageAndCaller",e).then(function(e){console.log("res",e),t.youKeList=e.data.data.records,t.youKe.total=e.data.data.total})}},mounted:function(){this.getData(),this.getYouKe()}},i={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("Tabs",{attrs:{type:"card"}},[a("TabPane",{attrs:{label:"体系内用户"}},[a("div",{staticStyle:{padding:"0 20px"}},[a("Row",[a("Col",{attrs:{span:"18"}},[a("span",[t._v("用户姓名")]),t._v(" "),a("Input",{staticStyle:{width:"200px","margin-right":"20px"},model:{value:t.innerObj.name,callback:function(e){t.$set(t.innerObj,"name",e)},expression:"innerObj.name"}}),t._v(" "),a("span",[t._v("状态")]),t._v(" "),a("Select",{staticStyle:{width:"200px"},model:{value:t.innerObj.status,callback:function(e){t.$set(t.innerObj,"status",e)},expression:"innerObj.status"}},t._l(t.userStatus,function(e){return a("Option",{key:e.value,attrs:{value:e.value}},[t._v(t._s(e.label))])}),1)],1),t._v(" "),a("Col",{staticStyle:{"text-align":"right"},attrs:{span:"6"}},[a("Button",{staticStyle:{"margin-right":"20px"},attrs:{type:"info"},on:{click:t.getData}},[t._v("搜索")]),t._v(" "),a("Button",{attrs:{type:"primary"},on:{click:t.add}},[t._v("新增")])],1)],1),t._v(" "),a("Row",[a("Table",{staticStyle:{"margin-top":"20px"},attrs:{columns:t.columns,border:"",data:t.innerList}})],1),t._v(" "),a("Row",[a("Col",{staticStyle:{"margin-top":"40px","margin-bottom":"40px","text-align":"center"},attrs:{span:"24"}},[a("Page",{attrs:{total:t.innerObj.total,size:"small","show-total":""},on:{"on-change":t.changePage}})],1)],1)],1)]),t._v(" "),a("TabPane",{attrs:{label:"访客用户"}},[a("div",{staticStyle:{padding:"0 20px"}},[a("Row",[a("Col",{attrs:{span:"18"}},[a("span",[t._v("邮箱或手机号")]),t._v(" "),a("Input",{staticStyle:{width:"200px","margin-right":"20px"},model:{value:t.youKe.emailAccountOrmobile,callback:function(e){t.$set(t.youKe,"emailAccountOrmobile",e)},expression:"youKe.emailAccountOrmobile"}})],1),t._v(" "),a("Col",{staticStyle:{"text-align":"right"},attrs:{span:"6"}},[a("Button",{staticStyle:{"margin-right":"20px"},attrs:{type:"info"},on:{click:t.getYouKe}},[t._v("搜索")])],1)],1),t._v(" "),a("Row",[a("Table",{staticStyle:{"margin-top":"20px"},attrs:{columns:t.columns1,border:"",data:t.youKeList}})],1),t._v(" "),a("Row",[a("Col",{staticStyle:{"margin-top":"40px","margin-bottom":"40px","text-align":"center"},attrs:{span:"24"}},[a("Page",{attrs:{total:t.youKe.total,size:"small","show-total":""},on:{"on-change":t.changePage1}})],1)],1)],1)])],1),t._v(" "),a("Modal",{attrs:{width:"360","mask-closable":!1,closable:!1},model:{value:t.showDel,callback:function(e){t.showDel=e},expression:"showDel"}},[a("p",{staticStyle:{color:"#f60","text-align":"center"},attrs:{slot:"header"},slot:"header"},[a("Icon",{attrs:{type:"ios-information-circle"}}),t._v(" "),a("span",[t._v("是否"+t._s(t.msg)+"该用户？")])],1),t._v(" "),a("div",{staticStyle:{"text-align":"center"}},[a("p",[t._v(t._s(t.msg)+"后，"+t._s("启用"==t.msg?"该用户可正常登录数据库":"该用户将无法登录数据库"))])]),t._v(" "),a("div",{staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[a("Button",{attrs:{type:"error"},on:{click:t.del}},[t._v(t._s(t.msg))]),t._v(" "),a("Button",{staticStyle:{"margin-left":"40px"},on:{click:t.cancel}},[t._v("取消")])],1)]),t._v(" "),a("router-view")],1)},staticRenderFns:[]};var s=a("VU/8")(n,i,!1,function(t){a("BBf9")},null,null);e.default=s.exports}});
//# sourceMappingURL=26.4cc1c2826d3551c248ff.js.map