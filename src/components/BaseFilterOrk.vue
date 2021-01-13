<template>
  <div>
    <h3 class="tree-demo-title-h3">节点过滤(可被展开)</h3>
    <p>通过关键字过滤树节点</p>
    <BaseCard>
      <template v-slot:header>
        <div class="component-wrapper">
          <div class="filter-wrapper">
            <input
              type="text"
              v-model="filterText"
              placeholder="输入关键字进行过滤"
            />
          </div>
          <div class="btns-wrap">
            <button @click="getNodeByData">通过 data 获取销售一部</button>
            <button @click="getNodeById">通过 id 获取销售一部</button>
            <button @click="setCurrentNode">
              通过 node 设置 销售一部 为选中状态
            </button>
            <button @click="getCurrentNode">获取当前选中节点</button>
            <button @click="remove">删除产品研发部</button>
            <button @click="append">为销售部门增加新的部门</button>
            <button @click="insertBefore">为销售部之前增加一个总部</button>
            <button @click="insertAfter">为销售部之后增加一个总部</button>
            <button @click="updateKeyChildren">更新销售部子部门</button>
          </div>
          <vue-okr-tree
            ref="tree"
            :data="testData"
            :left-data="testLeftData"
            only-both-tree
            direction="horizontal"
            show-collapsable
            node-key="id"
            default-expand-all
            current-lable-class-name="crrentClass"
            :filter-node-method="filterNode"
          ></vue-okr-tree>
        </div>
      </template>
      <template v-slot:description>
        在需要对节点进行过滤时，调用 Tree 实例的
        <code>filter</code> 方法，参数为关键字。需要注意的是，此时需要设置
        <code>filter-node-method </code> ，值为过滤函数。
      </template>
      <template>
        <pre
          class="language-css"
          v-html="Prism.highlight(content, Prism.languages.html, 'html')"
        ></pre>
      </template>
    </BaseCard>
  </div>
</template>
<script>
import mixins from "./mixins";
export default {
  mixins: [mixins],
  data() {
    return {
      filterText: "",
      testData: [
        {
          id: 1,
          label: "xxx科技有有限公司",
          children: [
            {
              id: 2,
              label: "产品研发部",
              children: [
                {
                  id: 3,
                  label: "研发-前端"
                },
                {
                  id: 4,
                  label: "研发-后端"
                },
                {
                  id: 5,
                  label: "UI 设计"
                }
              ]
            },
            {
              id: 6,
              label: "销售部",
              children: [
                {
                  id: 7,
                  label: "销售一部"
                },
                {
                  id: 8,
                  label: "销售二部"
                }
              ]
            },
            {
              id: 9,
              label: "财务部"
            }
          ]
        }
      ],
      testLeftData: [
        {
          id: 1,
          label: "xxx科技有有限公司",
          children: [
            {
              id: 12,
              label: "(左)产品研发部",
              children: [
                {
                  id: 13,
                  label: "(左)研发-前端"
                },
                {
                  id: 14,
                  label: "(左)研发-后端"
                },
                {
                  id: 15,
                  label: "(左)UI 设计"
                }
              ]
            },
            {
              id: 16,
              label: "(左)销售部",
              children: [
                {
                  id: 17,
                  label: "(左)销售一部"
                },
                {
                  id: 18,
                  label: "(左)销售二部"
                }
              ]
            },
            {
              id: 19,
              label: "(左)财务部"
            }
          ]
        }
      ],
      content: `<div class="filter-wrapper">
  <input type="text" v-model="filterText" placeholder="输入关键字进行过滤">
</div>\n
<vue-okr-tree           
  ref="tree"
  :data="testData"
  :left-data="testLeftData"
  only-both-tree
  direction="horizontal"
  show-collapsable
  node-key="id"
  default-expand-all
  current-lable-class-name="crrentClass"
  :filter-node-method="filterNode" />\n
<script>
  export default {
    data () {
      return {
        testData: [{
          id: 1,
          label: 'xxx科技有有限公司',
          children: [{
            id: 2,
            label: '产品研发部',
            children: [{
              id: 3,
              label: '研发-前端',
            }, {
              id: 4,
              label: '研发-后端',
            }, {
              id: 5,
              label: 'UI 设计',
            }]
          }, {
            id: 6,
            label: '销售部',
            children: [{
                id: 7,
                label: '销售一部',
              },{
                id: 8,
                label: '销售二部',
              }
            ]
          },{
            id: 9,
            label: '财务部'
          }]
        }],
        testLeftData: [{
          id: 1,
          label: 'xxx科技有有限公司',
          children: [{
            id: 12,
            label: '(左)产品研发部',
            children: [{
              id: 13,
              label: '(左)研发-前端',
            }, {
              id: 14,
              label: '(左)研发-后端',
            }, {
              id: 15,
              label: '(左)UI 设计',
            }]
          }, {
            id: 16,
            label: '(左)销售部',
            children: [{
                id: 17,
                label: '(左)销售一部',
              },{
                id: 18,
                label: '(左)销售二部',
              }
            ]
          },{
            id: 19,
            label: '(左)财务部'
          }]
        }],
      }
    },
    watch: {
      filterText(val) {
        this.$refs.tree.filter(val);
      }
    },
    methods: {
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },    
      getNodeById () {
        const node = this.$refs.tree.getNode(7)
        alert(node.data.label)
      },
      getNodeByData () {
        const node = this.$refs.tree.getNode({id: 7,label: '销售一部'})
        alert(node.data.label)
      },
      setCurrentNode () {
        const node = this.$refs.tree.getNode(7)
        this.$refs.tree.setCurrentNode(node)
      },
      getCurrentNode () {
        const node = this.$refs.tree.getCurrentNode()
        if (!node) {
          alert('当前没有选中节点')
        } else {
          alert(\`当前选中的节点是"\$\{node.label}"\`)
        }
      },
      remove () {
        const node = this.$refs.tree.getNode(2)
        this.$refs.tree.remove(node)
      },
      append () {
        const node = this.$refs.tree.getNode(6)
        const appData = {
          id: 10,
          label: '销售三部'
        }
        if (this.$refs.tree.getNode(10)) {
          alert('已经存在了，不可在增加了')
        } else {
          this.$refs.tree.append(appData, node)
        }
      },
      insertBefore () {
        const node = this.$refs.tree.getNode(6)
        const appData = {
          id: 11,
          label: '销售总部'
        }
        if (this.$refs.tree.getNode(11)) {
          alert('已经存在了，不可在增加了')
        } else {
          this.$refs.tree.insertBefore(appData, node)
        }
      },
      insertAfter () {
        const node = this.$refs.tree.getNode(6)
        const appData = {
          id: 11,
          label: '销售总部'
        }
        if (this.$refs.tree.getNode(11)) {
          alert('已经存在了，不可在增加了')
        } else {
          this.$refs.tree.insertAfter(appData, node)
        }
      },
      updateKeyChildren () {
        const data = [
          {
            id: 7,
            label: "销售一部",
            children: [{
              id: 1117,
              label:"销售一部--子一"
            },{
              id: 1118,
              label:"销售一部--子二"
            }]
          },
          {
            id: 8,
            label: "销售二部"
          },
          {
            id: 77,
            label: "销售三部"
          }
        ]
        this.$refs.tree.updateKeyChildren(6, data);
      }
    }
  }
<\/script>
<style>
.crrentClass{
  color: red;
}
</style>`
    };
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    }
  },
  methods: {
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    getNodeById() {
      const node = this.$refs.tree.getNode(7);
      alert(node.data.label);
    },
    getNodeByData() {
      const node = this.$refs.tree.getNode({ id: 7, label: "销售一部" });
      alert(node.data.label);
    },
    setCurrentNode() {
      const node = this.$refs.tree.getNode(7);
      this.$refs.tree.setCurrentNode(node);
    },
    getCurrentNode() {
      const node = this.$refs.tree.getCurrentNode();
      if (!node) {
        alert("当前没有选中节点");
      } else {
        alert(`当前选中的节点是"${node.label}"`);
      }
    },
    remove() {
      const node = this.$refs.tree.getNode(2);
      this.$refs.tree.remove(node);
    },
    append() {
      const node = this.$refs.tree.getNode(6);
      const appData = {
        id: 10,
        label: "销售三部"
      };
      if (this.$refs.tree.getNode(10)) {
        alert("已经存在了，不可在增加了");
      } else {
        this.$refs.tree.append(appData, node);
      }
    },
    insertBefore() {
      const node = this.$refs.tree.getNode(6);
      const appData = {
        id: 11,
        label: "销售总部"
      };
      if (this.$refs.tree.getNode(11)) {
        alert("已经存在了，不可在增加了");
      } else {
        this.$refs.tree.insertBefore(appData, node);
      }
    },
    insertAfter() {
      const node = this.$refs.tree.getNode(6);
      const appData = {
        id: 11,
        label: "销售总部"
      };
      if (this.$refs.tree.getNode(11)) {
        alert("已经存在了，不可在增加了");
      } else {
        this.$refs.tree.insertAfter(appData, node);
      }
    },
    updateKeyChildren () {
      const data = [
        {
          id: 7,
          label: "销售一部",
          children: [{
            id: 1117,
            label:"销售一部--子一"
          },{
            id: 1118,
            label:"销售一部--子二"
          }]
        },
        {
          id: 8,
          label: "销售二部"
        },
        {
          id: 77,
          label: "销售三部"
        }
      ]
      this.$refs.tree.updateKeyChildren(6, data);
    }
  }
};
</script>
<style>
.crrentClass {
  color: red;
}
</style>
