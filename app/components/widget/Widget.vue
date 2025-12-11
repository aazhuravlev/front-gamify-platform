<template>
  <div :style="backgroundGradient" class="widget">
    <span class="widget__title">{{ quiz.title }}</span>
    <span class="widget__description">{{ quiz.shortDescription }}</span>

    <nuxt-img :src="quiz.imageSmall" class="widget__image" height="146" />

    <quiz-progress :completed-tasks-qty="0" :tasks-qty="quiz.tasks.length" class="widget__progress" />
  </div>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue';

import type { ApiQuizResponse } from '#shared/api/quiz/types';

const props = defineProps<{
  uuid: string;
}>();

const quizStore = useQuizStore();

onMounted(
  async () =>
    await quizStore.fetchQuizByUuid(props.uuid).catch(() => {
      console.error('Не получилось загрузить данные для виджета');
    }),
);

const backgroundGradient = computed<CSSProperties>(() => {
  if (quiz.value.bgColor) {
    return {
      background: quiz.value.bgColor,
    };
  }
  return {};
});

const quiz = computed<ApiQuizResponse>(() => quizStore.quiz!);
</script>

<style lang="scss" scoped>
.widget {
  position: relative;
  z-index: 0;
  display: flex;
  flex-direction: column;
  padding: $space-m;
  border-radius: $radius-m;
  overflow: hidden;
  box-sizing: border-box;

  &__title {
    @include headline-h4;

    color: $white;
    z-index: 1;
  }

  &__description {
    @include body-h4;

    z-index: 1;
    display: block;
    margin-top: $space-2xs;
    color: $white;
    opacity: 0.6;
  }

  &__image {
    z-index: 0;
    position: absolute;
    top: 0;
    right: 0;
  }

  &__progress {
    z-index: 1;
    margin-top: $space-xs;
  }
}
</style>
