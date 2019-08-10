<template>
  <div>
    <div class="container-header">
      <h1>第 {{order+1}} / {{configCount}} 题</h1>
      <h3>
        <mt-badge type="success">正确 {{countRight}}</mt-badge>&nbsp
        <mt-badge type="error">错误 {{countWrong}}</mt-badge>&nbsp
        <mt-badge type="warning">跳过 {{Math.max(order-countRight-countWrong,0)}}</mt-badge>
      </h3>
    </div>
    <div class="container-question">
      <h2>{{questions[order][langQuestions]}}</h2>
    </div>
    <div class="container-options">
      <mt-button
        v-for="i in 4"
        :key="i"
        :ref="'option-'+i"
        type="primary"
        @click.native="isRightOption(i-1)? goAhead('right',i): goAhead('wrong',i)"
      >{{options[i-1][langOptions]}}</mt-button>
    </div>
    <div class="container-button">
      <mt-button @click.native="goAhead('pass')">跳过</mt-button>
      <mt-button @click.native="goAhead('easy')">太简单</mt-button>
      <mt-button @click.native="goAhead('collect')">收藏</mt-button>
    </div>
  </div>
</template>

<script>
import store from "../store.js";
import { Toast } from "mint-ui";
import { setTimeout } from "timers";
export default {
  name: "Learn",
  created() {
    this.setConfig();
    this.setQuestions();
    this.goAhead();
  },
  data() {
    return {
      store,
      configCount: "",
      configRandom: "",
      categoryIndex: "",
      wordbookIndex: "",
      questions: [],
      options: ["", "", "", ""],
      langQuestions: "",
      langOptions: "",
      countRight: 0,
      countWrong: 0,
      order: -1
    };
  },
  methods: {
    setConfig() {
      let config = this.$route.query;
      this.configCount = config["count"];
      this.configRandom = config["random"];
    },
    setQuestions() {
      let currentWordbook = store.action.getCurrentWordbook(),
        categoryIndex = currentWordbook["categoryIndex"],
        wordbookIndex = currentWordbook["wordbookIndex"],
        wordlist = store.action.getWordlist(categoryIndex, wordbookIndex),
        wordlistLength = wordlist.length;
      function createRandomWords(
        indexes,
        count,
        length,
        random,
        getWordProgress
      ) {
        let index = Math.floor(Math.random() * length);
        if (!indexes.includes(index)) {
          if (random == "prior") {
            let progress = getWordProgress(categoryIndex, wordbookIndex, index);
            if (Math.random() < 1 / progress) {
              indexes.push(index);
            }
          } else {
            indexes.push(index);
          }
        }
        return indexes.length == count
          ? indexes
          : createRandomWords(indexes, count, length, random, getWordProgress);
      }
      let indexes = createRandomWords(
          [],
          this.configCount,
          wordlistLength,
          this.configRandom,
          this.store.action.getWordProgress
        ),
        questions = [];
      for (let i in indexes) {
        let index = indexes[i];
        questions.push({
          index,
          en: wordlist[index]["en"],
          zh: wordlist[index]["zh"]
        });
      }
      this.categoryIndex = categoryIndex;
      this.wordbookIndex = wordbookIndex;
      this.questions = questions;
    },
    goAhead(condition, option) {
      let ref;
      if (option) {
        ref = this.$refs["option-" + option][0];
      }
      switch (condition) {
        case "pass":
          this.goAhead2();
          break;
        case "easy":
          this.store.action.addWordProgress(
            this.categoryIndex,
            this.wordbookIndex,
            this.questions[this.order]["index"],
            3
          );
          this.goAhead2();
          break;
        case "collect":
          if (
            this.store.action.isWordCollect(
              this.categoryIndex,
              this.wordbookIndex,
              this.questions[this.order]["index"]
            )
          ) {
            Toast({
              message: `该单词已在收藏夹中`,
              position: "bottom",
              duration: 2000
            });
          } else {
            this.store.action.addWordCollect(
              this.categoryIndex,
              this.wordbookIndex,
              this.questions[this.order]["index"]
            );
          }
          break;
        case "right":
          this.countRight += 1;
          this.store.action.addWordProgress(
            this.categoryIndex,
            this.wordbookIndex,
            this.questions[this.order]["index"],
            1
          );
          ref.$el.style.backgroundColor = "rgb(76,175,80)";
          var that = this;
          setTimeout(function() {
            ref.$el.style.backgroundColor = "rgb(38,162,255)";
            that.goAhead2();
          }, 500);

          break;
        case "wrong":
          this.countWrong += 1;
          ref.$el.style.backgroundColor = "rgb(244,64,54)";
          var that = this;
          setTimeout(function() {
            ref.$el.style.backgroundColor = "rgb(38,162,255)";
            that.goAhead2();
          }, 500);
          break;
        default:
          this.goAhead2();
          break;
      }
    },
    goAhead2() {
      this.order += 1;
      if (this.order < this.configCount) {
        this.setOptions();
      } else {
        Toast({
          message: `背词完成，正确${this.countRight}，错误${this.countWrong}。请继续加油~`,
          position: "middle",
          duration: 5000
        });
        this.$router.push("/");
      }
    },
    setOptions() {
      function createRandomOptions(indexes, count, length, order) {
        let index = Math.floor(Math.random() * length);
        if (!indexes.includes(index) && index != order) {
          indexes.push(index);
        }
        return indexes.length == count
          ? indexes
          : createRandomOptions(indexes, count, length, order);
      }
      let indexes = createRandomOptions([], 4, this.configCount, this.order),
        options = [];
      for (let i in indexes) {
        let index = indexes[i];
        options.push({
          index,
          en: this.questions[index]["en"],
          zh: this.questions[index]["zh"]
        });
      }
      let rightIndex = Math.floor(Math.random() * 4);
      options[rightIndex]["index"] = this.questions[this.order]["index"];
      options[rightIndex]["en"] = this.questions[this.order]["en"];
      options[rightIndex]["zh"] = this.questions[this.order]["zh"];
      this.options = options;
      if (Math.floor(Math.random() * 2) == 1) {
        this.langQuestions = "en";
        this.langOptions = "zh";
      } else {
        this.langQuestions = "zh";
        this.langOptions = "en";
      }
    },
    isRightOption(optionIndex) {
      return this.options[optionIndex]["index"] ==
        this.questions[this.order]["index"]
        ? true
        : false;
    }
  }
};
</script>

<style scoped>
/*
div {
  border: 1px solid white;
}
*/
.container-header {
  width: 90%;
  height: 10vh;
  margin: 10vh auto 0 auto;
}

.container-question {
  width: 90%;
  height: 25vh;
  margin: auto;
  text-align: center;
  background-color: white;
  border: 1px solid lightgray;
  border-radius: 5px;
}

.container-question h2 {
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.container-options {
  width: 90%;
  height: 40vh;
  margin: auto;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.container-options .mint-button {
  height: 8vh;
  transition: 0.25s;
}

.container-button {
  width: 90%;
  height: 8vh;
  margin: auto;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.container-button .mint-button {
  width: 30%;
  height: 5vh;
}
</style>
