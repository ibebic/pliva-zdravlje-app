<template>
  <div id="app">
    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <img @click.prevent="resetState()" id="header-logo" class="pull-left" src="./assets/pliva-logo.png" alt="">
        </div>

        <div>
          <form class="navbar-form navbar-left" role="search">
            <div class="form-group">
              <input id="searchField" type="text" class="form-control" placeholder="Naziv bolesti...">
            </div>
            <button @click.prevent="populate" class="btn btn-primary">traži</button>
          </form>
        </div>
      </div>
    </nav>
    <!--Content-->
    <h5 id="placeholder">Rezultati pretrage</h5>
    <div id="illnessContent" class="container"></div>
    <div id="appTable" class="container">
      <table class="table table-striped table-hover">
        <tbody>
          <tr class="list-content" v-for="(item, index) in items">
            <td>{{ index + 1 }}</td>
            <td>{{ item.name }}</td>
            <td><a :href="footer + item.url" target="_blank">Izvorišni članak</a></td>
            <td><button @click.prevent="pickOne(footer+item.url)" class="btn btn-primary">Prikaži</button></td>
          </tr>
        </tbody>
      </table>
    </div>
    <nav id="footer" class="vbar navbar-default navbar-fixed-bottom">Izvor: <a target="_blank" :href="footer">{{ footer }}</a></nav>

  </div>

</template>

<script src='./vueCode.js'></script>

<style lang="scss">
  @import "style.scss";
</style>