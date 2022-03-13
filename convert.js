import { bech32 } from 'bech32'
import fs from 'fs'
var finalData = []

let rawdata = fs.readFileSync('json/test_huahua_airdrop.json')
let huahuaConvert = JSON.parse(rawdata)

huahuaConvert.forEach(function(item){
  console.log('*****************')
  // Decode huahua address
  var decode = bech32.decode(item.huahua_address)
  // Converte bech32 words to cerberus for create address
  var cerberusAddr = bech32.encode('cerberus', decode.words)
  console.log('Initial addr: ' + item.huahua_address)
  console.log('Converted addr: ' + cerberusAddr)
  console.log('Amount send: ' + item.ucrbrus_airdrop + ' ucrbrus')
  console.log()
  // Here we create new array to store new data
  finalData.push({
    huahua_address: item.huahua_address, 
    cerberus_address: cerberusAddr, 
    uhuahua_held: item.uhuahua_held, 
    ucrbrus_airdrop: item.ucrbrus_airdrop
  })
});

// This part create new json file with data
finalData = JSON.stringify(finalData, null, 4);
fs.writeFile('json/cerberus_final_data.json', finalData, (err) => {
    if (err) {
        throw err;
    }
    console.log("JSON data is saved.");
});
