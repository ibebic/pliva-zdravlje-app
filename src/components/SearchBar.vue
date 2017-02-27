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
            v-model.trim="searchQuery"
            @keyup.enter.prevent="$emit('search', searchQuery)">
        </div>
        <button
          class="btn btn-primary"
          @click.prevent="$emit('search', searchQuery)">
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
    return { searchQuery: null }
  },
  methods: {
    reset() {
      this.searchQuery = null;
      this.$emit('search');
    }
  }
}
</script>
