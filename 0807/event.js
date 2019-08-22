process.on('tick', function(count) {
    console.log('tick event occured : %s', count);
});

setTimeout(function() {
    console.log ('tick event try to send two second later');
    process.emit('tick', '2');
})