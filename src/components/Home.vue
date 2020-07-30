<template>
  <div>
    <label class="label">当前单词书</label>
    <mt-cell>
      <Wordbook
        v-if="$route.params.page=='home'"
        slot="title"
        :home="true"
        :categoryIndex="currentWordbook['categoryIndex']"
        :wordbookIndex="currentWordbook['wordbookIndex']"
      ></Wordbook>
    </mt-cell>
    <label class="label">背词数量</label>
    <mt-radio v-model="configCount" :options="['10','15','20','25','30']"></mt-radio>
    <label class="label">抽词模式</label>
    <mt-radio
      v-model="configRandom"
      :options="[
    {label:'随机抽取单词',value:'random'},
    {label:'优先抽取不熟悉单词',value:'prior'}]"
    ></mt-radio>
    <br />
    <mt-button type="primary" size="large" @click.native="toLearn">开始</mt-button>
  </div>
</template>

<script>
import store from "../store.js";
import Wordbook from "./Wordbook.vue";
export default {
  name: "Home",
  created() {
    this.setCurrentWordbook();
  },
  data() {
    return {
      store,
      configCount: "10",
      configRandom: "random",
      currentWordbook: {},
    };
  },
  methods: {
    setCurrentWordbook() {
      this.currentWordbook = this.store.action.getCurrentWordbook();
    },
    toLearn() {
      this.$router.push({
        path: "/home/learn",
        query: {
          count: this.configCount,
          random: this.configRandom,
        },
      });
    },
  },
  watch: {
    $route() {
      this.setCurrentWordbook();
    },
  },
  components: {
    Wordbook,
  },
};
</script>

<style scoped>
</style>
