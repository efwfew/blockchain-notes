#전체과정<br>
##환경설정<br>
##Geth 로컬 구축<br>
##Nodejs 설치<br>
##소스 다운로드<br>
##스마트컨트랙트 작성 및 배포<br>
##웹서버 구축<br>
##웹클라이언트 구축<br>


Geth 설정 과정<br>
geth --networkid 1234 --datadir "./geth/docu" --nodiscover --maxpeers 0 --rpc --rpcaddr "0.0.0.0" --rpcport 8545 --rpccorsdomain "*" --rpcapi "admin, db, eth, debug, miner, net, shh, txpool, personal, web3" console <br>
명령 프롬프트 추가로 띄움 <br>
> geth attach rpc:http://localhost:8545      // 원격 연결
가능여부 확인 <br>
> personal.newAccount("1234")                        // 계정 생성 <br>
> personal.unlockAccount(eth.accounts[0],"1234") <br>
> miner.start() <br>
> eth.mining <br>
> eth.getBalance(eth.accounts[0])       // 채굴해서 코인생겼는지 확인 <br>
