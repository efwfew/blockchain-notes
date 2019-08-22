//express는 node.js 기반의 웹 프레임워크.
const express = require('express');
const app = express();
//EOS
const { Api, JsonRpc } = require('eosjs');
const fetch = require('node-fetch');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');
const { TextDecoder, TextEncoder } = require('util');

//express body-parser
app.use(express.urlencoded({ extended: false }));
// 템플릿 엔진 선언
app.set('view engine', 'ejs');
app.set('views', './views');


var rpc;
let eos;
let account;

// '/' 경로의 router
app.get('/', function(req, res) {
    res.render('index');
})


app.use('/login', function(req, res){
    var method = req.method;

    if (method == "GET"){
        res.render('login');
    } else {
        var privateKey = req.param('privateKey');
        var apiUrl = req.param('api_url');
        account = req.param('account');

                
        const signatureProvider = new JsSignatureProvider([privateKey]);
        rpc = new JsonRpc(apiUrl, {fetch });
        eos = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
        
        res.redirect('/');
    }
})

app.use('/transfer', function(req, res) {
    var method = req.method;

    if(method == "GET"){
        res.render('transfer');
    } else {
        var contract = req.param('token');
        var fromAcct = req.param('from');
        var toAcct = req.param('to');
        var quantity = req.param('quantity');
        var memo = req.param('memo')


        eos.transact({
            actions: [{
                account: contract,
                name: 'transfer',
                authorization: [{
                    actor: fromAcct,
                    permission:'active',
                }],
                data: {
                    from: fromAcct,
                    to: toAcct,
                    quantity: quantity,
                    memo: memo,
                }
            }]
        }, {
            blocksBehind: 3,
            expireSeconds: 30,
        }).then(
            result =>{
            console.log(result)
            })
      
    }
})

app.post('/get_account', function(req, res){
    eos.rpc.get_account(account).then(
        result => {
            res.json(result);
        }
    )
})

// server
app.listen(8080, () => {
    console.log('Server is running at localhost:8080')
})