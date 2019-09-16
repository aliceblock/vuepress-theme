<template>
  <span><Tag v-for="tag in tags" :tag="tag">{{ tag | capitalize }}</Tag></span>
</template>

<script>
export default {
  props: {
    tags: {
      type: Array,
      default: []
    }
  }
}
</script>