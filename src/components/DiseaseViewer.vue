<template>
  <div v-if="description"
    class="disease-viewer">
    <h2 class="name">{{ disease.name }}</h2>
    <div class="description" v-html="description"></div>
    <button
      class="btn btn-primary"
      @click.prevent="$emit('close')">
      Close
    </button>
  </div>
  <div v-else
    class="loader">
    Fetching disease description...
  </div>
</template>

<style lang="scss">
  .description {
    text-align: left;
  }
</style>

<script>
import Diseases from '../lib/Diseases.js';

export default {
  name: 'disease-viewer',
  props: [ 'disease' ],
  data() {
    return {
      description: ''
    };
  },
  watch: {
    disease() {
      this.description = '';
      if (!this.disease) return;
      Diseases.getDescription(this.disease)
        .then(description => this.description = description);
    }
  }
}
</script>
