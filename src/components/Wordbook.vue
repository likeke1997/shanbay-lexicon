<template>
  <div>
    <div v-if="home" class="container-home">
      <div class="pic">
        <img :src="imgSrc(categoryIndex+1,wordbookIndex+1)" />
      </div>
      <table class="info">
        <th>{{wordbook}}</th>
        <tr>类别：{{category}}</tr>
        <tr>
          <mt-progress :value="progress" :barHeight="4">
            <div slot="start">进度：</div>
            <div slot="end">{{count-countUnknow}} / {{count}}</div>
          </mt-progress>
        </tr>
        <tr class="button">
          <mt-button class="button2" type="primary" size="small" @click.native="toLexicon">切换词书</mt-button>&nbsp
          <mt-button class="button2" type="primary" size="small" @click.native="toWordlist">单词列表</mt-button>
        </tr>
      </table>
    </div>
    <div v-else class="container-lexicon">
      <div class="pic">
        <img :src="imgSrc(categoryIndex+1,wordbookIndex+1)" />
      </div>
      <table class="info">
        <th>{{wordbook}}</th>
        <tr>单词数量：{{count}}</tr>
        <tr>
          <mt-progress :value="progress" :barHeight="4">
            <div slot="start">进度：</div>
            <div slot="end">{{progress}}%</div>
          </mt-progress>
        </tr>
        <tr class="button">
          <mt-button v-if="current" class="button2" disabled plain size="small">已选该书</mt-button>
          <mt-button
            v-else
            class="button2"
            type="primary"
            size="small"
            @click.native="setCurrentWordbook"
          >选择该书</mt-button>&nbsp
          <mt-button class="button2" type="primary" size="small" @click.native="toWordlist">单词列表</mt-button>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
import Store from "../store.js";
export default {
  props: ["categoryIndex", "wordbookIndex", "current", "home"],
  created() {
    this.setCategory();
    this.setWordbook();
    this.setCount();
    this.setProgress();
  },
  data() {
    return {
      store: Store,
      category: "",
      wordbook: "",
      count: "",
      countUnknow: "",
      progress: ""
    };
  },
  methods: {
    imgSrc(i1, i2) {
      return require("../assets/img/wordbook-" + i1 + "-" + i2 + ".png");
    },
    setCategory() {
      this.category = this.store.action.getCategories()[this.categoryIndex];
    },
    setWordbook() {
      this.wordbook = this.store.action.getWordbooks(this.categoryIndex)[
        this.wordbookIndex
      ];
    },
    setCount() {
      this.count = this.store.action.getWordlistLength(
        this.categoryIndex,
        this.wordbookIndex
      );
    },
    setProgress() {
      this.countUnknow = this.store.action.getWordbookProgress(
        this.categoryIndex,
        this.wordbookIndex
      )[0];
      this.progress = Math.round((1 - this.countUnknow / this.count) * 100);
    },
    setCurrentWordbook() {
      this.store.action.setCurrentWordbook(
        this.categoryIndex,
        this.wordbookIndex
      );
      this.$emit(
        "refreshCurrentWordbook",
        this.categoryIndex,
        this.wordbookIndex
      );
    },
    toLexicon() {
      this.$router.push("/lexicon/");
    },
    toWordlist() {
      this.$router.push(
        "/lexicon/" + this.categoryIndex + "/" + this.wordbookIndex
      );
    }
  }
};
</script>

<style scoped>
.container-home {
  position: relative;
  width: 100%;
  height: 150px;
  background-color: white;
  margin: 12px auto 12px auto;
}

.container-lexicon {
  position: relative;
  width: 90%;
  height: 150px;
  background-color: white;
  margin: 12px auto 12px auto;
  border: 1px solid lightgray;
  border-radius: 5px;
}

.pic {
  position: absolute;
  width: 100px;
  height: 150px;
  text-align: center;
  overflow-x: hidden;
}

.pic img {
  position: absolute;
  height: 100%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.info {
  position: absolute;
  left: 110px;
  width: calc(100% - 120px);
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

tr.button {
  text-align: center;
}

.button1 {
  width: 100%;
}

.button2 {
  width: 45%;
}
</style>
