<template>
  <div class="max-w-2xl mx-auto">
    <h1 class="text-2xl">Parcels</h1>
  </div>
  <div class="mt-6" v-for="number in [0, 1]" :key="number">
    <div
      class="block max-w-2xl px-5 md:px-9 py-6 mx-auto bg-white rounded-lg shadow-md cursor-pointer"
    >
      <div class="mt-2 mb-1">
        <div class="flex justify-between items-center text-blue-700 text-sm">
          <span
            class="mb-4 mt-1 w-4/12 h-3 animate-pulse bg-blue-200 rounded-md"
          >
          </span>
          <span
            class="mb-4 mt-1 w-3/12 h-3 animate-pulse bg-blue-200 rounded-md"
          >
          </span>
        </div>

        <span class="flex mb-2 w-7/12 h-4 animate-pulse bg-gray-300 rounded-md">
        </span>
      </div>
    </div>
  </div>
</template>
