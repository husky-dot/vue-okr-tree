<template>
  <div>
    <h3 class="tree-demo-title-h3">支持的事件(不可展开)</h3>
    <p>不可展开时支持的事件有 节点点击 和 鼠标右键点击</p>
    <BaseCard>
      <template v-slot:header>
        <div class="component-wrapper">
          <vue-okr-tree
            :data="testData"
            @node-click="handleNodeClick"
            @node-contextmenu="handleCoxMenu"
          />
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
      content: `<vue-okr-tree
  :data="testData"
  @node-click="handleNodeClick"
  @node-contextmenu="handleCoxMenu"
/> \n
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
    },
    methods: {
      handleNodeClick (data) {
        alert('我是' + data.label+ ',我被点击了')
      },
      handleCoxMenu (event, data) {
        alert('我是' + data.label + ',我的右键被点击了')
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
    }
  }
};
</script>

<style scoped></style>
