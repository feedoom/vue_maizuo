<template>
  <nav>
    <ul>
      <router-link tag="li" activeClass="myactive" to="/film">
        <i class="iconfont icon-dianying2"></i>
        <p>电影</p>
      </router-link>
      <router-link tag="li" activeClass="myactive" to="/cinema">
        <i class="iconfont icon-yingyuan1"></i>
        <p>影院</p>
      </router-link>
      <router-link tag="li" activeClass="myactive" to="/center">
        <i class="iconfont icon-wode"></i>
        <p>我的</p>
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
  // height: 50px;
  background-color: white;
  ul {
    display: flex;

    .iconfont {
      font-size: 20px;
    }
    li {
      flex: 1;
      // line-height: 50px;
      text-align: center;
      margin: 3px 3px;
      p {
        font-size: 10px;
        color: #797d82;
      }
    }
  }
}
</style>
