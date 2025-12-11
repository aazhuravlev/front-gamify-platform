<template>
  <div id="app" class="page">
    <core-header v-if="$route.name !== 'arm'" />
    <main class="main">
      <slot name="default" />
    </main>
  </div>
</template>

<style lang="scss" scoped></style>
