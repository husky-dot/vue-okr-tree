<template>
  <div>
    <h3 class="tree-demo-title-h3">Events</h3>
    <table>
      <thead>
        <th>事件名称</th>
        <th>说明</th>
        <th>回调参数</th>
      </thead>
      <tbody>
        <tr>
          <td>node-click</td>
          <td>节点被点击时的回调</td>
          <td>
            共三个参数，依次为：传递给 data
            属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。
          </td>
        </tr>
        <tr>
          <td>node-expand</td>
          <td>节点被展开时触发的事件</td>
          <td>
            共三个参数，依次为：传递给 data
            属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。
          </td>
        </tr>
        <tr>
          <td>node-collapse</td>
          <td>节点被关闭时触发的事件</td>
          <td>
            共三个参数，依次为：传递给 data
            属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。
          </td>
        </tr>
        <tr>
          <td>node-contextmenu</td>
          <td>当某一节点被鼠标右键点击时会触发该事件</td>
          <td>
            属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped></style>
