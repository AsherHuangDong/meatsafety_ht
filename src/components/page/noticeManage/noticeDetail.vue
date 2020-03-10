<template>
    <div class='con'>
        <h3 style='text-align:center;padding-bottom:10px;'>{{detail.title}}</h3>
        <p  style='text-align:center;padding-bottom:10px;'>{{detail.mTime}}</p>
        <div class="ql-editor" v-html='detail.content'></div>
    </div>
</template>
<script>
export default {
    data(){
        return {
            id:'',
            detail:{}
        }
    },
    methods:{
        getDetail(){
            let form = new FormData()
            form.append('id',this.id)
            this.$axios.post('/api/announcement/getAnnounceone',form).then(res=>{
                this.detail = res.data.data
            })
        }
    },
    mounted(){
        this.id = this.$route.query.id
        this.getDetail()
    }
}
</script>
<style scoped>
.con{
    width:1000px;
    margin:0 auto;
}
</style>