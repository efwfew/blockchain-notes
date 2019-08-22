var express = require("express");  
var app = express();  
var server = require("http").createServer(app);
var io = require("socket.io")(server);

server.listen(8080);

app.use(express.static("public"));

app.get("/", function(req, res){
	res.sendFile(__dirname + "/public/html/index.html");
})

var Web3 = require("web3");

console.log("111");
web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));	
//web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io"));	
console.log("222");
var proofContract = web3.eth.contract([{"constant":false,"inputs":[{"name":"fileHash","type":"string"}],"name":"get","outputs":[{"name":"timestamp","type":"uint256"},{"name":"owner","type":"string"}],"payable":false,"type":"function"},{"constant":false,"inputs":[{"name":"owner","type":"string"},{"name":"fileHash","type":"string"}],"name":"set","outputs":[],"payable":false,"type":"function"},{"anonymous":false,"inputs":[{"indexed":false,"name":"status","type":"bool"},{"indexed":false,"name":"timestamp","type":"uint256"},{"indexed":false,"name":"owner","type":"string"},{"indexed":false,"name":"fileHash","type":"string"}],"name":"logFileAddedStatus","type":"event"}]);
var proof = proofContract.at("0xce2f8fbf445624b8b7123f41e7b5f11b6d156f42");

console.log("Server is working!!!");

app.get("/submit", function(req, res){
	var fileHash = req.query.hash;
    var owner = req.query.owner;
    
    console.log(owner);
    console.log(web3.eth.accounts[0]);
	// 아래 부분을 꼭해야함
	console.log(web3.personal.unlockAccount(web3.eth.accounts[0],"1234"));

	proof.set.sendTransaction(owner, fileHash, {
        from: web3.eth.accounts[0],
        //from: "0x83438A43F40b7f442a55a4C63EC20549ba4AD6ae",
	}, function(error, transactionHash){
		if (!error)
		{
			res.send(transactionHash);
		}
		else
		{
            console.log("error :", error)
			res.send("Error");
		}
	})
})

app.get("/getInfo", function(req, res){
	var fileHash = req.query.hash;

	var details = proof.get.call(fileHash);

	res.send(details);
})

proof.logFileAddedStatus().watch(function(error, result){
	if(!error)
	{
		if(result.args.status == true)
		{
			io.send(result);
		}
	}
})
