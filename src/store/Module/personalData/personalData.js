export default {
  namespaced: true, // 区分命名空间
  state: {
    showPersonalData: false, // 个人资料对话框显示状态
    userInfo: {}
  },
  getters: {
    getShowPersonalData: state => {
      return state.showPersonalData;
    },
    getUserInfo: state => {
      return state.userInfo;
    }
  },
  mutations: {
    setShowPersonalData(state, value) {
      console.log('setShowPersonalData', value);
      state.showPersonalData = value;
    },
    setUserInfo(state, value) {
      console.log('setUserInfo', value);
      state.userInfo = value;
    }
  }
}
