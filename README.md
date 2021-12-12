# Candy-Machine-Mint-Vue3

**This project is a Vue3 version of https://github.com/exiled-apes/candy-machine-mint**


A candy machine is an on-chain Solana program (or smart contract) for managing fair mint. Fair mints:
* Start and finish at the same time for everyone.
* Won't accept your funds if they're out of NFTs to sell.

#### Environment Variables


To run the project, update the following variables:

```
REACT_APP_CANDY_MACHINE_CONFIG=__PLACEHOLDER__
```

This is a Solana account address. You can get the value for this from the `.cache/temp` file. This file is created when you run the `metaplex upload` command in terminal.

```
REACT_APP_CANDY_MACHINE_ID=__PLACEHOLDER__
```

Same as above; this is a Solana account address. You can get the value for this from the `./cache/temp` file. This file is created when you run the `metaplex upload` command in terminal.

```
REACT_APP_TREASURY_ADDRESS=__PLACEHOLDER__
```

This the Solana address that receives the funds gathered during the minting process. More docs coming as we can test this.

```
REACT_APP_CANDY_START_DATE=__PLACEHOLDER__
```

This is a unix time stamp that configures when your mint will be open.

```
REACT_APP_SOLANA_NETWORK=devnet
```

This identifies the Solana network you want to connect to. Options are `devnet`, `testnet`, and `mainnet`.

```
REACT_APP_SOLANA_RPC_HOST=https://explorer-api.devnet.solana.com
```

This identifies the RPC server your web app will access the Solana network through.


## Available Scripts

In the project directory, you can run:

```
yarn install
npm install
```

### Compiles and hot-reloads for development
```
yarn serve
npm run serve
```

### Compiles and minifies for production
```
yarn build
npm run build
```
