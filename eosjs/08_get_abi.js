const { eos } = require('./setting')

async function get_abi (constract) {
    const result = await eos.rpc.get_abi(constract);
    console.log(JSON.stringify(result, null, 2))
}

getAbi('tutorialcall')

