import { defineComponent } from "vue";
import { usePlacesStore } from "@/composables";

export default defineComponent({
  name: "Search Result",
  setup() {
    const { places, isLoadingPlaces } = usePlacesStore();

    return {
      isLoadingPlaces,
      places,
    };
  },
});
