var logger = new (winston.Logger)({
    transports: [ 
        new (winstonDaily) ({ 
            name: 'logtest', 
            filename: './logtest/server', 
            datePattern: '_yyyy-MM-dd.log', 
            colorize: false, 
            maxsize: 50000000, 
            maxFiles: 1000, 
            level: 'info', 
            showLevel: true, 
            json: false, 
            timestamp: timeStampFormat
        }), 
        
        new (winston.transports.Console)({ 
            name: 'debug-console', 
            colorize: true, 
            level: 'debug', 
            showLevel: true, 
            json: false, 
            timestamp: timeStampFormat 
        }) 
    ],
    exceptionHandlers: [ 
        new (winstonDaily) ({ 
            name: 'exceptiontest', 
            filename: './logtest/exception', 
            datePattern: '_yyyy-MM-dd.log', 
            colorize: false, 
            maxsize: 50000000, 
            maxFiles: 1000, 
            level: 'error', 
            showLevel: true, 
            json: false, 
            timestamp: timeStampFormat
        }), 
        
        new (winston.transports.Console)({ 
            name: 'exception-console', 
            colorize: true, 
            level: 'debug', 
            showLevel: true, 
            json: false, 
            timestamp: timeStampFormat 
        }) 
    ] 
});