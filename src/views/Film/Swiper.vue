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
  mounted() {
    new Swiper('.filmswiper', {
      loop: true,
      autoplay: 2000,
      pagination: '.swiper-pagination'
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
.film-swiper-pagination {
  text-align: right;
}
.film-swiper-pagination {
  text-align: right;
}
</style>
