const { eos } = require('./setting')

async function invoke () {
    const result = await eos.transact({
        actions: [{
            accont: 'petereostest',                                 //target contract (account name)
            name: '',                                   //action name
            authorization: [{
                actor: '',                              //action 실행 계정 명
                permission: 'active',
            }],
            data: {
                nm: '',
            },                      //action parameter
        }],
    } , {
        blocksBehind: 3,
        expireSeconds: 30,
    })
    console.log(JSON.stringify(result.processed.action_traces[0].console))
};

invoke();
