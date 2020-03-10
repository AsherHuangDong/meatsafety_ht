// 默认获取全站需要的数据
import { changeLanguage } from '@/locale/index'
const LAN = 'LAN' // 语言

export default {
  state: {
    _data: null,
    default_code: null,
    isReady: false,
    _lan: null,
    _lanList: null,
  },
  mutations: {
    [LAN] (state, data) {
      state._lan = data
    },
  }
}
