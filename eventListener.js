var mouse = new THREE.Vector2(), isHit;
function onMouseMove() {
  event.preventDefault();
  let ww = $('#container').innerWidth();
  let hh = $('#container').innerHeight();
  mouse.x = (event.clientX / ww) * 2 - 1;
  mouse.y = -(event.clientY / hh) * 2 + 1;


  let vec = new THREE.Vector3();
  let pos = new THREE.Vector3();

  vec = new THREE.Vector3(mouse.x, mouse.y, -2);
  /*vec.unproject( camera );
  let dir = vec.sub( camera.position ).normalize();
	let distance = ( -2 - camera.position.z) / dir.z;
	pos = camera.position.clone().add( dir.multiplyScalar( distance ) );*/
  frontSight.position.copy(vec);
}

function onMouseClick() {
  let vec = frontSight.position.clone() //new THREE.Vector3(mouse.x, mouse.y, 0.5);
  vec.unproject(camera);
  if (isHit) {

    dissolveArray.push(hitObj);
    let index = pickObject.indexOf(hitObj);

    if (index > -1)
      pickObject.splice(index, 1);

  } else {
    console.log("No Hit");
  }
}

function onWindowResize() {
  let ww = $('#container').innerWidth();
  let hh = $('#container').innerHeight();
  camera.aspect = ww / hh;
  camera.updateProjectionMatrix();
  renderer.setSize(ww, hh);
}
