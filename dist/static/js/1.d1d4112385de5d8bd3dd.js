webpackJsonp([1],{"5Q8T":function(e,t){},BO1k:function(e,t,a){e.exports={default:a("fxRn"),__esModule:!0}},Ng6p:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=a("BO1k"),l=a.n(r),o=a("sY3S"),d={name:"roleAdd",data:function(){return{P:[],addRoleParam:{roleName:"",roleDesc:"",permId:[]},roleSelect:[]}},methods:{back:function(){this.$router.go(-1)},addRole:function(){var e=this;console.log("add",this.addRoleParam);var t=this.$refs.tree2.getCheckedAndIndeterminateNodes();console.log("nn",t);var a=[];if(0===t.length)return this.$Message.info("所选权限不能为空"),!1;var r=!0,d=!1,n=void 0;try{for(var c,i=l()(t);!(r=(c=i.next()).done);r=!0){var s=c.value;a.push(s.permId.toString())}}catch(e){d=!0,n=e}finally{try{!r&&i.return&&i.return()}finally{if(d)throw n}}this.addRoleParam.permId=a;for(var m=0;m<this.addRoleParam.permId.length;m++)this.addRoleParam.permId[m]=this.addRoleParam.permId[m].toString();var p=new FormData,u=this.addRoleParam.permId.join(",");p.append("roleName",this.addRoleParam.roleName),p.append("roleDesc",this.addRoleParam.roleDesc),p.append("permId",u),console.log("res",this.addRoleParam.permId),this.$axios.post("/api/role/saveRole",p).then(function(t){console.log("/api/role/addRole",t.data),100===t.data.code?(e.clearPermList(),e.P=Object(o.a)(),e.$Message.success("添加成功"),e.$router.go(-1)):e.$Message.error("添加失败")})},clearPermList:function(){!function e(t){for(var a=0;a<t.length;a++)t[a].checked=!1,t[a].children&&e(t[a].children)}(this.P)}},mounted:function(){this.clearPermList(),this.P=Object(o.a)()}},n={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"content_box"},[a("div",{staticClass:"cont_head"},[a("Breadcrumb",{style:{padding:"14px 24px"}},[a("BreadcrumbItem",{attrs:{to:"/roleadmin"}},[e._v("角色管理")])],1)],1),e._v(" "),a("div",{staticClass:"container"},[a("Row",[a("Col",{attrs:{span:"8",offset:"3"}},[a("Form",{attrs:{"label-width":100}},[a("FormItem",{attrs:{label:"角色名称"}},[a("Input",{staticStyle:{"margin-left":"50px"},model:{value:e.addRoleParam.roleName,callback:function(t){e.$set(e.addRoleParam,"roleName",t)},expression:"addRoleParam.roleName"}})],1),e._v(" "),a("FormItem",{attrs:{label:"角色说明"}},[a("Input",{staticStyle:{"margin-left":"50px"},attrs:{type:"textarea",autosize:{minRows:4,maxRows:6}},model:{value:e.addRoleParam.roleDesc,callback:function(t){e.$set(e.addRoleParam,"roleDesc",t)},expression:"addRoleParam.roleDesc"}})],1),e._v(" "),a("FormItem",{attrs:{label:"分配权限："}},[a("Tree",{ref:"tree2",staticStyle:{"margin-left":"50px"},attrs:{data:e.P,"check-directly":"","show-checkbox":"",multiple:""}})],1),e._v(" "),a("Col",{attrs:{span:"7",offset:"9"}},[a("Button",{on:{click:e.back}},[e._v("返回")])],1),e._v(" "),a("Col",{attrs:{span:"7"}},[a("Button",{staticStyle:{background:"#00C1DE",color:"#ffffff","border-color":"#00C1DE"},on:{click:e.addRole}},[e._v("确定")])],1)],1)],1)],1)],1)])},staticRenderFns:[]};var c=a("VU/8")(d,n,!1,function(e){a("5Q8T")},"data-v-59dbd265",null);t.default=c.exports},fxRn:function(e,t,a){a("+tPU"),a("zQR9"),e.exports=a("g8Ux")},g8Ux:function(e,t,a){var r=a("77Pl"),l=a("3fs2");e.exports=a("FeBl").getIterator=function(e){var t=l(e);if("function"!=typeof t)throw TypeError(e+" is not iterable!");return r(t.call(e))}},sY3S:function(e,t,a){"use strict";t.a=function(){return[{permValue:"/generalviewshow",permId:1,checked:!1,title:"概览"},{permValue:"/usermanageshow",permId:2,checked:!1,title:"用户管理"},{permValue:"/grouplist",permId:3,checked:!1,title:"小组管理"},{permValue:"/noticelist",permId:4,checked:!1,title:"公告通知"},{children:[{permValue:"/literaturedata",permId:5,checked:!1,title:"文献管理"},{permValue:"/filleddata",permId:6,checked:!1,title:"填报管理"}],permValue:"/datamanage",permId:7,checked:!1,title:"数据管理"},{children:[{permValue:"/kindmanage",permId:8,checked:!1,title:"分类管理"},{permValue:"/targetlist",permId:9,checked:!1,title:"指标管理"}],permValue:"/templatemanage",permId:10,checked:!1,title:"模板管理"},{children:[{permValue:"/staffManager",permId:11,checked:!1,title:"人员管理"},{permValue:"/roleManager",permId:12,checked:!1,title:"角色管理"}],permValue:"/permManager",permId:13,checked:!1,title:"权限管理"},{permValue:"/numberrangelist",permId:14,checked:!1,title:"设置"}]}}});
//# sourceMappingURL=1.d1d4112385de5d8bd3dd.js.map