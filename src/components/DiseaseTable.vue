<template>
  <div v-if="diseases.length > 0">
    <h5 id="placeholder">Rezultati pretrage</h5>
    <table class="table table-striped table-hover">
      <tbody>
        <tr class="list-content" v-for="(disease, index) in diseases">
          <td>{{ index + 1 }}</td>
          <td>{{ disease.name }}</td>
          <td><a :href="disease.url" target="_blank">Izvorišni članak</a></td>
          <td>
            <button
              class="btn btn-primary"
              @click.prevent="$emit('select', disease)">
              Prikaži
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>
    <span>0 rezultata</span>
  </div>
</template>

<script>
'use strict';

export default {
  name: 'disease-table',
  props: [ 'diseases' ]
}
</script>
