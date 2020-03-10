<template>
  <div class="table">
    <Table
      :show-header="showHeader"
      :columns="columns"
      border
      @on-selection-change="getSelect"
      :data="row"
    ></Table>
  </div>
</template>
<script>
export default {
  name: "treeTable",
  data() {
    let _this = this;
    return {
      showHeader: false,
      columns: [
        {
          title: "序号",
          key: "row.indexTypeId",
          align: "center",
          width: 50
          // render: (h, params) => {
          //   return h(that.treeTable, {
          //     props: {
          //       row: params.row.list
          //     }
          //   });
          // }
        },
        {
          type: "selection",
          align: "center",
          width: 100
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
                  let param = {
                    id: params.row.indexTypeId,
                    status: params.row.isVisible
                  };
                  _this.$emit('changeStatus',param);
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
                        path: "/kindchildedit",
                        query: {
                          parents: _this.id,
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
                      _this.$emit("del", param.row.indexTypeId);
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
                    "margin-right": "10px"
                  },
                  on: {
                    click: () => {
                      _this.$emit('moveChild',{indexTypeId:param.row.indexTypeId, move:1});
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
                    "margin-right": "10px"
                  },
                  on: {
                    click: () => {
                      _this.$emit('moveChild',{indexTypeId:param.row.indexTypeId, move:2});
                    }
                  }
                },
                "下移"
              )
            ]);
          }
        }
      ]
    };
  },
  props: ["row", "id"],
  methods: {
    getSelect() {},
    clickRow(row) {
      this.$emit("childClick", row);
    }
    // change(e) {
    //   console.log(this.idList);
    // },
    // isAllList() {
    //   if (this.single) {
    //     this.list.forEach(item => {
    //       this.idList.push(item.indexTypeId);
    //     });
    //   } else {
    //     this.idList = [];
    //   }
    // }
  },
  mounted() {
    console.log(this.list);
  }
};
</script>
<style>
td.ivu-table-expanded-cell {
  padding: 0;
  background: #f8f8f9;
}
/* .table {
  margin-top: 20px;
  width: 100%;
  border: 1px solid #ccc;
} */
/* .table-th-box {
  width: 100%;
  display: flex;
  background: #eee;
}
.table-td-box {
  width: 100%;
  border-top: 1px solid #ccc;
  display: flex;
}
.table-td {
  flex: 1;
  height: 40px;
  line-height: 40px;
  text-align: center;
} */
</style>