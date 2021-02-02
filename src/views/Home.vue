<template>
  <div class="container mx-auto px-6 pb-12 pt-4 md:py-8" v-if="true">
    <div class="max-w-2xl mx-auto">
      <h1 class="text-2xl">Parcels</h1>
    </div>
    <ParcelItem
      v-for="parcel in dummyData"
      :parcel="parcel"
      :key="parcel.id"
    ></ParcelItem>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue";
import ParcelItem from "@/components/ParcelItem.vue";

export default defineComponent({
  name: "Home",
  components: {
    ParcelItem,
  },
  setup() {
    const data = ref();
    const loading = ref(true);
    const error = ref(null);
    const dummyData = [
      {
        id: "125412312512",
        description: "fiji water, stack if 6",
        // eslint-disable-next-line @typescript-eslint/camelcase
        delivery_date: "2021-02-12T16:02:39.000Z",
      },
      {
        id: "125672341234",
        description: "Niz plum 84",
        // eslint-disable-next-line @typescript-eslint/camelcase
        delivery_date: "2021-03-4T16:02:39.000Z",
      },
    ];
    function fetchData() {
      loading.value = true;
      // I prefer to use fetch
      return fetch("http://jsonplaceholder.typicode.com/posts", {
        method: "get",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => {
          // a non-200 response code
          if (!res.ok) {
            // create error instance with HTTP status text
            const error = new Error(res.statusText);
            // error.json = res.json();
            throw error;
          }

          return res.json();
        })
        .then((json) => {
          // set the response data
          data.value = json.data;
        })
        .catch((err) => {
          error.value = err;
          // In case a custom JSON error response was provided
          if (err.json) {
            return err.json.then((json: unknown) => {
              json;
              // set the JSON response message
              // error.value.message = json.message;
            });
          }
        })
        .then(() => {
          loading.value = false;
        });
    }

    onMounted(() => {
      fetchData();
    });

    return {
      data,
      loading,
      error,
      dummyData,
    };
  },
});
</script>
