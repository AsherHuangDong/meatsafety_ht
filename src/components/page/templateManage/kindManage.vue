<template>
  <div style="padding:0 20px;">
    <Row>
      <Col span="24">
        <Button type="primary" style="margin-right:20px;" @click="add">新增项</Button>
        <Button type="primary" style="margin-right:20px;" @click="toDel">批量删除</Button>
        <Button type="primary" style="margin-right:20px;" @click="toHidden">批量隐藏</Button>
      </Col>
    </Row>
    <Row>
      <!-- <treeTable :list='list'></treeTable> -->
      <Table
        style="margin-top:20px;"
        :columns="columns"
        border
        @on-selection-change="getSelect"
        :data="list"
        @on-row-click="clickRow"
      ></Table>
    </Row>
    <Row>
      <Col span="24" style="margin-top:60px;margin-bottom:100px;text-align:center;">
        <Page :total="total" size="small" show-total @on-change="changePage" />
      </Col>
    </Row>
    <router-view></router-view>
    <Modal v-model="showDel" width="360" :mask-closable="false" :closable="false">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>是否删除数据？</span>
      </p>
      <div style="text-align:center">
        <p>删除数据后将无法恢复</p>
      </div>
      <div slot="footer" style="text-align:center;">
        <Button type="error" @click="del">删除</Button>
        <Button style="margin-left:40px;" @click="cancel">取消</Button>
      </div>
    </Modal>
    <Modal v-model="hiddenData" width="360" :mask-closable="false" :closable="false">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>是否隐藏选中数据？</span>
      </p>
      <div style="text-align:center">
        <p>隐藏数据后将无法查看</p>
      </div>
      <div slot="footer" style="text-align:center;">
        <Button type="error" @click="hidden">隐藏</Button>
        <Button style="margin-left:40px;" @click="cancel">取消</Button>
      </div>
    </Modal>
    <Modal v-model="showData" width="360" :mask-closable="false" :closable="false">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>是否显示选中数据？</span>
      </p>
      <div style="text-align:center">
        <p>显示数据后将可以查看数据</p>
      </div>
      <div slot="footer" style="text-align:center;">
        <Button type="error" @click="hidden">显示</Button>
        <Button style="margin-left:40px;" @click="cancel">取消</Button>
      </div>
    </Modal>
  </div>
</template>
<script>
import Vue from "vue";
import treeTable from "../../component/table/treeTable";
export default {
  data() {
    let _this = this;
    return {
      msg: "",
      showData: false,
      showDel: false,
      hiddenData: false,
      indexTypeIdList: [],
      page: 1,
      pageSize: 10,
      total: 0,
      columns: [
        {
          type: "selection",
          align: "center",
          width: 100
        },
        {
          type: "expand",
          width: 50,
          render: (h, params) => {
            console.log("param", params);
            return h(treeTable, {
              props: {
                row: params.row.list,
                id: params.row.indexTypeId
              },
              on: {
                childClick: row => {
                  console.log("bbb", row);
                  // _this.clickRow(row);
                },
                del: indexTypeId => {
                  _this.indexTypeIdList = [indexTypeId];
                  _this.showDel = true;
                },
                moveChild: obj => {
                  _this.move(obj.indexTypeId, obj.move);
                },
                changeStatus: obj => {
                  _this.indexTypeIdList = [obj.id];
                  _this.toHidden(obj.status);
                }
              }
            });
          }
        },
        {
          type: "index",
          title: "序号",
          key: "",
          align: "center",
          width: 100
        },
        {
          title: "分类名称",
          key: "indexTypeName",
          align: "center"
        },
        {
          title: "是否可见",
          key: "",
          align: "center",
          render: function(h, params) {
            return h("i-switch", {
              props: {
                value: params.row.isVisible,
                "true-value": 1, //是
                "false-value": 2, //否
                size: "large"
              },
              on: {
                "on-change": function(value) {
                  _this.indexTypeIdList = [params.row.indexTypeId];
                  _this.toHidden(params.row.isVisible);
                }
              },
              scopedSlots: {
                open: () => h("span", "是"),
                close: () => h("span", "否")
              }
            });
          }
        },
        {
          title: "创建时间",
          key: "cTime",
          align: "center"
        },
        {
          title: "操作",
          key: "",
          align: "center",
          render: function(h, param) {
            return h("div", {}, [
              h(
                "a",
                {
                  style: {
                    color: "#00C1DE",
                    "margin-right": "10px"
                  },
                  on: {
                    click: () => {
                      _this.$router.push({
                        path: "/kindchildadd",
                        query: {
                          indexTypeId: param.row.indexTypeId
                        }
                      });
                      sessionStorage.setItem("list", _this.list);
                    }
                  }
                },
                "新增子项"
              ),
              h(
                "a",
                {
                  style: {
                    color: "#00C1DE",
                    "margin-right": "10px"
                  },
                  on: {
                    click: () => {
                      _this.$router.push({
                        path: "/kindedit",
                        query: {
                          indexTypeId: param.row.indexTypeId,
                          indexTypeName: param.row.indexTypeName
                        }
                      });
                    }
                  }
                },
                "修改"
              ),
              h(
                "a",
                {
                  style: {
                    color: "#00C1DE",
                    "margin-right": "10px"
                  },
                  on: {
                    click: () => {
                      _this.showDel = true;
                      _this.indexTypeIdList = [param.row.indexTypeId];
                      console.log("111=", _this.indexTypeIdList);
                    }
                  }
                },
                "删除"
              ),
              h(
                "a",
                {
                  style: {
                    color: "#00C1DE",
                    "margin-right": "10px",
                    display: param.index == 0 ? "none" : "inline-block"
                  },
                  on: {
                    click: () => {
                      _this.move(param.row.indexTypeId, 1);
                    }
                  }
                },
                "上移"
              ),
              h(
                "a",
                {
                  style: {
                    color: "#00C1DE",
                    "margin-right": "10px",
                    display:
                      param.index == _this.list.length - 1
                        ? "none"
                        : "inline-block"
                  },
                  on: {
                    click: () => {
                      _this.move(param.row.indexTypeId, 2);
                    }
                  }
                },
                "下移"
              )
            ]);
          }
        }
      ],
      list: []
    };
  },
  components: {
    treeTable
  },
  watch: {
    $route: function(to, from) {
      console.log("from", from);
      if (from.name == "kindadd" || from.name == "kindedit") {
        this.getData();
      }
      if (from.query.parents) {
        let obj = {
          indexTypeId: from.query.parents
        };
        this.clickRow(obj);
      }
    }
  },
  inject: ["reload"],
  methods: {
    move(id, move) {
      let form = new FormData();
      form.append("status", move);
      form.append("indexTypeId", id);
      this.$axios.post("/api/indexType/moveIndexTypeSort", form).then(res => {
        if (res.data.code == 100) {
          let msg = "";
          move == 1 ? (msg = "上移成功！") : (msg = "下移成功！");
          this.$Message.success(msg);
          this.getData();
        } else {
          this.$Message.error(res.data.msg);
        }
      });
    },
    getSelect(e) {
      this.indexTypeIdList = [];
      e.forEach(item => {
        this.indexTypeIdList.push(item.indexTypeId);
      });
      console.log("e", this.indexTypeIdList);
    },
    changePage(page) {
      this.page = page;
      this.getData();
    },
    getChildList(arr, id, newarr) {
      let isCont = true;
      arr.forEach(item => {
        if (item.indexTypeId == id) {
          isCont = false;
          item.list = newarr;
          if (item._expanded) {
            item._expanded = false;
          } else {
            item._expanded = true;
          }
        }
        if (isCont) {
          if (item.list && item.list.length > 0) {
            list(item.list, id, newarr);
          }
        }
      });
      let list = [];
      this.list.forEach(item => {
        list.push(item);
      });
      this.list = list;
      console.log(this.list);
    },
    clickRow(row) {
      let id = row.indexTypeId;
      let form = new FormData();
      form.append("indexTypeId", id);
      this.$axios
        .post("api/indexType/getIndexTypeChildListByParent", form)
        .then(res => {
          this.getChildList(this.list, id, res.data.data);
        });
    },
    getData() {
      let form = new FormData();
      form.append("page", this.page);
      form.append("pageSize", this.pageSize);
      this.$axios.post("/api/indexType/getIndexTypeByPage", form).then(res => {
        console.log(res);
        this.total = res.data.data.total;
        this.list = res.data.data.records;
      });
    },
    add() {
      this.$router.push({
        path: "/kindadd"
      });
    },
    toDel() {
      if (this.indexTypeIdList.length == 0) {
        this.$Message.error("请选择你要删除的数据");
        return false;
      }
      this.showDel = true;
    },
    del() {
      let form = new FormData();
      let indexTypeIdList = [];
      console.log("222==", this.indexTypeIdList);
      this.indexTypeIdList.forEach(item => {
        indexTypeIdList.push(item);
      });
      console.log("222=", indexTypeIdList);
      indexTypeIdList = indexTypeIdList.join(",");
      console.log(indexTypeIdList);
      form.append("status", 1);
      form.append("indexTypeIdList", indexTypeIdList);
      this.$axios
        .post("/api/indexType/deleteIndexTypeByParent", form)
        .then(res => {
          if (res.data.code == 100) {
            this.$Message.success("删除成功！");
            this.showDel = false;
            this.indexTypeIdList = [];
            this.getData();
          }
        });
    },
    toHidden(type) {
      if (type) {
        type == 1 ? (this.hiddenData = true) : type == 2?(this.showData = true):(this.hiddenData = true);
      } else {
        if (this.indexTypeIdList.length == 0) {
          this.$Message.error("请选择你要隐藏的数据");
          return false;
        }
        this.hiddenData = true;
      }
    },
    hidden() {
      let form = new FormData();
      let indexTypeIdList = [];
      this.indexTypeIdList.forEach(item => {
        indexTypeIdList.push(item);
      });
      indexTypeIdList = indexTypeIdList.join(",");
      console.log(indexTypeIdList);
      form.append("status", 2);
      form.append("indexTypeIdList", indexTypeIdList);
      this.$axios
        .post("/api/indexType/deleteIndexTypeByParent", form)
        .then(res => {
          if (res.data.code == 100) {
            this.indexTypeIdList = [];
            this.getData();
            if (this.showData) {
              this.$Message.success("已显示！");
            }
            if (this.hiddenData) {
              this.$Message.success("已隐藏！");
            }
            this.hiddenData = false;
            this.showData = false;
          }
        });
    },
    cancel() {
      this.getData()
      this.showDel = false;
      this.hiddenData = false;
      this.showData = false;
    }
  },
  mounted() {
    this.getData();
  }
};
</script>