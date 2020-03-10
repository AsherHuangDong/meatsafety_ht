<template>
  <div>
    <Modal
      v-model="showModal"
      width="600"
      style="padding:0 20px 20px;"
      :mask-closable="false"
      :closable="false"
    >
      <p slot="header">小组详情</p>
      <Form label-position="right" :label-width="100" ref="form" :model="formValidate">
        <Row>
          <Col span="11">
            <FormItem label="小组名称：" prop="name">{{formValidate.noticeGroup.groupName}}</FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
            <FormItem
              label="小组介绍："
              prop="emailAccount"
            >{{formValidate.noticeGroup.groupIntroduction}}</FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
            <FormItem label="小组成员：" prop="name">
              <span v-for='(item,index) in formValidate.name' :key='index' style='padding-right:10px;'>{{item}}</span>
            </FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
            <FormItem label="创建人：" prop="name">{{formValidate.noticeGroup.name}}</FormItem>
          </Col>
        </Row>
        <Row>
          <Col span="11">
            <FormItem label="创建时间：" prop="name">{{formValidate.noticeGroup.createTime}}</FormItem>
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
      id: "",
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
      form.append("id", this.id);
      this.$axios.post("/api/noticeGroup/getNoticeGroup", form).then(res => {
        this.formValidate = res.data.data;
      });
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.getDetail();
  }
};
</script>
<style>
</style>