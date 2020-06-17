var playerDir = 0;
var isMoving = false;
class player {

  constructor(camera, frontSight, pos) {
    this.object = new THREE.Object3D();
    let box = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.5, 0.5), new THREE.MeshBasicMaterial({
      color: 'red'
    }));
    this.object.add(camera, frontSight, box);
    this.pos = pos;
    this.object.position.copy(pos);
    scene.add(this.object);

    //this.isMoving = false;
  }
  update() {

    if (isMoving == false) {

      if (keyboard.pressed('W')) {

        let x = this.pos.x + dirs[playerDir].x;
        let y = this.pos.z + dirs[playerDir].y;
        x = parseFloat(x.toFixed(0));
        y = parseFloat(y.toFixed(0));
        //console.log(this.pos);
        if (x >= 0 && x < 32 && y < 12 && y >= 0) {

          if (isCollision(x, y)) {
            let v1 = new THREE.Vector3(0, 0, 1).applyQuaternion(this.object.quaternion);
            let dis = this.pos.clone().add(v1.multiplyScalar(-1));
            /*let position = {x: this.pos.x, z: this.pos.z};
            let target = {x:dis.x, z:dis.z};*/
            let tween = new TWEEN.Tween(this.pos)
              .to(dis, 200)
              .onStart(function() {
                isMoving = true;

              })
              .onComplete(function() {
                isMoving = false;
                /*this.pos.x = parseFloat(this.pos.x.toFixed(0));
                this.pos.z = parseFloat(this.pos.z.toFixed(0));*/
              })
              .start();
            //camera.translateZ(-1);
          }
        }

      } else if (keyboard.pressed('S')) {
        let x = this.pos.x - dirs[playerDir].x;
        let y = this.pos.z - dirs[playerDir].y;
        x = parseFloat(x.toFixed(0));
        y = parseFloat(y.toFixed(0));
        if (x >= 0 && x < 32 && y < 12 && y >= 0) {

          if (isCollision(x, y)) {
            let v1 = new THREE.Vector3(0, 0, 1).applyQuaternion(this.object.quaternion);
            let dis = this.pos.clone().add(v1.multiplyScalar(1));
            let tween = new TWEEN.Tween(this.pos)
              .to(dis, 200)
              .onStart(function() {
                isMoving = true;
              })
              .onComplete(function() {
                isMoving = false;
                /*this.pos.x = parseFloat(this.pos.x.toFixed(0));
                this.pos.z = parseFloat(this.pos.z.toFixed(0));*/
              })
              .start();
            //camera.translateZ(1);
          }
        }
      } else if (keyboard.pressed('A')) {
        playerDir -= 1;
        if (playerDir < 0) playerDir = 3;

        let R = {
          x: 0,
          y: this.object.rotation.y + Math.PI / 2,
          z: 0
        };
        let tween = new TWEEN.Tween(this.object.rotation)
          .to(R, 500)
          .onStart(function() {
            isMoving = true;
          })
          .onComplete(function() {
            isMoving = false;
          })
          .start();
        //camera.rotation.y -= Math.PI/2;
      } else if (keyboard.pressed('D')) {
        playerDir += 1;
        if (playerDir > 3) playerDir = 0;
        let R = {
          x: 0,
          y: this.object.rotation.y - Math.PI / 2,
          z: 0
        };
        let tween = new TWEEN.Tween(this.object.rotation)
          .to(R, 500)
          .onStart(function() {
            isMoving = true;
          })
          .onComplete(function() {
            isMoving = false;
          })
          .start();
        //camera.rotation.y += Math.PI/2;
      }
    };
    this.object.position.copy(this.pos);
  }
}
