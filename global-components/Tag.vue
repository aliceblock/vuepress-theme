<template>
  <router-link class="tag-element" :to="`/?tag=${tag}`">
    #<slot />
  </router-link>
</template>

<script>
export default {
  props: {
    tag: {
      type: String,
      default: ''
    }
  }
}
</script>

<style lang="scss">
.tag-element + .tag-element {
  margin-left: 5px;
}
</style>