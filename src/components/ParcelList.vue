<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-2xl">Parcels</h1>
  </div>
  <ParcelItem
    v-for="parcel in parcels"
    :parcel="parcel"
    :key="parcel.ref"
  ></ParcelItem>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ParcelItem from "@/components/ParcelItem.vue";
import useParcels from "@/composables/parcels";

export default defineComponent({
  name: "ParcelList",
  components: {
    ParcelItem,
  },
  async setup() {
    const { parcels } = await useParcels();

    return { parcels };
  },
});
</script>
