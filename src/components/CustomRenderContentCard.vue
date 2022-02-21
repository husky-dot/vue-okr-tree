<template>
  <div class="custom">
    <span class="custom-label">{{ data.label }}</span>
    <span class="custom-content">{{ data.content }}</span>
  </div>
</template>
<script>
export default {
  name: 'CustomRenderContentCard',
  props: {
    data: {
      type: Object,
      default() {
        return {
          label: '',
          content: ''
        }
      }
    }
  },
  setup() {},
}
</script>
<style scoped>
.custom-label {
  font-weight: 600;
}
</style>