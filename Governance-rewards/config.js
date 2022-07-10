const algosdk = require("algosdk");

require("dotenv").config();

const algodToken = { "X-API-Key": process.env.ALGOD_TOKEN };
const indexerServer = process.env.INDEXER_SERVER;
const algodServer = process.env.ALGOD_SERVER;
const algodPort = process.env.ALGOD_PORT;
const START_TIME=process.env.START_TIME;
const END_TIME=process.env.END_TIME;
const OPTION_ZERO=process.env.OPTION_ZERO;
const OPTION_ONE=process.env.OPTION_ONE;
const REWARD_MMEMONIC=process.env.REWARD_MMEMONIC;
const ASSET_ID = parseInt(process.env.ASSET_ID);
const REWARD_ID = parseInt(process.env.REWARD_ID);
const REWARD_POOL = parseInt(process.env.REWARD_POOL);

const algodClient = new algosdk.Algodv2(algodToken, algodServer, algodPort);
const indexerClient = new algosdk.Indexer(algodToken, indexerServer, algodPort);

module.exports = { algodClient, indexerClient, ASSET_ID, REWARD_ID, REWARD_POOL, START_TIME, END_TIME, OPTION_ZERO, OPTION_ONE, REWARD_MMEMONIC };