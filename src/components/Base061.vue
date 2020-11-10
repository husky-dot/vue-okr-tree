<template>
  <div>
    <h3 class="tree-demo-title-h3">节点动画</h3>
    <p>
      该组件内置多种过渡动画，可以直接使用。默认过渡动画是
      <code>okr-zoom-in-center</code>，更多动画详见最底部的API文档。
    </p>
    <BaseCard>
      <template v-slot:header>
        <div class="component-wrapper">
          <vue-okr-tree
            :data="testData"
            direction="horizontal"
            show-collapsable
            default-expand-all
            animate
          ></vue-okr-tree>
        </div>
      </template>
      <template v-slot:description>
        使用动画需要传入<code>aniamte</code>
        属性，通过<code>animateName</code>指定动画的类型，默认动画是
        <code>okr-zoom-in-center</code>。
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
      content: `<vue-okr-tree
  :data="testData"
  direction="horizontal"
  show-collapsable
  default-expand-all
  animate
></vue-okr-tree>\n
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
