<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/role' }">角色管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色{{ tip }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      style="width: 400px"
      label-width="80px"
      ref="roleform"
      :model="info"
      :rules="rules"
    >
      <el-form-item label="角色名称" prop="rolename">
        <el-input
          placeholder="请输入角色名称"
          v-model="info.rolename"
        ></el-input>
      </el-form-item>

      <el-form-item label="角色权限">
        <el-tree :data='rolelist'
        :props='defaultProps'
        show-checkbox
        node-key='id'
        ref='mytree'
        :default-expend-keys='checkedKeys'
        >

        </el-tree>
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
        rolename: "",
        menus: "",
        status: 1,
      },
      rules: {
        pid: [{ required: true, message: "请选择上级角色" }],
      },
      rolelist: [],
      checkedKeys:[],
      defaultProps:{
        children:'children',
        label:'title'
      }
    };
  },
  methods: {
    submit() {
      this.$refs["roleform"].validate((val) => {
        if (val) {
          //验证成功，调用接口
          var url = "/api/roleadd";
          if (this.$route.params.id) {
            url = "/api/roleedit";
            this.info.id = this.$route.params.id;
          }
          console.log(url);
          //把选中的节点数组转换成字符串，并赋值给对象
          this.info.menus = this.$refs.mytree.getCheckedKeys().join(",");
          axios.post(url, this.info).then((res) => {
            if (res.data.code === 200) {
              alert("操作成功"), this.$router.push("/role");
            } else {
              alert(res.data.msg);
            }
          });
        }
      });
    },
  },
  mounted() {
    if (this.$route.params.id) {
      this.tip = "编辑";
      axios
        .get("/api/roleinfo", { params: { id: this.$route.params.id } })
        .then((res) => {
          this.info = res.data.list;
          this.getCheckedKeys = this.info.menus
            .split(",")
            .map((item) => parseInt(item));
          this.$refs.mytree.setCheckedKeys(this.checkedKeys);
        });
    }
    axios.get("/api/menulist?istree=true").then((res) => {
      this.rolelist = res.data.list;
    });
  },
};
</script>
<style scoped>
</style>
