<template>
  <div>
    <h3 class="tree-demo-title-h3">Attributes</h3>
    <table>
      <thead>
        <th>参数</th>
        <th>说明</th>
        <th>类型</th>
        <th>可选值</th>
        <th>默认值</th>
      </thead>
      <tbody>
        <tr>
          <td>data</td>
          <td>展示数据</td>
          <td>array</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>direction</td>
          <td>树的展开方向</td>
          <td>String</td>
          <td>horizontal / vertical</td>
          <td>vertical</td>
        </tr>
        <tr>
          <td>onlyBothTree</td>
          <td>
            子树在根节点左右两边展开，该模式只有在 <code>direction</code> 为
            horizontal 有效，且必须提供 leftData 数据
          </td>
          <td>Boolean</td>
          <td>—</td>
          <td>false</td>
        </tr>
        <tr>
          <td>onlyBothTree</td>
          <td>
            子树在根节点左右两边展开，该模式只有在 <code>direction</code> 为
            horizontal 有效，且必须提供 leftData 数据
          </td>
          <td>Boolean</td>
          <td>—</td>
          <td>false</td>
        </tr>
        <tr>
          <td>leftData</td>
          <td>展示左子数的数据，该属性于在 onlyBothTree 模式启用</td>
          <td>array</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>label-width</td>
          <td>
            节点的宽度，默认为自动宽度。如果 label-width 为 number 类型，单位
            px；如果 label-width 为 string 类型，则这个宽度会设置为 节点 的
            style.width 的值，节点的宽度会受控于外部样式
          </td>
          <td>string/number</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>label-height</td>
          <td>
            节点的高度，默认为自动高度。如果 label-height 为 number 类型，单位
            px；如果 label-height 为 string 类型，则这个高度会设置为 节点 的
            style.height 的值，节点的高度会受控于外部样式
          </td>
          <td>string/number</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>label-class-name</td>
          <td>
            节点 className
            的回调方法，也可以使用字符串为所有的节点设置一个固定的 className
          </td>
          <td>Function(node)/String</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>current-lable-class-name</td>
          <td>当前选中节点的样式</td>
          <td>Function(node)/String</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>show-collapsable</td>
          <td>节点是否可被展开</td>
          <td>Boolean</td>
          <td>—</td>
          <td>false</td>
        </tr>
        <tr>
          <td>render-content</td>
          <td>树节点的内容区的渲染 Function</td>
          <td>Function(h, node)</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>props</td>
          <td>配置选项，具体看下表</td>
          <td>object</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>node-key</td>
          <td>每个树节点用来作为唯一标识的属性，整棵树应该是唯一的</td>
          <td>object</td>
          <td>String</td>
          <td>—</td>
        </tr>
        <tr>
          <td>default-expanded-keys</td>
          <td>
            默认展开的节点的 key 的数组(
            需要注意的是，此时必须设置node-key，其值为节点数据中的一个字段名，该字段在整棵树中是唯一的)
          </td>
          <td>array</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>filter-node-method</td>
          <td>
            对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回
            false 则表示这个节点会被隐藏
          </td>
          <td>Function(value, data, node)</td>
          <td>—</td>
          <td>—</td>
        </tr>
        <tr>
          <td>aniamte</td>
          <td>是否开启节点展开的过渡动画</td>
          <td>Boolean</td>
          <td>—</td>
          <td>false</td>
        </tr>
        <tr>
          <td>animate-name</td>
          <td>过渡动画名称，支持动画类型有 okr-fade-in-linear/okr-fade-in/okr-zoom-in-center/okr-zoom-in-top/okr-zoom-in-bottom</td>
          <td>String</td>
          <td>—</td>
          <td>okr-zoom-in-center</td>
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
