import { computed, defineComponent } from "vue";
import { useMapStore, usePlacesStore } from "@/composables";

export default defineComponent({
  name: "My Location Bnt",
  setup() {
    const { userLocation, isUserLocationReady } = usePlacesStore();
    const { map, isMapReady } = useMapStore();

    return {
      isBtnReady: computed<boolean>(
        () => isUserLocationReady.value && isMapReady.value
      ),

      onMyLocationClicked: () => {
        map.value?.flyTo({
          center: userLocation.value,
          zoom: 14,
        });
      },
    };
  },
});
