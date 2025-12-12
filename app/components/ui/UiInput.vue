<template>
  <div class="ui-input">
    <input
      ref="inputEl"
      :id="id"
      :autocomplete="autocomplete"
      :class="[
        'input',
        `input_${size}`,
        {
          input_error: hasError,
          input_disabled: disabled,
          'input_has-custom-placeholder': placeholder && !defaultPlaceholder,
          input_prepended: $slots.prepend,
        },
      ]"
      :disabled="disabled"
      :maxlength="maxlength"
      :placeholder="placeholder"
      :readonly="readonly"
      :type="type"
      :value="modelValue"
      :name
      :aria-label
      @blur="blur"
      @focus="focus"
      @focusout="focusout"
      @input="updateModelValue"
    />
    <label
      v-if="placeholder && !defaultPlaceholder"
      :class="[
        'ui-input__placeholder',
        { 'ui-input__placeholder_error': hasError },
        { 'ui-input__placeholder_fixed': placeholderFixed },
      ]"
    >
      {{ placeholder }}
    </label>

    <div v-if="$slots.prepend" :class="['ui-input__prepend', { 'ui-input__prepend_disabled': disabled }]">
      <slot name="prepend" />
    </div>
    <div
      v-if="$slots.append"
      :class="['ui-input__append', { 'ui-input__append_disabled': disabled }]"
      @click.stop="clickAppend"
    >
      <slot name="append" />
    </div>

    <span v-if="errorMessage && hasError" class="ui-input__error-message">
      {{ errorMessage }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { ButtonSizes } from 'business-modules/ui/enums';
import type { UiError } from 'business-modules/ui/types';

const props = withDefaults(
  defineProps<{
    modelValue: string;
    type?: string;
    size?: ButtonSizes;
    placeholder?: string;
    placeholderFixed?: boolean;
    defaultPlaceholder?: boolean;
    disabled?: boolean;
    errorMessage?: UiError;
    showErrorState?: boolean;
    maxlength?: number;
    autocomplete?: string;
    id?: string;
    readonly?: boolean;
    autofocus?: boolean;
    name?: string;
    ariaLabel?: string;
  }>(),
  {
    type: 'text',
    size: ButtonSizes.Large,
    placeholder: undefined,
    placeholderFixed: false,
    defaultPlaceholder: false,
    disabled: false,
    errorMessage: undefined,
    showErrorState: false,
    maxlength: undefined,
    autocomplete: undefined,
    id: undefined,
    readonly: false,
    autofocus: false,
  },
);

const emit = defineEmits<{
  (event: 'update:model-value', value: string): void;
  (event: 'focus', value: FocusEvent): void;
  (event: 'focusout', value: FocusEvent): void;
  (event: 'blur', value: FocusEvent): void;
  (event: 'click:append', value: Event): void;
}>();

const inputEl = ref<HTMLInputElement | undefined>();

const hasError = computed<boolean>(() => {
  return props.showErrorState || Boolean(props.errorMessage && props.errorMessage.trim());
});

function updateModelValue($event: Event): void {
  emit('update:model-value', ($event.target as HTMLInputElement).value);
}

function focus($event: FocusEvent): void {
  emit('focus', $event);
}

function focusout($event: FocusEvent): void {
  emit('focusout', $event);
}

function blur($event: FocusEvent): void {
  emit('blur', $event);
}

function clickAppend($event: Event): void {
  if (!props.disabled) {
    emit('click:append', $event);
  }
}

onMounted(() => {
  if (props.autofocus) {
    nextTick(() => {
      if (inputEl.value) {
        inputEl.value.focus();
      }
    });
  }
});

defineExpose({
  inputEl,
});
</script>

<style lang="scss" scoped>
$border-width: 1px;

$padding-y-large: 14px - $border-width;
$padding-x-large: 16px - $border-width;

.ui-input {
  position: relative;
  font-size: 16px;

  &__placeholder {
    margin: 0;
    position: absolute;
    top: 50%;
    left: 16px;
    color: $color--gray-label;
    transform: translateY(-50%);
    transition:
      font-size $default-transition,
      transform $default-transition,
      color $default-transition;
    z-index: 0;
    pointer-events: none;

    &_error {
      color: $color--accent-danger;
    }
  }

  &__error-message {
    position: absolute;
    left: 16px;
    top: calc(100% + 4px);
    font-size: 12px;
    line-height: 16px;
    color: $color--accent-danger;
  }

  &__append {
    z-index: 2;
    position: absolute;
    top: 50%;
    right: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transform: translateY(-50%);

    &_disabled {
      pointer-events: none;
    }
  }

  &__prepend {
    z-index: 3;
    position: absolute;
    top: 50%;
    left: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateY(-50%);

    &_disabled {
      pointer-events: none;
    }
  }
}

.input {
  box-sizing: border-box;

  position: relative;
  z-index: 2;

  width: 100%;

  font-size: 16px;
  line-height: 20px;
  font-weight: 400;

  color: $color--gray-text;

  background-color: transparent;

  border: $border-width solid $color--border-secondary-2;
  border-radius: 12px;

  transition:
    border-color $default-transition,
    background-color $default-transition;

  outline: none;

  &:hover,
  &:focus {
    border-color: $color--border-secondary-hover-2;
  }

  &:active {
    border-color: $color--border-green-stroke-active;
  }

  &::placeholder {
    visibility: hidden;
  }

  &::-moz-placeholder {
    color: transparent !important;
  }

  &:focus,
  &:not(:placeholder-shown) {
    & + .ui-input__placeholder {
      font-weight: 400;
    }

    & + .ui-input__placeholder:not(.ui-input__placeholder_fixed) {
      line-height: 16px;
      font-size: 12px;
      transform: translateY(calc(-100% - 4px));
    }

    &.input_disabled {
      background-color: $color--gray-header;
    }

    @media (hover: hover) {
      &:hover {
        border-color: $color--gray-stroke;
      }
    }
  }

  &_error {
    border-color: $color--accent-danger;
  }

  &_disabled {
    background-color: $color--gray-header;

    &:hover {
      border-color: $color--gray-stroke;
    }
  }

  &_medium {
    padding: 10px 16px;
  }

  &_large {
    padding: $padding-y-large $padding-x-large;
  }

  &_has-custom-placeholder {
    &.input_medium {
      padding: 16px 16px 4px;
    }

    &.input_large {
      padding: 20px 16px 8px;
    }
  }
}
</style>
