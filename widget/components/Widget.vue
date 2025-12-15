<template>
  <a v-if="quiz" :href="link" :style="backgroundGradient" class="widget">
    <span class="widget__title">{{ quiz?.title }}</span>
    <span class="widget__description">{{ quiz?.shortDescription }}</span>

    <img :src="quiz?.widgetImage" alt="Изображение баннера" class="widget__image" height="146" loading="lazy" />

    <tasks-progress
      :completed-tasks-qty="quiz?.progress.completedTasks"
      :tasks-qty="quiz?.progress.totalTasks"
      class="widget__progress"
    />
  </a>
</template>

<script lang="ts" setup>
import type { CSSProperties } from 'vue';
import { computed, onMounted, ref } from 'vue';

import type { ApiQuizResponse } from '../../shared/api/quiz/types';

import TasksProgress from './TasksProgress.vue';

const FRONT_URL = 'https://gamify-platform.ru';

const props = defineProps<{
  uuid: string;
  phone: string;
}>();

const quiz = ref<ApiQuizResponse | undefined>(undefined);

onMounted(() => {
  setTimeout(async () => {
    const res = await fetch(`${FRONT_URL}/api/quiz/${props.uuid}?phone=${props.phone}`)
      .then((r) => r.json())
      .catch(() => {
        console.error('Не получилось загрузить данные для виджета');
      });

    if (res) {
      quiz.value = res;
    }
  }, 1000);
});

const backgroundGradient = computed<CSSProperties>(() => {
  if (quiz.value?.bgColor) {
    return {
      background: quiz.value.bannerBgColor,
    };
  }
  return {};
});

const link = computed<string>(() => `${FRONT_URL}/quiz/${props.uuid}?phone=${props.phone}`);
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
  text-decoration: none;

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
