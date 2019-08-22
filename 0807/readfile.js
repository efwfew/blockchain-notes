var fs = require('fs')

/*var data = fs.readFileSync('./package.json', 'utf8')
console.log(data)*/

fs.readFile('./package.json', 'utf8', function(err, data){
    console.log(data);
})

console.log('requested to read package.json')
