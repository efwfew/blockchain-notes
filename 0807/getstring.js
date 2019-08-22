var output = 'Hello 1!'
var buffer1 = new Buffer.alloc(10)

var len = buffer1.write(output, 'utf8')
console.log('string of first buffer : %s', buffer1.toString())

var buffer2 = new Buffer('Hello 2!', 'utf8')
console.log ('string of second buffer : %s', buffer2.toString())

console.log('object of buffer type : %s', Buffer.isBuffer(buffer1))

var byteLen = Buffer.byteLength(output)
var str1 = buffer1.toString('utf8', 0, byteLen)
var str2 = buffer2.toString('utf8')

buffer1.copy(buffer2, 0, 0, len)
console.log('string of second buffer later copied : %s', buffer2.toString('utf8'))

