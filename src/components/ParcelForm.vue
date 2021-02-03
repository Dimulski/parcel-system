<template>
  <div class="flex">
    <RouterLink class="link-button my-4" to="/">Home</RouterLink>
  </div>
  <form
    class="bg-white rounded-lg shadow-md px-8 pt-4"
    style="min-height: 350px"
  >
    <div class="border-b-2 py-4 mb-5">
      <div
        class="uppercase tracking-wide text-xs font-bold text-gray-500 mb-1 leading-tight"
      >
        Step: {{ step }} of 3
      </div>
      <div class="flex flex-col md:flex-row md:items-center md:justify-between">
        <div class="flex-1">
          <div v-show="step === 1">
            <div class="text-lg font-bold text-gray-700 leading-tight">
              Parcel Details
            </div>
          </div>

          <div v-show="step === 2">
            <div class="text-lg font-bold text-gray-700 leading-tight">
              Sender Details
            </div>
          </div>

          <div v-show="step === 3">
            <div class="text-lg font-bold text-gray-700 leading-tight">
              Receiver Details
            </div>
          </div>
        </div>

        <div class="flex items-center md:w-64">
          <div class="w-full bg-gray-100 rounded-full mr-2">
            <div
              class="rounded-full bg-green-500 text-xs leading-none h-2 text-center text-white"
              :style="'width: ' + Math.floor((step / 3) * 100) + '%'"
            ></div>
          </div>
          <div class="text-xs w-10 text-gray-600">
            {{ Math.floor((step / 3) * 100) + "%" }}
          </div>
        </div>
      </div>
    </div>
    <transition-group name="fade-zoom">
      <fieldset v-show="step == 1" key="1">
        <div class="-mx-3 md:flex mb-6">
          <div class="w-full px-3">
            <label
              class="font-bold mb-1 text-sm text-gray-700 block"
              for="description"
            >
              Description *
            </label>
            <input
              class="w-full px-3 py-2 mb-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
              id="description"
              name="description"
              v-model="description"
              type="text"
            />
            <p class="text-red-500 text-xs">
              {{ errors.description }}
            </p>
          </div>
        </div>
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-1/3 px-3">
            <label
              class="font-bold mb-2 text-sm text-gray-700 block"
              for="weight"
            >
              Estimated weight (Kilograms) *
            </label>
            <QuantityInput
              inputId="weight"
              :min="0.1"
              :max="80"
              :step="0.1"
              :value="weight"
              @valueChanged="updateWeight($event)"
            ></QuantityInput>
            <p class="text-red-500 text-xs">{{ errors.weight }}</p>
          </div>
          <div class="md:w-1/3 px-3">
            <label
              class="font-bold mb-2 text-sm text-gray-700 block"
              for="packages"
            >
              Number of packages *
            </label>
            <QuantityInput
              inputId="packages"
              :min="1"
              :max="10"
              :step="1"
              :value="packages"
              @valueChanged="updatePackages($event)"
            ></QuantityInput>
            <p class="text-red-500 text-xs">{{ errors.packages }}</p>
          </div>
        </div>
      </fieldset>
      <fieldset v-show="step == 2" key="2">
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-1/2 px-3">
            <label
              class="font-bold mb-2 text-sm text-gray-700 block"
              for="senderName"
            >
              Sender Name *
            </label>
            <input
              class="w-full px-3 py-2 mb-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
              id="senderName"
              name="senderName"
              v-model="senderName"
              type="text"
            />
            <p class="text-red-500 text-xs">{{ errors.senderName }}</p>
          </div>
          <div class="md:w-1/2 px-3">
            <label
              class="font-bold mb-2 text-sm text-gray-700 block"
              for="senderEmail"
            >
              Sender Email
            </label>
            <input
              class="w-full px-3 py-2 mb-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
              id="senderEmail"
              name="senderEmail"
              v-model="senderEmail"
              type="email"
            />
            <p class="text-red-500 text-xs">{{ errors.senderEmail }}</p>
          </div>
        </div>
        <div class="-mx-3 md:flex mb-6">
          <div class="w-full md:w-3/4 px-3">
            <label
              class="font-bold mb-1 text-sm text-gray-700 block"
              for="senderAddress"
            >
              Sender Address *
            </label>
            <input
              class="w-full px-3 py-2 mb-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
              id="senderAddress"
              name="senderAddress"
              v-model="senderAddress"
              type="text"
            />
            <p class="text-red-500 text-xs">
              {{ errors.senderAddress }}
            </p>
          </div>
          <div class="w-full md:w-1/4 px-3">
            <label
              class="font-bold mb-1 text-sm text-gray-700 block"
              for="deliveryDate"
            >
              Delivery Date *
            </label>
            <input
              type="date"
              id="deliveryDate"
              name="deliveryDate"
              v-model="deliveryDate"
              min="2018-01-01"
              max="2018-12-31"
              class="w-full px-3 py-2 mb-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
            />
            <p class="text-red-500 text-xs">
              {{ errors.deliveryDate }}
            </p>
          </div>
        </div>
      </fieldset>
      <fieldset v-show="step == 3" key="3">
        <div class="-mx-3 md:flex mb-6">
          <div class="md:w-1/2 px-3">
            <label
              class="font-bold mb-2 text-sm text-gray-700 block"
              for="receiverName"
            >
              Receiver Name *
            </label>
            <input
              class="w-full px-3 py-2 mb-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
              id="receiverName"
              name="receiverName"
              v-model="receiverName"
              type="text"
            />
            <p class="text-red-500 text-xs">
              {{ errors.receiverName }}
            </p>
          </div>
          <div class="md:w-1/2 px-3">
            <label
              class="font-bold mb-2 text-sm text-gray-700 block"
              for="receiverEmail"
            >
              Receiver Email
            </label>
            <input
              class="w-full px-3 py-2 mb-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
              id="receiverEmail"
              name="receiverEmail"
              v-model="receiverEmail"
              type="email"
            />
            <p class="text-red-500 text-xs">
              {{ errors.receiverEmail }}
            </p>
          </div>
        </div>
        <div class="-mx-3 md:flex mb-6">
          <div class="w-full md:w-3/4 px-3">
            <label
              class="font-bold mb-1 text-sm text-gray-700 block"
              for="receiverAddress"
            >
              Receiver Address *
            </label>
            <input
              class="w-full px-3 py-2 mb-2 border-2 border-gray-200 rounded-md focus:outline-none focus:border-blue-500 transition-colors"
              id="receiverAddress"
              name="receiverAddress"
              v-model="receiverAddress"
              type="text"
            />
            <p class="text-red-500 text-xs">
              {{ errors.receiverAddress }}
            </p>
          </div>
        </div>
      </fieldset>
    </transition-group>
  </form>
  <div class="flex" :class="step == 1 ? 'justify-end' : 'justify-between'">
    <div class="link-button my-4" v-if="step != 1" @click="goBack()">Back</div>
    <div
      class="link-button my-4"
      :class="canGoForward ? '' : 'text-opacity-30'"
      @click="goForward()"
    >
      {{ buttonTexts[1] }}
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { useForm, useField, useValidateField } from "vee-validate";
import * as yup from "yup";
import QuantityInput from "@/components/QuantityInput.vue";

export default defineComponent({
  name: "ParcelForm",
  components: {
    QuantityInput,
  },
  setup() {
    const step = ref(1);

    const buttonTexts = computed(() => {
      switch (step.value) {
        case 1:
          return ["Cancel", "Next"];
        case 2:
          return ["Previous", "Next"];
        case 3:
          return ["Previous", "Finish"];
      }
      return ["Previous", "Next"];
    });

    const schema = yup.object({
      description: yup.string().required().min(5).max(200).label("Description"),
      weight: yup.number().min(0.1).max(80).label("Weight"),
      packages: yup.number().min(1).max(10).label("Packages"),
      senderName: yup.string().required().min(5).max(50).label("Sender name"),
      senderEmail: yup.string().email().label("Sender email"),
      senderAddress: yup
        .string()
        .required()
        .min(5)
        .max(200)
        .label("Sender address"),
      deliveryDate: yup.date().required().label("Delivery date"),
      receiverName: yup
        .string()
        .required()
        .min(5)
        .max(50)
        .label("Receiver name"),
      receiverEmail: yup.string().email().label("Receiver email"),
      receiverAddress: yup
        .string()
        .required()
        .min(5)
        .max(200)
        .label("Receiver address"),
    });
    const form = useForm({
      validationSchema: schema,
      initialValues: {
        description: "",
        weight: 0,
        packages: 1,
        senderName: "",
        senderEmail: "",
        senderAddress: "",
        deliveryDate: new Date(),
        receiverName: "",
        receiverEmail: "",
        receiverAddress: "",
      },
    });

    const description = useField("description");
    const weight = useField("weight");
    const packages = useField("packages");
    const senderName = useField("senderName");
    const senderEmail = useField("senderEmail");
    const senderAddress = useField("senderAddress");
    const deliveryDate = useField("deliveryDate");
    const receiverName = useField("receiverName");
    const receiverEmail = useField("receiverEmail");
    const receiverAddress = useField("receiverAddress");

    const parcelDetailsValid = computed((): boolean => {
      return description.meta.valid && weight.meta.valid && packages.meta.valid;
    });

    const senderDetailsValid = computed((): boolean => {
      return (
        senderName.meta.valid &&
        senderEmail.meta.valid &&
        senderAddress.meta.valid &&
        deliveryDate.meta.valid
      );
    });

    const receiverDetailsValid = computed((): boolean => {
      return (
        receiverName.meta.valid &&
        receiverEmail.meta.valid &&
        receiverAddress.meta.valid
      );
    });

    const canGoForward = computed((): boolean => {
      switch (step.value) {
        case 1:
          return parcelDetailsValid.value;
        case 2:
          return senderDetailsValid.value;
        case 3:
          return receiverDetailsValid.value;
      }
      return false;
    });

    const updateWeight = (newWeight: number) => {
      weight.value.value = newWeight;
    };

    const updatePackages = (newPackages: number) => {
      packages.value.value = newPackages;
    };

    const validateCurrentStep = () => {
      switch (step.value) {
        case 1:
          description.validate();
          weight.validate();
          packages.validate();
          break;
        case 2:
          senderName.validate();
          senderEmail.validate();
          senderAddress.validate();
          deliveryDate.validate();
          break;
        case 3:
          receiverName.validate();
          receiverEmail.validate();
          receiverAddress.validate();
          break;
      }
    };

    const goBack = () => {
      if (step.value > 1) {
        step.value--;
      }
    };
    const goForward = async () => {
      validateCurrentStep();
      if (step.value < 3 && canGoForward.value) {
        step.value++;
      }
    };

    onMounted(async () => {
      useValidateField("packages")();
    });

    return {
      step,
      buttonTexts,
      goBack,
      goForward,
      errors: form.errors,
      description: description.value,
      weight: weight.value,
      packages: packages.value,
      senderName: senderName.value,
      senderEmail: senderEmail.value,
      senderAddress: senderAddress.value,
      deliveryDate: deliveryDate.value,
      receiverName: receiverName.value,
      receiverEmail: receiverEmail.value,
      receiverAddress: receiverAddress.value,
      updateWeight,
      updatePackages,
      canGoForward,
      parcelDetailsValid,
      validateCurrentStep,
    };
  },
});
</script>

<style lang="scss">
.fade-zoom-enter-active {
  transition: all 0.3s ease-out;
}
.fade-zoom-leave-active {
  transition: all 0s;
  position: absolute;
  opacity: 0;
}
.fade-zoom-enter-from {
  transform: scale(0.96);
  transform-origin: center center;
  transition-duration: 0.15s;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2 1);
}
.fade-zoom-leave-to {
  transition-duration: 0;
}
</style>
