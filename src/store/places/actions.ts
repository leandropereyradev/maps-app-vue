import { ActionTree } from "vuex";
import { PlacesState } from "./state";
import { StateInterface } from "../index";
import { searchAPI } from "@/api";
import { PlacesResponse } from "@/interfaces/places";

const actions: ActionTree<PlacesState, StateInterface> = {
  getInitialLocation({ commit }) {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        commit("setLngLat", { lng: coords.longitude, lat: coords.latitude }),
      (error) => {
        console.log(error);
        throw new Error("No geolocation :(");
      }
    );
  },

  async searchPlacesByTerm({ commit, state }, query: string) {
    const resp = await searchAPI.get<PlacesResponse>(`/${query}.json`, {
      params: {
        proximity: state.userLocation?.join(","),
      },
    });

    console.log(resp.data.features);
  },
};

export default actions;
