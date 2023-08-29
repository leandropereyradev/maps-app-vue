import { defineComponent, onMounted, ref, watch } from "vue";
import usePlacesStore from "@/composables/usePlacesStore";
import mapboxgl from "mapbox-gl";

export default defineComponent({
  name: "Map View",
  setup() {
    const mapElement = ref<HTMLDivElement>();
    const { userLocation, isUserLocationReady } = usePlacesStore();

    const initMap = async () => {
      if (!mapElement.value) throw new Error("Div Element no existe");
      if (!userLocation.value) throw new Error("User Location no existe");

      await Promise.resolve();

      new mapboxgl.Map({
        container: mapElement.value,
        style: "mapbox://styles/mapbox/streets-v12",
        center: userLocation.value,
        zoom: 15,
      });
    };

    onMounted(() => {
      if (isUserLocationReady.value) initMap();

      console.log("No tengo localización");
    });

    watch(isUserLocationReady, (newVal) => {
      if (isUserLocationReady.value) initMap();
    });

    return {
      isUserLocationReady,
      mapElement,
    };
  },
});
