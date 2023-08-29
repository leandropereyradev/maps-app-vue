import { defineComponent, ref } from "vue";
import { useMapStore, usePlacesStore } from "@/composables";
import { Feature } from "@/interfaces/places";

export default defineComponent({
  name: "Search Result",
  setup() {
    const { places, isLoadingPlaces } = usePlacesStore();
    const { map } = useMapStore();
    const activePlace = ref("");

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
    };
  },
});
