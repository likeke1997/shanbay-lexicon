import Data from "./assets/data/Data.json";
import Words from "./assets/data/Words.json";

// store
// |--storage
// |--action

// localStorage 相关的直接操作
const storage = {
  init() {
    if (!this.load("loaded")) {
      this.save("loaded", "yes");
      Data.forEach((value) => this.save(value["name"], value["default"]));
    }
  },
  load(field) {
    return JSON.parse(localStorage.getItem(field));
  },
  save(field, data) {
    localStorage.setItem(field, JSON.stringify(data));
  },
  remove(field) {
    localStorage.removeItem(field);
  },
  clear() {
    localStorage.clear();
  },
};

// 其他操作
const action = {
  // 获取各目录名称
  getCategories() {
    let categories = [];
    Words.forEach((value) => categories.push(value["category"]));
    return categories;
  },
  // 获取指定目录的各单词书名称
  getWordbooks(categoryIndex) {
    let wordbooks = [];
    Words[categoryIndex]["wordbooks"].forEach((value) =>
      wordbooks.push(value["title"])
    );
    return wordbooks;
  },
  // 获取指定目录、指定单词书的单词列表
  getWordlist(categoryIndex, wordbookIndex) {
    let wordlist = Words[categoryIndex]["wordbooks"][wordbookIndex]["words"];
    return wordlist;
  },
  // 获取指定目录、指定单词书的单词列表长度
  getWordlistLength(categoryIndex, wordbookIndex) {
    let wordlilstLength = this.getWordlist(categoryIndex, wordbookIndex).length;
    return wordlilstLength;
  },
  // 获取当前选择的单词书
  getCurrentWordbook() {
    let currentWordbook = storage.load("currentWordbook");
    return currentWordbook;
  },
  // 判断指定目录、指定单词书是否为当前选择的单词书
  isCurrentWordbook(categoryIndex, wordbookIndex) {
    let currentWordbook = this.getCurrentWordbook(),
      currentCategoryIndex = currentWordbook["categoryIndex"],
      currentWordbookIndex = currentWordbook["wordbookIndex"];
    return currentCategoryIndex == categoryIndex &&
      currentWordbookIndex == wordbookIndex
      ? true
      : false;
  },
  // 设置当前选择的单词书
  setCurrentWordbook(categoryIndex, wordbookIndex) {
    storage.save("currentWordbook", {
      categoryIndex,
      wordbookIndex,
    });
  },
  // 获取指定目录、指定单词书的进度分布 [num1, num2, num3, num4]
  getWordbookProgress(categoryIndex, wordbookIndex) {
    let currentProgress = storage.load("currentProgress"),
      wordbookProgress = new Array(4).fill(0),
      wordbookCount = this.getWordlistLength(categoryIndex, wordbookIndex);
    for (let key in currentProgress) {
      let arrKey = key.split("-"),
        categoryKey = arrKey[0],
        wordbookKey = arrKey[1],
        progress = currentProgress[key];
      if (categoryKey == categoryIndex && wordbookKey == wordbookIndex) {
        wordbookProgress[progress] += 1;
      }
    }
    wordbookProgress[0] =
      wordbookCount -
      wordbookProgress[1] -
      wordbookProgress[2] -
      wordbookProgress[3];
    return wordbookProgress;
  },
  // 获取指定目录、指定单词书、指定单词的进度
  getWordProgress(categoryIndex, wordbookIndex, wordIndex) {
    let currentProgress = storage.load("currentProgress"),
      wordKey = `${categoryIndex}-${wordbookIndex}-${wordIndex}`,
      wordProgress = currentProgress[wordKey];
    return wordProgress ? wordProgress : 0;
  },
  // 增加指定目录、指定单词书、指定单词的指定值的进度
  addWordProgress(categoryIndex, wordbookIndex, wordIndex, change = 1) {
    let currentProgress = storage.load("currentProgress"),
      wordKey = `${categoryIndex}-${wordbookIndex}-${wordIndex}`,
      wordProgress = currentProgress[wordKey];
    currentProgress[wordKey] = wordProgress + change || 0 + change;
    if (currentProgress[wordKey] > 3) {
      currentProgress[wordKey] = 3;
    }
    storage.save("currentProgress", currentProgress);
  },
  // 获取收藏单词的数组（{categoryIndex, wordbookIndex, wordIndex, word}）
  getCurrentCollect() {
    let currentCollect = storage.load("currentCollect"),
      currentCollectWords = [];
    for (let key in currentCollect) {
      if (currentCollect[key]) {
        let arrKey = key.split("-"),
          categoryIndex = arrKey[0],
          wordbookIndex = arrKey[1],
          wordIndex = arrKey[2];
        currentCollectWords.push({
          categoryIndex,
          wordbookIndex,
          wordIndex,
          word: this.getWordlist(categoryIndex, wordbookIndex)[wordIndex],
        });
      }
    }
    return currentCollectWords;
  },
  // 判断指定目录、指定单词书、指定单词是否为收藏
  isWordCollect(categoryIndex, wordbookIndex, wordIndex) {
    let currentCollect = storage.load("currentCollect"),
      wordKey = `${categoryIndex}-${wordbookIndex}-${wordIndex}`,
      wordCollect = currentCollect[wordKey];
    return wordCollect ? true : false;
  },
  // 添加指定目录、指定单词书、指定单词到收藏中
  addWordCollect(categoryIndex, wordbookIndex, wordIndex) {
    let currentCollect = storage.load("currentCollect"),
      wordKey = `${categoryIndex}-${wordbookIndex}-${wordIndex}`,
      wordCollect = currentCollect[wordKey];
    currentCollect[wordKey] = wordCollect ? false : true;
    storage.save("currentCollect", currentCollect);
  },
  // 获取用户信息
  getUserInfo() {
    let userInfo = storage.load("userInfo");
    return userInfo;
  },
  // 设置用户信息
  setUserInfo(nickname, gender, birthday, introduction) {
    let userInfo = {
      nickname,
      gender,
      birthday,
      introduction,
    };
    storage.save("userInfo", userInfo);
  },
};

const store = {
  storage,
  action,
};

export default store;
