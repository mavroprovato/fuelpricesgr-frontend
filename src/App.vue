<script setup lang="ts">
import {ref} from 'vue'

const url = 'http://localhost:8000/api/data/daily/country';
const data = ref([]);
fetch(url)
    .then(response => response.json())
    .then(responseData => {
      data.value = responseData;
    });
</script>

<template>
  <h1>Fuel prices</h1>
  <p>{{ data }}</p>
</template>

<style scoped></style>
