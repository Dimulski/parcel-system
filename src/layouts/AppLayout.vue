<template>
  <component :is="layout">
    <slot />
  </component>
</template>

<script lang="ts">
import { defineComponent, computed, defineAsyncComponent } from "vue";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "AppLayout",
  setup() {
    const defaultLayout = "DefaultLayout";
    const route = useRoute();

    const layout = computed(function () {
      const layoutName = route.meta.layout || defaultLayout;
      return defineAsyncComponent(() => import(`@/layouts/${layoutName}.vue`));
    });

    return {
      layout: layout,
    };
  },
});
</script>
