var cursor = new THREE.Vector2(),
  wii = {
    Up: false,
    Down: false,
    Left: false,
    Right: false,
    A: false,
    B: false
  };
$(function() {
  var socket = io();
  //console.log(socket);
  socket.on('wii', function(wiiMote) {
    //console.log(wiiMote);
    let ww = $('#container').innerWidth();
    let hh = $('#container').innerHeight();
    cursor.x = (-(wiiMote.IRx[0] - 512) / ww) * 2;
    cursor.y = (-(wiiMote.IRy[0] - 349) / hh) * 2;

    let vec = new THREE.Vector3(cursor.x, cursor.y, -2);
    /*vec.unproject(camera);
    let dir = vec.sub(camera.position).normalize();
    let dis = (Zplane - camera.position.z) / dir.z;
    let pos = camera.position.clone().add(dir.multiplyScalar(dis));*/
    frontSight.position.copy(vec);
    wii.Up = wiiMote.Up;
    wii.Down = wiiMote.Down;
    wii.Left = wiiMote.Left;
    wii.Right = wiiMote.Right;
    wii.A = wiiMote.A;
    wii.B = wiiMote.B;
    //player.update(wiiMote);
    //console.log(wii);

  });
});
