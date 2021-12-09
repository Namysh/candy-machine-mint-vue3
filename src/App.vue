<template>
  <SolanaApp>
    <Header></Header>
    <main class="flex flex-col items-center justify-center flex-1">
      <router-view></router-view>
    </main>

    <div id="aside" class="absolute inset-0 pointer-events-none aside-wrapper"></div>
  </SolanaApp>
</template>

<script lang="ts" setup>
import Header from './components/Header.vue'
import SolanaApp from './components/layouts/SolanaApp.vue';
</script>

<style>
#app {
  @apply h-full flex flex-col m-auto max-w-screen-lg;
}

.aside-wrapper:not(:empty) {
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(5px);
  @apply flex items-center justify-center;
}
</style>
