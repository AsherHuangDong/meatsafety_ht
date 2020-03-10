<template>
  <div style="padding:0 20px;">
    <Row>
      <Col span="18">
        <span>小组名称</span>
        <Input style="width:200px;margin-right:20px;" v-model="keyWords" placeholder="请输入关键字"></Input>
      </Col>
      <Col span="6" style="text-align:right;">
        <Button type="info" style="margin-right:20px;" @click="getData">搜索</Button>
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
        <span>是否解散该小组？</span>
      </p>
      <div style="text-align:center">
        <p>解散小组后将不可恢复</p>
      </div>
      <div slot="footer" style="text-align:center;">
        <Button type="error" @click="del">解散</Button>
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
          type: "index",
          title: "序号",
          key: "",
          align: "center"
        },
        {
          title: "小组名称",
          key: "groupName",
          align: "center"
        },
        {
          title: "小组介绍",
          key: "groupIntroduction",
          align: "center"
        },
        {
          title: "小组人数",
          key: "personCount",
          align: "center"
        },
        {
          title: "小组创建人",
          key: "name",
          align: "center"
        },
        {
          title: "创建时间",
          key: "createTime",
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
                        path: "/groupdetail",
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
                      _this.showDel = true;
                      _this.selObj = param.row;
                    }
                  }
                },
                "解散"
              )
            ]);
          }
        }
      ]
    };
  },
  methods: {
    getData() {
      let form = new FormData();
      form.append("page", this.page);
      form.append("pageSize", this.pageSize);
      this.keyWords ? form.append("keyWords", this.keyWords) : "";
      this.$axios.post("/api/noticeGroup/getAllNoticeGroup", form).then(res => {
        this.list = res.data.data.records;
        this.total = res.data.data.total;
      });
    },
    changePage(page) {
      this.page = page;
      this.getData();
    },
    del() {
      let form = new FormData();
      form.append("id", this.selObj.id);
      this.$axios.post("/api/noticeGroup/deleteNoticeGroup", form).then(res => {
        this.$Message.success("解散成功！");
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