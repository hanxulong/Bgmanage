<template>
  <div class="page">
    <el-form class="form" :model="info" :rules="rules" ref="login">
      <h1>登录页面</h1>
      <el-form-item prop="username">
        <el-input placeholder="请输入用户名" v-model="info.username"></el-input>
      </el-form-item>
      <el-form-item prop="password">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="info.password"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="dologin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      info: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名" },
          { min: 2, max: 15, message: "用户名长度必须在2-15位之间" },
        ],
        password: [
          { required: true, message: "请输入密码" },
          { min: 2, max: 15, message: "密码长度必须在2-15位之间" },
        ],
      },
    };
  },
  methods: {
    dologin() {
      this.$refs.login.validate((value) => {
        if (value) {
          // 执行登录操作
          this.axios({
            url: "/api/userlogin",
            method: "post",
            data: this.info,
          }).then((res) => {
            if (res.data.code !== 200) {
              this.$message(res.data.msg);
            } else {
              this.$message(res.data.msg);
              this.$store.commit("setUserInfo", res.data.list);
              this.$router.replace("/");
            }
          });
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
.page {
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.2);
  position: fixed;
}
.form {
  width: 460px;
  height: 260px;
  background-color: #fff;
  margin: 150px auto;
  border-radius: 20px;
}
h1 {
  text-align: center;
  padding: 10px 0;
}
.el-form-item {
  margin-left: 50px;
  margin-right: 50px;
}
.el-button {
  width: 100%;
}
</style>


