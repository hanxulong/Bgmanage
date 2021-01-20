<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>规格管理</el-breadcrumb-item>
    </el-breadcrumb>
    <h1>规格页面</h1>
    <el-button @click="$router.push('/specs/add')" type="primary"
      >添加</el-button
    >
    <el-table :data="arr" row-key="id" border stripe>
      <el-table-column label="编号" prop="id"></el-table-column>
      <el-table-column
        label="规格名称"
        prop="specsname"
      ></el-table-column>

      <el-table-column label="状态" prop="type">
        <template slot-scope="item">
          <el-tag v-if="item.row.status == 1">启用</el-tag>
          <el-tag v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="type" width="180">
        <template slot-scope="item">
          <el-button
            type="primary"
            size="mini"
            @click="$router.push('/specs/' + item.row.id)"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" @click="del(item)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  data() {
    return {
        arr:[]
    };
  },

  mounted() {
    this.axios.get("/api/specslist").then((res) => {
      this.arr=res.data.list
    });
  },

  methods: {
      del(item) {
      this.$confirm("此操作将永久删除该规格, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios
            .post("/api/specsdelete", { id: item.row.id })
            .then((res) => {
              if (res.data.code === 200) {
                this.arr = res.data.list;
                this.$message({
                  type: "success",
                  message: "删除成功!",
                });
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
};
</script>
<style  scoped>
</style>
