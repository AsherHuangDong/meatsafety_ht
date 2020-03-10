<template>
  <div style="padding:0 20px;">
    <Row>
      <Col span="18">
        <span>猪种名称</span>
        <Input style="width:200px;margin-right:20px;" v-model="pigBreed"></Input>
        <span>参考文献</span>
        <Input style="width:200px;" v-model="referLiterature"></Input>
      </Col>
      <Col span="6" style="text-align:right;">
        <Button type="info" style="margin-right:20px;" @click="getdata">搜索</Button>
        <Button type="primary" @click="upLoadFile">上传</Button>
      </Col>
    </Row>
    <Row>
      <Table style="margin-top:20px;" :columns="columns" border :data="list">
        <template slot-scope="{ row, index }" slot="update">
          <Button
            size="small"
            type="primary"
            @click="toDownLoad(row.literatureId)"
            style="margin-top:2px;width:60px"
          >下载</Button>
          <Button
            size="small"
            type="primary"
            @click="toDel(row)"
            style="margin-top:2px;width:60px"
          >删除</Button>
          <br />
          <Dropdown trigger="click" style="margin-top:4px;margin-bottom:2px" @on-click="opSelect">
            <Button size="small" @click="update(row)" type="primary" style="width:60px;">
              更新数据
              <Icon type="ios-arrow-down"></Icon>
            </Button>
            <DropdownMenu slot="list">
              <DropdownItem name="file">上传文件</DropdownItem>
              <DropdownItem name="hand">手动上传</DropdownItem>
            </DropdownMenu>
          </Dropdown>
        </template>
      </Table>
    </Row>
    <Row>
      <Col span="24" style="margin-top:60px;margin-bottom:100px;text-align:center;">
        <Page :total="total" size="small" show-total @on-change="changePage" />
      </Col>
    </Row>
    <Modal v-model="showDel" width="360" :mask-closable="false" :closable="false">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>是否删除该条数据？</span>
      </p>
      <div style="text-align:center">
        <p>删除数据后将无法恢复</p>
      </div>
      <div slot="footer" style="text-align:center;">
        <Button type="error" @click="del">删除</Button>
        <Button style="margin-left:40px;" @click="cancel">取消</Button>
      </div>
    </Modal>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  data() {
    let _this = this;
    return {
      row: {},
      selObj: {},
      showDel: false,
      list: [],
      page: 1,
      pageSize: 10,
      total: 0,
      pigBreed: "",
      referLiterature: "",
      columns: [
        {
          type: "index",
          title: "序号",
          key: "",
          align: "center",
          width: 100
        },
        {
          title: "参考文献",
          key: "referLiterature",
          align: "center",
          width: 300
        },
        {
          title: "猪种",
          key: "pigBreed",
          align: "center",
          width: 100
        },
        {
          title: "纯种或杂交等信息",
          key: "typeName",
          align: "center",
          width: 100,
        },
        {
          title: "性别",
          key: "sexName",
          align: "center",
          width: 80
        },
        {
          title: "饲养周期",
          key: "feedPeriod",
          align: "center",
          width: 100
        },
        {
          title: "取样位置",
          key: "sampPoint",
          align: "center",
          width: 100
        },
        {
          title: "产地",
          key: "place",
          align: "center",
          width: 200
        },
        {
          title: "饲养信息",
          key: "feedInformation",
          align: "center",
          width: 200
        },
        {
          title: "屠宰方式",
          key: "butcherWay",
          align: "center",
          width: 200
        },
        {
          title: "冷却方式",
          key: "coolWay",
          align: "center",
          width: 200
        },
        {
          title: "贮藏方式",
          key: "storeCondition",
          align: "center",
          width: 200
        },
        {
          title: "运输条件",
          key: "transportationCondition",
          align: "center",
          width: 200
        },
        {
          fixed: "right",
          title: "操作",
          key: "",
          slot: "update",
          width: 200,
          align: "center"
          // render: function(h, param) {
          //   return h("div", {}, [
          //     h(
          //       "a",
          //       {
          //         style: {
          //           color: "#00C1DE",
          //           "margin-right": "10px"
          //         },
          //         on: {
          //           click: () => {
          //             _this.load(param.row.literatureId);
          //           }
          //         }
          //       },
          //       "下载"
          //     ),
          //     h(
          //       "a",
          //       {
          //         style: {
          //           color: "#00C1DE",
          //           "margin-right": "10px"
          //         },
          //         on: {
          //           click: () => {
          //             _this.showDel = true;
          //             _this.selObj = param.row;
          //           }
          //         }
          //       },
          //       "删除"
          //     )
          //   ]);
          // }
        }
      ]
    };
  },
  watch: {
    $route: function(to, from) {
      console.log(from);
      if (from.name == "uploadfile" || from.name == "uploadedit") {
        this.getdata();
      }
    }
  },
  methods: {
    changePage(page) {
      this.page = page;
      this.getdata();
    },
    update(row) {
      this.row = row;
    },
    opSelect(name) {
      const _self = this;
      console.log(name);
      if (name === "file") {
        this.$router.push({
          path: "/uploadfileedit",
          query: {
            id: this.row.literatureId
          }
        });
      }
      if (name === "hand") {
        this.$router.push({
          path: "/handupload",
          query: {
            id: this.row.literatureId
          }
        });
      }
    },
    toDel(row) {
      this.showDel = true;
      this.selObj = row;
    },
    del() {
      let form = new FormData();
      form.append("literatureId", this.selObj.literatureId);
      this.$axios.post("/api/literature/deleteLiterature", form).then(res => {
        if (res.data.code == 100) {
          this.showDel = false;
          this.$Message.success("删除成功！");
          this.getdata();
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },
    cancel() {
      this.showDel = false;
    },
    toDownLoad(id) {
      window.location.href =
        "/api/literatureExcel/exportExcel?literatureId=" + id;
    },
    getdata() {
      let form = new FormData();
      form.append("page", this.page);
      form.append("pageSize", this.pageSize);
      this.pigBreed ? form.append("pigBreed", this.pigBreed) : "";
      this.referLiterature
        ? form.append("referLiterature", this.referLiterature)
        : "";
      this.$axios
        .post("/api/literature/getLiteratureByPage", form)
        .then(res => {
          this.list = res.data.data.records;
          this.total = res.data.data.total;
        });
    },
    upLoadFile() {
      this.$router.push({
        path: "/uploadfile"
      });
    }
  },
  mounted() {
    this.getdata();
  }
};
</script>