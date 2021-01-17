<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{path:'/menu'}">菜单管理</el-breadcrumb-item>
      <el-breadcrumb-item>菜单{{ tip }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form
      style="width: 400px"
      label-width="80px"
      ref="menuform"
      :model="info"
      :rules="rules"
    >
      <el-form-item label="上级菜单" prop="pid">
        <el-select v-model="info.pid" @change='pidChange'>
          <el-option label="顶级菜单" :value="0"></el-option>
          <el-option
            v-for="item in menulist"
            :key="item.id"
            :label="item.title"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="菜单名称" prop="title">
        <el-input placeholder="请输入菜单名称" v-model="info.title"></el-input>
      </el-form-item>

      <el-form-item label="菜单类型">
        <el-radio-group v-model="info.type">
          <el-radio :label="1">目录</el-radio>
          <el-radio :label="2">菜单</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="菜单图标" v-show="info.type == 1">
        <el-input placeholder="请输入菜单图标" v-model="info.icon"> </el-input>
      </el-form-item>
      <el-form-item label="菜单地址" v-show="info.type == 2">
        <el-input placeholder="请输入菜单地址" v-model="info.url"> </el-input>
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
        pid: "",
        title: "",
        type: 1,
        icon: "",
        url: "",
        status: 1,
      },
      rules: {
        pid: [{ required: true, message: "请选择上级菜单" }],
        title: [
          {
            required: true,
            message: "请填写菜单名称",
          },
        ],
      },
      menulist: [],
    };
  },
  methods: {
    pidChange(n){
      this.info.type=n==0?1:2
    },
    submit() {
      this.$refs["menuform"].validate((val) => {
        if (val) {
          //验证成功，调用接口
          var url ='/api/menuadd';
          if(this.$route.params.id){
            url='/api/menuedit',
            this.info.id=this.$route.params.id
          }
          axios.post(url, this.info).then((res) => {
            if (res.data.code === 200) {
              alert('操作成功'), 
              this.$router.push("/menu");
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
      axios.get("/api/menuinfo",{params:{id:this.$route.params.id}}).then((res) => {
        this.info = res.data.list;
      });
    }
    axios.get("/api/menulist?pid=0").then((res) => {
      this.menulist = res.data.list;
    });
  },
};
</script>
<style scoped>
</style>
