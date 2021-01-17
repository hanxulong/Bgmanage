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
              :default-active="active"
              class="el-menu-vertical-demo"
              background-color="#545c64"
              text-color="#fff"
              active-text-color="#ffd04b"
              router
              unique-opened
            >
              <el-menu-item  index='/'>
                <i class="el-icon-s-home"></i>首页
              </el-menu-item>
              <el-submenu
                :index="items.title"
                v-for="items of menu"
                :key="items.id"
              >
                <template slot="title">
                  <i :class="items.icon"></i>
                  <span>{{ items.title }}</span>
                </template>
                <el-menu-item
                  v-for="item of items.children"
                  :index="item.url"
                  :key="item.id"
                  >{{ item.title }}</el-menu-item
                >
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
import axios from "axios";
export default {
  methods: {},
  components: {},
  data() {
    return {
      menu: [],
      active: "",
    };
  },
  mounted() {
    this.active = this.$route.meta.selected;
    axios.get("/api/menulist", { params: { istree: true } }).then((res) => {
      this.menu = res.data.list;
    });
  },
  watch: {
    $route(newValue) {
      this.active = newValue.meta.selected;
    },
  },
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
