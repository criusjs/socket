# socket

### Todo list
- 监听客户端所有连接事件
- 过滤所有消息
- 过滤所有请求、域名
- 客户端分组- 自动（随机auto、自定义defind）|手动manual
- 客户端剔除、转入
- 广播
- 排除功能

##
- [ref](https://www.w3cschool.cn/socket/socket-odxe2egl.html)
- [ref](https://blog.csdn.net/function__/article/details/73089504)

- 一个客户端可以存在多个分组
- 一个分组可以存在多个客户端
- 客户端:分组 = *:*

### io configure
```
serveClient: false,
  // below are engine.IO options
pingInterval: 10000,
pingTimeout: 5000,
cookie: false
//
path: '/io'
//
allowRequest: (req, cb) => {}
origins

```
```
io.origins('http://localhost:*')

io.origins((origin, cb) => {
  if (origin === 'http://localhost:3000/') return cb(null, true)
  cb(null, false)
})

io(namespace)
```

### use
```
利用中间件数据校验

io.use((socket, next) => {
  if (socket.request.headers.cookie) return next()
  next(new Error('Authentication error'))
})
```

### on
- io.on 监听All客户端连接
- socket.on


### emit
- socket
- socket.broadcast // all except self
- io
- io.sockets  // io  代理消息发送
- io.sockets.socket(socketid) // io  代理消息发送


### join or leave
socket.join(data.room);
socket.leave(data.room); 踢出分组

### in(room) or to(room) or of(namespace)
- io
- socket
- io.sockets
- ...

### get rooms
io.sockets.manager.rooms // all
io.sockets.manager.roomClients[socket.id] // all with socket.id
io.sockets.clients('particular room') // all with path


### get sockets
io.sockets.clients()  // all
io.sockets.in(data.room) // all in room
socket.broadcast.to(data.room) // all in room except self


### on event
connect：连接成功
connecting：正在连接
disconnect：断开连接
connect_failed：连接失败
error：错误发生，并且无法被其他事件类型所处理

message：同服务器端message事件
anything：同服务器端anything事件
reconnect_failed：重连失败
reconnect：成功重连
reconnecting：正在重连
当第一次连接时，事件触发顺序为：connecting->connect；当失去连接时，事件触发顺序为：disconnect->reconnecting（可能进行多次）->connecting->reconnect->connect。