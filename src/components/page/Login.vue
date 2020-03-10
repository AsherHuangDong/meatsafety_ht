<template>
  <div class="account" id="accountPage">
    <div class="container">
      <div class="wapper">
        <h3>肉品品质安全数据库管理后台</h3>
        <!-- <h3 class='h3'>Super order form</h3> -->
        <Form :model="account" ref="login" id="login">
          <FormItem>
            <div class="user_item">
              <Input type="text" v-model="account.email" placeholder="请输入账号" style="width:300px;"></Input>
              <img src="/static/img/account_img.png" class="img" />
            </div>
          </FormItem>
          <FormItem>
            <div class="user_item">
              <Input
                type="password"
                v-model="account.password"
                placeholder="请输入密码"
                style="width:300px;"
              ></Input>
              <img src="/static/img/mima_img.png" class="img" />
            </div>
          </FormItem>
          <FormItem class="m-b-15">
            <Button type="primary" style="width:300px;" @click="login">登录</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      account: { account: "", password: "" }
    };
  },
  methods: {
    login: function() {
      let form = new FormData();
      if(!this.account.email){
        this.$Message.error("请输入账号！");
        return false
      }
      if(!this.account.password){
        this.$Message.error("请输入密码！");
        return false
      }
      form.append("email", this.account.email);
      form.append("password", this.account.password);
      this.$axios.post("/api/admin/login", form).then(res => {
        console.log(res.data);
        console.log(res.data.code);
       if(res.data.code == 100) {
          sessionStorage.setItem("token", res.data.data.token);
          sessionStorage.setItem('adminId',res.data.data.adminId)
          sessionStorage.setItem('permList',JSON.stringify(res.data.data.permList))
          sessionStorage.setItem('nickname',JSON.stringify(res.data.data.nickname))
          this.$Message.success("登录成功！");
          this.$router.push("/generalviewshow");
        }else{
          this.$Message.error(res.data.msg);
        }
      });
    }
  },
  mounted() {}
};
</script>
<style lang="scss" scoped>
.act {
  color: #00c1de;
}
.noAct {
  color: #fff;
}
$color: #00c79b;
$black: #495060;
$borderColor: rgb(233, 233, 233);
$checkedColor: #f6744d;
$anniuse: #00c1de;
.account {
  .container {
    width: 100%;
    position: absolute;
    background: url("../../../static/img/bg.png") no-repeat;
    background-size: cover;
    background-position: center center;
    height: 100%;
    top: 0px;
    padding-top: 200px;
    .wapper {
      margin: 0px auto 0;
      width: 450px;
      background: #fff;
      text-align: center;
      border-radius: 20px;
      padding-top: 100px;
      padding-bottom: 100px;
      .h3 {
        padding-bottom: 20px;
      }
      .user_item {
        width: 100%;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 10px;
        position: relative;
        .img {
          position: absolute;
          left: 40px;
          top: 2px;
        }
      }
      .left {
        height: 160px;
        color: $anniuse;
        padding-left: 20px;
        width: 62%;
        position: absolute;
        left: 0;
        top: 270px;
        background-color: rgba(0, 0, 0, 0.4);
        p {
          text-align: center;
          line-height: 160px;
          font-size: 48px;
          letter-spacing: 8px;
        }
      }

      .right {
        position: absolute;
        right: 0;
        width: 38%;
        min-height: 100vh;
        border-radius: 5px;
        background-color: rgba(0, 0, 0, 0.4);
        padding-top: 180px;

        .right-container {
          width: 400px;
          margin: 20px auto;
          padding: 10px;
          .check-code-img {
            width: 95px;
            height: 40px;
            position: absolute;
            top: 0px;
            right: 0px;
          }
          .right-tab {
            a {
              font-size: 36px;
              display: inline-block;
              height: 40px;
              line-height: 40px;
              color: $anniuse;
              letter-spacing: 5px;

              &.active {
                color: $anniuse;
                /*border-bottom: 4px solid $anniuse;*/
              }
            }
          }

          span.forgetpwd {
            display: inline-block;
            font-size: 16px;
            color: $anniuse;
            border-bottom: 1px solid $anniuse;
            line-height: 25px;
            cursor: pointer;
          }
          .user_item2 {
            width: 100%;
            height: 56px;
            position: relative;
            input {
              width: 260px;
              height: 56px;
              border: none;
              outline: none;
              background: rgba(255, 255, 255, 0.2);
              border-radius: 10px;
              box-sizing: border-box;
              padding-left: 15px;
              font-size: 18px;
              color: #fff;
            }
            input::-webkit-input-placeholder {
              color: #6b6c6c;
            }
            span.hqyzm {
              display: inline-block;
              width: 109px;
              height: 56px;
              line-height: 56px;
              font-size: 14px;
              color: $anniuse;
              text-align: center;
              background: rgba(255, 255, 255, 0.2);
              position: absolute;
              top: 0;
              right: 0;
              border-radius: 10px;
              cursor: pointer;
            }
          }
          span.btn_submit {
            display: block;
            width: 100%;
            height: 56px;
            line-height: 56px;
            background: $anniuse;
            color: #fff;
            text-align: center;
            border-radius: 10px;
            font-size: 24px;
            cursor: pointer;
          }

          button[type="button"] {
            font-size: 24px;
            background: $anniuse;
            color: #fff;
            border: $anniuse;
            border-radius: 10px;
          }

          .ivu-checkbox-wrapper {
            color: #fff;
          }

          .ivu-btn-success {
            background-color: #495060;
            border-color: #495060;
          }

          .ivu-form-item:first-child {
            margin-top: 30px;
          }
        }
      }
    }
  }
}
</style>


