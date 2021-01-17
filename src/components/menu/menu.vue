<template>
  <div>
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>菜单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <el-button type="primary" @click="$router.push('/menu/add')">
      添加
    </el-button>
    <el-table :data="arr" row-key="id">
      <el-table-column label="编号" prop="id"></el-table-column>
      <el-table-column
        label="菜单名称"
        prop="title"
        width="80"
      ></el-table-column>
      <el-table-column label="菜单类型" prop="type">
        <template slot-scope="item">
          <el-tag v-if="item.row.type == 1">目录</el-tag>
          <el-tag v-else>菜单</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="菜单图标">
        <template slot-scope="item">
          <i :class="item.row.icon"></i>
        </template>
      </el-table-column>
      <el-table-column label="菜单地址" prop="url"></el-table-column>
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
            @click="$router.push('/menu/' + item.row.id)"
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
import axios from "axios";
export default {
  data() {
    return {
      arr: [],
    };
  },
  mounted() {
    axios.get("/api/menulist", { params: { istree: true } }).then((res) => {
      this.arr = res.data.list;
    });
  },
  methods: {
    del(item) {
      console.log(item);
      this.$confirm("此操作将永久删除该菜单, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          axios.post("/api/menudelete", { id: item.row.id }).then((res) => {
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
