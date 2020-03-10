<template>
  <div>
    <Modal
      v-model="showModal"
      width="600"
      style="padding:0 20px 20px;"
      :mask-closable="false"
      :closable="false"
    >
      <p slot="header">新增指标</p>
      <Form
        class="form"
        label-position="right"
        :label-width="100"
        ref="form"
        :model="formValidate"
        :rules="rules"
      >
        <FormItem label="指标名称：" prop="name">
          <Input v-model="formValidate.indexName" placeholder="Enter your name"></Input>
        </FormItem>
        <FormItem label="所属分类（选填）" prop="mobile">
          <Select style="width:200px;" v-model=" formValidate.indexTypeId">
            <Option
              v-for="item in typeList"
              :key="item.indexTypeId"
              :value="item.indexTypeId"
            >{{item.parentName?item.parentName + '-':''}}{{item.indexTypeName}}</Option>
          </Select>
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
      formValidate: {},
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
      if(!this.formValidate.indexName){
          this.$Message.error('请填写指标名称')
          return false
      }
      if(this.formValidate.indexTypeId){
          form.append('indexTypeId',this.formValidate.indexTypeId)
      }
      form.append('indexName',this.formValidate.indexName)
      this.$axios.post("/api/indexList/saveIndexList", form).then(res => {
        if (res.data.code == 100) {
          this.$Message.success("添加成功！");
        } else {
          this.$Message.error(res.data.msg);
        }
      });
      this.$router.go(-1);
    },
    getType() {
      this.$axios.post("/api/indexType/getIndexTypeByList", {}).then(res => {
        if (res.data.code == 100) {
          this.typeList = res.data.data;
        }
      });
    }
  },
  mounted() {
    this.getType();
  }
};
</script>
<style>
</style>