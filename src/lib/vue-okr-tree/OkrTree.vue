<template>
  <div class="org-chart-container">
    <div
      ref="orgChartRoot"
      class="org-chart-node-children"
      :class="{
        vertical: direction === 'vertical',
        horizontal: direction === 'horizontal',
        'show-collapsable': showCollapsable,
        'one-branch': data.length === 1
      }"
    >
      <OkrTreeNode
        v-for="child in root.childNodes"
        :node="child"
        :root="root"
        orkstyle
        :show-collapsable="showCollapsable"
        :label-width="labelWidth"
        :label-height="labelHeight"
        :renderContent="renderContent"
        :selected-key="selectedKey"
        :default-expand-all="defaultExpandAll"
        :node-key="nodeKey"
        :key="getNodeKey(child)"
        :props="props"
      ></OkrTreeNode>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import OkrTreeNode from "./OkrTreeNode.vue";
import TreeStore from "./model/tree-store.js";
import { getNodeKey } from "./model/util";
export default {
  name: "OkrTree",
  components: {
    OkrTreeNode
  },
  provide() {
    return {
      okrEventBus: this.okrEventBus
    };
  },
  props: {
    data: {
      // 源数据
      required: true
    },
    leftData: {
      // 源数据
      type: Array
    },
    // 方向
    direction: {
      type: String,
      default: "vertical"
    },
    // 子节点是否可折叠
    showCollapsable: {
      type: Boolean,
      default: false
    },
    // 飞书 OKR 模式
    onlyBothTree: {
      type: Boolean,
      default: false
    },
    orkstyle: {
      type: Boolean,
      default: false
    },
    // 树节点的内容区的渲染 Function
    renderContent: Function,
    // 树节点区域的宽度
    labelWidth: [String, Number],
    // 树节点区域的高度
    labelHeight: [String, Number],
    // 树节点的样式
    labelClassName: [Function, String],
    // 当前选中节点样式
    currentLableClassName: [Function, String],
    // 用来控制选择节点的字段名
    selectedKey: String,
    // 是否默认展开所有节点
    defaultExpandAll: {
      type: Boolean,
      default: false
    },
    // 当前选中的节点
    currentNodeKey: [String, Number],
    // 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
    nodeKey: String,
    defaultExpandedKeys: {
      type: Array
    },
    filterNodeMethod: Function,
    props: {
      default() {
        return {
          leftChildren: "leftChildren",
          children: "children",
          label: "label",
          disabled: "disabled"
        };
      }
    },
    // 动画
    animate: {
      type: Boolean,
      default: false
    },
    animateName: {
      type: String,
      default: "okr-zoom-in-center"
    },
    animateDuration: {
      type: Number,
      default: 200
    }
  },
  computed: {
    ondeClass() {
      return {
        findNode: null
      };
    }
  },
  data() {
    return {
      okrEventBus: new Vue(),
      store: null,
      root: null
    };
  },
  created() {
    this.isTree = true;
    this.store = new TreeStore({
      key: this.nodeKey,
      data: this.data,
      leftData: this.leftData,
      props: this.props,
      defaultExpandedKeys: this.defaultExpandedKeys,
      showCollapsable: this.showCollapsable,
      currentNodeKey: this.currentNodeKey,
      defaultExpandAll: this.defaultExpandAll,
      filterNodeMethod: this.filterNodeMethod,
      labelClassName: this.labelClassName,
      currentLableClassName: this.currentLableClassName,
      onlyBothTree: this.onlyBothTree,
      direction: this.direction,
      animate: this.animate,
      animateName: this.animateName
    });
    this.root = this.store.root;
  },
  watch: {
    data(newVal) {
      this.store.setData(newVal);
    },
    defaultExpandedKeys(newVal) {
      this.store.defaultExpandedKeys = newVal;
      this.store.setDefaultExpandedKeys(newVal);
    }
  },
  methods: {
    filter(value) {
      if (!this.filterNodeMethod)
        throw new Error("[Tree] filterNodeMethod is required when filter");
      this.store.filter(value);
      if (this.onlyBothTree) {
        this.store.filter(value, "leftChildNodes");
      }
    },
    getNodeKey(node) {
      return getNodeKey(this.nodeKey, node.data);
    },
    // 通过 node 设置某个节点的当前选中状态
    setCurrentNode(node) {
      if (!this.nodeKey)
        throw new Error("[Tree] nodeKey is required in setCurrentNode");
      this.store.setUserCurrentNode(node);
    },
    // 根据 data 或者 key 拿到 Tree 组件中的 node
    getNode(data) {
      return this.store.getNode(data);
    },
    // 通过 key 设置某个节点的当前选中状态
    setCurrentKey(key) {
      if (!this.nodeKey)
        throw new Error("[Tree] nodeKey is required in setCurrentKey");
      this.store.setCurrentNodeKey(key);
    },
    remove(data) {
      this.store.remove(data);
    },
    // 获取当前被选中节点的 data
    getCurrentNode() {
      const currentNode = this.store.getCurrentNode();
      return currentNode ? currentNode.data : null;
    },
    getCurrentKey() {
      if (!this.nodeKey)
        throw new Error("[Tree] nodeKey is required in getCurrentKey");
      const currentNode = this.getCurrentNode();
      return currentNode ? currentNode[this.nodeKey] : null;
    },
    append(data, parentNode) {
      this.store.append(data, parentNode);
    },
    insertBefore(data, refNode) {
      this.store.insertBefore(data, refNode);
    },
    insertAfter(data, refNode) {
      this.store.insertAfter(data, refNode);
    },
    updateKeyChildren(key, data) {
      if (!this.nodeKey) throw new Error('[Tree] nodeKey is required in updateKeyChild');
      this.store.updateChildren(key, data);
    }
  }
};
</script>

<style>
@import "./model/transition.css";
* {
  margin: 0;
  padding: 0;
}
.org-chart-container {
  display: block;
  width: 100%;
  text-align: center;
}

.vertical .org-chart-node-children {
  position: relative;
  padding-top: 20px;
  transition: all 0.5s;
}
.vertical .org-chart-node {
  float: left;
  text-align: center;
  list-style-type: none;
  position: relative;
  padding: 20px 5px 0 5px;
  transition: all 0.5s;
}
/*使用 ::before 和 ::after 绘制连接器*/
.vertical .org-chart-node::before,
.vertical .org-chart-node::after {
  content: "";
  position: absolute;
  top: 0;
  right: 50%;
  width: 50%;
  border-top: 1px solid #ccc;
  height: 20px;
}
.vertical .org-chart-node::after {
  right: auto;
  left: 50%;
  border-left: 1px solid #ccc;
}
/*我们需要从没有任何兄弟元素的元素中删除左右连接器*/
.vertical.one-branch > .org-chart-node::after,
.vertical.one-branch > .org-chart-node::before {
  display: none;
}
/*从单个子节点的顶部移除空格*/
.vertical.one-branch > .org-chart-node {
  padding-top: 0;
}
/*从第一个子节点移除左连接器，从最后一个子节点移除右连接器*/
.vertical .org-chart-node:first-child::before,
.vertical .org-chart-node:last-child::after {
  border: 0 none;
}
/*将垂直连接器添加回最后的节点*/
.vertical .org-chart-node:last-child::before {
  border-right: 1px solid #ccc;
  border-radius: 0 5px 0 0;
}
.vertical .org-chart-node:only-child:before {
  border-radius: 0 0px 0 0;
  margin-right: -1px;
}
.vertical .org-chart-node:first-child::after {
  border-radius: 5px 0 0 0;
}
.vertical .org-chart-node.is-leaf {
  padding-top: 20px;
  padding-bottom: 20px;
}
.vertical .org-chart-node.is-leaf::before {
  content: "";
  display: block;
  height: 20px;
}
.vertical .org-chart-node.is-leaf .org-chart-node-label::after {
  display: none;
}

/*从父节点添加向下的连接器了*/
.vertical .org-chart-node-children::before {
  content: "";
  position: absolute;
  top: 0;
  left: 50%;
  border-left: 1px solid #ccc;
  width: 0;
  height: 20px;
}
.vertical .org-chart-node-label {
  position: relative;
  display: inline-block;
}
.vertical .org-chart-node-label .org-chart-node-label-inner {
  box-shadow: 0 1px 10px rgba(31, 35, 41, 0.08);
  display: inline-block;
  padding: 10px;
  margin: 0px;
  font-size: 16px;
  word-break: break-all;
}
.vertical .org-chart-node-label .org-chart-node-label-inner:hover {
  box-shadow: 0 1px 14px rgba(31, 35, 41, 0.12);
  cursor: pointer;
}
.vertical .org-chart-node-label .org-chart-node-btn {
  position: absolute;
  top: 100%;
  left: 50%;
  width: 20px;
  height: 20px;
  z-index: 10;
  margin-left: -11px;
  margin-top: 9px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.35s ease;
}
.vertical .org-chart-node-label .org-chart-node-btn:hover {
  transform: scale(1.15);
  cursor: pointer;
}
.vertical .org-chart-node-label .org-chart-node-btn::before,
.vertical .org-chart-node-label .org-chart-node-btn::after {
  content: "";
  position: absolute;
}
.vertical .org-chart-node-label .org-chart-node-btn::before {
  top: 50%;
  left: 4px;
  right: 4px;
  height: 0;
  border-top: 1px solid #ccc;
}
.vertical .org-chart-node-label .org-chart-node-btn::after {
  top: 4px;
  left: 50%;
  bottom: 4px;
  width: 0;
  border-left: 1px solid #ccc;
}
.vertical .org-chart-node-label .expanded.org-chart-node-btn::after {
  display: none;
}

.vertical .org-chart-node.collapsed .org-chart-node-label {
  position: relative;
}
.vertical .org-chart-node.collapsed .org-chart-node-label::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 0;
  width: 50%;
  height: 20px;
  border-right: 1px solid #ddd;
}

.horizontal .org-chart-node-children,
.horizontal .org-chart-node-left-children {
  position: relative;
  padding-left: 20px;
  transition: all 0.5s;
}
.horizontal .org-chart-node-left-children {
  padding-right: 20px;
}
.horizontal .org-chart-node:not(.is-left-child-node) {
  display: flex;
  align-items: center;
  position: relative;
  padding: 0px 5px 0 20px;
  transition: all 0.5s;
}
.horizontal .is-left-child-node {
  display: flex;
  position: relative;
  justify-content: flex-end;
  align-items: center;
}
.horizontal .is-left-child-node {
  padding: 0px 20px 0 5px;
}

/*使用 ::before 和 ::after 绘制连接器*/
.horizontal .org-chart-node:not(.is-left-child-node):before,
.horizontal .org-chart-node:not(.is-left-child-node)::after {
  content: "";
  position: absolute;
  border-left: 1px solid #ccc;
  top: 0;
  left: 0;
  width: 20px;
  height: 50%;
}
.horizontal .is-left-child-node:before,
.horizontal .is-left-child-node::after {
  content: "";
  position: absolute;
  border-right: 1px solid #ccc;
  top: 0;
  right: 0;
  width: 20px;
  height: 50%;
}
.horizontal .org-chart-node:not(.is-left-child-node):after {
  top: 50%;
  border-top: 1px solid #ccc;
}
.horizontal .is-left-child-node:after {
  top: 50%;
  border-top: 1px solid #ccc;
}

/*我们需要从没有任何兄弟元素的元素中删除左右连接器*/
.horizontal.one-branch > .org-chart-node::after,
.horizontal.one-branch > .org-chart-node::before {
  display: none;
}
/*从单个子节点的顶部移除空格*/
.horizontal.one-branch > .org-chart-node {
  padding-left: 0;
}

/*从第一个子节点移除左连接器，从最后一个子节点移除右连接器*/
.horizontal .org-chart-node:first-child::before,
.horizontal .org-chart-node:last-child::after {
  border: 0 none;
}
/*将垂直连接器添加回最后的节点*/
.horizontal .org-chart-node:not(.is-left-child-node):not(.is-not-child):last-child::before {
  border-bottom: 1px solid #ccc;
  border-radius: 0 0px 0 5px;
}
.horizontal .is-left-child-node:last-child::before {
  border-bottom: 1px solid #ccc;
  border-radius: 0 0px 5px 0px;
}

.horizontal .org-chart-node:only-child::before {
  border-radius: 0 0px 0 0px !important;
  border-color: #ccc;
}

.horizontal .org-chart-node:not(.is-left-child-node):first-child::after {
  border-radius: 5px 0px 0 0;
}
.horizontal .is-left-child-node:first-child::after {
  border-radius: 0 5px 0px 0px;
}

.horizontal .org-chart-node.is-leaf {
  position: relative;
  padding-left: 20px;
  padding-right: 20px;
}
.horizontal .org-chart-node.is-leaf::before {
  content: "";
  display: block;
}
.horizontal .org-chart-node.is-leaf .org-chart-node-label::after,
.horizontal .is-left-child-node.is-leaf .org-chart-node-label::before {
  display: none;
}

.horizontal .is-left-child-node:last-child::after {
  /* border-bottom: 1px solid green; */
  border-radius: 0 0px 5px 0px;
}
.horizontal .is-left-child-node:only-child::after {
  border-radius: 0 0px 0 0px;
}

.horizontal .is-left-child-node.is-leaf {
  position: relative;
  padding-left: 20px;
  padding-right: 20px;
}
.horizontal .is-left-child-node.is-leaf::before {
  content: "";
  display: block;
}
.horizontal .is-left-child-node .org-chart-node-label::after {
  display: none;
}

/*从父节点添加向下的连接器了*/
.horizontal .org-chart-node-children::before,
.horizontal .org-chart-node-left-children::before {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  border-top: 1px solid #ccc;
  width: 12px;
  height: 10px;
}
.horizontal .org-chart-node-children::before {
  width: 20px;
}
.horizontal .org-chart-node-left-children::before {
  left: calc(100% - 11px);
}
.horizontal > .only-both-tree-node > .org-chart-node-left-children::before {
  display: none;
}

.horizontal .org-chart-node-label {
  position: relative;
  display: inline-block;
}

.horizontal .org-chart-node-label .org-chart-node-label-inner {
  box-shadow: 0 1px 10px rgba(31, 35, 41, 0.08);
  display: inline-block;
  padding: 10px;
  margin: 10px 0;
  font-size: 16px;
  word-break: break-all;
}

.horizontal .org-chart-node-label .org-chart-node-label-inner:hover {
  box-shadow: 0 1px 14px rgba(31, 35, 41, 0.12);
  cursor: pointer;
}
.horizontal .org-chart-node-label .org-chart-node-btn {
  position: absolute;
  left: 100%;
  top: 50%;
  width: 20px;
  height: 20px;
  z-index: 10;
  margin-top: -11px;
  margin-left: 9px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.35s ease;
}

.horizontal .org-chart-node-label .org-chart-node-btn:hover,
.horizontal .org-chart-node-label .org-chart-node-left-btn:hover {
  transform: scale(1.15);
}
.horizontal .org-chart-node-label .org-chart-node-btn::before,
.horizontal .org-chart-node-label .org-chart-node-btn::after,
.horizontal .org-chart-node-label .org-chart-node-left-btn::before,
.horizontal .org-chart-node-label .org-chart-node-left-btn::after {
  content: "";
  position: absolute;
}

.horizontal .org-chart-node-label .org-chart-node-btn::before,
.horizontal .org-chart-node-label .org-chart-node-left-btn::before {
  top: 50%;
  left: 4px;
  right: 3px;
  border-top: 1px solid #ccc;
  height: 0;
  transform: translateY(-50%);
}
.horizontal .org-chart-node-label .org-chart-node-btn::after,
.horizontal .org-chart-node-label .org-chart-node-left-btn::after {
  top: 4px;
  left: 50%;
  bottom: 4px;
  width: 0;
  border-left: 1px solid #ccc;
}
.horizontal .org-chart-node-label .expanded.org-chart-node-btn::after,
.horizontal .org-chart-node-label .expanded.org-chart-node-left-btn::after {
  display: none;
}

.horizontal .org-chart-node-label .org-chart-node-left-btn {
  position: absolute;
  right: 100%;
  top: 50%;
  width: 20px;
  height: 20px;
  z-index: 10;
  margin-top: -11px;
  margin-right: 9px;
  background-color: #fff;
  border: 1px solid #ccc;
  border-radius: 50%;
  box-shadow: 0 0 2px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: all 0.35s ease;
}

.horizontal .org-chart-node.collapsed .org-chart-node-label,
.horizontal .is-left-child-node.collapsed .org-chart-node-label {
  position: relative;
}
.horizontal .org-chart-node.collapsed .org-chart-node-label::after,
.horizontal .is-left-child-node.collapsed .org-chart-node-label::before {
  content: "";
  border-bottom: 1px solid #ccc;
  position: absolute;
  top: 0;
  left: 100%;
  height: 50%;
  width: 10px;
}
.horizontal .org-chart-node .is-root-label.is-not-right-child::after,
.horizontal .org-chart-node .is-root-label.is-not-left-child::before {
  display: none !important;
}
/* .horizontal .org-chart-node.collapsed .is-root-label.is-right-child::after,
.horizontal .org-chart-node.collapsed .is-root-label.is-left-child::before {
  display: block;
} */

.horizontal .is-left-child-node.collapsed .org-chart-node-label::before {
  left: -10px;
}
.horizontal .only-both-tree-node > .org-chart-node-label::before {
  content: "";
  border-bottom: 1px solid #ccc;
  position: absolute;
  top: 0;
  right: 100%;
  height: 50%;
  width: 20px;
}
</style>
