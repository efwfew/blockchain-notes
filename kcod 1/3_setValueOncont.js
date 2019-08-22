const Web3 = require('web3')
//const rpcURL = 'https://ropsten.infura.io/v3/f2d6082eec7d47fd9843b71b0651e47d' // Your RCkP URL goes here' // Your RCP URL goes here
const rpcURL = 'https://rinkeby.infura.io/v3/f2d6082eec7d47fd9843b71b0651e47d'
const web3 = new Web3(rpcURL)
const fs = require('fs');
const solc = require('solc');
const Tx = require('ethereumjs-tx')
// 본인의 이더리움 주소
//const addressMy = '0x83438A43F40b7f442a55a4C63EC20549ba4AD6ae' 
const addressMy = '0xdee5F53B29FDB3996fb546026fDdf49adc6D4a89'
// 본인의 이더리움 주소의 비밀키
//let private_key = "1db0908c2331e0502b529163e1f2fa21aec4fd8d109dba7d800adc6ec0375a40"
let private_key = "CFF2C9EAB34A8FCF647A413ECEF89A518F599DB53D90DE6A546BC80C81E0B39B"

// etherscan 에서 조회된 컨트랙트주소
const contractAddress = '0xdf38f7886962a74d733b9a8f797816c97fe9dda0'


// Compile the source code
var CONTRACT_FILE = 'Coursetro.sol'
var content =fs.readFileSync(CONTRACT_FILE).toString()
var inputFormat = {
  language: 'Solidity',
  sources: {
    'Coursetro.sol' : {
      content: content
    }
  },
  settings: {
    outputSelection: {
      '*': {
        '*': ['*']
      }
    }
  }
}



var compiled = solc.compile(JSON.stringify(inputFormat))
var output = JSON.parse(compiled)

var abi = output.contracts[CONTRACT_FILE]['Coursetro'].abi
//console.log("abi : ", abi)
//var bytecode = output.contracts[CONTRACT_FILE]['Coursetro'].evm.bytecode.object
var myContract = new web3.eth.Contract(abi, addressMy);


// Transfer some tokens
web3.eth.getTransactionCount(addressMy, (err, txCount) => {

    const txObject = {
      nonce:    web3.utils.toHex(txCount),
      gasLimit: web3.utils.toHex(800000), // Raise the gas limit to a much higher amount
      gasPrice: web3.utils.toHex(web3.utils.toWei('100', 'gwei')),
      to: contractAddress,
      data: myContract.methods.setInstructor("PeterKim", 3600).encodeABI()
    }   
      
  
    const tx = new Tx(txObject)
    tx.sign(new Buffer(private_key, 'hex'));
  
    const serializedTx = tx.serialize()
    const raw = '0x' + serializedTx.toString('hex')
  
    web3.eth.sendSignedTransaction(raw, (err, txHash) => {
        if (err) { console.log(err); return; }
      console.log('txHash:', txHash)
      // Use this txHash to find the contract on Etherscan!
    })
})



// Check Token balance for account2
myContract.methods.getInstructor().call((err, result) => {
console.log({ err, result })
})