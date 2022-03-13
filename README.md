# cerberus-drop

## Install
```
git clone https://github.com/atmoner/cerberus-drop.git
cd cerberus-drop
npm i
```

## Use
### First step
To convert addresses from json (converted from csv)  
It will generate `cerberus_final_data.json` in json/ folder  
```
node convert.js
```
### Second step
Very important step!
This is the sending of the multisend from your json generated before  
Think about testing a small amount of address before doing large tests.

```
node multiSend.js
```

I voluntarily commented the broadcast to avoid errors during the tests  
To activate the broadcast, uncomment the end of the code
