let client = require('socket.io').listen(4300).sockets
console.log('I am alive!!');

let idWithUrl = {};

let usedAvatars = [];

let avatars = [
  'https://c1.staticflickr.com/5/4181/34151964510_60bf24ff96_b.jpg',
  'https://c2.staticflickr.com/4/3726/10412961916_46f51bbf33_b.jpg', 'https://c1.staticflickr.com/3/2848/10413369836_dd1e7018c8_b.jpg', 'https://c2.staticflickr.com/8/7205/6957192282_bcb2f335cd_b.jpg', 'https://c2.staticflickr.com/8/7072/7187991899_5195029315_b.jpg', 'https://c2.staticflickr.com/2/1654/25484519450_8b2ae7d125_b.jpg', 'https://c1.staticflickr.com/6/5571/15087276229_68cc0a324f_z.jpg', 'https://c1.staticflickr.com/9/8273/8709927466_b398900197_b.jpg', 'https://upload.wikimedia.org/wikipedia/commons/a/a8/Ant-Man.jpg', 'http://maxpixel.freegreatpicture.com/Superhero-Comic-Spiderman-Toy-Action-Figure-Hero-1560337', 'https://upload.wikimedia.org/wikipedia/commons/1/13/New_York_Comic_Con_2015_-_The_Vision_%2821916157810%29.jpg', 'https://c1.staticflickr.com/1/485/19905631718_e40c243423_b.jpg', 'https://c1.staticflickr.com/1/746/22391248155_5d614c8f17_b.jpg', 'https://upload.wikimedia.org/wikipedia/commons/8/88/WWE_2014-04-07_20-17-40_NEX-6_1210_DxO_%2813953035184%29.jpg',
  "https://upload.wikimedia.org/wikipedia/commons/b/b4/Michael_Rooker_by_Gage_Skidmore_2.jpg",  'https://upload.wikimedia.org/wikipedia/commons/f/f4/%D0%93%D1%80%D1%83%D1%82.jpg', 'https://pixabay.com/p-2469557/?no_redirect', 'https://upload.wikimedia.org/wikipedia/commons/f/fa/Guardians_of_the_Galaxy_-_Rocket_%282%29.jpg'
];

client.on('connection', socket => {

  socket.emit('display-avatars', { avatars, usedAvatars });

  socket.on('chatter-added', data => {
    idWithUrl[socket.id] = data;
    usedAvatars.push(data);
    avatars.splice(avatars.indexOf(data), 1);
    client.emit('display-avatars', { avatars, usedAvatars });
  });

  socket.on('incoming-message', data => {
    client.emit('new-message', data);
  });

  socket.on('disconnect', data => {
    let url = idWithUrl[socket.id];
    avatars.push(url);
    usedAvatars.splice(usedAvatars.indexOf(url), 1);
    client.emit('display-avatars', { avatars, usedAvatars });
  });

});
