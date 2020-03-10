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
              <Input v-model="editRoleParams.roleName" style="margin-left:50px;"></Input>
            </FormItem>
            <FormItem label="角色说明">
              <Input
                v-model="editRoleParams.roleDesc"
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
                @click="updateRole"
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
  name: "roleedit",
  data() {
    return {
      P: [],
      editRoleParams: {
        permId: [],
        roleId: "",
        roleName: "",
        roleDesc: ""
      },
      roleSelect: []
    };
  },
  methods: {
    //   listPerm() {
    //     this.$axios.post("/api/role/listPerm")
    //       .then(res => {
    //         console.log("/api/role/listPerm", res.data);
    //         this.roleSelect = res.data.data;
    //         this.getRole();
    //       })
    //   },
    back() {
      this.$router.go(-1);
    },
    updateRole() {
      let nn = this.$refs.tree2.getCheckedAndIndeterminateNodes();
      let mm = [];
      if (nn.length !== 0) {
        for (let item of nn) {
          mm.push(item.permId.toString());
        }
      } else {
        this.$Message.info("所选权限不能为空");
        return false;
      }
      console.log('permId',mm)
      this.editRoleParams.permId = mm;
      for (let i = 0; i < this.editRoleParams.permId.length; i++) {
        this.editRoleParams.permId[i] = this.editRoleParams.permId[i].toString();
      }
      let form = new FormData();
      
      let permId = this.editRoleParams.permId.join(',')
      form.append('roleName',this.editRoleParams.roleName)
      form.append('roleDesc',this.editRoleParams.roleDesc)
      form.append('permId',permId)
      form.append('roleId',this.editRoleParams.roleId)
      this.$axios
        .post("/api/role/updateRole", form)
        .then(res => {
          console.log("/api/role/updateRole", res.data);
          if (res.data.code === 100) {
            this.$Message.success("修改成功");
            this.clearPermList();
            this.$router.go(-1);
          } else {
            this.$Message.error("修改失败");
          }
        });
    },
    getRole() {
      let form = new FormData();
      form.append("roleId", this.editRoleParams.roleId);
      this.$axios.get("/api/role/getRole?roleId=" +this.editRoleParams.roleId).then(res => {
        console.log("/api/role/getRole", res.data);
        this.editRoleParams.roleName = res.data.data.roleName;
        this.editRoleParams.roleDesc = res.data.data.roleDesc;
        this.editRoleParams.permId = res.data.data.permId;
        let temp = [];
        for (let i = 0; i < this.editRoleParams.permId.length; i++) {
          temp.push(parseInt(this.editRoleParams.permId[i]));
        }
        this.editRoleParams.permId = temp;
        console.log(this.editRoleParams);
        this.disposePermList();
      });
    },
    disposePermList() {
      let permId = this.editRoleParams.permId;
      let manageArr = function(arr) {
        for (let i = 0; i < arr.length; i++) {
          arr[i].checked = !arr[i].children && permId.indexOf(arr[i].permId) !== -1;
          if (arr[i].children) {
            manageArr(arr[i].children);
          }
        }
      };
      manageArr(this.P);
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
    this.editRoleParams.roleId = this.$route.query.roleId;
    this.clearPermList();
    this.P = permListConstruct();
    this.getRole();
  }
};
</script>

<style scoped>
</style>
