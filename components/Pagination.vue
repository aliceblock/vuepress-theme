<template>
  <nav class="pagination is-centered is-rounded" role="navigation" aria-label="pagination">
    <router-link
      v-if="current != 1"
      :to="{path: $withBase(''), query: { ...this.$route.query, page: current - 1 }}"
      class="pagination-previous"
    >Previous</router-link>
    <router-link
      v-if="current != lastPage"
      :to="{path: $withBase(''), query: { ...this.$route.query, page: current + 1 }}"
      class="pagination-next"
    >Next page</router-link>
    <ul class="pagination-list">
      <li>
        <router-link
          :to="{path: $withBase(''), query: { ...this.$route.query, page: 1 }}"
          class="pagination-link"
          :class="{'is-current': current == 1}"
          aria-label="Goto page 1"
        >1</router-link>
      </li>
      <li v-if="current >= 4">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li v-if="current >= 3">
        <router-link
          :to="{path: $withBase(''), query: { ...this.$route.query, page: current - 1 }}"
          class="pagination-link"
          :aria-label="`Goto page ${current - 1}`"
        >{{ current - 1 }}</router-link>
      </li>
      <li v-if="current >= 2 && lastPage - current >= 1">
        <a
          class="pagination-link is-current"
          :aria-label="`Page ${current}`"
          aria-current="page"
        >{{ current }}</a>
      </li>
      <li v-if="lastPage - current >= 2">
        <router-link
          :to="{path: $withBase(''), query: { ...this.$route.query, page: current + 1 }}"
          class="pagination-link"
          :aria-label="`Goto page ${current + 1}`"
        >{{ current + 1 }}</router-link>
      </li>
      <li v-if="lastPage - current >= 3">
        <span class="pagination-ellipsis">&hellip;</span>
      </li>
      <li v-if="lastPage != 1">
        <router-link
          :to="{path: $withBase(''), query: { ...this.$route.query, page: lastPage }}"
          class="pagination-link"
          :class="{'is-current': current == lastPage}"
          :aria-label="`Goto page ${lastPage}`"
        >{{ lastPage }}</router-link>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  props: {
    current: {
      type: Number,
      default: 1
    },
    perPage: {
      type: Number,
      default: 0
    },
    totalItem: {
      type: Number,
      default: 0
    }
  },
  computed: {
    lastPage() {
      return Math.ceil(this.totalItem / this.perPage);
    }
  }
};
</script>