<template>
  <WalletProvider :wallets="wallets" :autoConnect="false">
    <WalletModalProvider>
     <slot></slot>
    </WalletModalProvider>
  </WalletProvider>
</template>

<script lang="ts" setup>
import { computed } from 'vue'
import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
  getPhantomWallet,
  getSlopeWallet,
  getSolflareWallet,
  getSolletWallet,
  getSolletExtensionWallet,
  Wallet
} from "@solana/wallet-adapter-wallets";

import {
  WalletProvider,
} from "@solana/wallet-adapter-vue";

import { WalletModalProvider } from "@solana/wallet-adapter-vue-ui";

const network = process.env.VUE_APP_SOLANA_NETWORK as WalletAdapterNetwork;

const wallets = computed<Wallet[]>(
  () => [
    getPhantomWallet(),
    getSlopeWallet(),
    getSolflareWallet(),
    getSolletWallet({ network }),
    getSolletExtensionWallet({ network })
  ]
);
</script>
