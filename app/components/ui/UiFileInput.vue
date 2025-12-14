<template>
  <div class="ui-file-input">
    <input ref="fileInput" accept="image/*" class="ui-file-input__field" type="file" @change="handleFileChange" />

    <div v-if="modelValue" class="ui-file-input__preview">
      <img :src="modelValue" alt="Preview" class="ui-file-input__preview-image" />
      <button class="ui-file-input__remove-btn" type="button" @click="clearFile">Удалить</button>
    </div>

    <ui-button v-if="!modelValue" @click="triggerFileInput">{{ buttonText }}</ui-button>

    <span v-if="error" class="ui-file-input__error">
      {{ error }}
    </span>
  </div>
</template>

<script lang="ts" setup>
defineProps<{
  buttonText: string;
  modelValue: string;
}>();

const emit = defineEmits<{
  (event: 'error', value: string): void;
  (event: 'update:modelValue', value: string): void;
}>();

const fileInput = ref<HTMLInputElement>();
const error = ref('');

const triggerFileInput = () => {
  if (fileInput.value) {
    fileInput.value.click();
  }
};

const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Ошибка конвертации'));
      }
    };

    reader.onerror = () => {
      reject(new Error('Ошибка чтения файла'));
    };

    reader.readAsDataURL(file);
  });
};

const handleFileChange = async (event: Event) => {
  const target = event.target as HTMLInputElement;
  const files = target.files;

  error.value = '';

  try {
    if (!files || files.length === 0) {
      return setError('Файл не выбран');
    }

    const file = files[0];

    if (!file?.type.startsWith('image/')) {
      return setError('Пожалуйста, выберите файл изображения');
    }

    const base64 = await fileToBase64(file);

    emit('update:modelValue', base64);

    if (fileInput.value) {
      fileInput.value.value = '';
    }
  } catch (e) {
    setError((e as any).message);
  }
};

const setError = (errText: string): void => {
  error.value = errText;
  emit('error', errText);

  if (fileInput.value) {
    fileInput.value.value = '';
  }
};

const clearFile = () => {
  error.value = '';

  if (fileInput.value) {
    fileInput.value.value = '';
  }

  emit('update:modelValue', '');
};
</script>

<style lang="scss" scoped>
.ui-file-input {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
  width: 100%;

  &__field {
    display: none;
  }

  &__preview {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }

  &__preview-image {
    max-width: 140px;
    border-radius: 8px;
    border: 2px solid #e5e7eb;
  }

  &__remove-btn {
    width: 76px;
    padding: 6px 12px;
    background-color: red;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background-color $default-transition;

    &:hover {
      background-color: darkred;
    }
  }

  &__error {
    @include body-h4;

    color: red;
  }
}
</style>
