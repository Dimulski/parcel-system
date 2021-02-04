<template>
  <div class="default-layout">
    <div class="default-layout-content min-h-screen overflow-x-hidden">
      <Header />
      <slot />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import Header from "@/components/Header.vue";

export default defineComponent({
  name: "Home",
  components: {
    Header,
  },
});
</script>

<style lang="scss">
div.default-layout-content {
  margin-left: calc(100vw - 100%);
}
body .default-layout {
  @apply bg-gray-100 print:bg-white;
}
</style>