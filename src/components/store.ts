

import { reactive } from 'vue';

interface Store {
    balance: number | null
}

const store = reactive<Store>({
    balance: null,
})

export default store;