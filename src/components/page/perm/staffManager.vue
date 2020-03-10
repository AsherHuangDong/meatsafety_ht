<template>
  <div>
    <Row>
      <Col span="24">
        <Button style="float:right" type="primary" @click="userAdd">添加成员</Button>
      </Col>
    </Row>
    <br />
    <Row>
      <Col span="24">
        <Card dis-hover>
          <Row>
            <Table border ref="selection" :columns="columns1" :data="data1"></Table>
          </Row>
          <br />
        </Card>
      </Col>
    </Row>
    <br />
    <Row>
      <Col span="24" style="text-align:right;">
        <Page
          :total="total"
          show-total
          show-sizer
          show-elevator
          :current="search.page"
          :page-size="search.pageSize"
          @on-change="changePage"
          @on-page-size-change="changePageSize"
        />
      </Col>
    </Row>
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
    <Modal v-model="isPassword" width="360" :mask-closable="false" :closable="false">
      <p slot="header" style="text-align:center">
        <span>重置密码</span>
      </p>
      <div style="text-align:center">
        新密码：
        <Input v-model="password" style='width:200px;'></Input>
      </div>
      <div slot="footer" style="text-align:center;">
        <Button  @click="cancel1">取消</Button>
        <Button style="margin-left:40px;" type="info" @click="save">确定</Button>
      </div>
    </Modal>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "staffManager",
  data() {
    let _this = this;
    return {
      msg: "",
      showDel: false,
      isPassword: false,
      password: "",
      selObj: {},
      columns1: [
        {
          title: "用户ID",
          key: "adminId",
          align: "center"
        },
        {
          title: "昵称(系统名)",
          key: "nickname",
          align: "center"
        },
        {
          title: "描述",
          key: "adminDescribe",
          align: "center"
        },
        {
          title: "拥有角色",
          key: "",
          align: "center",
          render: function(h, param) {
            // let str = ''
            // param.row.role.forEach(item=>{
            //   str += item.roleName + ','
            // })
            return h("span", {}, param.row.role.roleName);
          }
        },
        {
          title: "账号状态",
          key: "status",
          align: "center",
          render: function(h, param) {
            return h("span", {}, param.row.isDisable == 1 ? "启用" : "禁用");
          }
        },
        {
          title: "创建时间",
          key: "cTime",
          align: "center"
        },
        {
          title: "操作",
          key: "status",
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
                        path: "/staffEdit",
                        query: {
                          adminId: param.row.adminId
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
                      _this.isPassword = true;
                      _this.selObj = param.row;
                    }
                  }
                },
                " 重置密码"
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
                      if (param.row.isDisable == 1) {
                        _this.msg = "禁用";
                      } else {
                        _this.msg = "启用";
                      }
                    }
                  }
                },
                param.row.isDisable == 1 ? "禁用" : "启用"
              )
            ]);
          }
        }
      ],
      total: 0,
      data1: [],
      search: {
        page: 1,
        pageSize: 10
      }
    };
  },
  watch: {
    $route: function(to, from) {
      console.log(from);
      if (from.name == "staffAdd" || from.name == "staffEdit") {
        this.getUsers();
      }
    }
  },
  methods: {
    getUsers() {
      let form = new FormData();
      form.append("page", this.search.page);
      form.append("pageSize", this.search.pageSize);
      this.$axios.post("/api/admin/getAdminList", form).then(res => {
        console.log(res);
        this.total = res.data.data.total;
        this.data1 = res.data.data.records;
        console.log(this.data1);
      });
    },
    changePage(page) {
      this.search.page = page;
      this.getUsers();
    },
    changePageSize(pageSize) {
      this.search.pageSize = pageSize;
      this.getUsers();
    },
    userAdd() {
      this.$router.push("/staffAdd");
    },
    cancel() {
      this.showDel = false;
    },
    del() {
      let form = new FormData();
      form.append("isDisable", this.selObj.isDisable == 1 ? 2 : 1);
      form.append("adminId", this.selObj.adminId);
      this.$axios.post("/api/admin/updateAdminStatus", form).then(res => {
        if (res.data.code == 100) {
          this.showDel = false;
          this.$Message.success("已" + this.msg);
          this.getUsers();
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },
    cancel1() {
      this.isPassword = false;
    },
    save() {
      let form = new FormData();
      form.append("password", this.password);
      form.append("adminId", this.selObj.adminId);
      this.$axios.post("/api/admin/updatePasswordByAdminId", form).then(res => {
        if (res.data.code == 100) {
          this.isPassword = false;
          this.$Message.success('密码修改成功！');
          this.getUsers();
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    }
  },
  mounted() {
    this.getUsers();
  }
};
</script>

<style scoped>
</style>
