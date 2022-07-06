const express=require('express');
const app=express();
const port = process.env.PORT || 3000 ;

app.use(express.json());
app.use(express.static('public'));


app.listen(port, ()=>{
  console.log("App Listening on port: ", port);
});

let signatures=[];

app.post('/send-rewards', async (req, res)=>{
  
  let option_one =req.body.option_one;
  let option_two = req.body.option_two;
  let v_asset_id = req.body.v_asset_id; 
  let r_asset_id = req.body.r_asset_id;
  let reward_amount =req.body.r_amount;
  let mmemonic = req.body.mmemonic;

 // console.log(option_one+" "+option_two+" "+v_asset_id+" "+r_asset_id+" "+reward_amount+" "+mmemonic)

 sendVotingRewards(v_asset_id, r_asset_id, reward_amount, option_one, option_two, mmemonic).then(()=>{
  res.send({
    "signatures":signatures,
    "votes":mergedvoters

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

let start_time = "2022-07-01T00:00:00-05:00";
let stop_time = "2022-07-03T10:00:00-05:00";

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
     
   // get transaction histories between the two addresses 
    for(address of addresses){
        let txnHistory = await indexerClient
        .searchForTransactions()
        .address(address.addr)
        .assetID(ASSET_ID)
        .afterTime(start_time)
        .beforeTime(stop_time)
        .addressRole("receiver")
        .txType("axfer")
        .do();

     
   // if voters' amount committed >= 1 push the voters to the voters array!
     await txnHistory.transactions.map(receiver=>{
          if((receiver['asset-transfer-transaction'].amount)/100 >=1){
                voters.push({
                    sender:receiver.sender,
                    amount:(receiver['asset-transfer-transaction'].amount)/100
                })
            
           // get the total committed amounts
            totalCommittedAmount+=(receiver['asset-transfer-transaction'].amount)/100;
          } 
        })
    }
     await getMergedVoters()  
     
   
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
      mergedvoters.push(voters[i])
    }
}

// getting mergedvoters(voters + total amounts)
console.log(mergedvoters)

//draft transactions with mergedvoters array + the ratio as parameters
await draftTransaction(mergedvoters)


}

// draft transactions
const draftTransaction = async (voters) => {

    console.log("no of voters: ",voters.length)
    var totalchoice=0;
    var totalasset=0;

    const params = await algodClient.getTransactionParams().do(); //get transaction params
    voters.forEach((voter)=>{ 

            var percentagegovreward=(voter.amount/totalCommittedAmount)*100;
            var govreward=(percentagegovreward/100)*govRewardsPool;      
           
             var votedamount=truncateDecimals(voter.amount , 2);
             var govreward=truncateDecimals(govreward, 2);

             var govrewardfinal=Math.floor(govreward * 100)
             votedamount=Math.floor(votedamount * 100)

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





const sendVotingRewards=async (asset_id, reward_id, reward_pool, option_zero, option_one, phrase) => {
  ASSET_ID=parseInt(asset_id);
  REWARD_ID=parseInt(reward_id);
  govRewardsPool=parseInt(reward_pool);
  addresses=[
    {
        addr:option_zero,
    },
    {
        addr:option_one,
    }
   ];
  phrase=phrase.replaceAll(',','');
  let wsRegex = /^\s+|\s+$/g; // Change this line
  phrase= phrase.replace(wsRegex, ""); // Change this line
  secretKey=algosdk.mnemonicToSecretKey(phrase);

  await getVoters();
  
  return sendrewards();
}