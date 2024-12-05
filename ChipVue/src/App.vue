<template>
  <div id="app">
    <notifications position="top center" />
    <header
      is="AppHeader"
    ></header>

    <div class="content">
      <router-view></router-view>
    </div>

    <footer is="AppFooter"></footer>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader.vue'
import AppFooter from './components/AppFooter.vue'


export default {
    name: 'app',
    components: {
        AppHeader,
        AppFooter
    },
    data () {
        return {

        }
    },
    created () {
      this.$loading(true)
      this.$store.dispatch('categories/getCategories')
        .then(() => { this.$loading(false) })
        .catch(() => { this.$loading(false) });
    }
}
</script>
