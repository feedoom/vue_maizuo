<template>
  <nav>
    <ul>
      <router-link tag="li" activeClass="myactive" to="/film">
        <i class="iconfont icon-set"></i>
        电影
      </router-link>
      <router-link tag="li" activeClass="myactive" to="/cinema">
        <i class="iconfont icon-set"></i>
        影院
      </router-link>
      <router-link tag="li" activeClass="myactive" to="/center">
        <i class="iconfont icon-set"></i>
        我的
      </router-link>
    </ul>
  </nav>
</template>

<style lang="scss">
.myactive {
  color: red;
}
nav {
  z-index: 1;
  position: fixed;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 50px;
  background-color: white;
  ul {
    display: flex;
    li {
      flex: 1;
      line-height: 50px;
      text-align: center;
    }
  }
}
</style>
