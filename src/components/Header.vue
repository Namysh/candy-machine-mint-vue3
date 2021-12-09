<template>
    <header class="flex items-center h-16 gap-8 p-4 text-lg">
        <router-link to="/" class="inline-flex items-center text-xl font-bold">
            🍭 <span id="header__name" class="hidden ml-2 md:inline-block">Candy Machine</span>
            </router-link>
        <ul class="flex gap-4 text-white">
            <li v-for="item in navigation" :key="item.label" :class="item.active ? 'font-bold' : 'text-opacity-60'">
                <router-link :to="item.path">{{ item.label }}</router-link>
            </li>
        </ul>

        <router-view name="wallet"></router-view>
    </header>
</template>


<script lang="ts" setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

interface NavigationItem {
    label: string,
    path: string,
    active: boolean
}
const navigation = computed<NavigationItem[]>(() => [
    { label: 'Home', path: '/', active: router.currentRoute.value.path === '/' },
    // { label: 'Mint', path: '/mint', active: router.currentRoute.value.path === '/mint' },
]
)

</script>

<style scoped>


</style>

<style>
.wallet-adapter-modal {
    pointer-events: all;
    @apply bg-blue-500 p-4 rounded-md w-72 z-10;
}

.wallet-adapter-modal-title {
    @apply text-black;
}

.wallet-adapter-modal-list {
    @apply flex flex-col;
}

.wallet-adapter-button {
    @apply hover:bg-blue-700 px-2 py-1 flex items-center rounded-md justify-between w-full transition-all duration-200;
}

.wallet-adapter-button-end-icon {
    @apply w-8 h-8 flex items-center justify-center  fill-current text-white;
}

.wallet-adapter-modal-wrapper {
    @apply flex flex-col gap-2 relative;
}

.wallet-adapter-modal-button-close {
    @apply absolute top-0 right-0 px-2 py-1 mr-2;
}

.wallet-adapter-modal-collapse-button {
    @apply bg-blue-600;
}

.wallet-adapter-modal-collapse-button-active > .wallet-adapter-button-end-icon {
    @apply transform rotate-180 transition-all duration-200;
}</style>