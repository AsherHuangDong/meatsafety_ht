<template>
  <div class="content_box">
    <div class="cont_head">
      <Breadcrumb :style="{padding: '14px 24px'}">
        <BreadcrumbItem to="/roleadmin">角色管理</BreadcrumbItem>
      </Breadcrumb>
    </div>
    <div class="container">
      <Row>
        <Col span="8" offset="3">
          <Form :label-width="100">
            <FormItem label="角色名称">
              <Input v-model="addRoleParam.roleName" style="margin-left:50px;"></Input>
            </FormItem>
            <FormItem label="角色说明">
              <Input
                v-model="addRoleParam.roleDesc"
                type="textarea"
                :autosize="{minRows: 4,maxRows: 6}"
                style="margin-left:50px;"
              ></Input>
            </FormItem>
            <FormItem label="分配权限：">
              <Tree
                :data="P"
                ref="tree2"
                check-directly
                show-checkbox
                multiple
                style="margin-left: 50px;"
              ></Tree>
            </FormItem>
            <Col span="7" offset="9">
              <Button @click="back">返回</Button>
            </Col>
            <Col span="7">
              <Button
                @click="addRole"
                style="background:#00C1DE;color:#ffffff;border-color:#00C1DE;"
              >确定</Button>
            </Col>
          </Form>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
import permListConstruct from "../../../perm/perm";
export default {
  name: "roleAdd",
  data() {
    return {
      P: [],
      addRoleParam: {
        roleName: "",
        roleDesc: "",
        permId: []
      },
      roleSelect: []
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    addRole() {
      console.log("add", this.addRoleParam);
      let nn = this.$refs.tree2.getCheckedAndIndeterminateNodes();
      console.log("nn", nn);
      let mm = [];
      if (nn.length !== 0) {
        for (let item of nn) {
          mm.push(item.permId.toString());
        }
      } else {
        this.$Message.info("所选权限不能为空");
        return false;
      }
      this.addRoleParam.permId = mm;
      for (let i = 0; i < this.addRoleParam.permId.length; i++) {
        this.addRoleParam.permId[i] = this.addRoleParam.permId[i].toString();
      }
      let form = new FormData();
      let permId = this.addRoleParam.permId.join(',')
      form.append('roleName',this.addRoleParam.roleName)
      form.append('roleDesc',this.addRoleParam.roleDesc)
      form.append('permId',permId)
      console.log("res", this.addRoleParam.permId);
      this.$axios.post("/api/role/saveRole", form).then(res => {
        console.log("/api/role/addRole", res.data);
        if (res.data.code === 100) {
          this.clearPermList();
          this.P = permListConstruct();
          this.$Message.success("添加成功");
          this.$router.go(-1)
        } else {
          this.$Message.error("添加失败");
        }
      });
    },
    clearPermList() {
      let manageArr = function(arr) {
        for (let i = 0; i < arr.length; i++) {
          arr[i].checked = false;
          if (arr[i].children) {
            manageArr(arr[i].children);
          }
        }
      };
      manageArr(this.P);
    }
  },
  mounted() {
    this.clearPermList();
    this.P = permListConstruct();
  }
};
</script>

<style scoped>
</style>
