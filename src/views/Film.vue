<template>
  <div>
    <!-- 首页轮播图 -->
    <swiper :key="looplist.length" ref="myswiper" class="loopswiper">
      <div class="swiper-slide" v-for="data in looplist" :key="data.filmId">
        <img :src="data.poster" class="poster" />
      </div>
    </swiper>

    <!-- <filmheaderCity v-show="isfixed"></filmheaderCity> -->
    <filmheader :class="isfixed ? 'fixed' : ''"></filmheader>
    <router-view></router-view>
  </div>
</template>

<script>
import swiper from '@/views/Film/Swiper'
import filmheader from '@/views/Film/FilmHeader'
// import filmheaderCity from '@/views/Film/FilmHeaderCity'
// import { log } from 'util'
export default {
  data() {
    return {
      looplist: [],
      isfixed: false
    }
  },
  methods: {
    getLooplist(id) {
      this.$http({
        url: `https://m.maizuo.com/gateway?cityId=${id}&pageNum=1&pageSize=10&type=1`,
        headers: {
          'X-Client-Info':
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"1598756938202855600357377","bc":"440100"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        // console.log(res.data.data.films.slice(0, 6))
        this.looplist = res.data.data.films.slice(0, 6)
      })
    },
    handleScroll() {
      if (
        document.documentElement.scrollTop >=
        this.$refs.myswiper.$el.offsetHeight
      ) {
        this.isfixed = true
        this.$store.commit('filmHeaderShow')
      } else {
        this.isfixed = false
        this.$store.commit('filmHeaderHidden')
      }
    }
  },
  mounted() {
    let id = window.localStorage.getItem('cityId')
    this.getLooplist(id)
    window.onscroll = this.handleScroll
    this.$store.commit('filmHeaderHidden')
  },
  beforeDestroy() {
    window.onscroll = null
  },
  components: {
    swiper,
    filmheader
    // filmheaderCity
  }
}
</script>

<style lang="scss" scoped>
.loopswiper {
  // width: 360px;
  width: 100%;
  height: 202px;
}
</style>
