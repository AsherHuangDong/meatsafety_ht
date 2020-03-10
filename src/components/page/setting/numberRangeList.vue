<template>
  <div>
    <div class="top">
      <p>最大可比较数据量：{{bigObj.maxCompareNumber}}条</p>
      <Button type="info" @click="editBig">修改</Button>
    </div>
    <div class="bottom">
      <div class="sidebar">
        <div class="search-box">
          <Input
            suffix="ios-search"
            placeholder="搜索指标名称"
            style="width: 192px;"
            search
            v-model="keyWord"
            @on-search="getType"
          />
        </div>
        <div style="max-height:500px;overflow-y:scroll;width:240px">
          <Menu theme="dark" @on-select="select" :active-name="indexId" style="max-height:430px;" accordion>
            <Submenu
              :name="item.indexTypeId"
              v-for="item in typeList"
              :key="item.indexTypeId"
              v-if="item.indexLists"
            >
              <template
                slot="title"
              >{{item.parentName?item.parentName + '-':''}}{{item.indexTypeName}}</template>
              <MenuItem
                :name="item1.indexId"
                class="menuItem"
                v-for="item1 in item.indexLists"
                :key="item1.indexId"
                ref="menuOpen"
              >
                <span>{{item1.indexName}}</span>
                <span>{{item1.isNumberScope==2?'未设置':'已设置'}}</span>
              </MenuItem>
            </Submenu>
          </Menu>
        </div>
      </div>
      <div class="con">
        <Row>
          <Col span="11">
            <Button type="info" @click="add">新增</Button>
          </Col>
        </Row>
        <Row>
          <Table :columns="columns" style="margin-top:20px;" :data="list"></Table>
        </Row>
      </div>
    </div>
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
      search: true,
      showDel: false,
      selObj: {},
      indexId: "",
      indexName: "",
      keyWord: "",
      bigObj: {},
      typeList: [],
      list: [],
      columns: [
        {
          type: "index",
          title: "序号",
          key: "",
          align: "center"
        },
        {
          title: "单位",
          key: "unitNumber",
          align: "center"
        },
        {
          title: "最小值",
          key: "minNumber",
          align: "center"
        },
        {
          title: "最大值",
          key: "maxNumber",
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
                        path: "/editnumlimits",
                        query: {
                          indexId: _this.indexId,
                          indexNumberScopeId: param.row.indexNumberScopeId,
                          minNumber: param.row.minNumber,
                          maxNumber: param.row.maxNumber,
                          unitNumber: param.row.unitNumber,
                          indexName: _this.indexName
                        }
                      });
                    }
                  }
                },
                "编辑"
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
                      _this.selObj = param.row;
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  watch: {
    $route: function(to, from) {
      console.log("from", from);
      if (from.name == "editbignum") {
        this.getType();
        this.getBigNum();
      }
      if (from.name == "addnumlimits" || from.name == "editnumlimits") {
        this.getType();
        this.getList(this.indexId);
      }
      if (from.query.parents) {
        let obj = {
          indexTypeId: from.query.parents
        };
        this.clickRow(obj);
      }
    }
  },
  methods: {
    select(e) {
      this.indexId = e;
      this.typeList.forEach(item => {
        if (item.indexLists) {
          item.indexLists.forEach(item1 => {
            if (item1.indexId == e) {
              this.indexName = item1.indexName;
            }
          });
        }
      });
      this.getList(e);
    },
    getList(e) {
      let form = new FormData();
      form.append("indexId", e);
      this.$axios
        .post("/api/indexNumberScope/getNumberScopeByindexId", form)
        .then(res => {
          if (res.data.code == 100) {
            this.list = res.data.data;
          }
        });
    },
    getType() {
      let form = new FormData();
      form.append("indexName", this.keyWord);
      this.$axios
        .post("/api/indexNumberScope/likeIndexList", form)
        .then(res => {
          if (res.data.code == 100) {
            this.typeList = res.data.data;
            for (let i = 0; i < this.typeList.length; i++) {
              //let a = true;
              if (this.typeList[0].indexLists) {
                this.indexId = this.typeList[0].indexLists[0].indexId;
                this.indexName = this.typeList[0].indexLists[0].indexName;
                //a = false;
              }
              //return a;
            }
            this.$nextTick(()=>{
                let ref = this.$refs.menuOpen;
                for(let i = 0 ; i < ref.length ; i++){
                    // MenuItem 处于选中状态就展开 Submenu
                    if(ref[i].name === this.indexId){
                        ref[i].active = true;
                        ref[i].$parent.opened = true;
                    }
                }
                this.getList(this.indexId);
            })
          }
        });
    },
    getBigNum() {
      this.$axios.post("/api/setupNumber/getSetupNumber").then(res => {
        this.bigObj = res.data.data;
      });
    },
    editBig() {
      this.$router.push({
        path: "/editbignum",
        query: {
          id: this.bigObj.id,
          name: this.bigObj.maxCompareNumber
        }
      });
    },
    add() {
      this.$router.push({
        path: "/addnumlimits",
        query: {
          indexId: this.indexId,
          indexName: this.indexName
        }
      });
    },
    del() {
      let form = new FormData();
      form.append("indexNumberScopeId", this.selObj.indexNumberScopeId);
      this.$axios
        .post("/api/indexNumberScope/deleteIndexNumberScope", form)
        .then(res => {
          if (res.data.code == 100) {
            this.showDel = false;
            this.getList(this.indexId);
            this.getType();
            this.$Message.success("删除成功！");
          } else {
            this.$Message.error(res.data.msg);
          }
        });
    },
    cancel() {
      this.showDel = false;
    }
  },
  mounted() {
    this.getType();
    this.getBigNum();
  }
};
</script>
<style scoped>
.top {
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  width: 100%;
  height: 100px;
  align-items: center;
  border-radius: 8px;
  border: 1px solid #eee;
  margin-bottom: 20px;
}
.ivu-menu-dark {
  background: rgba(46, 51, 74, 1);
}
.bottom {
  display: flex;
}
.sidebar {
  width: 240px;
  height: 500px;
  background: rgba(46, 51, 74, 1);
}
.menuItem {
  display: flex;
  justify-content: space-between;
}
.search-box {
  width: 240px;
  background: rgba(46, 51, 74, 1);
  padding: 20px;
}
.con {
  width: 70%;
  margin-left: 30px;
}
</style>