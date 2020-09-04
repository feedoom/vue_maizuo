<template>
  <div class="cinema">
    <div class="title">影院</div>
    <ul>
      <li v-for="data in datalist" :key="data.cinemaId">
        <!-- 地址 -->
        <div class="addressInfo">
          <p class="name">{{ data.name }}</p>
          <p class="address">{{ data.address }}</p>
        </div>
        <!-- 价格 -->
        <p class="price">
          <span style="font-size: 12px;">￥</span>
          <span style="font-size: 15px;">{{
            data.lowPrice | pricefilter
          }}</span>
          <span style="font-size: 12px;"> 起</span>
        </p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      datalist: [],
      mystyle: {
        height: '0px'
      }
    }
  },
  methods: {
    getDataList(id) {
      this.$http({
        url: `https://m.maizuo.com/gateway?cityId=${id}&ticketFlag=1&k=5175102`,
        headers: {
          'X-Client-Info': `{"a":"3000","ch":"1002","v":"5.0.4","e":"1598756938202855600357377","bc":"${id}"}`,
          'X-Host': 'mall.film-ticket.cinema.list'
        }
      }).then(res => {
        this.datalist = res.data.data.cinemas
      })
    }
  },
  mounted() {
    let id = localStorage.getItem('cityId')
    this.getDataList(id)
  },
  filters: {
    pricefilter(data) {
      let str = ''
      data = data + ''
      str =
        data.substring(2) > 0
          ? data.substring(0, 2) + '.' + data.substring(2, 3)
          : data.substring(0, 2)
      return str
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 17px;
  text-align: center;
  line-height: 44px;
  z-index: 99;
  background-color: #fff;
  width: 100%;
  height: 44px;
}
li {
  height: 45px;
  padding: 15px;
  z-index: 0;
  position: relative;
}
.addressInfo {
  width: 65%;
  .name {
    font-size: 15px;
  }
  .address {
    margin-top: 5px;
    font-size: 12px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    color: #797d82;
  }
}
.cinema {
  overflow: hidden;
  position: relative;
}
.price {
  color: #ff5f16;
  position: absolute;
  right: 5%;
  top: 50%;
}
</style>
