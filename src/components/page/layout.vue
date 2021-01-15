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
              default-active="/menuInfo"
              class="el-menu-vertical-demo"
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
                  <el-menu-item index="/menu">菜单管理</el-menu-item>
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
  methods: {},
  components: {},
  data() {
    return {};
  },
  mounted() {},
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
  background-color: rgba(67, 74, 80);
}
.el-aside .el-menu {
  width: 200px;
}
</style>
