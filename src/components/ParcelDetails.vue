<template>
  <div class="container max-w-3xl mx-auto">
    <RouterLink
      to="/"
      class="link-button mb-4 bg-white inline-block print:hidden"
    >
      Home
    </RouterLink>
    <div
      @click="promptDelete()"
      class="link-button sm:float-right mb-4 bg-white text-red-500 inline-block print:hidden"
    >
      Delete parcel
    </div>
    <article
      class="py-10 rounded-md px-7 lg:px-9 bg-white shadow-md print:shadow-none print:pt-24"
    >
      <div class="mt-2 mb-7">
        <div class="md:flex print:flex justify-between pb-2 text-sm">
          <div class="block pb-2 md:pb-0">
            <div class="">
              <label class="">Parcel</label>
              <span class="text-blue-700">
                #{{ $route?.params?.id?.toString() }}
              </span>
            </div>
            <div>
              <label class="">Bill of lading</label>
              <span class="text-blue-700">
                #{{ parcel?.billOfLadingRef }}
              </span>
            </div>
          </div>

          <div class="inline-grid">
            <div class="">
              <label>Delivery date: </label>
              <span>
                {{ formattedDeliveryDate }}
              </span>
            </div>
            <span class="md:text-right">Weight: {{ bill?.weight }}</span>
            <span class="md:text-right">Packages: {{ bill?.packages }}</span>
          </div>
        </div>

        <div class="flex mb-6">
          <div class="w-full">
            <label class="form-label"> Description </label>
            <input
              disabled
              class="form-input"
              :value="parcel?.description"
              type="text"
            />
          </div>
        </div>
        <div class="-mx-2 md:-mx-6 flex mb-5 print:justify-between">
          <div class="md:w-1/2 px-2 md:px-6">
            <label class="form-label"> Sender Name </label>
            <input
              disabled
              class="form-input"
              :value="bill?.senderName"
              type="text"
            />
          </div>
          <div class="md:w-1/2 px-2 md:px-6">
            <label class="form-label"> Receiver Name </label>
            <input
              disabled
              class="form-input"
              :value="bill?.receiverName"
              type="email"
            />
          </div>
        </div>

        <div class="-mx-2 md:-mx-6 flex mb-5 print:justify-between">
          <div class="md:w-1/2 px-2 md:px-6">
            <label class="form-label"> Sender Email </label>
            <input
              disabled
              class="form-input"
              :value="bill?.senderEmail ? bill?.senderEmail : 'N/A'"
              type="text"
            />
          </div>
          <div class="md:w-1/2 px-2 md:px-6">
            <label class="form-label"> Receiver Email </label>
            <input
              disabled
              class="form-input"
              :value="bill?.receiverEmail ? bill?.receiverEmail : 'N/A'"
              type="email"
            />
          </div>
        </div>

        <div class="-mx-2 md:-mx-6 flex mb-5 print:justify-between">
          <div class="md:w-1/2 px-2 md:px-6">
            <label class="form-label"> Sender Address </label>
            <input
              disabled
              class="form-input"
              :value="bill?.senderAddress"
              type="text"
            />
          </div>
          <div class="md:w-1/2 px-2 md:px-6">
            <label class="form-label"> Receiver Address </label>
            <input
              disabled
              class="form-input"
              :value="bill?.receiverAddress"
              type="email"
            />
          </div>
        </div>
      </div>
      <div class="flex justify-center print:hidden">
        <button
          class="print self-center px-6 py-2 link-button text-sm focus:outline-none select-none"
          @click="print()"
        >
          Print
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fill-rule="evenodd"
              d="M5 4v3H4a2 2 0 00-2 2v3a2 2 0 002 2h1v2a2 2 0 002 2h6a2 2 0 002-2v-2h1a2 2 0 002-2V9a2 2 0 00-2-2h-1V4a2 2 0 00-2-2H7a2 2 0 00-2 2zm8 0H7v3h6V4zm0 8H7v4h6v-4z"
              clip-rule="evenodd"
            />
          </svg>
        </button>
      </div>
    </article>
    <BaseModal
      ref="deleteParcelModal"
      title="Delete parcel"
      :message="`Are you sure you want to delete parcel: ${parcel?.description}?`"
      @confirm="deleteParcel()"
    />
  </div>
</template>

<script lang="ts">
import formatDateMixin from "../mixins/dateFormatMixin";
import { useRoute, useRouter } from "vue-router";
import { useBillOfLading } from "@/composables/billsOfLading";
import { useParcel, useDeleteParcel } from "@/composables/parcels";
import BaseModal from "@/components/BaseModal.vue";
import { ref } from "vue";

export default {
  name: "ParcelDetails",
  components: {
    BaseModal,
  },
  async setup() {
    const route = useRoute();
    const router = useRouter();
    // https://github.com/vuejs/composition-api/issues/226#issuecomment-620074780
    const deleteParcelModal = ref();

    // not entirely thought out...
    const { parcel } = await useParcel(route.params.id.toString());
    const { bill } = await useBillOfLading(
      parcel?.value?.billOfLadingRef ? parcel.value.billOfLadingRef : ""
    );

    const formatDate = formatDateMixin();
    const formattedDeliveryDate = formatDate(
      bill?.value?.deliveryDate ? bill.value.deliveryDate.toString() : "",
      navigator.language
    );

    const print = () => {
      window.print();
    };

    const promptDelete = () => {
      deleteParcelModal.value.show();
    };

    const deleteParcel = async () => {
      deleteParcelModal.value.hide();
      const { parcel } = await useDeleteParcel(route.params.id.toString());
      if (parcel.value?.billOfLadingRef) {
        router.push("/");
      }
    };

    return {
      formattedDeliveryDate,
      parcel,
      bill,
      print,
      deleteParcel,
      promptDelete,
      deleteParcelModal,
    };
  },
};
</script>

<style lang="scss">
button.print {
  max-width: 90px;
}
</style>