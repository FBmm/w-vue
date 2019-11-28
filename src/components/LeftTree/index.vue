<template>
  <el-menu
    :default-active="activeIndex"
    class="left-tree-nav"
    @select="handleSelect"
    text-color="#fff"
    background-color="#393D49"
  >
    <template v-for="(item, index) in menuList">
      <el-menu-item
        v-if="(!item.children || !item.children.length) && !item.hidden"
        :key="index"
        :index="item.path"
      >
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
      </el-menu-item>
      <el-submenu
        v-if="item.children && item.children.length && !item.hidden"
        :key="index"
        :index="item.path"
      >
        <template slot="title">
          <i :class="item.icon"></i>
          <span>{{item.title}}</span>
        </template>
        <el-menu-item
          v-for="(subItem, subIndex) in item.children"
          :index="subItem.path"
          :key="subIndex"
        >
          <span v-if="!subItem.hidden">{{subItem.title}}</span>
        </el-menu-item>
      </el-submenu>
    </template>
  </el-menu>
</template>
<script>
import LeftTreeConfig from "@/config/leftTree";
export default {
  name: "LeftTree",
  props: {
    path: {
      type: [String],
      default: null
    }
  },
  data() {
    return {
      activeIndex: ""
    };
  },
  computed: {
    menuList: function() {
      if (this.path) {
        const leftTree = LeftTreeConfig.filter(item => {
          return item.path === this.path;
        });
        return leftTree && leftTree[0] && leftTree[0].children;
      } else {
        return null;
      }
    }
  },
  methods: {
    handleSelect(key) {
      this.$router.push({ path: `${this.path}${key}` });
    }
  }
};
</script>
<style lang="scss" scoped>
.left-tree-nav {
  width: 201px;
}
</style>