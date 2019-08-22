var fs = require('fs')

fs.open('./output.txt', 'r', function(err, fd){
    if(err) throw err;
    var buf = new Buffer.alloc(10);

    console.log('buffuer type: %s', Buffer.isBuffer(buf))


    fs.read(fd, buf, 0, buf.length, null, function(err, bytesRead, buffer){
        if(err) throw err;
        var inStr = buffer.toString('utf8', 0, bytesRead);
        console.log('data read from file : %s', inStr)
        //console.log(err, bytesRead, buffer)
        
        
        fs.close(fd, function(){
            console.log('output.txt has opened, read, closed.')
        })
    })
})