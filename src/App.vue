<template>
  <div id="app">
    <div v-html="rawHtml"></div>
    <img src="./assets/logo.png">
    <h2 class="well">{{ msg }}</h2>
    <h4>Essential Links</h4>
    <ul>
      <li><a href="https://vuejs.org" target="_blank" class="btn btn-primary btn-sm">Core Docs</a></li>
      <li><a href="https://forum.vuejs.org" target="_blank" class="btn btn-primary btn-sm">Forum</a></li>
      <li><a href="https://gitter.im/vuejs/vue" target="_blank" class="btn btn-primary btn-sm">Gitter Chat</a></li>
      <li><a href="https://twitter.com/vuejs" target="_blank" class="btn btn-primary btn-sm">Twitter</a></li>
    </ul>
    <h4>Ecosystem</h4>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank" class="btn btn-primary btn-sm">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank" class="btn btn-primary btn-sm">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank" class="btn btn-primary btn-sm">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank" class="btn btn-primary btn-sm">awesome-vue</a></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'

    }
  }
}
</script>

<style lang="scss">@import "style.scss";</style>
