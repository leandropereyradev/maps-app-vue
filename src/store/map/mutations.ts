import { MutationTree } from "vuex";
import { MapState } from "./state";
import mapboxgl from "mapbox-gl";
import { Feature } from "@/interfaces/places";
import placesModule from "../places/index";

const mutation: MutationTree<MapState> = {
  setMap(state, map: mapboxgl.Map) {
    state.map = map;
  },

  setPlaceMarkers(state, places: Feature[]) {
    //Borrar marcadores
    state.markers.forEach((marker) => marker.remove());
    state.markers = [];

    if (!state.map) return;

    //Crear nuevos marcadores
    for (const place of places) {
      const [lng, lat] = place.center;

      const customHTML = `
        <h4>${place.text}</h4>
        <p>${place.place_name}</p>
      `;

      const popup = new mapboxgl.Popup()
        .setLngLat([lng, lat])
        .setHTML(customHTML);

      const newMarkers = new mapboxgl.Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(state.map);

      state.markers.push(newMarkers);
    }
  },
};

export default mutation;
