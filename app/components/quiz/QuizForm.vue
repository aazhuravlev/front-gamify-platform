<template>
  <form class="quiz-form">
    <ui-input placeholder="Заголовок" v-model="form.title" class="quiz-form__input" />
    <ui-input placeholder="Описание" v-model="form.description" class="quiz-form__input" />
    <ui-input placeholder="Короткое описание" v-model="form.shortDescription" class="quiz-form__input" />
    <ui-input placeholder="Основной градиент" v-model="form.bgColor" class="quiz-form__input" />
    <ui-input placeholder="Градиент баннера" v-model="form.bannerBgColor" class="quiz-form__input" />

    <ui-button>Вернуться</ui-button>
  </form>
</template>

<script setup lang="ts">
import type { ApiCreateQuizPayload } from '#shared/api/quiz/types';

const form = ref<ApiCreateQuizPayload>({
  bgColor: '', // HEX
  bannerBgColor: '', // HEX
  description: '',
  image: '', // base64
  imageSmall: '', // base64
  shortDescription: '',
  title: '',
});
</script>

<style scoped lang="scss">
.quiz-form {
  &__input {
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
}
</style>
