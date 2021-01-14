<template>
  <div>
    <h2>学生管理</h2>
    <!-- <el-button type='primary' @click="$router.push('/student/add')">添加</el-button> -->
    <el-table
      :data="tableData"
      style="width: 100%"
      :row-class-name="tableRowClassName"
    >
      <el-table-column prop="date" label="日期" width="180"> </el-table-column>
      <el-table-column prop="name" label="姓名" width="180"> </el-table-column>
      <el-table-column prop="address" label="地址"> </el-table-column>
      <el-table-column  label="操作"> 
          <!-- 自定义列模板 -->
          <template slot-scope='item'>
              <el-button size='mini' type='primary' @click="handleEdit(item)">编辑</el-button>
              <el-button size='mini' type='primary' @click="handleDel(item.$index)">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
export default {
  methods: {
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    handleEdit(data){
        console.log(data)
    },
    handleDel(index){
        tableData.splice(index,1)
    }
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-04",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-01",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        },
        {
          date: "2016-05-03",
          name: "王小虎",
          address: "上海市普陀区金沙江路 1518 弄"
        }
      ]
    };
  }
};
</script>
<style scoped>
</style>
