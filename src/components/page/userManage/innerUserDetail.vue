<template>
  <div>
    <Modal
      v-model="showModal"
      width="600"
      style="padding:0 20px 20px;"
      :mask-closable="false"
      :closable="false"
    >
      <p slot="header">用户详情</p>
      <Form
        label-position="right"
        :label-width="100"
        ref="form"
        :model="formValidate"
      >
        <Row>
          <Col span="11">
            <FormItem label="姓名：" prop="name">{{formValidate.name}}</FormItem>
          </Col>
          <Col span="11">
            <FormItem label="手机：" prop="mobile">{{formValidate.mobile}}</FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
            <FormItem label="邮箱：" prop="emailAccount">{{formValidate.emailAccount}}</FormItem>
          </Col>
          <Col span="11">
            <FormItem label="单位：" prop="unitName">{{formValidate.unitName}}</FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
            <FormItem label="职称：" prop="name">{{formValidate.jobTitle}}</FormItem>
          </Col>
          <Col span="11">
            <FormItem label="职务：" prop="name">{{formValidate.position}}</FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
            <FormItem label="电话：" prop="name">{{formValidate.phone}}</FormItem>
          </Col>
          <Col span="11">
            <FormItem label="传真：" prop="name">{{formValidate.fax}}</FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
           <FormItem label="QQ号：" prop="name">{{formValidate.qq}}</FormItem>
          </Col>
          <Col span="11">
            <FormItem label="微信号：" prop="name">{{formValidate.weChat}}</FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
            <FormItem label="登录密码：" prop="name">{{formValidate.password}}</FormItem>
          </Col>
        </Row>
      </Form>
      <div slot="footer">
        <Button type="primary" @click="sure">关闭</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userId: "",
      showModal: true,
      formValidate: {}
    };
  },
  methods: {
    cancel() {
      this.$router.go(-1);
    },
    sure() {
      this.$router.go(-1);
    },
    getDetail() {
      let form = new FormData();
      form.append("userId", this.userId);
      this.$axios.post("/api/user/getUserByUserId", form).then(res => {
        this.formValidate = res.data.data[0];
      });
    }
  },
  mounted() {
    this.userId = this.$route.query.id;
    this.getDetail();
  }
};
</script>
<style>
</style>