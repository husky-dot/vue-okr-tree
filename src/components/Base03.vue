<template>
  <div>
    <h3 class="tree-demo-title-h3">节点是否可被展开</h3>
    <p>节点可被展开,默认是不展开</p>
    <BaseCard>
      <template v-slot:header>
        <div class="component-wrapper">
          <vue-okr-tree
            :data="testData"
            direction="horizontal"
            show-collapsable
          ></vue-okr-tree>
        </div>
      </template>
      <template v-slot:description>
        通过<code>show-collapsable</code>设置节点可被展开。
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
      content: `<vue-okr-tree :data="testData" direction="horizontal" show-collapsable></vue-okr-tree> \n
<script>
  export default {
    data () {
      return {
        testData: [{
          label: 'xxx科技有有限公司',
          children: [{
            label: '产品研发部',
            children: [{
              label: '研发-前端',
            }, {
              label: '研发-后端',
            }, {
              label: 'UI 设计',
            }]
          }, {
            label: '销售部',
            children: [{
                label: '销售一部',
              },{
                label: '销售二部',
              }
            ]
          },{
            label: '财务部'
          }]
        }]
      }
    }
  }
<\/script>`
    };
  }
};
</script>

<style scope></style>
