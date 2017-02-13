<template>
  <div id="app">
    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <img id="header-logo" class="pull-left" src="./assets/logo.png" alt="">
        </div>

        <div>
          <form class="navbar-form navbar-left" role="search">
            <div class="form-group">
              <input id="searchField" type="text" class="form-control" placeholder="Search packages...">
            </div>
            <button @click.prevent="populate" class="btn btn-primary">search</button>
          </form>
        </div>
      </div>
    </nav>
    <!--Content-->
    <h4 id="placeholder">Search Mint software packages</h4>
    <div id="appTable" class="container">
      <table class="table table-striped table-hover">
        <thead>
          <tr class="list-head">
            <td>#</td>
            <td>Score</td>
            <td>Name</td>
            <td>Description</td>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in items">
            <td>{{ index + 1 }}</td>
            <td>{{ item.score }}</td>
            <td><a :href="item.link" target="_blank">{{ item.name }}</a></td>
            <td>{{ item.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav id="footer" class="vbar navbar-default navbar-fixed-bottom">Scraped from <a target="_blank" :href="footer">{{ footer }}</a></nav>

  </div>

</template>

<script src='./vueCode.js'></script>

<style lang="scss">
  @import "style.scss";
</style>