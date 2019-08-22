var fs = require('fs')

fs. writeFile('./output.txt', 'HelloWorld!', function(err) {
    if(err){
        console.log('Error' + err);
    }
    console.log('data has written on output.txt')
})