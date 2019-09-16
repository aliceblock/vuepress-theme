<template>
  <router-link :to="data.path">
    <div class="card">
      <div class="card-image">
        <figure class="image is-2by1">
          <img :src="data.coverImage" :alt="data.title" />
        </figure>
      </div>
      <div class="card-content">
        <div class="columns">
          <div class="column" style="min-width: 0;">
            <time
              class="has-text-primary"
              :datetime="momentCalendar"
              :title="momentCalendar"
            >{{ momentDate }}</time>
            <p class="title is-4" :title="data.title">{{ data.title }}</p>

            <div class="content">{{ data.description }}</div>
          </div>
        </div>
        <div class="columns">
          <div class="column">
            <TagList :tags="data.tags" />
          </div>
        </div>
      </div>
    </div>
  </router-link>
</template>

<script>
import Post from "../models/Post";

export default {
  props: {
    data: {
      type: Object,
      default() {
        return {};
      }
    }
  },
  computed: {
    momentDate() {
      return this.data.getMoment();
    },
    momentCalendar() {
      return this.data.getDate();
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  display: flex;
  flex-direction: column;
  min-height: 460px;

  @media screen and (max-width: 768px) {
    min-height: 410px;
  }
}
.card-content {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  .title {
    line-height: 2rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .content {
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
  }
}
</style>