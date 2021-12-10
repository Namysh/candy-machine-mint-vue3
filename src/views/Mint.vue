<template>
   <div class="w-1/2 max-w-sm p-4 bg-black rounded-md bg-opacity-80">
        <h3 class="text-base font-bold">Candy Machine Mint</h3>
        <div class="mt-4" v-if="wallet">
            <p>Balance: {{ (balance || 0).toLocaleString() }} SOL</p>
            <p>Total Available: {{ itemsAvailable }}</p>
            <p>Redeemed: {{ itemsRedeemed }}</p>
            <p>Remaining: {{ itemsRemaining }}</p>

            <button
                :disabled="isSoldOut || isMinting || !isActive"
                class="w-full px-2 py-1 mt-4 text-center bg-blue-500 rounded-md btn"
                @click="onMint"
            >
                <span v-if="isSoldOut">Sold Out</span>
                <span v-else-if="isMinting">Minting...</span>
                <span v-else-if="isActive">Mint</span>
                <VueCountdown
                    v-else
                    :time="Math.max(0, startDate.getTime() - Date.now())"
                    @end="() => isActive = true"
                    v-slot="{ days, hours, minutes, seconds }"
                >Available in ：{{ days }}d {{ hours }}h {{ minutes }}m {{ seconds }}s</VueCountdown>
            </button>
        </div>
        <div class="px-2 py-1 mt-4 bg-red-500 rounded-md" v-else>Please connect your wallet</div>
    </div>
 
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import * as anchor from "@project-serum/anchor";
import VueCountdown from '@chenfengyuan/vue-countdown';

import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useAnchorWallet } from "@solana/wallet-adapter-vue";

import {
    CandyMachine,
    awaitTransactionSignatureConfirmation,
    getCandyMachineState,
    mintOneToken,
} from "../candy-machine";

const treasury = new anchor.web3.PublicKey(
    process.env.VUE_APP_TREASURY_ADDRESS || ''
);

const config = new anchor.web3.PublicKey(
    process.env.VUE_APP_CANDY_MACHINE_CONFIG || ''
);

const candyMachineId = new anchor.web3.PublicKey(
    process.env.VUE_APP_CANDY_MACHINE_ID || ''
);
const rpcHost = process.env.VUE_APP_SOLANA_RPC_HOST;

const connection = new anchor.web3.Connection(rpcHost || '');

const startDateSeed = parseInt(process.env.VUE_APP_CANDY_START_DATE || '0', 10);

const txTimeout = 30000;

const isActive = ref<boolean>(false)
const isSoldOut = ref<boolean>(false)
const isMinting = ref<boolean>(false)
const itemsAvailable = ref<number>(0)
const itemsRedeemed = ref<number>(0)
const itemsRemaining = ref<number>(0)
const startDate = ref<Date>(new Date(startDateSeed))
const balance = ref<number>(0)

const wallet = useAnchorWallet();
const candyMachine = ref<CandyMachine>()

const refreshCandyMachineState = () => {
    (async () => {
        if (!wallet) return;

        const {
            candyMachine: candyMachineBis,
            goLiveDate: goLiveDateBis,
            itemsAvailable: itemsAvailableBis,
            itemsRemaining: itemsRemainingBis,
            itemsRedeemed: itemsRedeemedBis,
        } = await getCandyMachineState(
            wallet.value as anchor.Wallet,
            candyMachineId,
            connection
        );

        itemsAvailable.value = itemsAvailableBis;
        itemsRemaining.value = itemsRemainingBis;
        itemsRedeemed.value = itemsRedeemedBis;

        isSoldOut.value = itemsRemaining.value === 0;
        startDate.value = goLiveDateBis; 
        candyMachine.value = candyMachineBis;
    })();
};

const onMint = async () => {
    try {
        isMinting.value = true
        if (wallet && candyMachine.value?.program && wallet?.value?.publicKey !== undefined) {
            const mintTxId = await mintOneToken(
                candyMachine.value,
                config,
                wallet.value.publicKey,
                treasury
            );

            const status = await awaitTransactionSignatureConfirmation(
                mintTxId,
                txTimeout,
                connection,
                "singleGossip",
                false
            );

            if (!status?.err) {
                console.log("Congratulations! Mint succeeded!")
                // setAlertState({
                //     open: true,
                //     message: "Congratulations! Mint succeeded!",
                //     severity: "success",
                // });
            } else {
                console.log("Mint failed! Please try again!")
                // setAlertState({
                //     open: true,
                //     message: "Mint failed! Please try again!",
                //     severity: "error",
                // });
            }
        }
    } catch (error: any) {
        // TODO: blech:
        let message = error.msg || "Minting failed! Please try again!";
        if (!error.msg) {
            if (error.message.indexOf("0x138")) {
                console.log('')
            } else if (error.message.indexOf("0x137")) {
                message = `SOLD OUT!`;
            } else if (error.message.indexOf("0x135")) {
                message = `Insufficient funds to mint. Please fund your wallet.`;
            }
        } else {
            if (error.code === 311) {
                message = `SOLD OUT!`;
                isSoldOut.value = true;
            } else if (error.code === 312) {
                message = `Minting period hasn't started yet.`;
            }
        }

        console.log(message)
    } finally {
        if (wallet && wallet?.value?.publicKey !== undefined) {
            balance.value = await connection.getBalance(wallet.value.publicKey) / LAMPORTS_PER_SOL;
        }
        isMinting.value = false
        refreshCandyMachineState();
    }
};



watch([wallet, () => connection], async () => {
    console.log('Watcherrrrr')

    if (wallet && wallet?.value?.publicKey !== undefined) {
        balance.value = await connection.getBalance(wallet.value.publicKey) / LAMPORTS_PER_SOL;
    }

})


watch([wallet, () => candyMachineId, () => connection], refreshCandyMachineState);
</script>

<style scoped>
.btn:disabled {
    cursor: not-allowed;
    @apply opacity-50;
}
</style>