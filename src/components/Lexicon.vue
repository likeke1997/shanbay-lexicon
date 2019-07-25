<template>
  <div>
    <mt-navbar v-model="selected">
      <mt-tab-item
        v-for="(category, categoryIndex) in categories"
        :key="categoryIndex"
        :id="'category-'+categoryIndex"
      >{{category}}</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected">
      <mt-tab-container-item
        v-for="(category,categoryIndex) in categories"
        :key="categoryIndex"
        :id="'category-'+categoryIndex"
      >
        <Wordbook
          v-for="(wordbook, wordbookIndex) in wordbooks[categoryIndex]"
          :key="wordbookIndex"
          :categoryIndex="categoryIndex"
          :wordbookIndex="wordbookIndex"
          :current="isCurrentWordbook(categoryIndex, wordbookIndex)"
          @refreshCurrentWordbook="setCurrentWordbook"
        ></Wordbook>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import store from "../store.js";
import Wordbook from "./Wordbook.vue";
export default {
  name: "Lexicon",
  created() {
    this.setCategoreies();
    this.setWordbooks();
    this.setCurrentWordbook();
  },
  data() {
    return {
      store,
      selected: "category-0",
      categories: [],
      wordbooks: [],
      currentWordbook: {}
    };
  },
  methods: {
    setCategoreies() {
      this.categories = this.store.action.getCategories();
    },
    setWordbooks() {
      for (let categoryIndex = 0; categoryIndex < 3; categoryIndex++) {
        this.wordbooks.push(this.store.action.getWordbooks(categoryIndex));
      }
    },
    setCurrentWordbook() {
      this.currentWordbook = this.store.action.getCurrentWordbook();
      this.$forceUpdate();
    },
    isCurrentWordbook(categoryIndex, wordbookIndex) {
      return this.store.action.isCurrentWordbook(categoryIndex, wordbookIndex);
    }
  },
  components: {
    Wordbook
  }
};
</script>

<style scoped>
.tab {
  height: 200px;
}
.mint-button {
  margin: 10px auto;
  padding: 0px;
  width: 45%;
  height: 240px;
}
</style>
