<template>
  <div class="default-layout">
    <div class="default-layout-content min-h-screen overflow-x-hidden">
      <slot />
    </div>
  </div>
</template>

<style lang="scss">
div.default-layout-content {
  margin-left: calc(100vw - 100%);
}
body .default-layout {
  @apply bg-gray-100;
}
</style>