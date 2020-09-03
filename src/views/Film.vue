<template>
  <div>
    <swiper :key="looplist.length" ref="myswiper">
      <div class="swiper-slide" v-for="data in looplist" :key="data.pID">
        <img :src="data.h5pics.highResolutionH" />
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
        url:
          '/gateway/display/v3/static/3f20147482494cbeb5728ad133ad5398/c71f93acb12b48dc827df588c3ab30dd/382cb210acbe44ea886ce55774c0429e'
      }).then(res => {
        // console.log(res.data.body.data.slice(0, 6))
        this.looplist = res.data.body.data.slice(0, 6)
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
