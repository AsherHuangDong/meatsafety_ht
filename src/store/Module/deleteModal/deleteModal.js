export default {
  namespaced: true, // 区分命名空间
  state: {
    deleteParams: {},
  },
  getters: {
    getDeleteParams: state => {
      return state.deleteParams;
    }
  },
  mutations: {
    setDeleteParams(state, value) {
      console.log('setDeleteParams', value);
      state.deleteParams = value;
    }
  }
}
