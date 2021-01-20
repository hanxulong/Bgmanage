<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/specs' }">规格管理</el-breadcrumb-item>
      <el-breadcrumb-item>分类{{ tip }}</el-breadcrumb-item>
    </el-breadcrumb>
    <el-form label-width="80px" style="width: 400px">
      <el-form-item label="规格名称">
        <el-input
          placeholder="请输入规格名称"
          v-model="info.specsname"
        ></el-input>
      </el-form-item>

      <el-form-item
        v-for="(item, index) in attrArr"
        label="规格属性"
        :key="index"
        :rules="{
          required: true,
          message: '域名不能为空',
        }"
      >
        <div class="aLine">
          <el-input
            v-model="item.value"
            placeholder="请输入规格属性"
          ></el-input>
          <el-button size="mini" v-if="index == 0" @click="add" type="primary"
            >增加属性</el-button
          >
          <el-button size="mini" v-else @click="del(index)" type="danger"
            >删除</el-button
          >
        </div>
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
export default {
  data() {
    return {
      tip: "添加",
      info: {
        specsname: "",
        attrs: "",
        status: 1,
      },
      attrArr: [{ value: "" }],
    };
  },
  mounted() {},

  methods: {
    add() {
      this.attrArr.push({ value: "" });
    },
    del(n) {
      this.attrArr.splice(n, 1);
    },
    submit() {
      var temparr = [];
      this.attrArr.map((item) => temparr.push(item.value));
      this.info.attrs = temparr.join(",");
      this.axios.post("/api/specsadd", this.info).then((res) => {
        if (res.data.code === 200) {
          this.$router.push("/specs");
          this.$message({
            type: "success",
            message: "操作成功!",
          });
        } 
      });
    },
  },
};
</script>
<style  scoped>
.aLine {
  display: flex;
}
</style>
