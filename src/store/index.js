import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { Indicator } from 'mint-ui'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 控制tabbar状态
    isTabbarShow: true,
    //正在热映列表
    nowList: [],
    //正在热映总数
    nowListTotal: 0,
    // 控制正在热映加载
    nowListLoad: true,
    // 即将上演数据列表
    comingList: [],
    // 即将上演列表总数
    comingListTotal: 0,
    // 控制即将上演加载
    comingListLoad: true
  },
  mutations: {
    HideMaizuoTabbar(state, data) {
      state.isTabbarShow = data
    },
    getNowMutations(state, data) {
      state.nowListLoad = false
      state.nowList = [...state.nowList, ...data.data.data.films]
      state.nowListTotal = data.data.data.total
    },
    getComingMutations(state, data) {
      state.comingListLoad = false
      state.comingList = [...state.comingList, ...data.data.data.films]
      state.comingListTotal = data.data.data.total
    },
    loadNowList(state) {
      state.nowListLoad = true
    },
    loadComingList(state) {
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
    },
    getNowListAction(store, page) {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      axios({
        url: `https://m.maizuo.com/gateway?cityId=440100&pageNum=${page}&pageSize=10&type=1`,
        headers: {
          'X-Client-Info':
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"1598756938202855600357377"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        // this.datalist = [...this.datalist, ...res.data.data.films]
        // this.total = res.data.data.total
        // console.log(this.datalist)
        store.commit('getNowMutations', res)
        Indicator.close()
      })
    }
  },
  modules: {}
})
