import { defineComponent, ref, watch } from "vue";
import { useMapStore, usePlacesStore } from "@/composables";
import { Feature } from "@/interfaces/places";

export default defineComponent({
  name: "Search Result",

  setup() {
    const { places, isLoadingPlaces, userLocation } = usePlacesStore();
    const { map, setPlaceMarkers, getRouteBetweenPoints } = useMapStore();

    const activePlace = ref("");

    watch(places, (newPlaces) => {
      activePlace.value = "";

      setPlaceMarkers(newPlaces);
    });

    return {
      isLoadingPlaces,
      places,
      activePlace,

      onPlaceClicked: (place: Feature) => {
        activePlace.value = place.id;

        const [lng, lat] = place.center;

        map.value?.flyTo({
          zoom: 15,
          center: [lng, lat],
        });
      },

      getRouteDirections: (place: Feature) => {
        if (!userLocation.value) return;

        activePlace.value = place.id;

        const [lng, lat] = place.center;
        const [startLng, startLat] = userLocation.value;

        const start: [number, number] = [startLng, startLat];
        const end: [number, number] = [lng, lat];

        getRouteBetweenPoints(start, end);
      },
    };
  },
});
