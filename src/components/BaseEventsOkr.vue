<template>
  <div>
    <h3 class="tree-demo-title-h3">支持的事件(可被展开)</h3>
    <p>
      可展开时支持的事件有 节点点击、鼠标右键点击，节点的展开以及节点的关闭。
    </p>
    <BaseCard>
      <template v-slot:header>
        <div class="component-wrapper">
          <vue-okr-tree
            :data="testData"
            :left-data="testLeftData"
            only-both-tree
            direction="horizontal"
            show-collapsable
            node-key="id"
            default-expand-all
            @node-click="handleNodeClick"
            @node-contextmenu="handleCoxMenu"
            @node-expand="handleNodeExpand"
            @node-collapse="handleNodeCollapse"
          ></vue-okr-tree>
        </div>
      </template>
      <template v-slot:description>
        该模式必须设置 <code>onlyBothTree</code> ，以及通过
        <code>leftData</code>表示左子数的结
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
      content: `<vue-okr-tree
  :data="testData"
  :left-data="testLeftData"
  only-both-tree
  direction="horizontal"
  show-collapsable
  node-key="id"
  default-expand-all
  @node-click="handleNodeClick"
  @node-contextmenu="handleCoxMenu"
  @node-expand="handleNodeExpand"
  @node-collapse="handleNodeCollapse"/>\n
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
    methods: {
      handleNodeClick (data) {
        alert(\`我是\$\{data.label\},我被点击了\`)
      },
      handleCoxMenu (event, data) {
        alert(\`我是\$\{data.label\},我的右键被点击了\`)
      },
      handleNodeExpand (data) {
        alert(\`我是\$\{data.label\},我被展开了\`)
      },
      handleNodeCollapse (data) {
        alert(\`我是\$\{data.label\},我被收起了\`)
      }
    }
  }
<\/script>`
    };
  },
  methods: {
    handleNodeClick(data) {
      alert(`我是${data.label},我被点击了`);
    },
    handleCoxMenu(event, data) {
      alert(`我是${data.label},我的右键被点击了`);
    },
    handleNodeExpand(data) {
      alert(`我是${data.label},我被展开了`);
    },
    handleNodeCollapse(data) {
      alert(`我是${data.label},我被收起了`);
    }
  }
};
</script>

<style scope></style>
