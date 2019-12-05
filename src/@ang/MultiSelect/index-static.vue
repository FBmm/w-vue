<template>
  <div class="op-select" style="width: 200px;">
    <div class="select__tags" :style="{'width': '160px'}">
      <span class="selected__wrap">迭代：迭代1,迭代2,迭代3,迭代4</span>
      <i class="select__arrow el-icon-arrow-down"></i>
    </div>
    <div class="select-menu">
      <div class="select-menu__search">
        <el-input v-model="input" placeholder="搜索迭代" suffix-icon="el-icon-search"></el-input>
      </div>
      <div class="select-menu__body">
        <ul class="select-group__wrap">
          <li class="select-group__title">未归档</li>
          <li class="select-item">
            <el-checkbox label="迭代1"></el-checkbox>
          </li>
          <li class="select-item">
            <el-checkbox label="迭代2"></el-checkbox>
          </li>
          <li class="select-item">
            <el-checkbox label="迭代3"></el-checkbox>
          </li>
          <li class="select-item">
            <el-checkbox label="迭代4"></el-checkbox>
          </li>
        </ul>
        <ul class="select-group__wrap">
          <li class="select-group__title">已归档</li>
          <li class="select-item">
            <el-checkbox label="迭代A"></el-checkbox>
          </li>
          <li class="select-item">
            <el-checkbox label="迭代B"></el-checkbox>
          </li>
          <li class="select-item">
            <el-checkbox label="迭代C"></el-checkbox>
          </li>
          <li class="select-item">
            <el-checkbox label="迭代D"></el-checkbox>
          </li>
        </ul>
      </div>
      
    </div>
  </div>
</template>
<script>
export default {
  name: "OpMultiSelect",
  data() {
    return {
      mode: 'multiple',
      data: [
        {
          label: '迭代1',
          value: '1'
        },
        {
          label: '迭代2',
          value: '2'
        },
        {
          label: '迭代3',
          value: '3'
        },
        {
          label: '迭代4',
          value: '4'
        }
      ]
    };
  }
};
</script>
<style lang="scss" scoped>
.op-select {
  .active {
    background-color: #deebff; 
  }

  .select__tags {
    position: relative;
    .selected__wrap {
      max-width: 140px;
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .select__arrow {
      position: absolute;
      right: 0;
      top: 50%;
      margin-top: -7px;
      font-size: 14px;
    }
  }
  .select-menu {
      border: 1px solid #e4e7ed;
      border-radius: 4px;
      background-color: #fff;
      -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
      margin: 5px 0;
      padding: 12px 0;
      .select-menu__search {
        padding: 0 12px 12px;
      }
      .select-menu__body {
        max-height: 200px;
        overflow: auto
      }
      ul {
        padding: 0;
        margin: 0;
      }
      .select-group__wrap {
        position: relative;
        list-style: none;
        line-height: 36px;
        margin: 0;
        margin-bottom: 36px;
        // padding: 0 17px;
        font-size: 14px;
        color: #606266;
        cursor: pointer;
        outline: none;
        &:not(:last-of-type){
          &::after {
            content: "";
            position: absolute;
            display: block;
            left: 20px;
            right: 20px;
            bottom: -19px;
            height: 1px;
            background: #e4e7ed;
          }
        }
      }
      .select-group__title {
        padding-left: 20px;
        font-size: 12px;
        color: #909399;
        line-height: 30px;
      }
      .select-item {
        padding-left: 20px;
        &:hover {
          background-color: #f5f7fa;
        }
      }
  }
}

/deep/ * {
  box-sizing: border-box;
}
</style>