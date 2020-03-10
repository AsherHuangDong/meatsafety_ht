<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-logo {
  height: 25px;
  line-height: 45px;
  /* background: url("../../assets/img/lo.png"); */
  border-radius: 3px;
  float: left;
  position: relative;
  top: 10px;
  left: 24px;
  color: #fff;
  font-size: 20px;
}
.layout-nav {
  width: 420px;
  margin: 0 20px 0 auto;
  display: flex;
  justify-content: flex-end;
}
</style>
<template>
  <div class="layout">
    <Modal
      v-model="showModal"
      width="600"
      style="padding:0 20px 20px;"
      :mask-closable="false"
      :closable="false"
    >
      <p slot="header">修改密码</p>
      <Form class="form" label-position="right" :label-width="80" ref="form">
        <FormItem label="原密码：" prop="name">
          <Input v-model="originalPassword" placeholder="输入当前密码"></Input>
        </FormItem>
        <FormItem label="新密码：" prop="name">
          <Input v-model="presentPassword" placeholder="设置新密码"></Input>
        </FormItem>
        <FormItem label="确认密码：" prop="name">
          <Input v-model="presentPassword1" placeholder="确认密码"></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button @click="cancel">取消</Button>
        <Button type="primary" @click="sure">确定</Button>
      </div>
    </Modal>
    <Layout :style="{height: height + 'px', overflow: 'visible'}">
      <Header style="background:#515a6e" class="header">
        <Menu mode="horizontal" style="background:#515a6e;" @on-select="getPage">
          <div class="layout-logo">肉品品质安全数据库管理后台</div>
          <div class="layout-nav">
            <Submenu name="userInfo">
              <template slot="title" style="color:#fff;">{{userName}}</template>
              <MenuItem name="1">修改密码</MenuItem>
              <MenuItem name="2">退出登录</MenuItem>
            </Submenu>
          </div>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#515a6e'}">
          <Menu
            ref="side_menu"
            theme="dark"
            width="auto"
            accordion
            @on-select="selectMenu"
            :active-name="name"
            :open-names="openNames"
          >
            <MenuItem
              v-for="item in menuList"
              :key="item.name"
              v-if="!item.children&&item.permId!=14&&item.show"
              :name="item.name"
            >{{item.title}}</MenuItem>
            <Submenu
              v-for="item in menuList"
              :key="item.name"
              :name="item.name"
              v-if="item.children&&item.show"
            >
              <template slot="title">{{item.title}}</template>
              <div v-for="(item1,index1) in item.children" :key="index1">
                <MenuItem
                  v-if="!item1.children&&item1.show"
                  :key="item1.name"
                  :name="item1.name"
                >{{item1.title}}</MenuItem>
              </div>
            </Submenu>
            <MenuItem
              v-for="item in menuList"
              :key="item.name"
              v-if="!item.children&&item.permId==14&&item.show"
              :name="item.name"
            >{{item.title}}</MenuItem>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Breadcrumb :style="{margin: '12px 0'}">
            <BreadcrumbItem>
              <div style="height: 18px;width:1px;border: 3px solid #515a6e;display: inline-block;"></div>
              <span
                style="height: 18px;line-height: 18px;font-size:18px;display: inline-block;"
              >{{$route.meta.title}}</span>
            </BreadcrumbItem>
          </Breadcrumb>
          <Content
            :style="{padding: '24px', minHeight: '280px',height: '100%', background: '#fff'}"
          >
            <router-view />
          </Content>
        </Layout>
      </Layout>
    </Layout>
    <!-- <router-view></router-view> -->
    <!-- <user-setting></user-setting> -->
  </div>
</template>
<script>
import menuList from "../../perm/menuList";
export default {
  name: "index",
  //components: { UserSetting },
  data() {
    return {
      presentPassword: "",
      presentPassword1: "",
      originalPassword: "",
      showModal: false,
      userName: sessionStorage.getItem('nickname'),
      height: 0,
      menuList: [],
      name: "",
      openNames: []
    };
  },
  watch: {
    $route(to, from) {
      this.name = this.$route.path.substr(1);
    }
  },
  methods: {
    cancel() {
      this.showModal = false;
    },
    sure() {
      if (!this.originalPassword) {
        this.$Message.error("请输入原密码");
        return false;
      }
      if (!this.presentPassword) {
        this.$Message.error("请输入新密码");
        return false;
      }
      if (!this.presentPassword1) {
        this.$Message.error("请输入确认密码");
        return false;
      }
      if (this.presentPassword != this.presentPassword1) {
        this.$Message.error("两次密码输入不一致");
        return false;
      }
      let form = new FormData();
      form.append("originalPassword", this.originalPassword);
      form.append("presentPassword", this.presentPassword);
      form.append("adminId", sessionStorage.getItem("adminId"));
      this.$axios.post("/api/admin/updatePasswordByAdmin", form).then(res => {
        if (res.data.code == 100) {
          this.$Message.success("密码修改成功！");
          this.showModal = false;
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },
    getPage(name) {
      if (name == 2) {
        sessionStorage.clear();
        this.$router.push("/");
      } else if (name == 1) {
        this.showModal = true;
      }
      console.log("name", name);
    },
    selectMenu(name) {
      this.$router.push("/" + name);
    },
    // 生成左侧菜单
    getSideBar() {
      let M = menuList();
      console.log('M',JSON.parse(sessionStorage.getItem("permList")))
      let a = JSON.parse(sessionStorage.getItem("permList"));
      if (a[0].permValue !== "/generalviewshow") {
        this.$router.push(a[0].permValue);
      }
      let b = [];
      for (let i = 0; i < a.length; i++) {
        b.push(a[i].permId);
      }
      function f(arr) {
        for (let i = 0; i < arr.length; i++) {
          arr[i].show = b.indexOf(arr[i].permId) !== -1;
          if (arr[i].children) {
            f(arr[i].children);
          }
        }
      }
      f(M);
      this.menuList = M;
      console.log('menu',this.menuList)
      // 刷新时默认展开项
      this.menuList.forEach(item => {
        if (item.children) {
          item.children.forEach(item2 => {
            if (this.$route.path.substr(1) == item2.name) {
              this.openNames = [item.name];
              this.$nextTick(() => {
                this.$refs.side_menu.updateOpened();
              });
            }
          });
        }
      });
    }
  },
  mounted() {
    // 刷新时默认选中项
    this.name = this.$route.path.substr(1);
    let _this = this;
    _this.height = document.documentElement.clientHeight - 2;
    window.onresize = function() {
      _this.height = document.documentElement.clientHeight - 2;
    };
    this.getSideBar();
  }
};
</script>
<style>
.layout {
  overflow-y: scroll !important;
}
.ivu-menu-horizontal {
  height: 64px;
  line-height: 64px;
}
.ivu-layout-header {
  background: #515a6e;
  padding: 0;
  height: 64px;
}
.header .ivu-menu-submenu .ivu-menu-submenu-title {
  color: #fff;
}
</style>
