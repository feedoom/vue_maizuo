<template>
  <div>
    <tabbar v-show="isTabbarShow" ref="tabbar"></tabbar>
    <section ref="mainRouter">
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import tabbar from '@/components/Tabbar'
import { mapState } from 'vuex'
export default {
  data() {
    return {}
  },
  methods: {},
  created() {
    localStorage.setItem('cityId', 440100)
    localStorage.setItem('cityName', '广州')
  },
  mounted() {
    // console.log(1)
    // // this.$refs.mainRouter.style.height = 1000 + 'px'
    // // this.$refs.mainRouter.offsetHeight -= 38
    // let tabHeight = this.$refs.tabbar.$el.offsetHeight
    // let routerHeight = this.$refs.mainRouter.offsetHeight
    // console.log(tabHeight, routerHeight)
    // this.$refs.mainRouter.style.height = routerHeight - tabHeight + 'px'
    // // console.log(this.$refs.tabbar.$el.offsetHeight)
    // // console.log(this.$refs.mainRouter.offsetHeight)
    // console.log(1)
  },
  computed: {
    ...mapState(['isTabbarShow'])
  },
  components: {
    tabbar
  }
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html {
  height: 100%;
}
li {
  list-style: none;
}
</style>
