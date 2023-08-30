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

    //Borrar la Polyline al borrar la búsqueda
    if (state.map?.getLayer("RouteString")) {
      state.map.removeLayer("RouteString");
      state.map.removeSource("RouteString");

      state.distance = undefined;
      state.duration = undefined;
    }
  },

  setRoutePolyline(state, coords: number[][]) {
    const start = coords[0];
    const end = coords[coords.length - 1];

    //Definir los bounds: son los puntos contenidos en el mapa
    const bounds = new mapboxgl.LngLatBounds(
      [start[0], start[1]],
      [start[0], start[1]]
    );

    //Agregamos cada punto en nuestros bounds
    for (const coord of coords) {
      const newCoord: [number, number] = [coord[0], coord[1]];
      bounds.extend(newCoord);
    }

    state.map?.fitBounds(bounds, {
      padding: 200,
    });

    //Graficar la Polyline
    const sourcerData: mapboxgl.AnySourceData = {
      type: "geojson",
      data: {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "LineString",
              coordinates: coords,
            },
          },
        ],
      },
    };

    if (state.map?.getLayer("RouteString")) {
      state.map.removeLayer("RouteString");
      state.map.removeSource("RouteString");
    }

    state.map?.addSource("RouteString", sourcerData);

    state.map?.addLayer({
      id: "RouteString",
      type: "line",
      source: "RouteString",
      layout: {
        "line-cap": "round",
        "line-join": "round",
      },
      paint: {
        "line-color": "black",
        "line-width": 3,
      },
    });
  },
};

export default mutation;
