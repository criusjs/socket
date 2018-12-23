class SocketServer {
  constructor(options) {
    options = Object.assign({
      group: (socket) => { // 'auto', 'manual', fn, 

      }
    }, options)
  }

  on(event_name) {

  }

  emit() {

  }

  rooms() {

  }

  sockets() {

  }

  // join() {

  // }

  // leave() {

  // }
}

module.exports = SocketServer;

// e.g.
var pool = new SocketServer();
pool.use(() => {

});
pool.connect(socket => {
  pool.join(socket)
})

pool.disconnect(socket => {
  pool.disconnect(socket)
})

pool.reconnect(socket => {

})

// pool.rooms() // all| all in path | all with socket.id  | all except (socket|room|path)
// pool.sockets() // all | all in room | all in path | all except (socket|room|path)
// pool.broadcast // all | all in path | all in room | all except (socket|room|path)