<template>
  <div v-if="filminfo">
    <img :src="filminfo.poster" class="poster" />
    <h2>{{ filminfo.name }}</h2>

    <h3>演职人员</h3>
    <swiper perview="4" class="actorsswiper" myclassname="actorsswiper">
      <div
        class="swiper-slide"
        v-for="data in filminfo.actors"
        :key="data.filmId"
      >
        <img :src="data.avatarAddress" />
        <p>{{ data.name }}</p>
      </div>
    </swiper>

    <h3>剧照</h3>
    <swiper perview="3" class="photosswiper" myclassname="photosswiper">
      <div
        class="swiper-slide"
        v-for="(data, index) in filminfo.photos"
        :key="index"
      >
        <img :src="data" />
      </div>
    </swiper>
  </div>
</template>

<script>
import swiper from '@/views/Detail/DetailSwiper'
export default {
  props: ['id'],
  data() {
    return {
      filminfo: null
    }
  },
  methods: {
    getFilmInfo() {
      this.$http({
        url: `https://m.maizuo.com/gateway?filmId=${this.id}&k=236842`,
        headers: {
          'X-Client-Info':
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"1598756938202855600357377","bc":"440100"}',
          'X-Host': 'mall.film-ticket.film.info'
        }
      }).then(res => {
        console.log(res.data)
        this.filminfo = res.data.data.film
      })
    }
  },
  beforeMount() {
    // this.$store.state.isTabbarShow = false
    this.$store.commit('HideMaizuoTabbar', false)
  },
  mounted() {
    this.getFilmInfo()
  },
  beforeDestroy() {
    // this.$store.state.isTabbarShow = true
    this.$store.commit('HideMaizuoTabbar', true)
  },
  components: {
    swiper
  }
}
</script>

<style lang="scss" scoped>
.poster {
  width: 100%;
}
</style>
