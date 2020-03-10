<template>
  <div>
    <Modal
      v-model="showModal"
      width="600"
      style="padding:0 20px 20px;"
      :mask-closable="false"
      :closable="false"
    >
      <p slot="header">修改最大可比较数据量</p>
      <Form class="form" label-position="right" :label-width="120" ref="form">
        <FormItem label="最大可比较数据量：" prop="name">
            <InputNumber :max="9" :min="0" v-model="maxCompareNumber" style='width:300px;'></InputNumber>
          <p>可用数值范围：0 ~ 9</p>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancel">取消</Button>
        <Button type="primary" @click="sure">保存</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      maxCompareNumber: 0,
      id: "",
      showModal: true,
      rules: {
        maxCompareNumber: [
          {
            required: true,
            message: "The name cannot be empty",
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
    sure() {
      let form = new FormData();
      if (!this.maxCompareNumber) {
        this.$Message.error("请输入修改数据");
        return false;
      }
      form.append("id", this.id);
      form.append("maxCompareNumber", this.maxCompareNumber);
      this.$axios
        .post("/api/setupNumber/editSetupNumber", form)
        .then(res => {
          if (res.data.code == 100) {
            this.$Message.success("修改成功！");
          } else {
            this.$Message.error(res.data.msg);
          }
        });
      this.$router.go(-1);
    }
  },
  mounted() {
    this.id = this.$route.query.id;
    this.maxCompareNumber = this.$route.query.name;
  }
};
</script>
<style>
</style>