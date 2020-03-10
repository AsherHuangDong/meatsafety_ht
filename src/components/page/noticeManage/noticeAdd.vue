<template>
  <div>
    <Form label-position="right" :label-width="100" class="form">
      <FormItem label="标题：" prop="name">
        <Input v-model="obj.title"></Input>
      </FormItem>
      <FormItem label="内容：" prop="name">
        <VueEditor
          v-model="obj.content"
          useCustomImageHandler
          @image-added="handleImageAdded"
          style="width:100%;height:auto;"
        ></VueEditor>
      </FormItem>
      <FormItem>
        <Button style='margin-right:100px;' @click="cancel">取消</Button>
        <Button type="info" @click='save'>发布</Button>
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
      obj: {}
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
    cancel(){
        this.$router.go(-1)
    },
    save(){
        let form = new FormData()
        if(!this.obj.title){
            this.$Message.error('请填写标题')
            return false
        }
        if(!this.obj.content){
            this.$Message.error('请填写内容')
            return false
        }
        form.append('title',this.obj.title)
        form.append('content',this.obj.content)
        this.$axios.post('/api/announcement/addAnnounceone',form).then(res=>{
            if(res.data.code==100){
                this.$Message.success('添加成功！')
                this.$router.go(-1)
            }else{
                this.$Message.error(res.data.msg)
            }
        })
    }
  }
};
</script>
<style scoped>
.form {
  width: 1000px;
  margin: 0 auto;
}
</style>