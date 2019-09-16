<template>
  <div class="fb-comments" :data-href="fullPath" data-width="100%" data-numposts="5" style="max-width: 99%"></div>
</template>

<script>
export default {
  props: {
    path: {
      type: String,
      default: ''
    }
  },
  mounted() {
    const { noComment } = this.$page.frontmatter;
    const { hostname, facebook } = this.$site.themeConfig
    if (hostname && facebook && facebook.app_id && !noComment) {
      this.facebookInit()
    }
  },
  methods: {
    facebookInit() {
      const { themeConfig } = this.$site
      setTimeout(function() {
        window.fbAsyncInit = function() {
          if (FB) {
            FB.init({
              appId : themeConfig.facebook.app_id,
              xfbml      : true,
              version    : 'v2.2'
            });
          }
        };

        (function(d, s, id){
          var js, fjs = d.getElementsByTagName(s)[0];
          if (d.getElementById(id)) {return;}
          js = d.createElement(s); js.id = id;
          js.src = "//connect.facebook.net/en_US/sdk.js";
          fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));

        if (FB) {
          FB.XFBML.parse();
        }
      }, 100);
    }
  },
  computed: {
    fullPath() {
      const { hostname } = this.$site.themeConfig
      return hostname + this.$withBase(this.$page.path)
    }
  }
}
</script>