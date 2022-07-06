# Governance Rewards

[YouTube Demo](https://m.youtube.com/watch?v=ZlP_9qurjMM&feature=youtu.be)

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
```

## LICENSE
* [APACHE](https://github.com/ChoiceCoin/Decentralized-Decisions/blob/main/governance-rewards/LICENSE)


Alternativelly to use the Frontend Interface and Access the Api Endpoint for distributing rewards, You can run.

```
 $ npm start

```

- Interface launches on your http://localhost:3000
- API Endpoint For Refund and Rewards Distribution  http://localhost:3000/send-rewards
- [API Documentation](https://documenter.getpostman.com/view/9070802/UzJJtH7n)
