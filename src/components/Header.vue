<template>
  <div>
    <mt-header fixed :title="title">
      <mt-button v-show="!isMainPage" icon="back" slot="left" @click.native="toBack">返回</mt-button>
    </mt-header>
  </div>
</template>

<script>
import store from "../store.js";
export default {
  name: "Header",
  data() {
    return {
      store,
      title: "主页",
      titleMap: {
        "/home": "主页",
        "/lexicon": "单词书",
        "/user": "我的",
        "/home/learn": "背词",
      },
    };
  },
  methods: {
    toBack() {
      this.$router.go(-1);
    },
    changeTitle(to) {
      let title = "";
      if (to.params.wordbook) {
        title = this.store.action.getWordbooks(to.params.category)[
          to.params.wordbook
        ];
      } else if (to.path == "/home/learn") {
        title = `背词`;
      } else if (to.path == "/user/collect") {
        title = "收藏";
      } else {
        title = this.titleMap[to.path];
      }
      this.title = title;
    },
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
    },
  },
  watch: {
    $route(to) {
      this.changeTitle(to);
    },
  },
};
</script>

<style scoped>
</style>

