<template>
  <div class="content">
    <Header></Header>
    <router-view class="container-main"></router-view>
    <Tabbar v-if="isMainPage"></Tabbar>
  </div>
</template>

<script>
import store from "./store.js";
import Header from "./components/Header.vue";
import Tabbar from "./components/Tabbar.vue";
export default {
  name: "App",
  beforeCreate() {
    store.storage.init();
  },
  data() {
    return {};
  },
  computed: {
    isMainPage() {
      if (
        !this.$route.params.wordbook &&
        this.$route.path != "/home/learn" &&
        this.$route.path != "/user/collect"
      ) {
        return true;
      } else {
        return false;
      }
    }
  },
  components: {
    Header,
    Tabbar
  }
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}

body {
  background-color: whitesmoke;
}

.label {
  font-size: 1rem;
  margin: 8px;
  display: block;
  color: #888;
}
.container-main {
  margin-top: 40px;
}
.mint-button--default {
  background-color: white;
}
</style>
