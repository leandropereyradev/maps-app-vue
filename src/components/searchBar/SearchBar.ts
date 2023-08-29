import { computed, defineComponent, ref } from "vue";
import { usePlacesStore } from "@/composables";

import SearchResult from "../searchResult/SearchResult.vue";

export default defineComponent({
  name: "Search Bar",
  components: {
    SearchResult,
  },

  setup() {
    const { searchPlacesByTerm } = usePlacesStore();
    const debounceTimeOut = ref();
    const debounceValue = ref("");

    return {
      debounceValue,

      searchTerm: computed({
        get() {
          return debounceValue.value;
        },

        set(val: string) {
          if (debounceTimeOut.value) clearTimeout(debounceTimeOut.value);

          debounceTimeOut.value = setTimeout(() => {
            debounceValue.value = val;

            searchPlacesByTerm(val);
          }, 500);
        },
      }),
    };
  },
});
