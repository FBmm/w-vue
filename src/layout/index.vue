<template>
  <div class="app-wrapper">
    <div class="main-header">
      <div class="logo-wrapper">logo</div>
      <el-menu
        :default-active="activeIndex"
        class="main-nav"
        mode="horizontal"
        @select="handleHeaderSelect"
        text-color="#fff"
        background-color="#23262E"
        active-text-color="#ffd04b"
      >
        <el-menu-item index="/home">首页</el-menu-item>
        <el-menu-item index="/provision">资源分配</el-menu-item>
        <el-menu-item index="/protected">数据保护</el-menu-item>
        <!-- <el-submenu index="provision">
          <template slot="title">资源分配</template>
          <el-menu-item index="volume">卷</el-menu-item>
          <el-menu-item index="host">主机</el-menu-item>
          <el-submenu index="mapping">
            <template slot="title">映射</template>
            <el-menu-item index="volumeMapping">卷映射</el-menu-item>
            <el-menu-item index="hostMaping">主机映射</el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-submenu index="protected">
          <template slot="title">数据保护</template>
          <el-submenu index="replication">
            <template slot="title">远程复制</template>
            <el-menu-item index="replicationPair">远程复制pair</el-menu-item>
            <el-menu-item index="replicationConsistency">远程复制一致性组</el-menu-item>
          </el-submenu>
          <el-submenu index="dualActive">
            <template slot="title">双活</template>
            <el-menu-item index="dualActivePair">双活pair</el-menu-item>
            <el-menu-item index="dualActiveConsistency">双活一致性组</el-menu-item>
          </el-submenu>
          <el-menu-item index="dualActivePolicy">双活策略</el-menu-item>
        </el-submenu> -->
        <el-menu-item index="/cluster">集群</el-menu-item>
        <el-menu-item index="/setting">设置</el-menu-item>
      </el-menu>
    </div>
    <div class="main-container">
      <div class="left-tree" v-if="showLeftTree">
        <keep-alive>
          <LeftTree v-bind:path="currentPath"/>
        </keep-alive>
      </div>
      <div class="content">
        <router-view />
      </div>
    </div>
  </div>
</template>
<script>
import LeftTree from '@/components/LeftTree'

export default {
  components: { LeftTree },
  data() {
    return {
      activeIndex: "replicationPair",
      showLeftTree: true,
      currentPath: '',
    };
  },
  methods: {
    handleHeaderSelect(key, keyPath) {
      console.log(key, keyPath);
      console.log(this.$router);
      // this.showLeftTree = key !== 'home';
      this.currentPath = key;
      this.$router.push({path: key});
    },
    handleSubClick() {
      console.log("click sub");
    }
  },
  watch: {
    currentPath: function() {
      console.log('watch',this.currentPath)
    }
  },
}
</script>
<style lang="scss" scoped>
@import "@/styles/variables";

.app-wrapper {
  height: inherit;
  // background-color: $mainHeaderBg;
  min-width: $containerMinWidth;
}

.main-header {
  height: 61px;
  display: flex;
  .logo-wrapper {
    width: $leftTreeWidth;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #23262E;
    color: #fff;
  }
  .main-nav {
    flex: 1;
    border: 0;
  }
}

.main-container {
  // height: calc(100% - 61px);
  height: 100%;
  .left-tree {
    width: $leftTreeWidth;
    background-color: $leftTreeBg;
  }
  .content {
    background-color: #fff;
    min-width: $containerMinWidth - $leftTreeWidth;
  }
  .left-tree,
  .content {
    // float: left;
    height: 100%;
  }
  /** 左定宽 右自适应1 */
  display: flex;
  .content {
    flex: 1;
  }
  /** 左定宽 右自适应2 */
  // .content {
  //   width: calc(100% - 300px);
  // }
  /** 左定宽 右自适应3 */
  // position: relative;
  // .content {
  //   position: absolute;
  //   bottom: 0;
  //   left: 300px;
  //   right: 0;
  //   margin: auto;
  // }
}
</style>