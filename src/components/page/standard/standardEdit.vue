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
       <FormItem label="附件：">
        <Button icon="ios-cloud-upload" @click="addFile">上传附件</Button>
        <span>支持扩展名：.rar .zip .doc .docx .pdf .jpg...</span>
         <div v-if="fileList" style="display:flex;margin-left:150px">
          <span>{{fileList}}</span>
        </div>
        <input
          id="addFile"
          type="file"
          style="opacity: 0;height: 0;width: 0"
          accept=".rar, .zip, .doc, .docx, .pdf, .jpg, .xls"
        />
      </FormItem>
    </Form>
    <div style="text-align:center">
      <Button style="margin-right:100px;" @click="cancel">取消</Button>
      <Button type="info" @click="save">发布</Button>
    </div>
  </div>
</template>
<script>
import { VueEditor } from "vue2-editor";
export default {
  components: { VueEditor },
  data() {
    return {
      obj: {},
      id:'',
      fileList:''
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
    save() {
      let form = new FormData();
      if (!this.obj.title) {
        this.$Message.error("请填写标题");
        return false;
      }
      if (!this.obj.content) {
        this.$Message.error("请填写内容");
        return false;
      }
      form.append("title", this.obj.title);
      form.append("content", this.obj.content);
      form.append('id',this.id)
       if(this.obj.fileName){
        form.append("fileName", this.obj.fileName);
      }
      if(this.obj.fileUrl){
        form.append("fileUrl", this.obj.fileUrl);
      }
      this.$axios.post("/api/governmentStandard/updateGovernmentStandardById", form).then(res => {
        if (res.data.code == 100) {
          this.$Message.success("编辑成功！");
          this.$router.go(-1);
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },
    getDetail() {
      let form = new FormData();
      form.append("id", this.id);
      this.$axios.post("/api/governmentStandard/getGovernmentStandardById", form).then(res => {
        this.obj = res.data.data;
        this.fileList = res.data.data.fileName;
      });
    },
     addFile() {
      const self = this;
      let addFile = "";
      addFile = document.getElementById("addFile");
      console.log("name", self.name);
      console.log("addFile", addFile);
      addFile.click();
      addFile.onchange = function(e) {
        console.log(this.files);
        let form = new FormData();
        form.append("img", this.files[0]);
        self.$axios.post("/api/upload/file", form).then(res => {
          console.log(res.data);
          self.obj.fileName = res.data.data.fileName;
          self.obj.fileUrl = res.data.data.fileUrl;
          self.fileList = res.data.data.fileName;
        });
      };
    }
  },
  mounted() {
      this.id = this.$route.query.id
      this.getDetail()
  }
};
</script>
<style scoped>
.form {
  width: 1000px;
  margin: 0 auto;
}
</style>