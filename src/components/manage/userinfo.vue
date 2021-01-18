<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/user' }"
        >管理员管理</el-breadcrumb-item
      >
      <el-breadcrumb-item>管理员{{ tip }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      style="width: 400px"
      label-width="80px"
      ref="userform"
      :model="info"
      :rules="rules"
    >

      <el-form-item label="所属角色" prop="roleid">
        <el-select v-model="info.roleid">
          <el-option
            v-for="item of rolearr"
            :key="item.id"
            :label="item.rolename"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="用户名称" prop="username">
        <el-input
          placeholder="请输入用户名称"
          v-model="info.username"
        ></el-input>
      </el-form-item>

      
      <el-form-item label="密码">
        <el-input
          type="password"
          placeholder="请输入密码"
          v-model="info.password"
        ></el-input>
        <span v-if="$route.params.id">密码留空则不修改</span>
      </el-form-item>

      <el-form-item label="状态">
        <el-switch
          v-model="info.status"
          :active-value="1"
          :inactive-value="2"
        ></el-switch>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  components: {},
  data() {
    return {
      tip: "添加",
      info: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      rules: {
        username: [
          { required: true, message: "请填写角色名称" },
          { min: 3, max: 20, message: "角色名称应该在3-20个字符之间" },
        ],
      },
      rolearr: [],
    };
  },
  methods: {
    submit() {
      this.$refs["userform"].validate((val) => {
        if (val) {
          //验证成功，调用接口
          var url = "/api/useradd";
          if (this.$route.params.id) {
            url = "/api/useredit";
            this.info.id = this.$route.params.id;
          }
          axios.post(url, this.info).then((res) => {
            if (res.data.code === 200) {
              alert("操作成功"), 
              this.$router.push("/user");
            } else {
              alert(res.data.msg);
            }
          });
        }
      });
    },
  },
  mounted() {
    //获取已经添加的所有角色信息
    this.axios({
      url: "/api/rolelist",
      method: "get",
    }).then((res) => {
      this.rolearr = res.data.list;
    });
    // axios.get("/api/rolelist").then((res) => {
    //   this.rolearr = res.data.list;
    // });
    if (this.$route.params.id) {
      this.tip = "编辑";
      axios
        .get("/api/userinfo", { params: { uid: this.$route.params.id } })
        .then((res) => {
          this.info = res.data.list;
          this.info.password = "";
        });
    }
  },
};
</script>
<style scoped>
</style>
