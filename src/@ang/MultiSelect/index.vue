<template>
  <div class="op-select" :style="{'width': `${width}px`}" v-clickoutside="hide">
    <div class="select__tags" :style="{'width': `${width}px`}">
      <span
        class="selected__wrap"
        :style="{'max-width': `${width - 40 }px` }"
        :title="selectedTitle"
      >{{selectedTitle}}</span>
      <!-- <span v-if="showSelectedCount">{{selectedCount}}</span> -->
      <i
        class="select__arrow el-icon-arrow-up"
        :class="{'is-reverse': visible}"
        @click.stop="toggleMenu"
      ></i>
    </div>
    <div class="select-menu" v-show="visible" :style="{'max-width': `${width}px`}">
      <div class="select-menu__wrap">
        <div class="popper__arrow"></div>
        <div class="select-menu__search">
          <el-input :placeholder="placeholder" suffix-icon="el-icon-search" ref="input"></el-input>
        </div>
        <div class="select-menu__body" :style="{'overflow-x': 'hidden'}">
          <div class="select-item" v-if="hasTotal">
            <el-checkbox
              label="全部"
              @click.native.stop
              @change="handleSelectAll"
              :value="isSelectedAll"
            ></el-checkbox>
          </div>
          <ul class="select-group__wrap" v-for="(group, gIndex) in menuData" :key="group.label">
            <li class="select-group__title" v-if="group.label">{{group.label}}</li>
            <li
              class="select-item"
              v-for="(item, iIndex) in group.options"
              :key="item.label"
              @click="handleClick(gIndex, iIndex)"
              :class="{'selected': item.checked}"
              :title="item.label"
            >
              <el-checkbox
                :label="item.label"
                @click.native.stop
                @change="handleCheckChange"
                v-model="item.checked"
              ></el-checkbox>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Clickoutside from "element-ui/src/utils/clickoutside";
export default {
  name: "OpMultiSelect",
  props: {
    // 是否多选
    multiple: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    // 是否展示 全部 选项
    hasTotal: {
      type: Boolean,
      default: function() {
        return true;
      }
    },
    // 是否分组
    group: {
      type: Boolean,
      default: function() {
        return true;
      }
    },
    // 默认选中
    selected: Array,
    // 下拉数据源
    data: Array,
    // 已选项提示信息 title
    title: {
      type: String,
      default: function() {
        return "已选项";
      }
    },
    // 搜索框 placeholder
    placeholder: {
      type: String,
      default: function() {
        return "搜索";
      }
    },
    showSelectedCount: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    width: {
      type: [Number, String],
      default: function() {
        return 200;
      }
    }
  },
  directives: { Clickoutside },
  data() {
    return {
      // 下拉框显隐属性
      visible: false,
      // 选中后的数据
      selectedItems: [],
      menuData: [],
      timeout: null
    };
  },
  watch: {
    data: {
      immediate: true,
      handler(value) {
        this.setMenuData();
      }
    },
    visible(val) {
      if (!val) {
        this.$emit("onClose", this.selectedItems);
      }
    }
  },
  computed: {
    selectedTitle() {
      const selectedItems = this.isSelectedAll
        ? ["全部"]
        : this.selectedItems.map(item => {
            return item.label;
          });
      return `${this.title}：${selectedItems.join(", ")}`;
    },
    isSelectedAll() {
      if (this.menuData && !this.menuData.length) return false;
      let selectedAll = true;
      for (let i = 0; i < this.menuData.length; i++) {
        for (let j = 0; j < this.menuData[i].options.length; j++) {
          if (!this.menuData[i].options[j].checked) {
            selectedAll = false;
            break;
          }
        }
      }
      return selectedAll;
    },
    selectedCount() {
      return (this.selectedItems && this.selectedItems.length) || 0;
    }
  },
  methods: {
    setMenuData() {
      if (this.data && !this.data.length) return;
      if (this.group) {
        this.treeIterations(
          {
            source: this.data,
            subAttr: "options"
          },
          (groups, i, group, j) => {
            // 设置默认选中
            group.checked = this._isInclude(this.selected, group.value);
          }
        );
      }
      this.menuData = this._deepClone(this.data);
      this.setSelectedItems();
      console.log("menuData", this.menuData);
    },
    setSelectedItems() {
      this.selectedItems = [];
      this.treeIterations(
        {
          source: this.menuData,
          subAttr: "options"
        },
        (groups, i, group, j) => {
          if (group.checked) {
            this.selectedItems.push(group);
          }
        }
      );
    },
    toggleMenu() {
      if (this.visible) {
        this.hide();
      } else {
        this.show();
        this.$nextTick(() => {
          this.$refs.input.focus();
        });
      }
    },
    handleClick(i, j) {
      this.menuData[i].options[j].checked = !this.menuData[i].options[j]
        .checked;
      this.setSelectedItems();
    },
    handleCheckChange() {
      this.setSelectedItems();
    },
    handleSelectAll() {
      if (!this.isSelectedAll) {
        this.treeIterations(
          {
            source: this.menuData,
            subAttr: "options"
          },
          (groups, i, group, j) => {
            group.checked = true;
          }
        );
      } else {
        this.treeIterations(
          {
            source: this.menuData,
            subAttr: "options"
          },
          (groups, i, group, j) => {
            group.checked = false;
          }
        );
      }
      // 全选数据
      this.setSelectedItems();
    },
    show() {
      this.visible = true;
      // clearTimeout(this.timeout);
      // this.timeout = setTimeout(() => {
      //   this.visible = true;
      // }, 0);
    },
    hide() {
      this.visible = false;
      // clearTimeout(this.timeout);
      // this.timeout = setTimeout(() => {
      //     this.visible = false;
      // }, 0);
    },
    /**
     * foreach 迭代嵌套两层数组对象
     * @param options 迭代器初始配置
     * options.source | Array // 迭代的源数组
     * options.subAttr | String // 内层迭代子树数组的参数
     * @fn 迭代器自定义执行的方法
     */
    treeIterations(options, fn) {
      if (!Array.isArray(options.source) || !options.source.length) return;
      options.source.forEach((item, i) => {
        const sub = item[options.subAttr];
        if (Array.isArray(sub)) {
          sub.forEach((subItem, j) => {
            if (!this._isPlainObject(subItem)) {
              throw new Error("subCollection is not 'object[]'");
            }
            fn(item, i, subItem, j);
          });
        }
      });
    },
    // 数组是否某个值
    _isInclude(arr, value) {
      return Array.isArray(arr) && arr.includes(value);
    },
    // 是否对象
    _isPlainObject(o) {
      return Object.prototype.toString.call(o) === "[object Object]";
    },
    // 深拷贝
    _deepClone(source) {
      if (!source && typeof source !== "object") {
        throw new Error("error arguments", "shallowClone");
      }
      const targetObj = source.constructor === Array ? [] : {};
      Object.keys(source).forEach(keys => {
        if (source[keys] && typeof source[keys] === "object") {
          targetObj[keys] = source[keys].constructor === Array ? [] : {};
          targetObj[keys] = this._deepClone(source[keys]);
        } else {
          targetObj[keys] = source[keys];
        }
      });
      return targetObj;
    }
  }
};
</script> 
<style lang="scss" scoped>
.is-reverse {
  transform: rotate(0) !important;
}
.selected {
  background-color: #deebff !important;
}
.op-select {
  position: relative;
  .select__tags {
    position: relative;
    .selected__wrap {
      display: inline-block;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .select__arrow {
      position: absolute;
      transition: all 0.3s;
      transform: rotate(180deg);
      right: 0;
      top: 50%;
      margin-top: -7px;
      font-size: 14px;
      cursor: pointer;
    }
  }

  .select-menu {
    position: absolute;
    top: 20px;
    left: 0;
    z-index: 6666;
    border: 1px solid #e4e7ed;
    border-radius: 4px;
    background-color: #fff;
    -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    margin: 5px 0;
    padding: 12px 0;
    .select-menu__wrap {
      position: relative;
    }
    .popper__arrow {
      position: absolute;
      background-color: #fff;
      width: 6px;
      height: 6px;
      left: 35px;
      top: -16px;
      border: 1px solid #ebeef5;
      filter: drop-shadow(0 2px 12px rgba(0, 0, 0, 0.03));
      border-left: 0px;
      border-bottom: 0px;
      transform: rotate(-45deg);
    }
    .select-menu__search {
      padding: 0 12px 6px;
    }
    .select-menu__body {
      max-height: 200px;
      overflow: auto;
      line-height: 36px;
    }
    ul {
      padding: 0;
      margin: 0;
    }
    .select-group__wrap {
      position: relative;
      list-style: none;
      margin: 0;
      margin-bottom: 12px;
      // padding: 0 17px;
      font-size: 14px;
      color: #606266;
      cursor: pointer;
      outline: none;
      &:not(:last-of-type) {
        &::after {
          content: "";
          position: absolute;
          display: block;
          left: 20px;
          right: 20px;
          bottom: -7px;
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

// /deep/ * {
//   box-sizing: border-box;
// }
</style>