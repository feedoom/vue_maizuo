<template>
  <div>
    <div class="currentCity">当前城市 - {{ currentCity }}</div>
    <mt-index-list ref="mylist">
      <mt-index-section
        :index="data.index"
        v-for="data in datalist"
        :key="data.index"
      >
        <div
          v-for="city in data.list"
          :key="city.cityId"
          @click="handleClick(city.cityId, city.name)"
        >
          <mt-cell :title="city.name"></mt-cell>
        </div>
      </mt-index-section>
    </mt-index-list>
  </div>
</template>
<script>
export default {
  data() {
    return {
      //城市数据
      datalist: [],
      currentCity: ''
    }
  },
  methods: {
    getList() {
      this.$http({
        url: 'https://m.maizuo.com/gateway',
        headers: {
          'X-Client-Info':
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"1598756938202855600357377","bc":"440100"}',
          'X-Host': 'mall.film-ticket.city.list'
        }
      }).then(res => {
        this.datalist = this.handleCity(res.data.data.cities)
        console.log(this.datalist)
      })
    },
    handleCity(datalist) {
      // 城市数据分类
      console.log(datalist)
      let letterArr = []
      for (let i = 65; i < 91; i++) {
        letterArr.push(String.fromCharCode(i))
      }

      let newlist = []
      for (let i = 0; i < letterArr.length; i++) {
        let arr = datalist.filter(
          item => item.pinyin.substring(0, 1) === letterArr[i].toLowerCase()
        )
        if (arr.length > 0) {
          newlist.push({
            index: letterArr[i],
            list: arr
          })
        }
      }
      return newlist
    },
    handleClick(id, name) {
      localStorage.setItem('cityId', id)
      localStorage.setItem('cityName', name)
      this.$store.commit('filmHeaderHidden')
      this.$router.push('/film')
    }
  },
  mounted() {
    this.currentCity = localStorage.getItem('cityName')
    // 处理滚动条bug
    this.$refs.mylist.$el.style.height =
      document.documentElement.clientHeight - 50 + 'px'
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
.currentCity {
  font-size: 17px;
  color: #191a1b;
  text-align: center;
  height: 44px;
  line-height: 44px;
}
</style>
