<template>
  <div class="container-list">
    <mt-search v-model="keyword" cancel-text="取消" placeholder="查询英文或者中文" show>
      <div class="container-wordlist">
        <mt-cell
          v-if="collect"
          v-for="(wordObj,wordObjIndex) in wordlist"
          :key="wordObjIndex"
          :title="wordObj['word']['en']"
          :label="wordObj['word']['zh']"
          v-show="filterWord(wordObj['word'])"
        >
          <mt-button
            size="small"
            plain
            :type="collects[wordObjIndex]? 'default':'primary'"
            @click.native="removeWordCollect(wordObj,wordObjIndex)"
          >{{collects[wordObjIndex]? '取消':'收藏'}}</mt-button>&nbsp
        </mt-cell>
        <mt-cell v-if="!collect" v-show="filterWord({zh:'',en:''})">
          <div slot="title" class="container-progresses">
            <mt-badge
              v-for="i in 4"
              :key="i"
              :type="progressMap[i-1]['type']"
            >{{progressMap[i-1]['text']}} {{progresses[i-1]}}</mt-badge>
          </div>
        </mt-cell>
        <mt-cell
          v-if="!collect"
          v-for="(word,wordIndex) in wordlist"
          :key="wordIndex"
          :title="word['en']"
          :label="word['zh']"
          v-show="filterWord(word)"
        >
          <mt-badge
            :type="getWordProgress(categoryIndex,wordbookIndex,wordIndex,'type')"
            size="small"
          >{{getWordProgress(categoryIndex,wordbookIndex,wordIndex,'text')}}</mt-badge>&nbsp
        </mt-cell>
      </div>
    </mt-search>
  </div>
</template>

<script>
import store from "../store.js";
export default {
  created() {
    this.setCollect();
    this.setWordlist();
    this.setWordbookProgress();
  },
  data() {
    return {
      store,
      collect: false,
      keyword: "",
      categoryIndex: "",
      wordbookIndex: "",
      wordlist: [],
      collects: [],
      progresses: [],
      progressMap: [
        { progress: 0, type: "primary", text: "陌生" },
        { progress: 1, type: "success", text: "认识" },
        { progress: 2, type: "warning", text: "熟悉" },
        { progress: 3, type: "error", text: "太简单" }
      ]
    };
  },
  methods: {
    // 设置 collectFlag
    setCollect() {
      if (this.$route.path == "/user/collect") {
        this.collect = true;
      }
    },
    // 获取单词列表
    setWordlist() {
      if (this.collect) {
        this.wordlist = this.store.action.getCurrentCollect();
        this.collects = new Array(this.wordlist.length).fill(true);
      } else {
        this.categoryIndex = this.$route.params.category;
        this.wordbookIndex = this.$route.params.wordbook;
        this.wordlist = this.store.action.getWordlist(
          this.categoryIndex,
          this.wordbookIndex
        );
      }
    },
    // 将单词移出收藏夹
    removeWordCollect(wordObj, wordObjIndex) {
      let categoryIndex = wordObj["categoryIndex"],
        wordbookIndex = wordObj["wordbookIndex"],
        wordIndex = wordObj["wordIndex"];
      this.store.action.addWordCollect(categoryIndex, wordbookIndex, wordIndex);
      this.collects[wordObjIndex] = !this.collects[wordObjIndex];
      this.$forceUpdate();
    },
    // 获取单词书进度
    setWordbookProgress() {
      if (!this.collect) {
        this.progresses = this.store.action.getWordbookProgress(
          this.categoryIndex,
          this.wordbookIndex
        );
      }
    },
    // 获取单词进度
    getWordProgress(categoryIndex, wordbookIndex, wordIndex, field) {
      return this.progressMap[
        this.store.action.getWordProgress(
          categoryIndex,
          wordbookIndex,
          wordIndex
        )
      ][field];
    },
    // 查找单词
    filterWord(word) {
      return (
        word["en"].includes(this.keyword) || word["zh"].includes(this.keyword)
      );
    }
  }
};
</script>

<style scoped>
.container-list {
  margin-bottom: -55px;
}

.container-wordlist {
  margin-top: 48px;
}

.container-progresses {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
}
</style>
