<template>
  <el-container class="page">
    <el-header>Header</el-header>
    <el-container>
      <el-aside width="200px">
        <!-- 导航栏 -->
        <el-row class="tac">
          <el-col :span="12">
            <!-- <h5>自定义颜色</h5> -->
            <el-menu
              default-active="/student"
              class="el-menu-vertical-demo"
              @open="handleOpen"
              @close="handleClose"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              router
            >
              <el-submenu index="1">
                <template slot="title">
                  <i class="el-icon-location"></i>
                  <span>导航一</span>
                </template>
                <el-menu-item-group>
                  <el-menu-item index="/student">学生管理</el-menu-item>
                  <el-menu-item index="/course">教师管理</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
            </el-menu>
          </el-col>
        </el-row>
      </el-aside>


      <el-main>
        <router-view></router-view>
      </el-main>

    </el-container>
  </el-container>
</template>
<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  },
  components: {},
  data() {
    return {};
  },
  mounted() {}
};
</script>
<style scoped>
.page {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.el-header {
  width: 100vw;
  height: 40px;
  background-color: skyblue;
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: pink;
}
.el-aside .el-menu{
    width: 200px;
}
</style>
