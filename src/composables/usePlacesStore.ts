import { computed, onMounted } from "vue";
import { useStore } from "vuex";
import { StateInterface } from "@/store";

const usePlacesStore = () => {
  const store = useStore<StateInterface>();

  onMounted(() => {
    if (!store.getters["places/isUserLocationReady"]) {
      store.dispatch("places/getInitialLocation");
    }
  });

  return {
    //Store
    isLoading: computed(() => store.state.places.isLoading),
    userLocation: computed(() => store.state.places.userLocation),

    //Getters
    isUserLocationReady: computed<boolean>(
      () => store.getters["places/isUserLocationReady"]
    ),
  };
};

export default usePlacesStore;
