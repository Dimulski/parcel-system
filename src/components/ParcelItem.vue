<template>
  <div class="mt-6">
    <RouterLink
      :to="`/parcel/${parcel?.ref}`"
      class="block px-5 md:px-9 py-6 mx-auto bg-white rounded-lg shadow-md cursor-pointer"
    >
      <div class="mt-2 mb-1">
        <div class="flex justify-between items-center text-blue-700 text-sm">
          <span class="text-sm"> Parcel #{{ parcel?.ref }} </span>
          <span class="text-sm"> Delivery: {{ formattedDeliveryDate }} </span>
        </div>

        <p class="mt-2 text-black">
          {{ parcel?.description }}
        </p>
      </div>
    </RouterLink>
  </div>
</template>

<script lang="ts">
import formatDateMixin from "../mixins/dateFormatMixin";
import ParcelItem from "@/models/ParcelItem";

export default {
  name: "ParcelItem",
  props: {
    parcel: {
      type: Object as () => ParcelItem,
      required: true,
    },
  },
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore: https://v3.vuejs.org/guide/typescript-support.html#using-with-composition-api
  setup(props) {
    const formatDate = formatDateMixin();
    const formattedDeliveryDate = formatDate(
      props.parcel.deliveryDate ? props.parcel.deliveryDate.toString() : "",
      navigator.language
    );

    return {
      formattedDeliveryDate,
    };
  },
};
</script>

<style>
</style>