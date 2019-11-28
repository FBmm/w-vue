<template>
  <div class="content-container replication-container">
    <el-row class="menu-wrap">
      <el-col :span="24">
        <el-button type="primary" size="medium">创建</el-button>
        <el-button size="medium" plain>删除</el-button>
      </el-col>
    </el-row>
    <el-row class="table-wrap">
      <el-col :span="24">
        <el-table :data="tableData" border>
          <el-table-column prop="id" label="id" width="180"></el-table-column>
          <el-table-column prop="localRes" label="本端资源"></el-table-column>
          <el-table-column prop="remoteRes" label="远端资源"></el-table-column>
          <el-table-column prop="createTime" label="创建时间"></el-table-column>
          <el-table-column prop="endTime">
            <template slot="header">
              <label>结束时间</label>
              <el-input v-model="search" size="mini" class="table-search" placeholder="输入关键字搜索" />
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [
        {
          id: "1",
          localRes: "l_volume_1",
          remoteRes: "r_volume_1",
          createTime: "2016-05-02",
          endTime: "2016-05-02",
        },
        {
          id: "2",
          localRes: "l_volume_2",
          remoteRes: "r_volume_2",
          createTime: "2016-05-02"
        },
        {
          id: "3",
          localRes: "l_volume_3",
          remoteRes: "r_volume_4",
          createTime: "2016-05-02"
        },
        {
          id: "4",
          localRes: "l_volume_4",
          remoteRes: "r_volume_4",
          createTime: "2016-05-02"
        }
      ],
      search: ""
    };
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  }
};
</script>
<style lang="scss" scoped>
.cell {
    position: relative;
    .table-search {
        position: absolute;
    }
}
</style>