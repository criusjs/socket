const server = require('http').createServer();
const serverS = require('socket.io');
const io = new serverS(server, {
  serveClient: false,
  // below are engine.IO options
  pingInterval: 10000,
  pingTimeout: 5000,
  cookie: false
})

server.listen(3000)

io.on('connection', function (socket) {
  console.log(socket)
  console.log('......-------------')
  // socket.emit('ff', socket)
});