var raycaster = new THREE.Raycaster(), isHit = false, hitObj;
function rayCaster() {
  raycaster.setFromCamera(cursor, camera);

  var intersects = raycaster.intersectObjects(pickObject);
  if (intersects.length > 0) {
    isHit = true;
    //hitPos = intersects[0].point;
    hitObj = intersects[0].object;
	//console.log(hitObj);
  } else {
    isHit = false;
  }
}
