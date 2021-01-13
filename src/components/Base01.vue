<template>
  <div>
    <h3 class="tree-demo-title-h3">基础用法</h3>
    <p>基础的树形结构展示，默认方式垂直方向。</p>
    <BaseCard>
      <template v-slot:header>
        <div class="component-wrapper">
          <vue-okr-tree :data="testData"></vue-okr-tree>
        </div>
      </template>
      <template>
        <pre
          ref="pre"
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
      testData2: [],
      content: `<vue-okr-tree :data="testData"></vue-okr-tree> \n
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
  },
  mounted() {
    setTimeout(() => {
      this.testData2 = [
        {
          label: "xxx科技有有限公司",
          children: [
            {
              label: "产品研发部",
              children: [
                {
                  label: "研发-前端"
                },
                {
                  label: "研发-后端"
                },
                {
                  label: "UI 设计"
                }
              ]
            },
            {
              label: "销售部",
              children: [
                {
                  label: "销售一部"
                },
                {
                  label: "销售二部"
                }
              ]
            },
            {
              label: "财务部"
            }
          ]
        }
      ]
    }, 6000)
  },
};
</script>

<style scope></style>
