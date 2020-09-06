<template>
  <div v-if="filminfo" class="main">
    <div class="goBack" @click="handleGOBack">
      <img
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAt1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////////97e3saGxyIiYnW1tYdHh9UVVUpKiulpaXLy8s6OzyysrIiIyPx8fEeHyC/v7/5+fklJihCQ0Ntb28bHB1hYWKXl5c0NTZLS0xAQUI4ODk3ODjh4eHr6+s2Nzfq6uptbm5gYGIbHB39/f2VlZdLS0wzNDUZGhs8UYRWAAAAPHRSTlMAGHpLE3cKgEdgVnJfNBZ+cBx9A28js/6sjPvK7p+Q3pn1g/iUgfLYuvzCpeTR2eHiiIXihrvD/YCl0uTUXbEtAAABd0lEQVRIx91W13KDQAw0xnCHARuDe+/dKY7T9f/flTzghCLdMaMXj/eRnZ0T0qqUSveBim96gRWGVuCZfqW4zpCuSMGVRiFhwxEInIY+0qogUFXHHcm6IFGXEa20HaGEY1PKWlNo0KzhylZZaFFuoW8WUP5qkXdtMtrnx4dkzLn/jcgMXY7wlMpVNs+SUs4nMOylvsiME6h6rjawHmfqm/YG6aETzJY5X6V8SykHsJjmvyb9TOVoD/0R5qpElxHKLewOKGHo0tuGThdn/pPsony3A20iHPevMih92MGW9OO1Pj5Gjvqwp63sx1IT4aYLGCi6wIylXp5azuCkaiAvlgY5ZryGzUolDWKplSV6Q5jMlW1rxdIwS7zA8azu+JCWfl+KSRkBM9KEF+fro0BxGJagjPimNyJp/1et/RlNx2l1esC8f2oGDGOscYYpY4RzFgdjXSmW5Fm3JBmrmXMQcM4QzvHDObk4hx7nvGQdtaxTmnXA3zR+AH8JUdNL967cAAAAAElFTkSuQmCC"
        alt=""
      />
    </div>
    <img :src="filminfo.poster" class="poster" />
    <div class="film-detail">
      <div class="col">
        <!-- 电影名 -->
        <div class="film-name">
          <span class="name">
            {{ filminfo.name }}
          </span>
          <span class="item">
            {{ filminfo.item.name }}
          </span>
        </div>
        <!-- 评分 -->
        <div class="film-grade" v-if="filminfo.grade">
          <span class="grade">
            {{ filminfo.grade }}
          </span>
          <span class="grade-text">分</span>
        </div>
      </div>

      <!-- 种类 -->
      <div class="film-category grey-text">
        {{ filminfo.category | categoryfilter }}
      </div>

      <!-- 上映时间 -->
      <div class="film-premiere-time grey-text" v-if="filminfo.premiereAt">
        {{ filminfo.premiereAt | timefilter }}上映
      </div>

      <!-- 上映地区，电影时长 -->
      <div class="film-nation-runtime grey-text">
        {{ filminfo.nation }} | {{ filminfo.runtime }}分钟
      </div>

      <!-- 电影简介 -->
      <div class="synopsis grey-text">
        {{ filminfo.synopsis }}
      </div>
    </div>

    <div class="actors">
      <div class="actors-title-bar">
        演职人员
      </div>
      <swiper perview="4" class="actorsswiper" myclassname="actorsswiper">
        <div
          class="swiper-slide"
          v-for="data in filminfo.actors"
          :key="data.filmId"
        >
          <img :src="data.avatarAddress" />
          <p class="actors-name">{{ data.name }}</p>
          <p class="actors-role">{{ data.role }}</p>
        </div>
      </swiper>
    </div>

    <!-- 剧照 -->
    <div class="photos">
      <div class="photos-title-bar">
        剧照
      </div>

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

    <!-- 选票 -->
    <div class="goSchedule">选座购票</div>
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
    },
    handleGOBack() {
      window.history.back()
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
  filters: {
    timefilter(data) {
      let date = new Date(data * 1000)
      // let week = {
      //   0: '周日',
      //   1: '周一',
      //   2: '周二',
      //   3: '周三',
      //   4: '周四',
      //   5: '周五',
      //   6: '周六'
      // }
      let year = date.getFullYear()
      let month = '.' + 0 + (date.getMonth() + 1)
      let day = '.' + 0 + date.getDate()
      if (date.getMonth() >= 9) {
        month = month.slice(2)
      } else {
        month = month.slice(1)
      }
      if (date.getDate() >= 10) {
        day = day.slice(2)
      } else {
        day = day.slice(1)
      }
      let timeData = year + '-' + month + '-' + day
      return timeData
    },
    categoryfilter(data) {
      return data.split('|').join(' | ')
    }
  },
  components: {
    swiper
  }
}
</script>

<style lang="scss" scoped>
.goBack {
  height: 30px;
  position: absolute;
  top: 5px;
  left: 5px;
  img {
    width: 30px;
  }
}
.main {
  background-color: #f4f4f4;
}
.poster {
  width: 360px;
  height: 202px;
  object-fit: cover;
}
.grey-text {
  color: #797d82;
  font-size: 13px;
  margin-top: 4px;
}
.poster {
  width: auto;
  // height: 200px;
  width: 100%;
}
.film-detail {
  padding: 15px;
  padding-top: 12px;
  background-color: #fff;
  .col {
    position: relative;
    .film-grade {
      position: absolute;
      right: 5%;
      top: 5%;
    }
    .name {
      color: #191a1b;
      font-size: 18px;
      height: 24px;
      line-height: 24px;
      margin-right: 7px;
    }
    .item {
      font-size: 9px;
      color: #fff;
      background-color: #d2d6dc;
      height: 14px;
      // position: absolute;
      // left: 45%;
      // top: 25%;
      line-height: 14px;
      padding: 0 2px;
      border-radius: 2px;
      display: inline-block;
    }
    .grade {
      font-size: 18px;
      text-align: right;
      color: #ffb232;
      font-style: italic;
    }
    .grade-text {
      font-size: 10px;
      text-align: right;
      color: #ffb232;
    }
  }
  .synopsis {
    margin-top: 12px;
    height: 38px;
    overflow: hidden;
  }
  .film-category {
    margin-top: 4px;
    font-size: 13px;
  }
}
.actors {
  margin-top: 10px;
  padding-bottom: 10px;
  background-color: #fff;
  .actors-title-bar {
    width: 100%;
    padding: 15px;
  }
  img {
    width: 82px;
    height: 108px;
    object-fit: cover;
  }
  .actorsswiper {
    margin: 0;
    padding-left: 15px;
    padding-right: 15px;
    .actors-name {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      padding-top: 10px;
      font-size: 12px;
      color: #191a1b;
      width: 85px;
      height: 18px;
      text-align: center;
    }
    .actors-role {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
      width: 85px;
      height: 18px;
      font-size: 10px;
      color: #797d82;
    }
  }
}
.photos {
  margin-top: 10px;
  padding-bottom: 10px;
  background-color: #fff;
  .photos-title-bar {
    width: 100%;
    padding: 15px;
  }
  .photosswiper {
    padding-left: 5px;
  }
  img {
    width: 113px;
    height: 76px;
    object-fit: cover;
    margin: 5px;
  }
}
.goSchedule {
  margin-top: 15px;
  height: 49px;
  width: 100%;
  text-align: center;
  background-color: #ff5f16;
  color: #fff;
  font-size: 16px;
  line-height: 49px;
}
</style>
