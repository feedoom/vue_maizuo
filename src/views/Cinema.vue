<template>
  <div class="cinema" :style="mystyle">
    <ul>
      <li v-for="data in datalist" :key="data.cinemaId">
        {{ data.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import BetterScroll from 'better-scroll'
export default {
  data() {
    return {
      datalist: [],
      mystyle: {
        height: '0px'
      }
    }
  },
  mounted() {
    this.mystyle.height = document.documentElement.clientHeight - 50 + 'px'
    this.$http({
      url: 'https://m.maizuo.com/gateway?cityId=440100&ticketFlag=1&k=5175102',
      headers: {
        'X-Client-Info':
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"1598756938202855600357377","bc":"440100"}',
        'X-Host': 'mall.film-ticket.cinema.list'
      }
    }).then(res => {
      this.datalist = res.data.data.cinemas

      this.$nextTick(() => {
        new BetterScroll('.cinema', {
          scrollbar: {
            fade: true,
            interactive: false
          }
        })
      })
    })
  }
}
</script>

<style lang="scss" scoped>
li {
  height: 50px;
}
.cinema {
  height: 500px;
  overflow: hidden;
  position: relative;
}
</style>
