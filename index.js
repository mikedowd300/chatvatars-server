let client = require('socket.io').listen(4200).sockets
console.log('I am alive!!');

client.on('connection', socket => {
  let obj = {greeting: 'Howdy!!'};
  socket.emit('say-hi', obj);
  socket.on('disconnect', data => {
    console.log('goodbye: ', socket.id);
  });
});
