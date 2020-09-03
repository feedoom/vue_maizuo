<template>
  <div>
    <mt-index-list ref="mylist">
      <mt-index-section index="A">
        <mt-cell title="Aaron"></mt-cell>
        <mt-cell title="Alden"></mt-cell>
        <mt-cell title="Austin"></mt-cell>
      </mt-index-section>
      <mt-index-section index="B">
        <mt-cell title="Baldwin"></mt-cell>
        <mt-cell title="Braden"></mt-cell>
      </mt-index-section>
      ...
      <mt-index-section index="Z">
        <mt-cell title="Zack"></mt-cell>
        <mt-cell title="Zane"></mt-cell>
      </mt-index-section>
    </mt-index-list>
  </div>
</template>
<script>
export default {
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
        console.log(res.data.data)
      })
    }
  },
  mounted() {
    this.$refs.mylist.$el.style.height =
      document.documentElement.clientHeight - 50 + 'px'
    this.getList()
  }
}
</script>
<style lang="scss" scoped></style>
