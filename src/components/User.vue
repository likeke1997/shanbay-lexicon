<template>
  <div>
    <div v-if="editing">
      <label class="label">昵称</label>
      <mt-field placeholder="请输入昵称" v-model="nickname"></mt-field>
      <label class="label">性别</label>
      <mt-radio v-model="gender" :options="['男', '女']"></mt-radio>
      <label class="label">生日</label>
      <mt-field placeholder="请输入生日" type="date" v-model="birthday"></mt-field>
      <label class="label">自我介绍</label>
      <mt-field placeholder="请输入自我介绍" type="textarea" rows="6" v-model="introduction"></mt-field>
      <br />
      <mt-button type="primary" size="large" @click.native="endEditing(true)">保存修改</mt-button>
    </div>
    <div v-else>
      <label class="label">个人信息</label>
      <mt-field label="昵称" v-model="nickname" readonly></mt-field>
      <mt-field label="性别" v-model="gender" readonly></mt-field>
      <mt-field label="生日" type="date" v-model="birthday" readonly></mt-field>
      <mt-field label="自我介绍" type="textarea" rows="6" v-model="introduction" readonly></mt-field>
      <br />
      <mt-cell title="我的收藏" is-link to="/user/collect"></mt-cell>
      <br />
      <mt-button type="primary" size="large" @click.native="startEditing">修改用户信息</mt-button>
      <br />
      <mt-button type="danger" size="large" @click.native="resetDataQuery">重置所有数据</mt-button>
      <br />
      <mt-button type="default" size="large" @click.native="toAuthorHome">作者主页</mt-button>
    </div>
  </div>
</template>

<script>
import store from "../store.js";
import { MessageBox } from "mint-ui";
export default {
  name: "User",
  created() {
    this.setUserInfo();
  },
  data() {
    return {
      store,
      editing: false,
      nickname: "",
      gender: "",
      birthday: "",
      introduction: ""
    };
  },
  methods: {
    // 设置用户信息
    setUserInfo() {
      let userInfo = this.store.action.getUserInfo();
      this.nickname = userInfo.nickname;
      this.gender = userInfo.gender;
      this.birthday = userInfo.birthday;
      this.introduction = userInfo.introduction;
    },
    // 开始编辑
    startEditing() {
      this.editing = true;
    },
    // 结束编辑
    endEditing(save = false) {
      this.editing = false;
      if (save) {
        this.store.action.setUserInfo(
          this.nickname,
          this.gender,
          this.birthday,
          this.introduction
        );
      }
    },
    // 重置数据的询问窗口
    resetDataQuery() {
      MessageBox.confirm(this.nickname + "，您确定要重置所有的数据吗?")
        .then(action => {
          this.resetDataConfirm();
        })
        .catch(action => {
          this.resetDataCancel();
        });
    },
    // 重置数据确认的操作
    resetDataConfirm() {
      this.store.storage.clear();
      location.reload();
    },
    // 重置数据取消的操作
    resetDataCancel() {},
    toAuthorHome() {
      window.open("http://www.likeke1997.com");
    }
  },

  watch: {
    // 跳转到其他页面时，自动结束编辑
    $route(to, from) {
      if (to.path != "/user") {
        this.endEditing();
      }
    }
  }
};
</script>

<style scoped>
</style>
