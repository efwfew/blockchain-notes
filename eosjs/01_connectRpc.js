const { JsonRpc } =require('eosjs');
const fetch = require('node-fetch');
const rpc = new JsonRpc('http://jungle2.cryptolions.io:80', { fetch });

// read eos blockchain info
//rpc.get_info().then(console.log);


//rpc.get_block(2).then(console.log)
//rpc.get_account('petereostest').then(console.log)
//rpc.get_currency_balance('eosio.token', 'petereostes3', 'EOS').then(console.log)
rpc.get_currency_balance('petereostest', 'petereostest', 'HEX').then(console.log);

