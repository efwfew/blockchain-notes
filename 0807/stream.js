var fs = require('fs')

var infile = fs.createReadStream('./output.txt', {flasgs: 'r'})

var outfile = fs.createWriteStream('./output2.txt', {flasgs: 'w'})

infile.on('data', function(data) {
    console.log('data reading', data);
    outfile.write(data)
})

infile.on('end', function(){
    console.log('stop reading')
    outfile.end(function(){
        console.log('stop writing')
    })
})