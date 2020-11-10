<template>
  <div>
    <h3 class="tree-demo-title-h3">节点自定义内容</h3>
    <p>可自行设置节点内容</p>
    <BaseCard>
      <template v-slot:header>
        <div class="component-wrapper">
          <vue-okr-tree
            :data="testData"
            direction="horizontal"
            show-collapsable
            default-expand-all
            :render-content="renderContent"
          ></vue-okr-tree>
        </div>
      </template>
      <template v-slot:description>
        通过 <code>render-content</code> 渲染节点内容。
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
  :render-content="renderContent"
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
              ontent: '这是一个有活力的研发-后端'
            }, {
              label: 'UI 设计',
              ontent: '这是一个有活力的UI 设计
            }]
          }, {
            label: '销售部',
            ontent: '这是一个有活力的销售部,
            children: [{
                label: '销售一部',
                ontent: '这是一个有活力的销售一部
              },{
                label: '销售二部',
                ontent: '这是一个有活力的销售二部
              }
            ]
          },{
            label: '财务部',
            ontent: '这是一个有活力的财务部
          }]
        }]
      }
    },
    methods: {
      renderContent (h, node) {
        return (
          <div class=['diy-wrapper', node.isCurrent ? 'current-select' : ''] >
            <div class="diy-con-name">{node.data.label}</div>
            <div class="diy-con-content">{node.data.content}</div>
          </div>
        )
      }
    },
  }
<\/script>`
    };
  },
  methods: {
    renderContent(h, node) {
      return (
        <div class={`diy-wrapper ${node.isCurrent ? "current-select" : ""}`}>
          <div class="diy-con-name">{node.data.label}</div>
          <div class="diy-con-content">{node.data.content}</div>
        </div>
      );
    }
  }
};
</script>

<style>
.diy-wrapper {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.diy-wrapper .diy-con-name {
  font-size: 12px;
  line-height: 18px;
  color: #646a73;
}
.diy-wrapper .diy-con-content {
  color: #1f2329;
  line-height: 22px;
  word-break: break-word;
  font-size: 14px;
}
.diy-wrapper.current-select .diy-con-name {
  color: red;
}
.diy-wrapper.current-select .diy-con-content {
  color: #1989fa;
}
</style>
