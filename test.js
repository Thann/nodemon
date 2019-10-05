#!/bin/env node

const http = require('http');
if (require('./index.js')()) return;

console.log("STARTING APP:", process.argv);
const server = http.createServer((req, res) => {
	  const ip = res.socket.remoteAddress;
	  const port = res.socket.remotePort;
	  res.end(`Your IP address is ${ip} and your source port is ${port}.`);
}).listen(3069, () => {
	console.log("Started!")
});
