<template>
  <div>
    <mt-tabbar fixed v-model="page">
      <mt-tab-item v-for="item in items" :key="item.id" :id="item.id">
        <img slot="icon" :src="iconSrc(item.id)" />
        {{item.text}}
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>

<script>
export default {
  name: "Tabbar",
  created() {
    this.setPage();
  },
  data() {
    return {
      page: "home",
      items: [
        { id: "home", text: "主页" },
        { id: "lexicon", text: "单词书" },
        { id: "user", text: "我的" },
      ],
    };
  },
  methods: {
    iconSrc(name) {
      return require("@/assets/img/icon-" + name + ".png");
    },
    setPage() {
      this.page = this.$route.params.page;
    },
    changePage() {
      this.$router.push("/" + this.page);
    },
  },
  watch: {
    $route() {
      this.setPage();
    },
    page() {
      this.changePage();
    },
  },
};
</script>

<style scoped>
</style>
