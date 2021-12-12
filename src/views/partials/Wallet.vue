<template>
    <div v-bind="$attrs" class="bg-blue-500 rounded-md">
        <button class="px-4 py-1" @click="showModal" v-if="!wallet">Connect Wallet</button>
        <p class="px-4 py-1" v-else>{{ shortenAddress(wallet.publicKey.toBase58() || "") }}</p>
    </div>

    <div v-if="visible" @click="hideModal" class="fixed inset-0"></div>
    <WalletModal :container="'#aside'"></WalletModal>
</template>


<script setup lang="ts">
import { watch } from 'vue'

import { useWalletModal, WalletModal } from "@solana/wallet-adapter-vue-ui";
import { useAnchorWallet, useWallet } from "@solana/wallet-adapter-vue";
import {
    shortenAddress,
} from "../../candy-machine";


const { visible, showModal, hideModal } = useWalletModal();
const { connect, ready } = useWallet()

watch(ready, () => {
    if (ready.value) {
        connect()
    }
}, { immediate: true })

const wallet = useAnchorWallet();
</script>