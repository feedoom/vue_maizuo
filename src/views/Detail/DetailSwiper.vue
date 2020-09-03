<template>
  <div class="swiper-container filmswiper">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <div class="swiper-pagination film-swiper-pagination"></div>
  </div>
</template>

<script>
import Swiper from 'swiper'
import 'swiper/dist/css/swiper.css'

export default {
  props: ['perview', 'myclassname'],
  mounted() {
    new Swiper('.' + this.myclassname, {
      slidesPerView: this.perview,
      spaceBetween: this.myclassname === 'actors' ? 20 : 10,
      freeMode: true
    })
  }
}
</script>

<style lang="scss" scoped>
.swiper-wrapper {
  img {
    width: auto;
    height: auto;
    width: 100%;
    // height: 100%;
  }
}
li,
ol {
  list-style: none;
}
</style>
