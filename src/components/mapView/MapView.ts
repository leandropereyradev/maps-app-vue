import { defineComponent, onMounted, ref } from "vue";
import usePlacesStore from "@/composables/usePlacesStore";

export default defineComponent({
  name: "Map View",
  setup() {
    const mapElement = ref<HTMLDivElement>();
    const { userLocation, isUserLocationReady } = usePlacesStore();

    onMounted(() => {
      console.log(mapElement.value);
    });
    return {
      isUserLocationReady,
      mapElement,
    };
  },
});
