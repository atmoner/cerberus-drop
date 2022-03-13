import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing"
import {
  defaultRegistryTypes,
  assertIsDeliverTxSuccess,
  SigningStargateClient,
} from '@cosmjs/stargate'
import fs from "fs"

var inputs = []
var outputs = [] 

let rawdata = fs.readFileSync('json/cerberus_final_data.json')
let finalData = JSON.parse(rawdata) 

// Add your mnemonic sender here
const mnemonic = "";
const wallet = await DirectSecp256k1HdWallet.fromMnemonic( mnemonic, { 
    prefix: 'cerberus' 
  }
)
// Here we get address sender
const [senderWallet] = await wallet.getAccounts();

// Create client to broadcast
const rpcEndpoint = "https://rpc.cerberus.zone:26657";
const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, wallet);

// Set fee/gas
const fee = {
  amount: [
    {
      denom: 'ucrbrus',
      amount: '5000',
    },
  ],
  gas: '1000000', // If more gas, change it here!! 
}

// Here we foreach file generated on convertion step
// Inputs = sender (cerberus team part)
// Outputs = recipient of airdrop
finalData.forEach(function(item){
  inputs.push({
    "address":senderWallet.address,
    "coins":[
      {
        "amount":String(item.ucrbrus_airdrop),
        "denom":'ucrbrus'
      }
    ]
  })
  outputs.push({
    "address":item.cerberus_address,
    "coins":[
      {
        "amount":String(item.ucrbrus_airdrop),
        "denom":'ucrbrus'
      }
    ]
  })
})

// Format message to broadcast
const registryMsgMultiSend = defaultRegistryTypes[0][1]       
const copieMultiSend = [{
  typeUrl: '/cosmos.bank.v1beta1.MsgMultiSend',
  value: registryMsgMultiSend.fromPartial({
      "inputs":inputs,
      "outputs":outputs
  }),
}]

// View message befor broadcast
console.log(copieMultiSend)

// Broadcast multiSend
// const result = await client.signAndBroadcast(accounts[0].address, copieMultiSend, fee, '')
// assertIsBroadcastTxSuccess(result)
// console.log(result)
