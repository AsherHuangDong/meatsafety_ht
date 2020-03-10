<template>
  <div>
    <Modal
      v-model="showModal"
      width="600"
      style="padding:0 20px 20px;"
      :mask-closable="false"
      :closable="false"
    >
      <p slot="header">新增子项</p>
      <Form
        class="form"
        label-position="right"
        :label-width="100"
        ref="form"
      >
        <FormItem label="分类名称：" prop="name">
          <Input v-model="indexTypeName" placeholder="Enter your name"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancel">取消</Button>
        <Button type="primary" @click="sure">确定</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      typeList: [],
      showModal: true,
      indexTypeId: '',
      indexTypeName:'',
      rules: {
        indexName: [
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
      if(!this.indexTypeName){
          this.$Message.error('请填写分类名称')
          return false
      }
      form.append('indexTypeName',this.indexTypeName)
      form.append('parent',this.indexTypeId)
      this.$axios.post("/api/indexType/saveIndexTypeByChild", form).then(res => {
        if (res.data.code == 100) {
          this.$Message.success("添加成功！");
        } else {
          this.$Message.error(res.data.msg);
        }
      });
      this.$router.go(-1);
    },
  },
  mounted() {
      this.indexTypeId = this.$route.query.indexTypeId
  }
};
</script>
<style>
</style>