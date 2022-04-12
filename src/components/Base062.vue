<template>
  <div>
    <h3 class="tree-demo-title-h3">节点展开按钮自定义内容</h3>
    <p>可自行设置节点展开按钮内容</p>
    <BaseCard>
      <template v-slot:header>
        <div class="component-wrapper">
          <vue-okr-tree
            :data="testData"
            direction="horizontal"
            show-collapsable
            default-expand-all
            :node-btn-content='renderContent'
          ></vue-okr-tree>
        </div>
      </template>
      <template v-slot:description>
        通过 <code>node-btn-content</code> 渲染节点内容。
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
          label: "xxx科技有有限公司",
          content: "这是一个有活力的公司",
          children: [
            {
              label: "产品研发部",
              content: "这是一个有活力的产品研发部",
              children: [
                {
                  label: "研发-前端",
                  content: "这是一个有活力的研发-前端"
                },
                {
                  label: "研发-后端",
                  content: "这是一个有活力的研发-后端"
                },
                {
                  label: "UI 设计",
                  content: "这是一个有活力的UI 设计"
                }
              ]
            },
            {
              label: "销售部",
              content: "这是一个有活力的销售部",
              children: [
                {
                  label: "销售一部",
                  content: "这是一个有活力的销售一部"
                },
                {
                  label: "销售二部",
                  content: "这是一个有活力的销售二部"
                }
              ]
            },
            {
              label: "财务部",
              content: "这是一个有活力的财务部"
            }
          ]
        }
      ],
      content: `<vue-okr-tree 
  :data="testData" 
  direction="horizontal" 
  show-collapsable 
  default-expand-all
  :node-btn-content='renderContent'
  /> \n
<script>
  export default {
    data () {
      return {
        testData: [{
          label: 'xxx科技有有限公司',
          content: '这是一个有活力的公司',
          children: [{
            label: '产品研发部',
            content: '这是一个有活力的产品研发部',
            children: [{
              label: '研发-前端',
              content: '这是一个有活力的研发-前端'
            }, {
              label: '研发-后端',
              content: '这是一个有活力的研发-后端'
            }, {
              label: 'UI 设计',
              content: '这是一个有活力的UI 设计
            }]
          }, {
            label: '销售部',
            content: '这是一个有活力的销售部,
            children: [{
                label: '销售一部',
                content: '这是一个有活力的销售一部
              },{
                label: '销售二部',
                content: '这是一个有活力的销售二部
              }
            ]
          },{
            label: '财务部',
            content: '这是一个有活力的财务部
          }]
        }]
      }
    },
    methods: {
      renderContent(h, node) {
        return (
          <div class="org-chart-node-btn-text">{node.childNodes.length || 0}</div>
        );
      }
    },
  }
<\/script>
<style>
/**按钮文 */
.org-chart-node-btn-text {
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  border-radius: 50%;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #909090;
  z-index: 2;
}
</style>

`
    };
  },
  methods: {
    renderContent(h, node) {
      return (
        <div class="org-chart-node-btn-text">智</div>
      );
    }
  }
};
</script>

<style>
/**按钮文 */
.org-chart-node-btn-text {
  position: absolute;
  top:0;
  left: 0;
  right: 0;
  bottom: 0;
  background: #fff;
  border-radius: 50%;
  font-size: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #909090;
  z-index: 2;
}
</style>
