<template>
  <div class="container max-w-4xl mx-auto px-6 pb-12">
    <ParcelForm />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ParcelForm from "@/components/ParcelForm.vue";

export default defineComponent({
  name: "CreateParcel",
  components: {
    ParcelForm,
  },
});
</script>
