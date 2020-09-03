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
        <h3>{{ data.name }}</h3>
        <p>主演：{{ data.actors | actorfilter }}</p>
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
      this.$store.commit('loadPage')
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
    }
  }
}
</script>

<style lang="scss" scoped>
ul {
  li {
    overflow: hidden;
    img {
      float: left;
    }
  }
}
</style>
