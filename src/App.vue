<template>
  <div>
    <tabbar v-show="isTabbarShow"></tabbar>
    <section>
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
