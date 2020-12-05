<template>
  <div
    class="org-chart-node"
    @contextmenu="$event => this.handleContextMenu($event)"
    v-if="node.visible"
    :class="{
      collapsed: !node.leftExpanded || !node.expanded,
      'is-leaf': isLeaf,
      'is-current': node.isCurrent,
      'is-left-child-node': isLeftChildNode,
      'is-not-child': node.level === 1 && node.childNodes.length <= 0 && leftChildNodes.length <= 0,
      'only-both-tree-node': node.level === 1 && tree.store.onlyBothTree
    }"
  >
    <transition :duration="animateDuration" :name="animateName">
      <div
        class="org-chart-node-left-children"
        v-if="showLeftChildNode"
        v-show="node.leftExpanded"
      >
        <OkrTreeNode
          v-for="child in leftChildNodes"
          :show-collapsable="showCollapsable"
          :node="child"
          :label-width="labelWidth"
          :label-height="labelHeight"
          :renderContent="renderContent"
          :selected-key="selectedKey"
          :node-key="nodeKey"
          :key="getNodeKey(child)"
          :props="props"
          is-left-child-node
        ></OkrTreeNode>
      </div>
    </transition>
    <div class="org-chart-node-label"
      :class="{
        'is-root-label': node.level === 1,
        'is-not-right-child': node.level === 1 && node.childNodes.length <= 0,
        'is-not-left-child': node.level === 1 && leftChildNodes.length <= 0
      }"
    >
      <div
        v-if="showNodeLeftBtn && leftChildNodes.length > 0"
        class="org-chart-node-left-btn"
        :class="{ expanded: node.leftExpanded }"
        @click="handleBtnClick('left')"
      ></div>
      <div
        class="org-chart-node-label-inner"
        @click="handleNodeClick"
        :class="computeLabelClass"
        :style="computeLabelStyle"
      >
        <node-content :node="node">
          <slot>
            {{ node.label }}
          </slot>
        </node-content>
      </div>
      <div
        v-if="showNodeBtn && !isLeftChildNode"
        class="org-chart-node-btn"
        :class="{ expanded: node.expanded }"
        @click="handleBtnClick('right')"
      ></div>
    </div>
    <transition :duration="animateDuration" :name="animateName">
      <div
        class="org-chart-node-children"
        v-if="!isLeftChildNode && node.childNodes && node.childNodes.length > 0"
        v-show="node.expanded"
      >
        <OkrTreeNode
          v-for="child in node.childNodes"
          :show-collapsable="showCollapsable"
          :node="child"
          :label-width="labelWidth"
          :label-height="labelHeight"
          :renderContent="renderContent"
          :selected-key="selectedKey"
          :node-key="nodeKey"
          :key="getNodeKey(child)"
          :props="props"
        ></OkrTreeNode>
      </div>
    </transition>
  </div>
</template>
<script>
import { getNodeKey } from "./model/util";
export default {
  name: "OkrTreeNode",
  inject: ["okrEventBus"],
  props: {
    props: {},
    node: {
      default() {
        return {};
      }
    },
    root: {
      default() {
        return {};
      }
    },
    // 子节点是否可折叠
    showCollapsable: {
      type: Boolean,
      default: false
    },
    // 判断是否是左子树的节点，样式需要改
    isLeftChildNode: {
      type: Boolean,
      default: false
    },
    // 树节点的内容区的渲染 Function
    renderContent: Function,
    // 树节点区域的宽度
    labelWidth: [String, Number],
    // 树节点区域的高度
    labelHeight: [String, Number],
    // 用来控制选择节点的字段名
    selectedKey: String,
    // 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的
    nodeKey: String
  },
  components: {
    NodeContent: {
      props: {
        node: {
          required: true
        }
      },
      render(h) {
        const parent = this.$parent;
        if (parent._props.renderContent) {
          return parent._props.renderContent(h, this.node);
        } else {
          return this.$scopedSlots.default(this.node);
        }
      }
    }
  },
  computed: {
    isLeaf () {
      if (this.node.level === 1) {
        if (this.leftChildNodes.length == 0 && this.node.childNodes.length == 0) {
          return true
        } else {
          return false
        }
      } else {
        return this.node.isLeaf
      }
    },
    leftChildNodes() {
      if (this.tree.store.onlyBothTree) {
        if (this.isLeftChildNode) {
          return this.node.childNodes;
        } else {
          return this.node.leftChildNodes;
        }
      }
      return [];
    },
    animateName() {
      if (this.tree.store.animate) {
        return this.tree.store.animateName;
      }
      return "";
    },
    animateDuration() {
      if (this.tree.store.animate) {
        return this.tree.store.animateDuration;
      }
      return 0;
    },
    // 是否显示展开按钮
    showNodeBtn() {
      if (this.isLeftChildNode) {
        return (
          (this.tree.store.direction === "horizontal" &&
          this.showCollapsable &&
          this.leftChildNodes.length > 0) || this.level === 1
        );
      }
      return (
        this.showCollapsable &&
        this.node.childNodes &&
        this.node.childNodes.length > 0
      )
    },
    showNodeLeftBtn() {
      return (
        (this.tree.store.direction === "horizontal" &&
        this.showCollapsable &&
        this.leftChildNodes.length > 0) 
      )
    },
    // 节点的宽度
    computeLabelStyle() {
      let { labelWidth = "auto", labelHeight = "auto" } = this;
      if (typeof labelWidth === "number") {
        labelWidth = `${labelWidth}px`;
      }
      if (typeof labelHeight === "number") {
        labelHeight = `${labelHeight}px`;
      }
      return {
        width: labelWidth,
        height: labelHeight
      };
    },
    computeLabelClass() {
      let clsArr = [];
      const store = this.tree.store;
      if (store.labelClassName) {
        if (typeof store.labelClassName === "function") {
          clsArr.push(store.labelClassName(this.node));
        } else {
          clsArr.push(store.labelClassName);
        }
      }
      if (store.currentLableClassName && this.node.isCurrent) {
        if (typeof store.currentLableClassName === "function") {
          clsArr.push(store.currentLableClassName(this.node));
        } else {
          clsArr.push(store.currentLableClassName);
        }
      }
      if (this.node.isCurrent) {
        clsArr.push("is-current");
      }
      return clsArr;
    },
    computNodeStyle() {
      return {
        display: this.node.expanded ? "" : "none"
      };
    },
    computLeftNodeStyle() {
      return {
        display: this.node.leftExpanded ? "" : "none"
      };
    },
    // 是否显示左子数
    showLeftChildNode() {
      return (
        this.tree.onlyBothTree &&
        this.tree.store.direction === "horizontal" &&
        this.leftChildNodes &&
        this.leftChildNodes.length > 0
      );
    }
  },
  watch: {
    "node.expanded"(val) {
      // this.$nextTick(() => this.expanded = val);
    },
    "node.leftExpanded"(val) {
      // this.$nextTick(() => this.expanded = val);
    }
  },
  data() {
    return {
      // node 的展开状态
      expanded: false,
      tree: null
    };
  },
  created() {
    const parent = this.$parent;
    if (parent.isTree) {
      this.tree = parent;
    } else {
      this.tree = parent.tree;
    }

    const tree = this.tree;
    if (!tree) {
      console.warn("Can not find node's tree.");
    }
  },
  methods: {
    getNodeKey(node) {
      return getNodeKey(this.nodeKey, node.data);
    },
    handleNodeClick() {
      const store = this.tree.store;
      store.setCurrentNode(this.node);
      this.tree.$emit("node-click", this.node.data, this.node, this);
    },
    handleBtnClick(isLeft) {
      isLeft = isLeft === "left";
      const store = this.tree.store;
      // 表示是OKR飞书模式
      if (store.onlyBothTree) {
        if (isLeft) {
          if (this.node.leftExpanded) {
            this.node.leftExpanded = false;
            this.tree.$emit("node-collapse", this.node.data, this.node, this);
          } else {
            this.node.leftExpanded = true;
            this.tree.$emit("node-expand", this.node.data, this.node, this);
          }
          return;
        }
      }
      if (this.node.expanded) {
        this.node.collapse();
        this.tree.$emit("node-collapse", this.node.data, this.node, this);
      } else {
        this.node.expand();
        this.tree.$emit("node-expand", this.node.data, this.node, this);
      }
    },
    handleContextMenu(event) {
      if (
        this.tree._events["node-contextmenu"] &&
        this.tree._events["node-contextmenu"].length > 0
      ) {
        event.stopPropagation();
        event.preventDefault();
      }
      this.tree.$emit(
        "node-contextmenu",
        event,
        this.node.data,
        this.node,
        this
      );
    }
  }
};
</script>
