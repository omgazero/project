var frontSight = new THREE.Mesh(new THREE.CircleGeometry(0.1,20), new THREE.MeshBasicMaterial({
  color: 'white',
  depthTest: false,
  depthWrite: false
}));
frontSight.renderOrder = 2;
frontSight.onBeforeRender = function( renderer ) { renderer.clearDepth(); };
frontSight.position.set(0, 0, -3);
