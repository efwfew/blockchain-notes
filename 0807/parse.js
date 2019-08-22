var url = require('url');
var querystring = require('querystring');



var curURL = url.parse('https://endic.naver.com/search.nhn?sLn=kr&searchOption=all&query=%EC%9B%90%EB%B3%B8');
var curStr = url.format(curURL);
var param = querystring.parse(curURL.query);
//console.log('address string: %s', curStr);
//console.log(curURL);

console.log('query value of requested parameter : %s', param.query);
console.log('original requested parameter : %s', querystring.stringify(param));
