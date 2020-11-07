

https://juejin.im/post/6844903519309283335?utm_source=tuicool&utm_medium=referral#heading-7

https://github.com/HigorSilvaRosa/vue-org-chart/blob/master/src/org-chart/OrgChart.vue

https://github.com/hukaibaihu/vue-org-tree/blob/master/src/components/org-tree/node.js


# vue-okr-tree

> 基于 Vue 2的组织架构树组件

## 使用

### NPM

```
# use npm
npm i vue-okr-tree

# use yarn
yarn add vue-okr-tree
```
### Import Plugins

``` js

import {VueOkrTree} from 'vue-okr-tree';
import 'vue-okr-tree/dist/vue-okr-tree.css'

// ...
```

### CDN

``` html
# css
<link href="https://unpkg.com/vue2-org-tree/dist/style.css">

# js
<script src="https://unpkg.com/vue/dist/vue.js"></script>
<script src="https://unpkg.com/vue2-org-tree/dist/index.js"></script>
```

## API

#### Attributes

| 参数 | 说明 | 类型 | 可选值 | 默认值
| :-----| ---- | :----: | :----: |  :----: |
| data | 展示数据 |  array |  — | —
| direction | 树的展开方向 |  String |  horizontal / vertical | vertical
| onlyBothTree | 子树在根节点左右两边展开，该模式只有在 direction 为 horizontal 有效，且必须提供 leftData 数据|  Boolean | —  | false
| leftData | 展示左子数的数据，该属性于在 onlyBothTree 模式启用 |  array |  — | —
| label-width | 节点的宽度，默认为自动宽度。如果 label-width 为 number 类型，单位 px；如果 label-width 为 string 类型，则这个宽度会设置为 节点 的 style.width 的值，节点的宽度会受控于外部样式 | string/number | — | —
| label-height | 节点的高度，默认为自动高度。如果 label-height 为 number 类型，单位 px；如果 label-height 为 string 类型，则这个高度会设置为 节点 的 style.height 的值，节点的高度会受控于外部样式 | string/number | — | —
| label-class-name | 节点 className 的回调方法，也可以使用字符串为所有的节点设置一个固定的 className | Function(node)/String | — | — 
| current-lable-class-name | 当前选中节点的样式 | Function(node)/String | — | — 
| show-collapsable | 节点是否可被展开 | Boolean | — | false
| default-expand-all | 是否默认展开所有节点，该参数只有在 show-collapsable 为 true 时有效 | Boolean | — | false
| render-content | 树节点的内容区的渲染 Function |  Function(h, node) | —  | —
| props | 配置选项，具体看下表 | object | —  | —
| node-key | 每个树节点用来作为唯一标识的属性，整棵树应该是唯一的 | String | —  | —
| default-expanded-keys | 默认展开的节点的 key 的数组(需要注意的是，此时必须设置node-key，其值为节点数据中的一个字段名，该字段在整棵树中是唯一的。) |  array |  — | —

#### props

| 参数 | 说明 | 类型 | 可选值 | 默认值
| :-----| ---- | :----: | :----: |  :----: |
| label | 指定节点标签为节点对象的某个属性值 |  	string, function(data, node) |  — | —
| children | 指定节点标签为节点对象的某个属性值 | string |  — | —

#### Events

  事件名称        | 说明                            | 回调参数
  ------------------|-----------------------------------------|:----------------------
  node-click             |  节点被点击时的回调  | 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。
  node-expand         |  节点被展开时触发的事件  | 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身
  node-collapse        |  节点被关闭时触发的事件  | 共三个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身
node-contextmenu         |  当某一节点被鼠标右键点击时会触发该事件                      | 共四个参数，依次为：event、传递给 data 属性的数组中该节点所对应的对象、节点对应的 Node、节点组件本身。
 getNode            |  根据 data 或者 key 拿到 Tree 组件中的 node  | (data) 要获得 node 的 key 或者 data
 setCurrentNode            |  通过 node 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性  | (node) 待被选节点的 node
 setCurrentKey            |  	通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性  | (key) 待被选节点的 key，若为 null 则取消当前高亮的节点
 getCurrentKey            |  获取当前被选中节点的 key，使用此方法必须设置 node-key 属性，若没有节点被选中则返回 null  | —
  getCurrentNode   |  	获取当前被选中节点的 data，若没有节点被选中则返回 null | —


yy



### Call events

#### on-expand
well be called when the collapse-btn clicked

- params `e` `Event`
- params `data` `Current node data`

#### on-node-click
well be called when the node-label clicked

- params `e` `Event`
- params `data` `Current node data`

#### on-node-mouseover
It is called when the mouse hovers over the label.

- params `e` `Event`
- params `data` `Current node data`

#### on-node-mouseout
It is called when the mouse leaves the label.

- params `e` `Event`
- params `data` `Current node data`


## 浏览器支持情况

  use table layout!

> IE11、Chrome、Firefox、Opera

## License
[MIT](http://opensource.org/licenses/MIT)
