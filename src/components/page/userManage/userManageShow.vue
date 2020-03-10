<template>
  <div class="content">
    <Tabs type="card">
      <TabPane label="体系内用户">
        <div style="padding:0 20px;">
          <Row>
            <Col span="18">
              <span>用户姓名</span>
              <Input style="width:200px;margin-right:20px;" v-model="innerObj.name"></Input>
              <span>状态</span>
              <Select v-model="innerObj.status" style="width:200px;">
                <Option
                  v-for="item in userStatus"
                  :key="item.value"
                  :value="item.value"
                >{{item.label}}</Option>
              </Select>
            </Col>
            <Col span="6" style="text-align:right;">
              <Button type="info" style="margin-right:20px;" @click="getData">搜索</Button>
              <Button type="primary" @click="add">新增</Button>
            </Col>
          </Row>
          <Row>
            <Table style="margin-top:20px;" :columns="columns" border :data="innerList"></Table>
          </Row>
          <Row>
            <Col span="24" style="margin-top:40px;margin-bottom:40px;text-align:center;">
              <Page :total="innerObj.total" size="small" show-total @on-change="changePage" />
            </Col>
          </Row>
        </div>
      </TabPane>
      <TabPane label="访客用户">
        <div style="padding:0 20px;">
          <Row>
            <Col span="18">
              <span>邮箱或手机号</span>
              <Input style="width:200px;margin-right:20px;" v-model="youKe.emailAccountOrmobile"></Input>
            </Col>
            <Col span="6" style="text-align:right;">
              <Button type="info" style="margin-right:20px;" @click="getYouKe">搜索</Button>
            </Col>
          </Row>
          <Row>
            <Table style="margin-top:20px;" :columns="columns1" border :data="youKeList"></Table>
          </Row>
          <Row>
            <Col span="24" style="margin-top:40px;margin-bottom:40px;text-align:center;">
              <Page :total="youKe.total" size="small" show-total @on-change="changePage1" />
            </Col>
          </Row>
        </div>
      </TabPane>
    </Tabs>
    <Modal v-model="showDel" width="360" :mask-closable="false" :closable="false">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>是否{{msg}}该用户？</span>
      </p>
      <div style="text-align:center">
        <p>{{msg}}后，{{msg=='启用'?'该用户可正常登录数据库':'该用户将无法登录数据库'}}</p>
      </div>
      <div slot="footer" style="text-align:center;">
        <Button type="error" @click="del">{{msg}}</Button>
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
      msg: "",
      showDel: false,
      obj: {},
      innerObj: {
        page: 1,
        pageSize: 10,
        total: 0,
        name: "",
        status: -1
      },
      youKe: {
        page: 1,
        pageSize: 10,
        emailAccountOrmobile: ""
      },
      youKeList: [],
      userStatus: [
        {
          value: -1,
          label: "全部"
        },
        {
          value: 1,
          label: "启用"
        },
        {
          value: 2,
          label: "禁用"
        }
      ],
      innerList: [],
      columns: [
        {
          type: "index",
          title: "序号",
          key: "",
          align: "center"
        },
        {
          title: "姓名",
          key: "name",
          align: "center"
        },
        {
          title: "手机号",
          key: "mobile",
          align: "center"
        },
        {
          title: "邮箱",
          key: "emailAccount",
          align: "center"
        },
        {
          title: "单位",
          key: "position",
          align: "center"
        },
        {
          title: "注册时间",
          key: "createTime",
          align: "center"
        },
        {
          title: "状态",
          key: "",
          align: "center",
          render: function(h, param) {
            return h("div", {}, param.row.isDisable == 1 ? "启用" : "禁用");
          }
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
                        path: "/inneruserdetail",
                        query: {
                          id: param.row.userId
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
                        path: "/inneruseredit",
                        query:{
                          id:param.row.userId
                        }
                      });
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
                      if (param.row.isDisable == 1) {
                        _this.msg = "禁用";
                      } else {
                        _this.msg = "启用";
                      }
                      _this.showDel = true;
                      _this.obj = param.row;
                    }
                  }
                },
                param.row.isDisable == 1 ? "禁用" : "启用"
              )
            ]);
          }
        }
      ],
      columns1: [
        {
          type: "index",
          title: "序号",
          key: "",
          align: "center"
        },
        {
          title: "手机号",
          key: "mobile",
          align: "center"
        },
        {
          title: "邮箱",
          key: "emailAccount",
          align: "center"
        },
        {
          title: "注册时间",
          key: "createTime",
          align: "center"
        }
      ]
    };
  },
  watch: {
    $route: function(to, from) {
      console.log(from);
      if (from.name == "inneruseradd" || from.name == "inneruseredit") {
        this.getData();
      }
    }
  },
  methods: {
    changePage(page) {
      this.innerObj.page = page;
      this.getData();
    },
    changePage1(page) {
      this.youKe.page = page;
      this.getYouKe();
    },
    add() {
      this.$router.push({
        path: "/inneruseradd"
      });
    },
    del() {
      let form = new FormData();
      form.append("userId", this.obj.userId);
      this.obj.isDisable == 1
        ? form.append("isDisable", 0)
        : form.append("isDisable", 1);
      this.$axios.post("/api/user/updateUserByIsDisable", form).then(res => {
        if (res.data.code == 100) {
          this.$Message.success("已" + this.msg);
          this.showDel = false;
          this.getData();
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },
    cancel() {
      this.showDel = false;
    },
    getData() {
      let form = new FormData();
      this.innerObj.name ? form.append("name", this.innerObj.name) : "";
      this.innerObj.status != -1
        ? form.append("status", this.innerObj.status)
        : "";
      form.append("page", this.innerObj.page);
      form.append("pageSize", this.innerObj.pageSize);
      this.$axios.post("/api/user/getUserByPageAndDisable", form).then(res => {
        console.log("res", res);
        this.innerList = res.data.data.records;
        this.innerObj.total = res.data.data.total;
      });
    },
    getYouKe() {
      let form = new FormData();
      this.youKe.emailAccountOrmobile
        ? form.append("emailAccountOrmobile", this.youKe.emailAccountOrmobile)
        : "";
      form.append("page", this.youKe.page);
      form.append("pageSize", this.youKe.pageSize);
      this.$axios.post("/api/user/getUserByPageAndCaller", form).then(res => {
        console.log("res", res);
        this.youKeList = res.data.data.records;
        this.youKe.total = res.data.data.total;
      });
    }
  },
  mounted() {
    this.getData();
    this.getYouKe();
  }
};
</script>
<style>
.content {
  box-shadow: 0 0 3px 0 #ccc;
  border: 1px solid #ccc;
  border-top: none;
}
.input {
  display: flex;
  align-items: center;
}
</style>