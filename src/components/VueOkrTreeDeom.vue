<template>
  <div class="vue-ork-tree-demo">
    <h2 class="tree-demo-title"> Tree 树形控件</h2>
    <p >用清晰的层级结构展示信息，可展开或折叠。</p>
    <!-- 基础用法 -->
    <Base01 />
    <!-- 水平方向 -->
    <Base02 />
    <!-- 节点展开 -->
    <Base03 />
    <!-- 节点全部展开 -->
    <Base04 />
    <!-- 通过 key 让节点展开 -->
    <Base041 />
    <!-- 节点样式 -->
    <Base05 />
    <!-- 自定义节点内容 -->
    <Base06 />
    <!-- OKR 模式 -->
    <Base07 />
  </div>
</template>
<script>
import { Base01, Base02, Base03, Base04, Base041, Base05, Base06, Base07} from './index.js'
export default {
  components: {
    Base01,
    Base02,
    Base03,
    Base04,
    Base041,
    Base05,
    Base06,
    Base07
  },
  data () {
    return {
    }
    
  }
}
</script>

<style scoped>
.vue-ork-tree-demo{
  max-width: 1000px;
  margin: 0 auto;
}
.vue-ork-tree-demo .tree-demo-title{
  font-size: 28px;
  color: #1f2f3d;
}
.vue-ork-tree-demo p, .vue-ork-tree-demo /deep/ p{
  font-size: 14px;
  line-height: 1.5em;
  color: #5e6d82;
  margin: 14px 0;
}
.vue-ork-tree-demo .tree-demo-title-h3, .vue-ork-tree-demo /deep/ .tree-demo-title-h3{
  font-size: 22px;
  color: #1f2f3d;
  margin: 55px 0 20px;
}
.vue-ork-tree-demo /deep/ .component-wrapper{
  overflow: auto;
  padding-left: 40px;
}
</style>