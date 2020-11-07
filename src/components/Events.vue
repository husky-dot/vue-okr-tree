<template>
  <div>
    <h3 class="tree-demo-title-h3">Events</h3>
    <table>
      <thead><th>事件名称</th><th>说明</th><th>回调参数</th></thead>
      <tbody>
      <tr>
        <td>node-click</td>
        <td>节点被点击时的回调</td>
        <td>共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。</td>
      </tr>
      <tr>
        <td>node-expand</td>
        <td>节点被展开时触发的事件</td>
        <td>共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。</td>
      </tr>
      <tr>
        <td>node-collapse</td>
        <td>节点被关闭时触发的事件</td>
        <td>共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。</td>
      </tr>
      <tr>
        <td>node-contextmenu</td>
        <td>当某一节点被鼠标右键点击时会触发该事件</td>
        <td>属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。</td>
      </tr>
      <tr>
        <td>getNode</td>
        <td>当某一节点被鼠标右键点击时会触发该事件</td>
        <td>属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。</td>
      </tr>
      <tr>
        <td>setCurrentNode</td>
        <td>通过 node 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性</td>
        <td>(node) 待被选节点的 node</td>
      </tr>
      <tr>
        <td>getCurrentKey</td>
        <td>获取当前被选中节点的 key，使用此方法必须设置 node-key 属性，若没有节点被选中则返回 null</td>
        <td>—</td>
      </tr>
      <tr>
        <td>getCurrentNode</td>
        <td>获取当前被选中节点的 data，若没有节点被选中则返回 null</td>
        <td>—</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  },
}
</script>

<style scoped>

</style>
