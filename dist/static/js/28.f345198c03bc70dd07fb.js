webpackJsonp([28],{"0a9A":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n={data:function(){var t=this;return{page:1,pageSize:10,total:0,keyWords:"",list:[],showDel:!1,selObj:{},columns:[{type:"index",title:"序号",key:"",align:"center"},{title:"标题",key:"title",align:"center"},{title:"创建时间",key:"cTime",align:"center"},{title:"操作",key:"",align:"center",render:function(e,a){return e("div",{},[e("a",{style:{color:"#00C1DE","margin-right":"10px"},on:{click:function(){t.$router.push({path:"/noticedetail",query:{id:a.row.id}})}}},"查看"),e("a",{style:{color:"#00C1DE","margin-right":"10px"},on:{click:function(){t.$router.push({path:"/noticeedit",query:{id:a.row.id}})}}},"编辑"),e("a",{style:{color:"#00C1DE","margin-right":"10px"},on:{click:function(){t.showDel=!0,t.selObj=a.row}}},"删除")])}}]}},watch:{$route:function(t,e){console.log(e),"noticeadd"!=e.name&&"noticeedit"!=e.name||this.getData()}},methods:{getData:function(){var t=this,e=new FormData;e.append("page",this.page),e.append("pageSize",this.pageSize),this.keyWords&&e.append("keyWords",this.keyWords),this.$axios.post("/api/announcement/getAllAnnounce",e).then(function(e){t.list=e.data.data.records,t.total=e.data.data.total})},changePage:function(t){this.page=t,this.getData()},add:function(){this.$router.push({path:"/noticeadd"})},del:function(){var t=this,e=new FormData;e.append("id",this.selObj.id),this.$axios.post("/api/announcement/deleteAnnounceone",e).then(function(e){t.$Message.success("删除成功！"),t.showDel=!1,t.getData()})},cancel:function(){this.showDel=!1}},mounted:function(){this.getData()}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{padding:"0 20px"}},[a("Row",[a("Col",{attrs:{span:"18"}},[a("span",[t._v("标题")]),t._v(" "),a("Input",{staticStyle:{width:"200px","margin-right":"20px"},attrs:{placeholder:"请输入关键字"},model:{value:t.keyWords,callback:function(e){t.keyWords=e},expression:"keyWords"}})],1),t._v(" "),a("Col",{staticStyle:{"text-align":"right"},attrs:{span:"6"}},[a("Button",{staticStyle:{"margin-right":"20px"},attrs:{type:"info"},on:{click:t.getData}},[t._v("搜索")]),t._v(" "),a("Button",{staticStyle:{"margin-right":"20px"},attrs:{type:"info"},on:{click:t.add}},[t._v("新增")])],1)],1),t._v(" "),a("Row",[a("Table",{staticStyle:{"margin-top":"20px"},attrs:{columns:t.columns,border:"",data:t.list}})],1),t._v(" "),a("Row",[a("Col",{staticStyle:{"margin-top":"40px","margin-bottom":"40px","text-align":"center"},attrs:{span:"24"}},[a("Page",{attrs:{total:t.total,size:"small","show-total":""},on:{"on-change":t.changePage}})],1)],1),t._v(" "),a("Modal",{attrs:{width:"360","mask-closable":!1,closable:!1},model:{value:t.showDel,callback:function(e){t.showDel=e},expression:"showDel"}},[a("p",{staticStyle:{color:"#f60","text-align":"center"},attrs:{slot:"header"},slot:"header"},[a("Icon",{attrs:{type:"ios-information-circle"}}),t._v(" "),a("span",[t._v("是否删除该条数据？")])],1),t._v(" "),a("div",{staticStyle:{"text-align":"center"}},[a("p",[t._v("删除数据后将无法恢复")])]),t._v(" "),a("div",{staticStyle:{"text-align":"center"},attrs:{slot:"footer"},slot:"footer"},[a("Button",{attrs:{type:"error"},on:{click:t.del}},[t._v("删除")]),t._v(" "),a("Button",{staticStyle:{"margin-left":"40px"},on:{click:t.cancel}},[t._v("取消")])],1)]),t._v(" "),a("router-view")],1)},staticRenderFns:[]};var i=a("VU/8")(n,o,!1,function(t){a("CQuB")},"data-v-4e8956d0",null);e.default=i.exports},CQuB:function(t,e){}});
//# sourceMappingURL=28.f345198c03bc70dd07fb.js.map