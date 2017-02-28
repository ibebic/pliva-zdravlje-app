<template>
  <div class="container-fluid">
    <div class="navbar-header">
      <img
        id="header-logo" class="pull-left"
        src="../assets/pliva-logo.png" alt="Pliva logo"
        @click.prevent="reset">
    </div>

    <div>
      <form class="navbar-form navbar-left" role="search">
        <div class="form-group">
          <input id="searchField"
            class="form-control"
            type="text"
            placeholder="Naziv bolesti..."
            v-model.trim="query"
            @keyup.enter.prevent="$emit('search', query)">
        </div>
        <button
          class="btn btn-primary"
          @click.prevent="$emit('search', query)">
          traži
        </button>
      </form>
    </div>
  </div>
</template>

<script>
'use strict';

export default {
  name: 'search-bar',
  data() {
    return { query: null }
  },
  methods: {
    reset() {
      this.query = null;
      this.$emit('search');
    }
  }
}
</script>
