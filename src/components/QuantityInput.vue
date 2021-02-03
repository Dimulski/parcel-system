<template>
  <div data-quantity class="quantity-input">
    <button
      type="button"
      title="Down"
      class="sub"
      @mousedown="startSubtract()"
      @mouseleave="stopInterval()"
      @mouseup="stopInterval()"
      @touchstart="startSubtract()"
      @touchend="stopInterval()"
      @touchcancel="stopInterval()"
    >
      Down
    </button>
    <input
      ref="inputRef"
      :id="inputId"
      :min="min"
      :max="max"
      :step="step"
      :value="value"
      type="number"
      pattern="[0-9]+"
      v-on:change="updateValue($event?.target?.value)"
    />
    <button
      type="button"
      title="Up"
      class="add"
      @mousedown="startAdd()"
      @mouseleave="stopInterval()"
      @mouseup="stopInterval()"
      @touchstart="startAdd()"
      @touchend="stopInterval()"
      @touchcancel="stopInterval()"
    >
      Up
    </button>
  </div>
</template>

<script>
import { defineComponent, ref, watch } from "vue";

export default defineComponent({
  name: "QuantityInput",
  props: {
    inputId: {
      type: String,
      required: true,
    },
    min: {
      type: Number,
      required: false,
    },
    max: {
      type: Number,
      required: false,
    },
    step: {
      type: Number,
      required: false,
    },
    value: {
      type: Number,
      required: false,
    },
  },
  setup(props, context) {
    const inputRef = ref(null);
    let interval;

    const updateValue = (value) => {
      context.emit("valueChanged", value ? parseFloat(value) : 0);
    };

    const startSubtract = () => {
      if (!interval) {
        inputRef?.value?.stepDown();
        updateValue(inputRef?.value.value);
        interval = setInterval(() => {
          inputRef?.value?.stepDown();
          updateValue(inputRef?.value.value);
        }, 100);
      }
    };

    const startAdd = () => {
      inputRef?.value?.stepUp();
      updateValue(inputRef?.value.value);
      interval = setInterval(() => {
        inputRef?.value?.stepUp();
        updateValue(inputRef?.value.value);
      }, 100);
    };

    const stopInterval = () => {
      clearInterval(interval);
      interval = false;
    };

    return {
      startSubtract,
      startAdd,
      stopInterval,
      inputRef,
      updateValue,
    };
  },
});
</script>

<style lang="scss" scoped>
.quantity-input {
  position: relative;
  width: 100%;
  max-width: 11rem;
  padding: 0;
  margin: 0;
  border: 0;
  transform-origin: top left;
  transform: scale(0.75);

  input {
    font-size: 18px;
    height: 4rem;
    padding: 0 4rem;
    border-radius: 2rem;
    border: 0;
    background: #fff;
    color: #222;
    text-align: center;
    width: 100%;
    box-sizing: border-box;
    font-weight: lighter;
    border: 2px solid theme("colors.gray.200");
    -moz-appearance: textfield;
    @apply transition-colors shadow-sm focus:outline-none;

    &:focus {
      border: 2px solid theme("colors.blue.500");
    }

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  button {
    position: absolute;
    width: 2.8rem;
    height: 2.8rem;
    top: 0.6rem;
    display: block;
    padding: 0;
    margin: 0;
    border: 0;
    background: #fff
      url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="50"><path d="M17 25h16M67 25h16M75 17v16" fill="none" stroke="rgb(59,69,66)" stroke-width="1.5px" stroke-linecap="round" stroke-linejoin="round" /></svg>')
      no-repeat 0 0;
    background-size: 5.6rem 2.8rem;
    overflow: hidden;
    white-space: nowrap;
    text-indent: 100%;
    border-radius: 1.4rem;
    cursor: pointer;
    transition: opacity 0.15s;
    opacity: 0.5;

    &:active {
      background-position-y: 1px;
      box-shadow: inset 0 2px 12px -4px #c5d1d9;
    }
    &:focus {
      outline: none;
    }
    &:hover {
      opacity: 1;
    }

    &.sub {
      left: 0.6rem;
    }

    &.add {
      right: 0.6rem;
      background-position-x: -2.8rem;
    }
  }
}
</style>