<template>
  <div id="app">
    <!-- Navigation -->
    <nav class="navbar navbar-default navbar-fixed-top">
      <search-bar
        class="container-fluid"
        @search="query => search(query)">
      </search-bar>
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

    <nav id="footer" class="vbar navbar-default navbar-fixed-bottom">
      Izvor: <a target="_blank" :href="dataSourceUrl">{{ dataSourceUrl }}</a>
    </nav>
  </div>

</template>

<script>
'use strict';

import Diseases from './lib/Diseases.js';
import SearchBar from './components/SearchBar.vue';
import DiseaseViewer from './components/DiseaseViewer.vue';
import DiseaseTable from './components/DiseaseTable.vue';

export default {
  name: 'app',
  data() {
    return {
      diseases: [],
      selectedDisease: null,
      dataSourceUrl: Diseases.baseUrl
    };
  },
  methods: {
    search(query) {
      if (!query) {
        this.diseases = [];
        return;
      }
      Diseases.search(query)
        .then(diseases => this.diseases = diseases);
    }
  },
  components: { SearchBar, DiseaseViewer, DiseaseTable }
};
</script>

<style lang="scss">
  @import "style.scss";
</style>
