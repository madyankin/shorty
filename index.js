require('babel/register')({ stage: 1 });

var start = require('./src/app').start;
start();
