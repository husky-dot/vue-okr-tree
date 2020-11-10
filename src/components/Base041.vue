<template>
  <div>
    <h3 class="tree-demo-title-h3">可将 Tree 的某些节点设置为默认展开</h3>
    <BaseCard>
      <template v-slot:header>
        <div class="component-wrapper">
          <vue-okr-tree
            :data="testData"
            direction="horizontal"
            show-collapsable
            node-key="id"
            :default-expanded-keys="[5]"
          ></vue-okr-tree>
        </div>
      </template>
      <template v-slot:description>
        通过
        <code>default-expanded-keys</code>
        设置默认展开的节点。需要注意的是，此时必须设置
        <code>node-key</code>
        ，其值为节点数据中的一个字段名，该字段在整棵树中是唯一的。
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
      content: `<vue-okr-tree 
  :data="testData" 
  direction="horizontal" 
  show-collapsable
  node-key="id"
  :default-expanded-keys="[5]"
  /> \n
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
      }
    }
  }
<\/script>`
    };
  }
};
</script>

<style scope></style>
