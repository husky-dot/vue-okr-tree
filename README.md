## 更新日志

 * 更新时间 2020/12/02 
   * 修复异步修改data不渲染问题 对应版本：vue-okr-tree@1.0.5
 * 更新时间 2020/12/05
   * 修改部分展示 bug 对应版本：vue-okr-tree@1.0.6
## 文档和事例

地址：http://www.longstudy.club/vue-okr-tree-doc/index.html


## vue-okr-tree

基于 Vue 2的组织架构树组件

## Install

```
# use npm
npm i vue-okr-tree

# use yarn
yarn add vue-okr-tree
```
## Quick Start

``` js

import {VueOkrTree} from 'vue-okr-tree';
import 'vue-okr-tree/dist/vue-okr-tree.css'

// ...
```

### CDN

``` html
# css
<link href="http://qjge81f6q.hd-bkt.clouddn.com/vue-okr-tree.css">

# js
<script src="http://qjge81f6q.hd-bkt.clouddn.com/vue-okr-tree.umd.min.js"></script>
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
| filter-node-method | 对树节点进行筛选时执行的方法，返回 true 表示这个节点可以显示，返回 false 则表示这个节点会被隐藏 |  Function(value, data, node) |  — | —
| aniamte | 是否开启节点展开的过渡动画 |  Boolean |  — |  false
| animate-name | 过渡动画名称，支持动画类型有 okr-fade-in-linear/okr-fade-in/okr-zoom-in-center/okr-zoom-in-top/okr-zoom-in-bottom |  String |  — |  okr-zoom-in-center

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


#### 方法

  方法名      | 说明                            | 回调参数
  ------------------|-----------------------------------------|:----------------------
  filter |  对树节点进行筛选操作  | 接收一个任意类型的参数，该参数会在 filter-node-method 中作为第一个参数
 getNode            |  根据 data 或者 key 拿到 Tree 组件中的 node,使用此方法必须设置 node-key 属性  | (data) 要获得 node 的 key 或者 data
 setCurrentNode            |  通过 node 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性  | (node) 待被选节点的 node
  setCurrentKey            |  	通过 key 设置某个节点的当前选中状态，使用此方法必须设置 node-key 属性  | (key) 待被选节点的 key，若为 null 则取消当前高亮的节点
getCurrentKey            |  获取当前被选中节点的 key，使用此方法必须设置 node-key 属性，若没有节点被选中则返回 null  | —
getCurrentNode   |  	获取当前被选中节点的 data，若没有节点被选中则返回 null | —
remove   |  删除 Tree 中的一个节点，使用此方法必须设置 node-key 属性 | (data) 要删除的节点的 id 或者 data 或者 node
append   |  为 Tree 中的一个节点追加一个子节点 | 		(data, parentNode) 接收两个参数，1. 要追加的子节点的 data 2. 子节点的 parent 的 data、key 或者 node
insertBefore   |  为 Tree 的一个节点的前面增加一个节点 | 	(data, refNode) 接收两个参数，1. 要增加的节点的 data 2. 要增加的节点的后一个节点的 data、key 或者 node
insertAfter   |  为 Tree 的一个节点的后面增加一个节点 | 	(data, refNode) 接收两个参数，1. 要增加的节点的 data 2. 要增加的节点的前一个节点的 data、key 或者 node




## 浏览器支持情况

Modern browsers and Internet Explorer 10+.

## License
[MIT](http://opensource.org/licenses/MIT)
