const { Api, JsonRpc } = require('eosjs');
const fetch = require('node-fetch');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');
const { TextDecoder, TextEncoder } = require('util');
const privateKeys = ['5JRk3M7JL4Ku8NRo9YVFBW2kzDjub9jkcsn73iCyLfYEa19dWpG'];
const signatureProvider = new JsSignatureProvider(privateKeys);
const rpc = new JsonRpc('http://jungle2.cryptolions.io:80', { fetch });
const eos = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });


async function transfer () {
    const result = await eos.transact({
        actions: [{
            account: 'eosio.token',
            name: 'transfer',
            authorization: [{
              actor: 'hexlantalex3',
              permission: 'active',
            }],
            data: {
                from: 'hexlantalex3',
                to: 'lioninjungle',
                quantity: '1.0000 EOS',
                memo: 'send transfer'
            }
          }]
        }, {
          blocksBehind: 3,
          expireSeconds: 30,
        })
    console.log(result)
}

transfer()