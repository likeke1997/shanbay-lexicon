<template>
  <div>
    <mt-tab-container v-model="page" swipeable>
      <mt-tab-container-item id="home">
        <Home></Home>
      </mt-tab-container-item>
      <mt-tab-container-item id="lexicon">
        <Lexicon></Lexicon>
      </mt-tab-container-item>
      <mt-tab-container-item id="user">
        <User></User>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import Home from "./Home.vue";
import Lexicon from "./Lexicon.vue";
import User from "./User.vue";
export default {
  name: "Main",
  created() {
    this.setPage();
  },
  data() {
    return {
      page: "home"
    };
  },
  components: {
    Home,
    Lexicon,
    User
  },
  methods: {
    setPage() {
      this.page = this.$route.params.page;
    },
    changePage() {
      this.$router.push("/" + this.page);
    }
  },
  watch: {
    $route() {
      this.setPage();
    },
    page() {
      this.changePage();
    }
  }
};
</script>

<style scoped>
</style>
