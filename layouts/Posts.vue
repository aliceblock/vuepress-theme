<template>
  <div
    class="theme-container"
    :class="pageClasses"
    @touchstart="onTouchStart"
    @touchend="onTouchEnd"
  >
    <Navbar v-if="shouldShowNavbar" @toggle-sidebar="toggleSidebar" />

    <div class="sidebar-mask" @click="toggleSidebar(false)"></div>

    <Sidebar :items="sidebarItems" @toggle-sidebar="toggleSidebar">
      <slot name="sidebar-top" slot="top" />
      <slot name="sidebar-bottom" slot="bottom" />
    </Sidebar>

    <div class="bulma-container">
      <div class="main-container container">
        <div class="is-size-3" v-if="tag" style="margin-bottom: 50px;">
          <Tag :tag="tag">{{ tag | capitalize }}</Tag>
        </div>
        <div v-if="posts.length">
          <div class="columns is-multiline">
            <div class="column is-one-third-desktop is-half-tablet" v-for="post in posts">
              <Post :data="post" />
            </div>
          </div>
          <Pagination :current="currentPage" :per-page="perPage" :totalItem="getAllPosts().length" />
        </div>
        <div v-else>No posts found 😵</div>
      </div>
    </div>
  </div>
</template>

<script>
import PostModel from "../models/Post";
import Navbar from "@theme/components/Navbar.vue";
import Page from "@theme/components/Page.vue";
import Sidebar from "@theme/components/Sidebar.vue";
import Pagination from "@theme/components/Pagination.vue";
import { resolveSidebarItems } from "../util";

export default {
  components: { Page, Sidebar, Navbar, Pagination },

  data() {
    return {
      isSidebarOpen: false
    };
  },

  computed: {
    shouldShowNavbar() {
      const { themeConfig } = this.$site;
      const { frontmatter } = this.$page;
      if (frontmatter.navbar === false || themeConfig.navbar === false) {
        return false;
      }
      return (
        this.$title ||
        themeConfig.logo ||
        themeConfig.repo ||
        themeConfig.nav ||
        this.$themeLocaleConfig.nav
      );
    },

    shouldShowSidebar() {
      const { frontmatter } = this.$page;
      return (
        !frontmatter.home &&
        frontmatter.sidebar !== false &&
        this.sidebarItems.length
      );
    },

    sidebarItems() {
      return resolveSidebarItems(
        this.$page,
        this.$page.regularPath,
        this.$site,
        this.$localePath
      );
    },

    pageClasses() {
      const userPageClass = this.$page.frontmatter.pageClass;
      return [
        {
          "no-navbar": !this.shouldShowNavbar,
          "sidebar-open": this.isSidebarOpen,
          "no-sidebar": !this.shouldShowSidebar
        },
        userPageClass
      ];
    },

    tag() {
      return this.$frontmatter.tag || this.$route.query.tag;
    },

    currentPage() {
      return +this.$route.query.page || 1;
    },

    perPage() {
      const { themeConfig } = this.$site;
      return themeConfig.per_page || 6;
    },

    posts() {
      let posts = this.getAllPosts();

      posts = posts.slice(
        (this.currentPage - 1) * this.perPage,
        (this.currentPage - 1) * this.perPage + this.perPage
      );

      posts = posts.map(post => {
        return new PostModel({
          title: post.frontmatter.title,
          description: post.frontmatter.description,
          coverImage: post.frontmatter.image,
          tags: post.frontmatter.tags,
          path: post.path,
          publishDate: post.frontmatter.date,
          lang: post.frontmatter.lang
        });
      });
      return posts;
    }
  },

  mounted() {
    this.$router.afterEach(() => {
      this.isSidebarOpen = false;
    });
  },

  methods: {
    toggleSidebar(to) {
      this.isSidebarOpen = typeof to === "boolean" ? to : !this.isSidebarOpen;
    },

    // side swipe
    onTouchStart(e) {
      this.touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY
      };
    },

    onTouchEnd(e) {
      const dx = e.changedTouches[0].clientX - this.touchStart.x;
      const dy = e.changedTouches[0].clientY - this.touchStart.y;
      if (Math.abs(dx) > Math.abs(dy) && Math.abs(dx) > 40) {
        if (dx > 0 && this.touchStart.x <= 80) {
          this.toggleSidebar(true);
        } else {
          this.toggleSidebar(false);
        }
      }
    },

    getAllPosts() {
      const basePath = this.$page.path;
      const posts = this.$site.pages
        .filter((post, index) => {
          // const isDraft = post.frontmatter.draft && (typeof webpackHotUpdate !== 'undefined');  // On dev server show all posts
          const isDraft = post.frontmatter.draft
          const isPublished =
            new Date(post.frontmatter.date).getTime() <= new Date().getTime();
          const isPage = post.path.match(new RegExp(`(${basePath})(?=.*html)`));
          const tagFound =
            !this.tag ||
            (post.frontmatter.tags || []).find(el => el == this.tag);
          return !isDraft && isPublished && isPage && tagFound;
        })
        .sort((a, b) => {
          return new Date(b.frontmatter.date) - new Date(a.frontmatter.date);
        });
      return posts;
    }
  }
};
</script>

<style lang="scss">
.main-container {
  padding: 2rem;

  > :first-child {
    margin-top: 3.6rem;
  }

  @media (max-width: 419px) {
    padding: 1.5rem;
  }
}
</style>