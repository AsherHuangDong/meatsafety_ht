<template>
  <div>
    <Modal
      v-model="showModal"
      width="600"
      style="padding:0 20px 20px;"
      :mask-closable="false"
      :closable="false"
    >
      <p slot="header">新增体系内用户</p>
      <Form
        class="form1"
        label-position="right"
        :label-width="70"
        ref="form"
        :model="formValidate"
        :rules="rules"
      >
        <FormItem label="姓名" prop="name">
          <Input v-model="formValidate.name" style="width:200px;"></Input>
        </FormItem>
        <FormItem label="手机" prop="mobile">
          <Input v-model="formValidate.mobile" style="width:200px;"></Input>
        </FormItem>
        <FormItem label="邮箱" prop="emailAccount">
          <Input v-model="formValidate.emailAccount" style="width:200px;"></Input>
        </FormItem>
        <FormItem label="单位" prop="unitName">
          <Input v-model="formValidate.unitName" style="width:200px;"></Input>
        </FormItem>
        <FormItem label="职称" prop="job_title">
          <Input v-model="formValidate.job_title" style="width:200px;"></Input>
        </FormItem>
        <FormItem label="职务" prop="position">
          <Input v-model="formValidate.position" style="width:200px;"></Input>
        </FormItem>
        <FormItem label="电话" prop="phone">
          <Input v-model="formValidate.phone" style="width:200px;"></Input>
        </FormItem>
        <FormItem label="传真" prop="fax">
          <Input v-model="formValidate.fax" style="width:200px;"></Input>
        </FormItem>
        <FormItem label="QQ号" prop="qq">
          <Input v-model="formValidate.qq" style="width:200px;"></Input>
        </FormItem>
        <FormItem label="微信号" prop="wechat">
          <Input v-model="formValidate.wechat" style="width:200px;"></Input>
        </FormItem>
        <FormItem label="登录密码" prop="password">
          <Input v-model="formValidate.password" style="width:200px;"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancel">取消</Button>
        <Button type="primary" @click="sure('form')">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showModal: true,
      formValidate: {
        userType:1,
        isDisable:1
      },
      rules: {
        emailAccount: [
          {
            required: true,
            message: "The emailAccount cannot be empty",
            trigger: "blur"
          }
        ],
        name: [
          {
            required: true,
            message: "The name cannot be empty",
            trigger: "blur"
          }
        ],
        password: [
          {
            required: true,
            message: "The password cannot be empty",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    cancel() {
      this.$router.go(-1);
    },
    sure(name) {
      let _this = this;
      let form = new FormData();
      for (let i in this.formValidate) {
        console.log("i", this.formValidate[i]);
        if (this.formValidate[i]) {
          form.append(i, this.formValidate[i]);
        }
      }
      this.$refs[name].validate(valid => {
        if (valid) {
          _this.$axios.post("/api/user/saveUser", form).then(res => {
            if (res.data.code == 100) {
              _this.$Message.success("添加成功");
              _this.$router.go(-1);
            }else{
              _this.$Message.error(res.data.msg);
            }
          });
        }
      });
    }
  }
};
</script>
<style>
.form1 {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>