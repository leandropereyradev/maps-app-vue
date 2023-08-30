<script lang="ts" src="./TripDetails.ts"/>

<template>
  <div v-if="distance" class="trip-container column">
    <div class="col">Distancia: <strong>{{ distance }} Kms</strong></div>
    <div class="col">Duración: <strong>{{ duration }} minutos</strong></div>
  </div>
</template>

<style scoped>
.trip-container {
  background-color: #fff;
  border-radius: 10px;
  bottom: 50px;
  box-shadow: 0 10px 10px rgba(0, 0, 0, 0.2);
  font-size: 25px;
  left: 50%;
  right: 50%;
  padding: 10px;
  position: fixed;
  width: 350px;
}

strong {
  color: #42b983;
}
</style>