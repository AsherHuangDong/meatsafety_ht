<template>
  <div>
    <Form
      label-position="right"
      :label-width="200"
      class="form"
      ref="form"
      :model="obj"
      :rules="rules"
    >
      <FormItem label="昵称(系统名)：" prop="nickname">
        <Input v-model="obj.nickname" style="width:300px;"></Input>
      </FormItem>
      <FormItem label="邮箱（账号）：" prop="email">
        <Input v-model="obj.email" style="width:300px;"></Input>
      </FormItem>
      <FormItem label="密码：" prop="password">
        <Input v-model="obj.password" style="width:300px;"></Input>
      </FormItem>
      <FormItem label="人员描述：" prop="adminDescribe">
        <textarea
          name
          id
          style="width:300px;height:100px;padding:0 10px;"
          v-model="obj.adminDescribe"
        ></textarea>
      </FormItem>
      <FormItem label="拥有角色：" prop="roleId">
        <Select style="width:300px;" v-model="obj.roleId">
          <Option v-for="item in list" :key="item.roleId" :value="item.roleId">{{item.roleName}}</Option>
        </Select>
      </FormItem>
      <FormItem>
        <Button style="margin-right:100px;" @click="cancel">返回</Button>
        <Button type="info" @click="save('form')">提交</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
  components: { VueEditor },
  data() {
    return {
      obj: {
          nickname:'',
          email:'',
          password:'',
          adminDescribe:'',
          roleId:''
      },
      list: [],
      rules: {
        nickname: [
          {
            required: true,
            message: "昵称必填",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            message: "邮箱必填",
            trigger: "blur"
          },
          { type: 'email', message: '邮箱格式不正确', trigger: 'blur' }
        ],
        password: [
          {
            required: true,
            message: "密码必填",
            trigger: "blur"
          }
        ],
        adminDescribe: [
          {
            required: true,
            message: "描述必填",
            trigger: "blur"
          }
        ],
        roleId: [
          {
            required: true,
            message: "角色必选",
            trigger: "change",
            type: "number"
          }
        ]
      }
    };
  },
  methods: {
    handleImageAdded(file, Editor, cursorLocation, resetUploader) {
      var formData = new FormData();
      formData.append("image", file);
      this.$axios
        .post("/api/upload/image", formData)
        .then(result => {
          let url = result.data.data[0]; // Get url from response
          Editor.insertEmbed(cursorLocation, "image", url);
          resetUploader();
        })
        .catch(err => {
          console.log(err);
        });
    },
    cancel() {
      this.$router.go(-1);
    },
    save(name) {
      let _this = this;
      this.$refs[name].validate(valid => {
        let form = new FormData();
        for (let i in this.obj) {
          if (this.obj[i]) {
            form.append(i, this.obj[i]);
          }
        }
        if (valid) {
          _this.$axios.post("/api/admin/updateAdmin", form).then(res => {
            if (res.data.code == 100) {
              _this.$Message.success("修改成功");
              _this.$router.go(-1);
            } else {
              _this.$Message.error(res.data.msg);
            }
          });
        }
      });
    },
    getRoles() {
      this.$axios.get("/api/role/listRole").then(res => {
        this.list = res.data.data;
      });
    },
    getDetail() {
      let form = new FormData();
      form.append("adminId", this.obj.adminId);
      this.$axios.post("/api/admin/getAdmin",form).then(res => {
        this.obj.nickname = res.data.data.nickname
        this.obj.email= res.data.data.email
        this.obj.password = res.data.data.password
        this.obj.adminDescribe = res.data.data.adminDescribe
        this.obj.roleId = res.data.data.roleId
      });
    }
  },
  mounted() {
    this.obj.adminId = this.$route.query.adminId;
    this.getDetail()
    this.getRoles();
  }
};
</script>
<style scoped>
.form {
  width: 1000px;
  margin: 0 auto;
  display: block;
}
</style>