<template>
  <div>
    <div class="list-box">
      <div class="list-item" v-for="(item,index) in list" :key="index">
        <p>
          {{item.name}}（{{item.mobile}}，{{item.unitName}}）下载数据文件
          <span>《{{item.documentName}}》</span>
        </p>
        <p>{{item.createTime}}</p>
      </div>
      <Row>
        <Col span="24" style="margin-top:40px;margin-bottom:40px;text-align:center;">
          <Page :total="total" size="small" show-total @on-change="changePage" />
        </Col>
      </Row>
    </div>
  </div>
</template>
<script>
export default {
    data(){
        return {
            page:1,
            pageSize:10,
            total:0,
            list:[]
        }
    },
    methods:{
        changePage(page){
            this.page = page
        },
        getList(){
            let form = new FormData();
            form.append('page',this.page)
            form.append('pageSize',this.pageSize)
            this.$axios.post('/api/downloadRecord/getDownloadRecordByPage',form).then(res=>{
                this.list = res.data.data.records
                this.total = res.data.data.total
            })
        }
    },
    mounted(){
        this.getList()
    }
}
</script>
<style scoped>
.list-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
</style>