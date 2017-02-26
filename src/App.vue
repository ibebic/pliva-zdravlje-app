<template>
  <div id="app">
    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-fixed-top">
      <div class="container-fluid">
        <div class="navbar-header">
          <img
            id="header-logo" class="pull-left"
            src="./assets/pliva-logo.png" alt=""
            @click.prevent="clearSearch">
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
    <disease-viewer
      class="container"
      :disease="selectedDisease"
      @close="selectedDisease = null"
      v-show="selectedDisease">
    </disease-viewer>

    <disease-table
      class="container"
      :diseases="diseases"
      @select="disease => selectedDisease = disease"
      v-show="!selectedDisease">
    </disease-table>

    <nav id="footer" class="vbar navbar-default navbar-fixed-bottom">Izvor: <a target="_blank" :href="footer">{{ footer }}</a></nav>
  </div>

</template>

<script>
'use strict';

import Diseases from './lib/Diseases.js';
import DiseaseViewer from './components/DiseaseViewer.vue';
import DiseaseTable from './components/DiseaseTable.vue';

export default {
  name: 'app',
  data() {
    return {
      footer: Diseases.baseUrl,
      diseases: [],
      selectedDisease: null
    };
  },
  methods: {
    populate() {
      let val = document.getElementById('searchField').value
      Diseases.search(val)
        .then(diseases => this.diseases = diseases);
    },
    clearSearch() {
      this.diseases = [];
    }
  },

  components: { DiseaseViewer, DiseaseTable }
};
</script>

<style lang="scss">
  @import "style.scss";
</style>
