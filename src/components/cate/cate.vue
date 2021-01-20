<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>分类管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="$router.push('/cate/add')">
      添加
    </el-button>
    <el-table :data="arr" row-key="id" border stripe>
      <el-table-column label="编号" prop="id"></el-table-column>
      <el-table-column
        label="分类名称"
        prop="catename"
      ></el-table-column>
      <el-table-column label="图片" >
        <template slot-scope="item" v-if="item.row.img">
          <img :src="item.row.img" alt="" style="width:100px" />
        </template>
      </el-table-column>

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
            @click="$router.push('/cate/' + item.row.id)"
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
      arr: [],
    };
  },
  mounted() {
    this.axios
      .get("/api/catelist", { params: { istree: true } })
      .then((res) => {
        this.arr = res.data.list;
      });
  },
  methods: {
    del(item) {
      this.$confirm("此操作将永久删除该分类, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.axios
            .post("/api/catedelete", { id: item.row.id })
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
