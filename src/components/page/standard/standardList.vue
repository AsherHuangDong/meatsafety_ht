<template>
  <div style="padding:0 20px;">
    <Row>
      <Col span="18">
        <span>标题</span>
        <Input style="width:200px;margin-right:20px;" v-model="keyWords" placeholder="请输入关键字"></Input>
      </Col>
      <Col span="6" style="text-align:right;">
        <Button type="info" style="margin-right:20px;" @click="getData">搜索</Button>
        <Button type="info" style="margin-right:20px;" @click="add">新增</Button>
      </Col>
    </Row>
    <Row>
      <Table style="margin-top:20px;" :columns="columns" border :data="list"></Table>
    </Row>
    <Row>
      <Col span="24" style="margin-top:40px;margin-bottom:40px;text-align:center;">
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
    let _this = this;
    return {
      page: 1,
      pageSize: 10,
      total: 0,
      keyWords: "",
      list: [],
      showDel: false,
      selObj: {},
      columns: [
        {
          title: "序号",
          key: "",
          align: "center",
          render: (h, params) => {
            return h(
              "span",
              params.index + (this.page - 1) * this.pageSize + 1
            );
          }
        },
        {
          title: "标题",
          key: "title",
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
                        path: "/standardDetail",
                        query: {
                          id: param.row.id
                        }
                      });
                    }
                  }
                },
                "查看"
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
                      _this.$router.push({
                        path: "/standardEdit",
                        query: {
                          id: param.row.id
                        }
                      });
                    }
                  }
                },
                "编辑"
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
      if (from.name == "standardAdd" || from.name == "standardEdit") {
        this.getData();
      }
    }
  },
  methods: {
    getData() {
      let form = new FormData();
      form.append("page", this.page);
      form.append("pageSize", this.pageSize);
      this.keyWords ? form.append("title", this.keyWords) : form.append("title", '');
      this.$axios.post("/api/governmentStandard/getGovernmentStandardBypage", form).then(res => {
        this.list = res.data.data.records;
        this.total = res.data.data.total;
      });
    },
    changePage(page) {
      this.page = page;
      this.getData();
    },
    add() {
      this.$router.push({
        path: "/standardAdd"
      });
    },
    del() {
      let form = new FormData();
      form.append("id", this.selObj.id);
      this.$axios
        .post("/api/governmentStandard/deleteGovernmentStandardById", form)
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
    this.getData();
  }
};
</script>
<style scoped>
.ivu-modal-footer {
  text-align: center;
}
</style>