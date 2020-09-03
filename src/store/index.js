import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { Indicator } from 'mint-ui'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 控制tabbar状态
    isTabbarShow: true,
    // 即将上演缓存数据
    comingList: [],
    comingListTotal: 0,
    comingListLoad: true
  },
  mutations: {
    HideMaizuoTabbar(state, data) {
      state.isTabbarShow = data
    },
    getComingMutations(state, data) {
      state.comingListLoad = false
      state.comingList = [...state.comingList, ...data.data.data.films]
      state.comingListTotal = data.data.data.total
    },
    loadPage(state) {
      state.comingListLoad = true
    }
  },
  actions: {
    getComingListAction(store, page) {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      axios({
        url: `https://m.maizuo.com/gateway?cityId=440100&pageNum=${page}&pageSize=10&type=2`,
        headers: {
          'X-Client-Info':
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"1598756938202855600357377","bc":"440100"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        store.commit('getComingMutations', res)
        Indicator.close()
      })
    }
  },
  modules: {}
})
