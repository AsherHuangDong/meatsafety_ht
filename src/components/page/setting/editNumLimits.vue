<template>
  <div>
    <Modal
      v-model="showModal"
      width="600"
      style="padding:0 20px 20px;"
      :mask-closable="false"
      :closable="false"
    >
      <p slot="header">新增数值范围</p>
      <Form class="form" label-position="right" :label-width="120" ref="form">
        <FormItem label="指标名称：" prop="name" style="width:300px;">{{indexName}}</FormItem>
        <FormItem label="单位：" prop="name">
          <Input v-model="obj.unitNumber" style="width:300px;"></Input>
        </FormItem>
        <FormItem label="最小值：" prop="name">
          <InputNumber  style="width:300px;" v-model="obj.minNumber"></InputNumber>
        </FormItem>
        <FormItem label="最大值：" prop="name">
          <InputNumber style="width:300px;" v-model="obj.maxNumber"></InputNumber>
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
      obj: {
        indexId: "",
        unitNumber:''
      },
      indexName: "",
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
        console.log(this.obj)
      let form = new FormData();
      for (let i in this.obj) {
        if (this.obj[i]) {
          form.append(i, this.obj[i]);
        } else {
          this.$Message.error("请把数据填写完整！");
          return false;
        }
      }
      this.$axios
        .post("/api/indexNumberScope/editIndexNumberScope", form)
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
    this.obj.indexId = this.$route.query.indexId;
    this.obj.unitNumber = this.$route.query.unitNumber
    this.obj.indexNumberScopeId = this.$route.query.indexNumberScopeId
    this.obj.minNumber = this.$route.query.minNumber
    this.obj.maxNumber = this.$route.query.maxNumber
    this.indexName = this.$route.query.indexName;
  }
};
</script>
<style>
</style>