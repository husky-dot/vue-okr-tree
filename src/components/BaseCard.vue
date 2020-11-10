<template>
  <div class="base-card-wrapper">
    <div class="card-source">
      <slot name="header"></slot>
    </div>
    <div
      ref="meta"
      class="card-body-meta"
      :style="{ height: metaHeight + 'px' }"
    >
      <div v-if="$slots.description" class="description">
        <slot name="description" />
      </div>
      <slot></slot>
    </div>
    <div class="base-card-control" @click="handleClick">
      {{ show ? "隐藏代码" : "显示代码" }}
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      show: false,
      metaHeight: 0
    };
  },
  methods: {
    handleClick() {
      this.show = !this.show;
      if (this.show) {
        const { height } = this.$slots.default[0].elm.getBoundingClientRect();
        this.metaHeight = height + 80;
      } else {
        this.metaHeight = 0;
      }
    }
  }
};
</script>

<style scoped>
.base-card-wrapper {
  border: 1px solid #ebebeb;
  border-radius: 3px;
  transition: all 0.2s;
}

.base-card-wrapper .card-source {
  padding: 24px;
  box-sizing: border-box;
}
.base-card-wrapper .base-card-control {
  border-top: 1px solid #eaeefb;
  height: 44px;
  box-sizing: border-box;
  background-color: #fff;
  border-bottom-left-radius: 4px;
  border-bottom-right-radius: 4px;
  text-align: center;
  margin-top: -1px;
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
}
.base-card-wrapper .base-card-control:hover {
  color: #409eff;
}
.base-card-wrapper .card-body-meta {
  border-top: 1px solid #eaeefb;
  height: 0px;
  overflow: hidden;
  transition: height 0.25s;
  background: #f5f2f0;
}
.base-card-wrapper .card-body-meta .language-css {
  margin: 0;
}

.card-body-meta .description {
  padding: 20px;
  box-sizing: border-box;
  border: 1px solid #ebebeb;
  border-radius: 3px;
  font-size: 14px;
  line-height: 22px;
  color: #666;
  word-break: break-word;
  margin: 10px;
  background-color: #fff;
}
.card-body-meta .description code {
  color: #5e6d82;
  background-color: #e6effb;
  margin: 0 4px;
  display: inline-block;
  padding: 1px 5px;
  font-size: 12px;
  border-radius: 3px;
  height: 18px;
  line-height: 18px;
}
</style>
