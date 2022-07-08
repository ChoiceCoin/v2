const express=require('express');
const app=express();
const port = process.env.PORT || 3000 ;

app.use(express.json());
app.use(express.static('public'));


app.listen(port, ()=>{
  console.log("App Listening on port: ", port);
});

//Defines the Expected transaction signatures.
let signatures=[];
let v_asset_decimal;
let r_asset_decimal;
let v_asset_multiplier;
let r_asset_multiplier;
let v_asset_name;
let r_asset_name;

//Http Post request to Compute and distribute rewards and commitment
app.post('/send-rewards', async (req, res)=>{
  let option_one =req.body.option_one;
  let option_two = req.body.option_two;
  let v_asset_id = req.body.v_asset_id; 
  let r_asset_id = req.body.r_asset_id;
  let start_time = req.body.start_time;
  let end_time = req.body.end_time;
  let reward_amount =req.body.r_amount;
  let mmemonic = req.body.mmemonic;

 console.log(option_one+" "+option_two+" "+v_asset_id+" "+r_asset_id+" "+start_time+" "+end_time+" "+reward_amount+" "+mmemonic)
 sendVotingRewards(v_asset_id, r_asset_id, reward_amount, start_time, end_time, option_one, option_two,  mmemonic) .then(()=>{
  res.send({
    "signatures":signatures,
    "votes":votes_rewards
    });
 })
})

const algosdk = require('algosdk') //algosdk library
//getting dotenv
require("dotenv").config();

const { algodClient, indexerClient} = require("./config"); 
let ASSET_ID, REWARD_ID, REWARD_POOL;

// total voters;
let voters=[];
//merged voters - This contains voters with total of their ammounts;
let mergedvoters=[];

let votes_rewards=[];

//transactions + amount + ammount*ratio 
let transactions=[];

// signed combined transactions
let signed=[];

// initial committedAmount
let totalCommittedAmount=0;

let govRewardsPool;// Choice rewards pool;

// The two options addresses
let addresses=[
   
   ];

let secretKey; //Put reward wallet Mnemonic Phrase here;

//Defines Start and End time for Votes
let START_TIME;
let END_TIME;

// find address that voted more than once
const find = (address) => {
    var foundat;
    for(var i=0; i<mergedvoters.length; i++){
      if(mergedvoters[i].sender==address){
        foundat=i;
        break;
      }
    }
    return foundat;
}

// truncate ratio to two decimal places;
const truncateDecimals = (number, digits) =>  {
    var multiplier = Math.pow(10, digits),
        adjustedNum = number * multiplier,
        truncatedNum = Math[adjustedNum < 0 ? 'ceil' : 'floor'](adjustedNum);

    return truncatedNum / multiplier;
};

//Get Voters(addresses + committed amount to governance) + Total committed amounts
const getVoters = async() => {
  (async () => {
      let assetIndex = ASSET_ID;
      let assetInfo = await indexerClient.searchForAssets()
          .index(assetIndex).do();
      
      v_asset_decimal=await assetInfo.assets[0].params.decimals;
      v_asset_name=await assetInfo.assets[0].params['unit-name'];
      
      
      let rewardAssetIndex = ASSET_ID;
          let rewardAssetInfo = await indexerClient.searchForAssets()
              .index(rewardAssetIndex).do();
      r_asset_decimal=await rewardAssetInfo.assets[0].params.decimals;
      r_asset_name=await rewardAssetInfo.assets[0].params['unit-name'];

      
          
      
  })().catch(e => {
      console.log(e);
      console.trace();
  });

  
     
   // get transaction histories between the two addresses 
    for(address of addresses){
        let txnHistory = await indexerClient
        .searchForTransactions()
        .address(address.addr)
        .assetID(ASSET_ID)
        .afterTime(START_TIME)
        .beforeTime(END_TIME)
        .addressRole("receiver")
        .txType("axfer")
        .do();


        v_asset_multiplier=10 ** v_asset_decimal;
   // if voters' amount committed >= 1 push the voters to the voters array!
     await txnHistory.transactions.map(receiver=>{
          if((receiver['asset-transfer-transaction'].amount)/v_asset_multiplier >=1){
                voters.push({
                    sender:receiver.sender,
                    amount:(receiver['asset-transfer-transaction'].amount)/v_asset_multiplier,
                    rewards:0
                });
           // get the total committed amounts
            totalCommittedAmount+=(receiver['asset-transfer-transaction'].amount)/v_asset_multiplier
          } 
        })
    }
     await getMergedVoters();  
}

//get merged voters
const getMergedVoters = async () => {
  mergedvoters.push(voters[0]);
// if addresses that voted more than once exists, add their amounts together + push to the mergedvoters array
for(var i=1; i<voters.length; i++){
    var exists=find(voters[i].sender);
    if(exists>=0){
      mergedvoters[exists].amount+= voters[i].amount;
       }
    else{
      mergedvoters.push(voters[i]); 
    }
}


for(var i=0; i<mergedvoters.length; i++){
  console.log(mergedvoters[i].amount+" "+totalCommittedAmount+" "+v_asset_multiplier+" "+govRewardsPool)
 let rewards=(mergedvoters[i].amount/totalCommittedAmount)*govRewardsPool;
   votes_rewards.push({
      sender:mergedvoters[i].sender,
      amount:mergedvoters[i].amount,
      rewards:truncateDecimals(rewards , 2)
      
   })
}
// getting mergedvoters(voters + total amounts)
console.log(votes_rewards)


//draft transactions with mergedvoters array + the ratio as parameters
await draftTransaction(mergedvoters);
}
// draft transactions
const draftTransaction = async (voters) => {
   v_asset_multiplier=10 ** v_asset_decimal;
   r_asset_multiplier=10 ** r_asset_decimal;
    console.log("no of voters: ",voters.length)
    var totalchoice=0;
    var totalasset=0;

    const params = await algodClient.getTransactionParams().do(); //get transaction params
    voters.forEach((voter)=>{ 
        
            //calculate the reward ratio and reward amount for Governance process
            var percentagegovreward=(voter.amount/totalCommittedAmount)*v_asset_multiplier;
            var govreward=(percentagegovreward/100)*govRewardsPool;      
           
             var votedamount=truncateDecimals(voter.amount , 2);
             var govreward=truncateDecimals(govreward, 2);

             var govrewardfinal=Math.floor(govreward * r_asset_multiplier)
             votedamount=Math.floor(votedamount * v_asset_multiplier)

             console.log("choice "+votedamount)
             console.log("choice "+govrewardfinal);

             totalasset+=votedamount;
             totalchoice+=govrewardfinal;
             
           transactions.push(algosdk.makeAssetTransferTxnWithSuggestedParams(secretKey.addr, voter.sender, undefined, undefined,  govrewardfinal , undefined, REWARD_ID, params));
           transactions.push(algosdk.makeAssetTransferTxnWithSuggestedParams(secretKey.addr, voter.sender, undefined, undefined,  votedamount , undefined, ASSET_ID, params));
    })
    //console.log(transactions)
    console.log("total rewards "+totalchoice);
    console.log("total asset "+totalasset);
}

//send signed transactions and send rewards
const sendrewards = async () => {
      //let txgroup = algosdk.assignGroupID(transactions);
    //Send all signed transactions to the algorand network return a resolved promise when that is done.
    var sentPromise = new Promise(function(resolve, reject) {
      for (let [index, transaction] of transactions.entries()) {
        setTimeout(async () => {
             let signedTransaction=transaction.signTxn(secretKey.sk );
             let tx=await algodClient.sendRawTransaction(signedTransaction).do();
             console.log("Transaction : " + index + " " + tx.txId);
             signatures.push({index, tx:tx.txId})
             
             if((index+1)== transactions.length){
                 resolve(signatures);
             }
         }, 30 * (index + 1));
     }  

    })
    return sentPromise;   
}

//This function calls all the Rewards function with Parameters that are provided by the Client
const sendVotingRewards=async (asset_id, reward_id, reward_pool, start_time, end_time, option_zero, option_one,  phrase) => {
  ASSET_ID=parseInt(asset_id);
  REWARD_ID=parseInt(reward_id);
  govRewardsPool=parseInt(reward_pool);
  console.log("rewards: "+govRewardsPool)
  START_TIME=start_time;
  END_TIME=end_time;
  addresses=[
    {
        addr:option_zero,
    },
    {
        addr:option_one,
    }
   ];
   console.log(addresses);
  phrase=phrase.replaceAll(',','');
  let wsRegex = /^\s+|\s+$/g; // format mmemonic
  phrase= phrase.replace(wsRegex, ""); // format mmemonic
  secretKey=algosdk.mnemonicToSecretKey(phrase); //convert mmemonic to secret key

  await getVoters(); //get the Voters of the governance process
  return sendrewards();//Send the rewards and return a resolved promise
}



