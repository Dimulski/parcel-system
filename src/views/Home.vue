<template>
  <div class="container mx-auto px-6 pb-12 pt-4 md:py-8 mb-32">
    <Suspense>
      <template #default>
        <ParcelList />
      </template>
      <template #fallback>
        <ParcelListTemplate />
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ParcelList from "@/components/ParcelList.vue";
import ParcelListTemplate from "@/components/ParcelListTemplate.vue";

export default defineComponent({
  name: "Home",
  components: {
    ParcelList,
    ParcelListTemplate,
  },
});
</script>
