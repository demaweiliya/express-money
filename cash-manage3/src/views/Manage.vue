<template>
  <el-container class="manage-container">
    <el-header>
      <el-menu
        class="el-menu-demo"
        mode="horizontal"
        background-color="#545c64"
        text-color="#fff">
        <el-menu-item index="1"><h2 class="manage-title">文章管理-weidapao</h2></el-menu-item>
        <el-submenu class="manage-status" index="2">
          <template slot="title">用户名</template>
          <el-menu-item index="2-1">退出登录</el-menu-item>
          <el-menu-item index="2-2">个人中心</el-menu-item>
        </el-submenu>
      </el-menu>
    </el-header>
    <el-main>

    </el-main>
    <el-footer>

    </el-footer>
  </el-container>
</template>

<script>
// @ is an alias to /src

export default {
  name: "manage",
  components: {}
};
</script>


<style lang="stylus">
.el-header
  padding 0 !important

.manage-title
  margin 0

.manage-status
  float right !important
</style>

