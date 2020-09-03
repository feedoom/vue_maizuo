<template>
  <div
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10"
    infinite-scroll-immediate-check="false"
  >
    <ul>
      <li
        v-for="data in comingList"
        :key="data.filmId"
        @click="handleClick(data.isPresale, data.filmId)"
      >
        <img :src="data.poster" />
        <p class="name">
          {{ data.name }}
          <span class="item">{{ data.item.name }}</span>
        </p>
        <br />
        <p v-if="data.actors">主演：{{ data.actors | actorfilter }}</p>
        <p v-else><br /></p>
        <p>上映日期：{{ data.premiereAt | timefilter }}</p>
        <div class="buy">预购</div>
      </li>
    </ul>
  </div>
</template>

<script>
import { MessageBox } from 'mint-ui'
import { mapState } from 'vuex'

export default {
  data() {
    return {
      loading: false,
      currentPage: 1
    }
  },
  methods: {
    getComingList(page) {
      if (!this.comingListLoad) return null
      this.$store.dispatch('getComingListAction', page)
    },
    loadMore() {
      // 下拉加载
      this.loading = true
      this.currentPage++
      if (this.comingList.length >= this.comingListTotal) {
        return
      }
      this.$store.commit('loadComingList')
      this.getComingList(this.currentPage)
      this.loading = false
    },
    handleClick(data, id) {
      if (!data) {
        MessageBox({
          title: '',
          message: '该影片目前没有排期，到首页看其他电影吧',
          showCancelButton: true
        }).then(res => {
          console.log(res)
          if (res === 'confirm') this.$router.push('/film')
        })
      }
      this.$router.push(`/detail/${id}`)
    }
  },
  mounted() {
    this.getComingList(this.currentPage)
  },
  computed: {
    ...mapState(['comingList', 'comingListTotal', 'comingListLoad'])
  },
  filters: {
    actorfilter(data) {
      return data ? data.map(item => item.name).join(' ') : null
    },
    timefilter(data) {
      let date = new Date(data * 1000)
      let week = {
        0: '周日',
        1: '周一',
        2: '周二',
        3: '周三',
        4: '周四',
        5: '周五',
        6: '周六'
      }
      let timeData = week[date.getDay()] + ' '
      timeData += date.getMonth() + 1 + '月'
      timeData += date.getDate() + '日'
      return timeData
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  li {
    position: relative;
    z-index: 0;
    overflow: hidden;
    margin: 10px 0 10px 10px;
    img {
      float: left;
      margin-right: 8px;
      height: 120px;
    }
    p {
      overflow: hidden;
      text-overflow: ellipsis; //溢出用省略号显示
      white-space: nowrap;
      margin: 6px 6px;
      color: #797d82;
      font-size: 13px;
    }
    .buy {
      position: absolute;
      color: orange;
      border: 1px solid orange;
      width: 35px;
      height: 25px;
      right: 5%;
      top: 12%;
      font-size: 13px;
      line-height: 25px;
      text-align: center;
    }
    .name {
      font-size: 16px;
      color: #191a1b;
      font-size: 16px;
      .item {
        font-size: 9px;
        color: #fff;
        background-color: #d2d6dc;
        height: 14px;
        line-height: 14px;
        padding: 0 2px;
        border-radius: 2px;
      }
    }
  }
}
</style>
