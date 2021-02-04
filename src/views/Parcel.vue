<template>
  <main class="mb-10 px-3">
    <Suspense>
      <template #default>
        <ParcelDetails />
      </template>
      <template #fallback>
        <ParcelDetailsTemplate />
      </template>
    </Suspense>
  </main>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ParcelDetails from "@/components/ParcelDetails.vue";
import ParcelDetailsTemplate from "@/components/ParcelDetailsTemplate.vue";

export default defineComponent({
  name: "Parcel",
  components: { ParcelDetails, ParcelDetailsTemplate },
});
</script>
