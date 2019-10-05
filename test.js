#!/bin/env node

const http = require('http');
const Chode = require('./index.js');
if (Chode()) return;

console.log("STARTING APP:", process.argv);
const server = http.createServer((req, res) => {
	  const ip = res.socket.remoteAddress;
	  const port = res.socket.remotePort;
	  res.end(`Your IP address is ${ip} and your source port is ${port}.`);
}).listen(3069, () => {
	console.log("Started!")
});
