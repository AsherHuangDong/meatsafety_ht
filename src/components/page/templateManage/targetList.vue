<template>
  <div style="padding:0 20px;">
    <Row>
      <Col span="16">
        <span>指标名称</span>
        <Input style="width:200px;margin-right:20px;" v-model='indexName'></Input>
        <span>所属分类</span>
        <Select style="width:200px;" v-model='indexTypeId'>
          <Option
            :value="-1"
          >全部</Option>
          <Option
            v-for="item in typeList"
            :key="item.indexTypeId"
            :value="item.indexTypeId"
          >{{item.parentName?item.parentName + '-':''}}{{item.indexTypeName}}</Option>
        </Select>
      </Col>
      <Col span="8" style="text-align:right;">
       <Button type="primary" @click="getData" style='margin-right:40px;'>搜索</Button>
        <Button type="primary" @click="add">新增</Button>
      </Col>
    </Row>
    <Row>
      <Table style="margin-top:20px;" :columns="columns" border :data="list"></Table>
    </Row>
    <Row>
      <Col span="24" style="margin-top:60px;margin-bottom:100px;text-align:center;">
        <Page :total="total" size="small" show-total @on-change="changePage" />
      </Col>
    </Row>
    <Modal v-model="showDel" width="360" :mask-closable="false" :closable="false">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>是否删除该条数据？</span>
      </p>
      <div style="text-align:center">
        <p>删除数据后将无法恢复</p>
      </div>
      <div slot="footer" style="text-align:center;">
        <Button type="error" @click="del">删除</Button>
        <Button style="margin-left:40px;" @click="cancel">取消</Button>
      </div>
    </Modal>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    let _this = this
    return {
      page: 1,
      pageSize: 10,
      total: 0,
      indexName:'',
      indexTypeId:-1,
      list: [],
      typeList: [],
      showDel: false,
      selObj:{},
      columns: [
        {
          title: "序号",
          key: "sort",
          align: "center",
          width: 100
        },
        {
          title: "指标名称",
          key: "indexName",
          align: "center"
        },
        {
          title: "创建时间",
          key: "cTime",
          align: "center"
        },
        {
          title: "操作",
          key: "",
          align: "center",
          render: function(h, param) {
            return h("div", {}, [
              h(
                "a",
                {
                  style: {
                    color: "#00C1DE",
                    "margin-right": "10px"
                  },
                  on: {
                    click: () => {
                     _this.$router.push({
                       path:'/targetedit',
                       query:{
                         id:param.row.indexId,
                         indexName:param.row.indexName,
                         indexTypeId:param.row.indexTypeId
                       }
                     })
                    }
                  }
                },
                "修改"
              ),
              h(
                "a",
                {
                  style: {
                    color: "#00C1DE",
                    "margin-right": "10px"
                  },
                  on: {
                    click: () => {
                      _this.showDel = true;
                      _this.selObj = param.row;
                    }
                  }
                },
                "删除"
              ),
               h(
                "a",
                {
                  style: {
                    color: "#00C1DE",
                    "margin-right": "10px",
                    // "display":param.index==0?'none':'inline-block'
                  },
                  on: {
                    click: () => {
                      _this.move(param.row.indexId,1)
                    }
                  }
                },
                "上移"
              ),
               h(
                "a",
                {
                  style: {
                    color: "#00C1DE",
                    "margin-right": "10px",
                    // "display":param.index==_this.list.length-1?'none':'inline-block'
                  },
                  on: {
                    click: () => {
                       _this.move(param.row.indexId,2)
                    }
                  }
                },
                "下移"
              )
            ]);
          }
        }
      ]
    };
  },
  watch: {
    $route: function(to, from) {
      console.log(from);
      if (from.name == "targetadd" || from.name == "targetedit") {
        this.getData();
      }
    }
  },
  methods: {
    move(id,move){
      let form = new FormData();
      form.append('move',move)
      form.append('indexId',id)
      this.$axios.post('/api/indexList/moveIndexList',form).then(res=>{
        if(res.data.code==100){
          let msg = ''
          move==1?msg='上移成功！':msg='下移成功！'
          this.$Message.success(msg)
          this.getData()
        }else{
          this.$Message.error(res.data.msg)
        }
      })
    },
    changePage(page) {
      this.page = page;
      this.getData();
    },
    getData() {
      let form = new FormData();
      form.append("page", this.page);
      form.append("pageSize", this.pageSize);
      if(this.indexName){
        form.append("indexName", this.indexName);
      }
      if(this.indexTypeId&&this.indexTypeId!=-1){
        form.append("indexTypeId", this.indexTypeId);
      }
      this.$axios.post("/api/indexList/getIndexListByPage", form).then(res => {
        console.log(res);
        this.total = res.data.data.total;
        this.list = res.data.data.records;
      });
    },
    getType() {
      this.$axios.post("/api/indexType/getIndexTypeByList", {}).then(res => {
        if (res.data.code == 100) {
          this.typeList = res.data.data;
        }
      });
    },
    add() {
      this.$router.push({
        path: "/targetadd"
      });
    },
    del() {
      let form = new FormData();
      form.append("indexId", this.selObj.indexId);
      this.$axios
        .post("/api/indexList/deleteIndexList", form)
        .then(res => {
          this.$Message.success("删除成功！");
          this.showDel = false;
          this.getData();
        });
    },
    cancel() {
      this.showDel = false;
    }
  },
  mounted() {
    this.getType();
    this.getData();
  }
};
</script>