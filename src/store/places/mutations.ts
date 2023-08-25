import { MutationTree } from "vuex";
import { PlacesState } from "./state";

const mutation: MutationTree<PlacesState> = {
  setLngLat(state: PlacesState, coords) {
    console.log({ coords });

    state.userLocation = coords;
    state.isLoading = false;
  },
};

export default mutation;
