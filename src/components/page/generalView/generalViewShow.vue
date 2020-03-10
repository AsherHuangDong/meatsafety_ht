<template>
  <div>
    <div class="top">
      <div class="left">
        <h3>数据概览</h3>
        <div class="item-box">
          <div class="left-item">
            <p>平台总数据量</p>
            <span class="num">{{obj.sumUploaded}}</span>
          </div>
          <div class="left-item">
            <p>近一周上传数据量</p>
            <span class="num">{{obj.literatureUploadedSum}}</span>
          </div>
          <div class="left-item">
            <p>近一周下载数据量</p>
            <span class="num">{{obj.downloadSum}}</span>
          </div>
        </div>
      </div>
      <div class="right">
        <h3>最新上传</h3>
        <div class="list-box">
          <div class="list-item" v-for="(item,index) in newUpload" :key="index">
            <p>{{item.name}}上传了 1 条{{item.power==1?'公开':'不公开'}}数据</p>
            <p>{{item.cTime}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bottom">
      <h3>
        最新下载
        <span @click="more">更多</span>
      </h3>
      <div class="list-box">
        <div class="list-item" v-for="(item,index) in list" :key="index">
          <p>
            {{item.name}}（{{item.mobile}}，{{item.unitName}}）下载数据文件
            <span>《{{item.documentName}}》</span>
          </p>
          <p>{{item.createTime}}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list: [],
      obj:{},
      newUpload:{}
    };
  },
  methods: {
    more() {
      this.$router.push("/downloadrecords");
    },
    getList() {
      let form = new FormData();
      form.append("page", 1);
      form.append("pageSize", 5);
      this.$axios
        .post("/api/downloadRecord/getDownloadRecordByPage", form)
        .then(res => {
          this.list = res.data.data.records;
        });
    },
    getObj(){
      this.$axios
        .get("/api/downloadRecord/getOverview", {})
        .then(res => {
          this.obj = res.data.data[0];
          this.newUpload = res.data.data[1]
        });
    },
  },
  mounted() {
    this.getObj()
    this.getList();
  }
};
</script>
<style scoped>
.top {
  display: flex;
  justify-content: space-between;
}
.left {
  height: 260px;
  box-sizing: border-box;
  border: 1px solid #eee;
  padding: 20px;
  border-radius: 8px;
  margin-right: 20px;
  flex: 1;
}
.item-box {
  padding-top: 20px;
  display: flex;
  justify-content: space-between;
}
.left-item {
  text-align: center;
  margin-right: 20px;
  flex: 1;
  border-radius: 8px;
  box-shadow: 0 0 0px 1px #eee;
  padding: 40px 20px;
}
.left-item .num {
  display: block;
  font-size: 30px;
  font-weight: bold;
  padding-top: 20px;
}
.right {
  flex: 1;
  border: 1px solid #eee;
  padding: 20px;
  border-radius: 8px;
}
.list-box {
  padding-top: 20px;
}
.list-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 10px;
}
.bottom {
  margin-top: 20px;
  border: 1px solid #eee;
  padding: 20px;
  border-radius: 8px;
}
.bottom h3 {
  display: flex;
  justify-content: space-between;
}
</style>