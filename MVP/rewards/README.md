# Governance Rewards

# Run on Local Eenviornment

* install governancerewards dependencies
```
 $ npm install
```
* create a `.env` file fill with this

```
ALGOD_TOKEN=""
INDEXER_SERVER="https://testnet-algorand.api.purestake.io/idx2"
ALGOD_SERVER="https://testnet-algorand.api.purestake.io/ps2"
ALGOD_PORT=""
ASSET_ID="297995609"
REWARD_ID="297995609"
REWARD_MMEMONIC="YOUR REWARD MMEMONIC KEY"
OPTION_ZERO="OPTION ZERO WALLET ADDRESS"
OPTION_ONE="OPTION ONE WALLET ADDRESS"
```

* start the reward scripts


```
 $ node rewards.js
 or
 $ npm start
```

# License

* [Apache](https://github.com/ChoiceCoin/Decentralized-Decisions/blob/main/governance-rewards/LICENSE)
