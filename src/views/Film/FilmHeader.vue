<template>
  <div class="main">
    <div class="header" v-show="isFilmHeaderShow">
      <span class="city" @click="handleCity">
        {{ cityName }}

        <i class="iconfont icon-arrow-down"></i>
      </span>
      <div class="title">
        电影
      </div>
    </div>
    <ul>
      <router-link to="/film/nowplaying" tag="li" activeClass="active"
        >正在热映</router-link
      >
      <router-link to="/film/comingsoon" tag="li" activeClass="active"
        >即将上映</router-link
      >
    </ul>
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      cityName: ''
    }
  },
  methods: {
    handleCity() {
      this.$router.push('/city')
    }
  },
  mounted() {
    this.cityName = localStorage.getItem('cityName')
  },
  computed: {
    ...mapState(['isFilmHeaderShow'])
  }
}
</script>

<style lang="scss" scoped>
.main {
  z-index: 2;
}
.header {
  margin-top: 10px;
  margin-bottom: 2px;
  // height: 44px;
  // line-height: 44px;
  text-align: center;
  // padding-bottom: 5px;
  .title {
    text-align: center;
    font-size: 17px;
    color: #191a1b;
  }
  .city {
    position: absolute;
    left: 15px;
    top: 15px;
    font-size: 13px;
    .icon-arrow-down {
      position: absolute;
      // left: 30px;
      left: 110%;
      // top: 3px;
      top: 20%;
      font-size: 5px;
    }
  }
}
ul {
  display: flex;
  li {
    flex: 1;
    height: 40px;
    line-height: 40px;
    text-align: center;
    background: white;
  }
}

.active {
  color: red;
  border-bottom: 2px solid red;
}

.fixed {
  position: fixed;
  left: 0px;
  top: 0px;
  width: 100%;
  height: 40px;
  background: white;
}
</style>
