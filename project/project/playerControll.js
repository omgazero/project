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
	//console.log(wiimote);
    if (isMoving == false) {

      if (wii.Up==true) {

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

      } else if (wii.Down==true) {
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
      } else if (wii.Left==true) {
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
      } else if (wii.Right==true) {
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
	  if( (wii.A == true || wii.B == true)&& isHit == true){
      hitObj.material = new THREE.ShaderMaterial({
      		  side: THREE.DoubleSide,
            //transparent: true,
            uniforms: {
              time: {
                type: 'f',
                value: 1.0
              },
              threshold: {
                type: 'f',
                value: 0.0
              },
              scale: {
                type: 'v2',
                value: new THREE.Vector2(18, 18)
              },
              offset: {
                type: 'v2',
                value: new THREE.Vector2(0, 0)
              },
              lightpos: {
                type: 'v3',
                value: light.position
              },
              mytex: {
                type: 't',
                value: hitObj.material.map
              },
              noise: {
                type: 't',
                value: noise
              }
            },
            vertexShader: document.getElementById('myVertexShader').textContent,
            fragmentShader: document.getElementById('myFragmentShader').textContent,
            shading: THREE.SmoothShading

      });

      dissolveArray.push(hitObj);
      let index = pickObject.indexOf(hitObj);

      if (index > -1)
        pickObject.splice(index, 1);
	  }
    };
    this.object.position.copy(this.pos);
  }
}
