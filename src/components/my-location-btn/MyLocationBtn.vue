<script lang="ts" src="./MyLocationBtn.ts"/>

<template>
  <button v-if="isBtnReady" class="btn btn-primary" @click="onMyLocationClicked">Ir a mi ubicacion</button>
</template>

<style scoped>
button {
  position: fixed;
  top: 30px;
  right: 30px;
}
</style>