var winston = require('winston')
var winstonDaily = require('winston-daily-rotate-file'); //log 일별 처리

var moment = require('moment'); //시간 처리 모듈

function timeStampFormat() {
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ');
    //2019-08-07 17:36:01.020 +0900
    };


console.log(timeStampFormat())