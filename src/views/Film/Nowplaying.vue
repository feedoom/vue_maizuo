<template>
  <div
    v-infinite-scroll="loadMore"
    infinite-scroll-disabled="loading"
    infinite-scroll-distance="10"
    infinite-scroll-immediate-check="false"
  >
    <ul>
      <li
        v-for="data in datalist"
        :key="data.filmId"
        @click="handleChangePage(data.filmId)"
      >
        <img :src="data.poster" />
        <h3>{{ data.name }}</h3>
        <p>观众评分{{ data.grade }}</p>
        <p>主演：{{ data.actors | actorfilter }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
export default {
  data() {
    return {
      datalist: [],
      loading: false,
      currentPage: 1,
      total: 0
    }
  },
  methods: {
    getDatalist() {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      })
      this.$http({
        url: `https://m.maizuo.com/gateway?cityId=440100&pageNum=${this.currentPage}&pageSize=10&type=1`,
        headers: {
          'X-Client-Info':
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"1598756938202855600357377"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        this.datalist = [...this.datalist, ...res.data.data.films]
        this.total = res.data.data.total
        // console.log(this.datalist)
        Indicator.close()
      })
    },
    handleChangePage(id) {
      // console.log(id)
      this.$router.push(`/detail/${id}`)
    },
    loadMore() {
      this.loading = true
      this.currentPage++
      if (this.datalist.length === this.total) {
        return
      }
      this.getDatalist()
      this.loading = false
    }
  },
  mounted() {
    this.getDatalist()
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
    overflow: hidden;
    img {
      float: left;
    }
  }
}
</style>
