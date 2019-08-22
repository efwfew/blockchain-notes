const Web3 = require('web3')
//const rpcURL = 'https://ropsten.infura.io/v3/f2d6082eec7d47fd9843b71b0651e47d' // Your RCkP URL goes here' // Your RCP URL goes here
const rpcURL = 'https://rinkeby.infura.io/v3/f2d6082eec7d47fd9843b71b0651e47d'
const web3 = new Web3(rpcURL)
const fs = require('fs');
const solc = require('solc');
const Tx = require('ethereumjs-tx')

// Read the deployed contract - get the addresss from Etherscan
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
var myContract = web3.eth.Contract(abi, contractAddress);
myContract.methods.getInstructor().call().then(result => console.log(" call check: ", result))
//console.log(Coursetro);


/*
const Coursetro = web3.eth.Contract(ABI,'0x5e50f8c3f1037ade40ee18adf2a5603c31f2577b')

Coursetro.methods.getInstructor().call().then(result => console.log(" call check: ", result))
//console.log(Coursetro);

*/