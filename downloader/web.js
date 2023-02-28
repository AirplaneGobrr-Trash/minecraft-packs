// Web.js:
const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

module.exports = {
    express, app,http,io, server
}

// Web: <script src='/socket.io/socket.io.js'></script>