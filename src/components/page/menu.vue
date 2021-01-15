<template>
  <div>
    <h1>菜单管理</h1>
    <el-button type="primary" @click="$router.push('/menu/info')">
      添加
    </el-button>
    <el-table :data="arr">
      <el-table-column label="编号" prop="id" width="50"></el-table-column>
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
      <el-table-column label="菜单图标" prop="icon"></el-table-column>
      <el-table-column label="菜单地址" prop="url"></el-table-column>
      <el-table-column label="状态" prop="type">
        <template slot-scope="item">
          <el-tag v-if="item.row.status == 1">启用</el-tag>
          <el-tag v-else>禁用</el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作" prop="type" width="180">
        <template slot-scope="item">
          <el-button type="primary" size="mini" @click="edit(item)"
            >编辑</el-button
          >
          <el-button type="danger" size="mini" @click="del(item.$index)"
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
    axios.get("/api/menulist").then((res) => {
      this.arr = res.data.list;
    });
  },
  methods: {
    edit(item) {
      console.log(item.row);
    },
    del(index) {
      this.arr.splice(index, 1);
      axios.post("/api/catedelete", this.arr[index]).then((res) => {
        if (res.data.code === 200) {
          alert(res.data.msg);
        } else {
          console.log(res);
        }
      });
    },
  },
};
</script>
<style  scoped>
</style>
