<template>
  <div>
    <h3 class="tree-demo-title-h3">OKR 展示模式之自定义节点内容</h3>
    <p>与上常规 Tree 一样，我们也可以通过自定义渲染函数来制定节点的内容</p>
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
            label-class-name="no-padding"
            default-expand-all
            :render-content="renderContent"
          ></vue-okr-tree>
        </div>
      </template>
      <template v-slot:description>
        通过 <code>render-content</code> 渲染节点内容，通过返回 node 中的
        <code>isLeftChild</code> 判断是否是左边的树。
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
          content: "这是一个有活力的公司",
          children: [
            {
              id: 2,
              label: "产品研发部",
              content: "这是一个有活力的产品研发部",
              children: [
                {
                  id: 3,
                  label: "研发-前端",
                  content: "这是一个有活力的研发-前端"
                },
                {
                  id: 4,
                  label: "研发-后端",
                  content: "这是一个有活力的研发-后端"
                },
                {
                  id: 5,
                  label: "UI 设计",
                  content: "这是一个有活力的UI 设计"
                }
              ]
            },
            {
              id: 6,
              label: "销售部",
              content: "这是一个有活力的销售部",
              children: [
                {
                  id: 7,
                  label: "销售一部",
                  content: "这是一个有活力的销售一部"
                },
                {
                  id: 8,
                  label: "销售二部",
                  content: "这是一个有活力的销售二部"
                }
              ]
            },
            {
              id: 9,
              label: "财务部",
              content: "这是一个有活力的务部"
            }
          ]
        }
      ],
      testLeftData: [
        {
          id: 1,
          label: "xxx科技有有限公司",
          content: "这是一个有活力的公司",
          children: [
            {
              id: 12,
              label: "(左)产品研发部",
              content: "这是一个有活力的产品研发部",
              children: [
                {
                  id: 13,
                  label: "(左)研发-前端",
                  content: "这是一个有活力的研发-前端"
                },
                {
                  id: 14,
                  label: "(左)研发-后端",
                  content: "这是一个有活力的研发-后端"
                },
                {
                  id: 15,
                  label: "(左)UI 设计",
                  content: "这是一个有活力的UI 设计"
                }
              ]
            },
            {
              id: 16,
              label: "(左)销售部",
              children: [
                {
                  id: 17,
                  label: "(左)销售一部",
                  content: "这是一个有活力的销售一部"
                },
                {
                  id: 18,
                  label: "(左)销售二部",
                  content: "这是一个有活力的销售二部"
                }
              ]
            },
            {
              id: 19,
              label: "(左)财务部",
              content: "这是一个有活力的财务部"
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
  label-class-name='no-padding'
  default-expand-all
  :render-content="renderContent"
></vue-okr-tree>\n
<script>
  export default {
    data () {
      return {
        testData: [{
          id: 1,
          label: 'xxx科技有有限公司',
          content: '这是一个有活力的公司',
          children: [{
            id: 2,
            label: '产品研发部',
            content: '这是一个有活力的产品研发部',
            children: [{
              id: 3,
              label: '研发-前端',
              content: '这是一个有活力的研发-前端',
            }, {
              id: 4,
              label: '研发-后端',
              content: '这是一个有活力的研发-后端',
            }, {
              id: 5,
              label: 'UI 设计',
              content: '这是一个有活力的UI 设计',
            }]
          }, {
            id: 6,
            label: '销售部',
            content: '这是一个有活力的销售部',
            children: [{
                id: 7,
                label: '销售一部',
                content: '这是一个有活力的销售一部',
              },{
                id: 8,
                label: '销售二部',
                content: '这是一个有活力的销售二部',
              }
            ]
          },{
            id: 9,
            label: '财务部',
            content: '这是一个有活力的务部',
          }]
        }],
        testLeftData: [{
          id: 1,
          label: 'xxx科技有有限公司',
          content: '这是一个有活力的公司',
          children: [{
            id: 12,
            label: '(左)产品研发部',
            content: '这是一个有活力的产品研发部',
            children: [{
              id: 13,
              label: '(左)研发-前端',
              content: '这是一个有活力的研发-前端',
            }, {
              id: 14,
              label: '(左)研发-后端',
              content: '这是一个有活力的研发-后端',
            }, {
              id: 15,
              label: '(左)UI 设计',
              content: '这是一个有活力的UI 设计',
            }]
          }, {
            id: 16,
            label: '(左)销售部',
            children: [{
                id: 17,
                label: '(左)销售一部',
                content: '这是一个有活力的销售一部',
              },{
                id: 18,
                label: '(左)销售二部',
                content: '这是一个有活力的销售二部',
              }
            ]
          },{
            id: 19,
            label: '(左)财务部',
            content: '这是一个有活力的财务部',
          }]
        }],
      }
    },
    methods: {
      renderContent (h, node) {
        const cls = ['diy-wrapper']
        if (node.isCurrent) {
          cls.push('current-select')
        }
        if (node.isLeftChild) {
          cls.push('left-child')
        }
        return (
          <div class={cls}>
            <div class="diy-con-name">{node.data.label}</div>
            <div class="diy-con-content">{node.data.content}</div>
          </div>
        )
      }
    }
  }
<\/script>
<style>
.label-class-blue{
  color: #1989fa;
}
.label-bg-blue{
  background: #1989fa;
  color: #fff;
}
.diy-wrapper{
  padding:10px
}
.no-padding{
  padding: 0 !important;
}
.diy-wrapper.left-child{
  border: 1px solid red;
}
</style>
`
    };
  },
  methods: {
    renderContent(h, node) {
      const cls = ["diy-wrapper"];
      if (node.isCurrent) {
        cls.push("current-select");
      }
      if (node.isLeftChild) {
        cls.push("left-child");
      }
      return (
        <div class={cls}>
          <div class="diy-con-name">{node.data.label}</div>
          <div class="diy-con-content">{node.data.content}</div>
        </div>
      );
    }
  }
};
</script>

<style>
.label-class-blue {
  color: #1989fa;
}
.label-bg-blue {
  background: #1989fa;
  color: #fff;
}
.diy-wrapper {
  padding: 10px;
}
.no-padding {
  padding: 0 !important;
}
.diy-wrapper.left-child {
  border: 1px solid red;
}
</style>
