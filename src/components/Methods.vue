<template>
  <div>
    <h3 class="tree-demo-title-h3">方法</h3>
    <table>
      <thead>
        <th>方法名</th>
        <th>说明</th>
        <th>回调参数</th>
      </thead>
      <tbody>
        <tr>
          <td>filter</td>
          <td>对树节点进行筛选操作</td>
          <td>
            接收一个任意类型的参数，该参数会在 filter-node-method
            中作为第一个参数
          </td>
        </tr>
        <tr>
          <td>updateKeyChildren</td>
          <td>通过 keys 设置节点子元素，使用此方法必须设置 node-key 属性</td>
          <td>
          (key, data) 接收两个参数，1. 节点 key 2. 节点数据的数组
          </td>
        </tr>
        <tr>
          <td>getNode</td>
          <td>
            根据 data 或者 key 拿到 Tree 组件中的 node,使用此方法必须设置
            node-key 属性
          </td>
          <td>(data) 要获得 node 的 key 或者 data</td>
        </tr>
        <tr>
          <td>setCurrentNode</td>
          <td>
            通过 node 设置某个节点的当前选中状态，使用此方法必须设置 node-key
            属性
          </td>
          <td>(node) 待被选节点的 node</td>
        </tr>
        <tr>
          <td>setCurrentKey</td>
          <td>
            通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key
            属性
          </td>
          <td>((key) 待被选节点的 key，若为 null 则取消当前高亮的节点</td>
        </tr>
        <tr>
          <td>getCurrentKey</td>
          <td>
            获取当前被选中节点的 key，使用此方法必须设置 node-key
            属性，若没有节点被选中则返回 null
          </td>
          <td>—</td>
        </tr>
        <tr>
          <td>getCurrentNode</td>
          <td>获取当前被选中节点的 data，若没有节点被选中则返回 null</td>
          <td>—</td>
        </tr>
        <tr>
          <td>remove</td>
          <td>删除 Tree 中的一个节点，使用此方法必须设置 node-key 属性</td>
          <td>
            (data, parentNode) 接收两个参数，1. 要追加的子节点的 data 2.
            子节点的 parent 的 data、key 或者 node
          </td>
        </tr>
        <tr>
          <td>append</td>
          <td>为 Tree 中的一个节点追加一个子节点</td>
          <td>
            (data, parentNode) 接收两个参数，1. 要追加的子节点的 data 2.
            子节点的 parent 的 data、key 或者 node
          </td>
        </tr>
        <tr>
          <td>insertBefore</td>
          <td>为 Tree 的一个节点的前面增加一个节点</td>
          <td>
            (data, refNode) 接收两个参数，1. 要增加的节点的 data 2.
            要增加的节点的后一个节点的 data、key 或者 node
          </td>
        </tr>
        <tr>
          <td>insertAfter</td>
          <td>为 Tree 的一个节点的后面增加一个节点</td>
          <td>
            (data, refNode) 接收两个参数，1. 要增加的节点的 data 2.
            要增加的节点的前一个节点的 data、key 或者 node
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
