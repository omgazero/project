function rayCaster() {
  raycaster.setFromCamera(mouse, camera);

  var intersects = raycaster.intersectObjects(pickObject);
  if (intersects.length > 0) {
    isHit = true;
    //hitPos = intersects[0].point;
    hitObj = intersects[0].object;
  } else {
    isHit = false;
  }
}
