<template>
  <div>
    <Row>
      <Col span="24">
        <Button style="float:right" type="primary" @click="add">新增</Button>
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
  name: "staffManager",
  data() {
    let _this = this;
    return {
      showDel: false,
      isPassword:false,
      password:'',
      selObj:{},
      columns1: [
        {
          title: "编号",
          key: "roleId",
          align: "center"
        },
        {
          title: "角色名称",
          key: "roleName",
          align: "center"
        },
        {
          title: "角色说明",
          key: "roleDesc",
          align: "center"
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
                        path: "/roleEdit",
                        query: {
                          roleId: param.row.roleId
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
      ],
      data1: []
    };
  },
  watch: {
    $route: function(to, from) {
      console.log(from);
      if (from.name == "roleAdd" || from.name == "roleEdit") {
        this.getRoles();
      }
    }
  },
  methods: {
    getRoles() {
      this.$axios.get("/api/role/listRole").then(res => {
        this.data1 = res.data.data;
      });
    },
    add() {
      this.$router.push("/roleAdd");
    },
    del() {
      let form = new FormData();
      form.append("roleId", this.selObj.roleId);
      this.$axios
        .post("/api/role/deleteRole", form)
        .then(res => {
          this.$Message.success("删除成功！");
          this.showDel = false;
          this.getRoles();
        });
    },
    cancel() {
      this.showDel = false;
    }
  },
  mounted() {
    this.getRoles();
  }
};
</script>

<style scoped>
</style>
