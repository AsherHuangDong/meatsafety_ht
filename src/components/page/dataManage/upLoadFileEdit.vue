<template>
  <div>
    <Modal
      v-model="showModal"
      width="600"
      style="padding:0 20px 20px;"
      :mask-closable="false"
      :closable="false"
    >
      <p slot="header">上传数据</p>
      <div>
        <Upload multiple type="drag" :before-upload="handleUpload" action>
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>选择/拖拽上传文件</p>
            <p>
              支持xls和xlsx文件格式，数据格式参照
              <span style="color:blue;" @click.stop="download">肉品品质安全数据库上传模板</span>
            </p>
          </div>
        </Upload>
      </div>
      <div slot="footer">
        <Button @click="cancel">取消</Button>
        <Button type="primary" @click="sure">确定</Button>
      </div>
    </Modal>
    <Modal
      v-model="showResult"
      width="600"
      style="padding:0 20px 20px;"
      :mask-closable="false"
      :closable="false"
    >
      <p slot="header">预警提示</p>
      <div>
        <h3 style="text-align:center">系统指标库中不存在下列指标，是否继续上传？</h3>
        <p
          style="text-align:center;padding-top:10px;"
          v-for="(item,index) in list"
          :key="index"
        >{{item}}</p>
      </div>
      <div slot="footer">
        <Button @click="cancelUpload">取消上传</Button>
        <Button type="primary" @click="saveUpload">继续上传</Button>
      </div>
    </Modal>
    <Modal
      v-model="showResult1"
      width="600"
      style="padding:0 20px 20px;"
      :mask-closable="false"
      :closable="false"
    >
      <p slot="header">预警提示</p>
      <div>
        <h3 style="text-align:center">下列指标数据可能有误，是否继续上传？</h3>
        <p
          style="text-align:center;padding-top:10px;"
          v-for="(item,index) in list"
          :key="index"
        >{{item}}</p>
      </div>
      <div slot="footer">
        <Button @click="cancelUpload">取消上传</Button>
        <Button type="primary" @click="jixu">继续上传</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: "",
      showResult: false,
      showResult1: false,
      showModal: true,
      list: [],
      obj: [],
      formValidate: {},
      rules: {
        name: [
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
      this.$router.go(-1);
    },
    saveUpload() {},
    cancelUpload() {
      this.$router.go(-1);
    },
    handleUpload(file) {
      let form = new FormData();
      form.append("file", file);
      this.$axios.post("/api/literatureExcel/importExcel", form).then(res => {
        if (res.data.code == 100) {
          this.obj = res.data.data;
          if (res.data.data[1].length > 0) {
            this.showResult = true;
            (this.showResult1 = false), (this.showModal = false);
            this.list = res.data.data[1];
          } else if (res.data.data[2].length > 0) {
            this.showResult = false;
            (this.showResult1 = true), (this.showModal = false);
            this.list = res.data.data[2];
          } else {
            this.jixu();
          }
        } else {
          this.$Message.error(res.data.msg);
        }
      });
      return false;
    },
    saveUpload() {
      if (this.obj[2].length > 0) {
        this.list = this.obj[2];
        (this.showModal = false), (this.showResult1 = true);
        this.showResult = false;
      } else {
        this.jixu();
      }
    },
    jixu() {
      let form = new FormData();
      let literatureList = this.obj[0];
      console.log(this.obj[3][1]);
      let literatureDataListMap = this.obj[3];
      this.$axios
        .post("/api/literatureExcel/updateImportExcel", {
          literatureDataListMap: this.obj[3],
          literatureList: this.obj[0],
          literatureId: this.id
        })
        .then(res => {
          if (res.data.code == 100) {
            this.$Message.success("上传成功");
            this.$router.go(-1);
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    download() {
      location.href = "/api/literatureExcel/exportExcelTemplate";
    }
  },
  mounted() {
    this.id = this.$route.query.id;
  }
};
</script>
<style>
.form {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
</style>