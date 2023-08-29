import { defineComponent, onMounted, ref, watch } from "vue";
import mapboxgl from "mapbox-gl";
import { useMapStore, usePlacesStore } from "@/composables";

export default defineComponent({
  name: "Map View",
  setup() {
    const mapElement = ref<HTMLDivElement>();
    const { userLocation, isUserLocationReady } = usePlacesStore();
    const { setMap } = useMapStore();

    const initMap = async () => {
      if (!mapElement.value) throw new Error("Div Element no existe");
      if (!userLocation.value) throw new Error("User Location no existe");

      await Promise.resolve();

      const map = new mapboxgl.Map({
        container: mapElement.value,
        style: "mapbox://styles/mapbox/streets-v12",
        center: userLocation.value,
        zoom: 15,
      });

      const customHTML = `
        <h4>Aquí estoy</h4>
        <p>Actualmente en Barcelona</p>
      `;

      const myLocationPopup = new mapboxgl.Popup()
        .setLngLat(userLocation.value)
        .setHTML(customHTML);

      new mapboxgl.Marker()
        .setLngLat(userLocation.value)
        .setPopup(myLocationPopup)
        .addTo(map);

      setMap(map);
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
