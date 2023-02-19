<template>
  <div>
    <h3 class="tree-demo-title-h3">OKR 展示模式</h3>
    <p>
      该模式的出现，是为了实现跟飞书OKR 展示的视图一样效果，所以在 Tree
      的模式下，扩展成左右两棵子树2
    </p>
    <BaseCard>
      <template v-slot:header>
        <div class="component-wrapper" id="component-wrapper">
          <vue-okr-tree
            :data="testData"
            :left-data="testLeftData"
            onlyBothTree
            direction="horizontal"
            show-collapsable
            node-key="id"
            default-expand-all
          ></vue-okr-tree>
          <vue-okr-tree
            :data="testData"
            :left-data="testLeftData2"
            onlyBothTree
            direction="horizontal"
            show-collapsable
            node-key="id"
            default-expand-all
          ></vue-okr-tree>
        </div>
      </template>
      <template v-slot:description>
        该模式必须设置 <code>onlyBothTree</code> ，以及通过
        <code>leftData</code>表示左子数的结构
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
      testData: [
        {
          id: 1,
          label: "xxx科技有有限公司",
          children: [
            {
              id: 2,
              label: "产品研发部",
              children: [
                {
                  id: 3,
                  label: "研发-前端"
                },
                {
                  id: 4,
                  label: "研发-后端"
                },
                {
                  id: 5,
                  label: "UI 设计"
                }
              ]
            },
            {
              id: 6,
              label: "销售部",
              children: [
                {
                  id: 7,
                  label: "销售一部"
                },
                {
                  id: 8,
                  label: "销售二部"
                }
              ]
            },
            {
              id: 9,
              label: "财务部"
            }
          ]
        }
      ],
      testLeftData: [
        {
          id: 1,
          label: "xxx科技有有限公司",
          children: [
            {
              id: 12,
              label: "(左)产品研发部",
              children: [
                {
                  id: 13,
                  label: "(左)研发-前端"
                },
                {
                  id: 14,
                  label: "(左)研发-后端"
                },
                {
                  id: 15,
                  label: "(左)UI 设计"
                }
              ]
            },
            {
              id: 16,
              label: "(左)销售部",
              children: [
                {
                  id: 17,
                  label: "(左)销售一部"
                },
                {
                  id: 18,
                  label: "(左)销售二部"
                }
              ]
            },
            {
              id: 19,
              label: "(左)财务部"
            }
          ]
        }
      ],
      testLeftData2: [
        {
          id: 1,
          label: "xxx科技有有限公司",
          children: [
            {
              id: 12,
              label: "(左)产品研发部",
              children: [
                {
                  id: 13,
                  label: "(左)研发-前端",
                  children: [
                    {
                      id: 17,
                      label: "(左)研发-前端一部"
                    },
                    {
                      id: 18,
                      label: "(左)研发-前端二部"
                    }
                  ]
                },
                {
                  id: 14,
                  label: "(左)研发-后端"
                },
                {
                  id: 15,
                  label: "(左)UI 设计"
                }
              ]
            },
            {
              id: 16,
              label: "(左)销售部",
              children: [
                {
                  id: 17,
                  label: "(左)销售一部"
                },
                {
                  id: 18,
                  label: "(左)销售二部"
                }
              ]
            },
            {
              id: 19,
              label: "(左)财务部"
            }
          ]
        }
      ],
      content:`
      <div class="component-wrapper" id="component-wrapper">
          <vue-okr-tree
            :data="testData"
            :left-data="testLeftData"
            onlyBothTree
            direction="horizontal"
            show-collapsable
            node-key="id"
            default-expand-all
          ></vue-okr-tree>
          <vue-okr-tree
            :data="testData"
            :left-data="testLeftData2"
            onlyBothTree
            direction="horizontal"
            show-collapsable
            node-key="id"
            default-expand-all
          ></vue-okr-tree>
        </div>
        <script>
        export default {
          data () {
            return {
              testData: [
                {
                  id: 1,
                  label: "xxx科技有有限公司",
                  children: [
                    {
                      id: 2,
                      label: "产品研发部",
                      children: [
                        {
                          id: 3,
                          label: "研发-前端"
                        },
                        {
                          id: 4,
                          label: "研发-后端"
                        },
                        {
                          id: 5,
                          label: "UI 设计"
                        }
                      ]
                    },
                    {
                      id: 6,
                      label: "销售部",
                      children: [
                        {
                          id: 7,
                          label: "销售一部"
                        },
                        {
                          id: 8,
                          label: "销售二部"
                        }
                      ]
                    },
                    {
                      id: 9,
                      label: "财务部"
                    }
                  ]
                }
              ],
              testLeftData: [
                {
                  id: 1,
                  label: "xxx科技有有限公司",
                  children: [
                    {
                      id: 12,
                      label: "(左)产品研发部",
                      children: [
                        {
                          id: 13,
                          label: "(左)研发-前端"
                        },
                        {
                          id: 14,
                          label: "(左)研发-后端"
                        },
                        {
                          id: 15,
                          label: "(左)UI 设计"
                        }
                      ]
                    },
                    {
                      id: 16,
                      label: "(左)销售部",
                      children: [
                        {
                          id: 17,
                          label: "(左)销售一部"
                        },
                        {
                          id: 18,
                          label: "(左)销售二部"
                        }
                      ]
                    },
                    {
                      id: 19,
                      label: "(左)财务部"
                    }
                  ]
                }
              ],
              testLeftData2: [
                {
                  id: 1,
                  label: "xxx科技有有限公司",
                  children: [
                    {
                      id: 12,
                      label: "(左)产品研发部",
                      children: [
                        {
                          id: 13,
                          label: "(左)研发-前端",
                          children: [
                            {
                              id: 17,
                              label: "(左)研发-前端一部"
                            },
                            {
                              id: 18,
                              label: "(左)研发-前端二部"
                            }
                          ]
                        },
                        {
                          id: 14,
                          label: "(左)研发-后端"
                        },
                        {
                          id: 15,
                          label: "(左)UI 设计"
                        }
                      ]
                    },
                    {
                      id: 16,
                      label: "(左)销售部",
                      children: [
                        {
                          id: 17,
                          label: "(左)销售一部"
                        },
                        {
                          id: 18,
                          label: "(左)销售二部"
                        }
                      ]
                    },
                    {
                      id: 19,
                      label: "(左)财务部"
                    }
                  ]
                }
              ],
            }
          },
          mounted() {
            // 配合以下代码实现根对齐
            this.$nexTick(() => {
              const el = document.getElementById("component-wrapper");
              const okrRootEl = el.querySelectorAll(
                ".org-chart-node-children > .org-chart-node > .org-chart-node-left-children"
              );
              let maxWidthEl = null;
              okrRootEl.forEach(rootEl => {
                maxWidthEl = maxWidthEl ? maxWidthEl : rootEl;
                maxWidthEl =
                  rootEl.offsetWidth > maxWidthEl.offsetWidth ? rootEl : maxWidthEl;
              });
              okrRootEl.forEach(rootEl => {
                rootEl.style.width = maxWidthEl.offsetWidth + "px";
              });
            });
          }
        }
      </script>
      `
    }
  },
  mounted() {
    this.$nexTick(() => {
      const el = document.getElementById("component-wrapper");
      const okrRootEl = el.querySelectorAll(
        ".org-chart-node-children > .org-chart-node > .org-chart-node-left-children"
      );
      let maxWidthEl = null;
      okrRootEl.forEach(rootEl => {
        maxWidthEl = maxWidthEl ? maxWidthEl : rootEl;
        maxWidthEl =
          rootEl.offsetWidth > maxWidthEl.offsetWidth ? rootEl : maxWidthEl;
      });
      okrRootEl.forEach(rootEl => {
        rootEl.style.width = maxWidthEl.offsetWidth + "px";
      });
    });
  }
};
</script>

<style scope></style>
