<script lang="ts" src="./SearchBar.ts"/>

<template>
  <div class="searchbar-container">
    <input type="text" placeholder="Burcar lugares..." class="form-control" v-model="searchTerm">
    {{ debounceValue }}

    <SearchResult />

  </div>
</template>

<style scoped>
.searchbar-container {
  background-color: white;
  border-radius: 10px !important;
  box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.2);
  left: 30px;
  overflow: hidden;
  padding: 5px;
  position: fixed;
  top: 30px;
  width: 250px;
  z-index: 999;
}
</style>