<template>
  <div>
    <swiper :key="looplist.length" ref="myswiper" class="loopswiper">
      <div class="swiper-slide" v-for="data in looplist" :key="data.filmId">
        <img :src="data.poster" class="poster" />
      </div>
    </swiper>

    <filmheader :class="isfixed ? 'fixed' : ''"></filmheader>
    <router-view></router-view>
  </div>
</template>

<script>
import swiper from '@/views/Film/Swiper'
import filmheader from '@/views/Film/FilmHeader'
export default {
  data() {
    return {
      looplist: [],
      isfixed: false
    }
  },
  components: {
    swiper,
    filmheader
  },
  methods: {
    getLooplist() {
      this.$http({
        url: `https://m.maizuo.com/gateway?cityId=440100&pageNum=1&pageSize=10&type=1`,
        headers: {
          'X-Client-Info':
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"1598756938202855600357377","bc":"440100"}',
          'X-Host': 'mall.film-ticket.film.list'
        }
      }).then(res => {
        console.log(res.data.data.films.slice(0, 6))
        this.looplist = res.data.data.films.slice(0, 6)
      })
    },
    handleScroll() {
      if (
        document.documentElement.scrollTop >=
        this.$refs.myswiper.$el.offsetHeight
      ) {
        this.isfixed = true
      } else {
        this.isfixed = false
      }
    }
  },
  mounted() {
    this.getLooplist()
    window.onscroll = this.handleScroll
  },

  beforeDestroy() {
    window.onscroll = null
  }
}
</script>

<style lang="scss" scoped>
.loopswiper {
  width: 360px;
  height: 202px;
}
</style>
