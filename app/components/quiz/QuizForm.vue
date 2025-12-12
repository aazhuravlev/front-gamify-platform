<template>
  <section class="quiz-form">
    <form class="quiz-form__form" @submit.prevent>
      <ui-input v-model="form.title" class="quiz-form__input" placeholder="Заголовок" />
      <ui-input v-model="form.description" class="quiz-form__input" placeholder="Описание" />
      <ui-input v-model="form.shortDescription" class="quiz-form__input" placeholder="Описание для виджета" />
      <ui-input v-model="form.bgColor" class="quiz-form__input" placeholder="Основной градиент" />
      <ui-input v-model="form.bannerBgColor" class="quiz-form__input" placeholder="Градиент виджета" />
      <ui-file-input v-model="form.image" button-text="Выбрать главное изображение" class="quiz-form__input" />
      <ui-file-input v-model="form.widgetImage" button-text="Выбрать изображение виджета" class="quiz-form__input" />
    </form>

    <div class="quiz-form__actions">
      <ui-button :disabled="isLoading" @click="onSubmit">{{ btnText }}</ui-button>
      <ui-button :disabled="isLoading" class="quiz-form__back" @click="$emit('close-form')">Вернуться</ui-button>
    </div>

    <span v-if="error" class="quiz-form__error">
      {{ error }}
    </span>
  </section>
</template>

<script lang="ts" setup>
import type { ApiCreateQuizPayload, ApiQuizListItemResponse } from '#shared/api/quiz/types';

const props = defineProps<{ quiz: ApiQuizListItemResponse | undefined }>();

onMounted(() => {
  if (props.quiz) {
    form.value = { ...props.quiz };
    isEditing.value = true;
  }
});

const form = ref<ApiCreateQuizPayload>({
  bgColor: '', // HEX
  bannerBgColor: '', // HEX
  description: '',
  image: '', // base64
  widgetImage: '', // base64
  shortDescription: '',
  title: '',
});

const quizStore = useQuizStore();

const isLoading = ref(false);
const isEditing = ref(false);
const error = ref('');

const btnText = computed(() => (isEditing.value ? 'Сохранить' : 'Создать'));

async function onSubmit() {
  try {
    isLoading.value = true;
    error.value = '';

    const isValid = Object.values(form.value).every(Boolean);

    if (isValid) {
      const method = isEditing.value
        ? quizStore.updateQuiz(props.quiz?.entityId || 0, form.value)
        : quizStore.createQuiz(form.value);

      await method;

      emit('close-form');
    } else {
      error.value = 'Не все поля формы заполнены';
    }
  } catch (err: any) {
    error.value = err.message;
  } finally {
    isLoading.value = false;
  }
}

const emit = defineEmits<{
  (event: 'close-form'): void;
}>();
</script>

<style lang="scss" scoped>
.quiz-form {
  width: 360px;
  padding-bottom: 40px;

  &__input {
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  &__actions {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-top: 36px;
  }

  &__error {
    @include body-h4;

    margin-top: 8px;
    color: red;
  }

  &__back {
    background-color: red;
  }
}
</style>
