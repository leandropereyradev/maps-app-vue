<template>
  <MapView />
  <MyLocationBtn />
  <SearchBar />
  <TripDetails />
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { usePlacesStore } from '@/composables';

import MapView from "@/components/mapView/MapView.vue"
import MyLocationBtn from '@/components/my-location-btn/MyLocationBtn.vue'
import SearchBar from '@/components/searchBar/SearchBar.vue'
import TripDetails from '@/components/tripDetails/TripDetails.vue'

export default defineComponent({
  name: 'HomeView',
  components: {
    MapView,
    MyLocationBtn,
    SearchBar,
    TripDetails
  },
  setup() {
    usePlacesStore()
  }
});
</script>
