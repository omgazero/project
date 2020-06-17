function makePerspective(camera, r, L) {
  // set parameters
  let x = r * Math.sin(theta);
  let y = r * Math.sin(phi);
  let left = -(L / 2 + x);
  let right = L / 2 - x;
  let top = L / 2 - y;
  let bottom = -(L / 2 + y);
  let far = 1000 //near + L;

  camera.position.x = x;
  camera.position.y = y;

  camera.projectionMatrix.makePerspective(left, right, top, bottom, L/2, far);
}
