<template>
  <div
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10"
    infinite-scroll-immediate-check="false"
  >
    <ul>
      <li
        v-for="data in nowList"
        :key="data.filmId"
        @click="handleChangePage(data.filmId)"
      >
        <img :src="data.poster" />
        <p class="name">
          {{ data.name }}
          <span class="item">{{ data.item.name }}</span>
        </p>
        <p v-if="data.grade">
          观众评分
          <span class="grade">
            {{ data.grade }}
          </span>
        </p>
        <p v-else><br /></p>
        <p>主演：{{ data.actors | actorfilter }}</p>
        <p>{{ data.nation }} | {{ data.runtime }}分钟</p>
        <div class="buy">购票</div>
      </li>
    </ul>
  </div>
</template>

<script>
// import { Indicator } from 'mint-ui'
// import { MessageBox } from 'mint-ui'
import { mapState } from 'vuex'
export default {
  data() {
    return {
      // datalist: [],
      // total: 0,
      loading: false,
      currentPage: 1
    }
  },
  methods: {
    getDatalist(page) {
      if (!this.nowListLoad) return null
      this.$store.dispatch('getNowListAction', page)
    },
    handleChangePage(id) {
      // console.log(id)
      this.$router.push(`/detail/${id}`)
    },
    loadMore() {
      this.loading = true
      this.currentPage++
      if (this.nowList.length >= this.nowListTotal) {
        return
      }
      this.$store.commit('loadNowList')
      this.getDatalist(this.currentPage)
      this.loading = false
    }
  },
  mounted() {
    this.getDatalist(this.currentPage)
  },
  computed: {
    ...mapState(['nowList', 'nowListTotal', 'nowListLoad'])
  },
  filters: {
    actorfilter(data) {
      return data.map(item => item.name).join(' ')
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
      text-overflow: ellipsis;
      white-space: nowrap;
      margin: 6px 6px;
      color: #797d82;
      font-size: 13px;
    }
    .buy {
      position: absolute;
      right: 5%;
      top: 12%;
      color: orange;
      border: 1px solid orange;
      width: 35px;
      height: 25px;
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
    .grade {
      color: #ffb232;
      font-size: 14px;
    }
  }
}
</style>
