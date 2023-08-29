<script lang="ts" src="./MapView.ts"/>

<template>
  <div v-if="!isUserLocationReady" class="loading-map d-flex justify-content-center align-items-center">
    <div class="text-center">
      <h3>Espere, por favor</h3>
      <span>Localizando...</span>
    </div>
  </div>

  <div v-show="isUserLocationReady" class="map-container" ref="mapElement"></div>
</template>

<style scoped>
.loading-map {
  background-color: rgba(0, 0, 0, 0.8);
  color: aliceblue;
  height: 100vh;
  left: 0;
  position: fixed;
  top: 0;
  width: 100vw;
  z-index: 999;
}

.map-container {
  height: 100vh;
  position: fixed;
  width: 100vw;
}
</style>