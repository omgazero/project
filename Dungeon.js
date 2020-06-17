var map = [
  [ 0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0],
  [ 0, -1,  0,  1,  0,  0,  0,  1,  1,  1,  1, -1,  1,  1,  1,  1,  1,  1,  1, -1,  1,  1,  1,  0, -1,  1,  1, -1,  0,  0,  0,  0],
  [ 0,  1,  1,  1,  1,  1,  0,  1,  1,  1,  1,  0,  1,  0,  0,  0,  0,  0,  1,  0,  1,  0, -1,  1,  1,  1,  1,  1,  1, -1,  0,  0],
  [ 0, -1,  1,  0,  0,  1,  0, -1,  1,  0,  1,  0,  1,  0,  1,  1,  1,  1,  1,  0,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0],
  [ 0,  0,  1,  0,  0,  1,  1,  1,  1,  0,  1,  0,  0,  0,  1,  1,  1,  1,  1, -1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1, -1,  0],
  [ 0,  0,  1,  1,  1,  1,  0,  1,  0,  1,  1,  1,  1, -1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0],
  [ 0,  1,  1,  1,  0,  0, -1,  1, -1,  1,  1,  0,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  1,  0],
  [ 0,  0,  1,  1,  1,  0,  0,  1,  0,  0,  0,  0,  1,  0,  1,  1,  1,  1,  1, -1,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1, -1,  0],
  [ 0,  0,  1,  1,  1,  0,  1,  1,  1,  0,  1,  0,  1,  0,  1,  1,  1,  1,  1,  0,  1,  0,  1,  1,  1,  1,  1,  1,  1,  1,  0,  0],
  [ 0, -1,  1,  1,  1, -1,  1,  1,  1,  1,  1, -1,  1,  0,  1, -1,  1, -1,  1,  0,  1,  0, -1,  1,  1,  1,  1,  1,  1, -1,  0,  0],
  [ 0,  0,  1,  1,  1,  0,  1,  1,  1,  0,  1,  0,  1,  1,  1,  1,  1,  1,  1, -1,  1,  1,  1,  0, -1,  1,  1, -1,  0,  0,  0,  0],
  [ 0,  0,  0,  0,  0,  0,  0, -1,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0,  0]
];
var dirs = [new THREE.Vector2(0, -1), //Up
				new THREE.Vector2(1, 0), //Right
				new THREE.Vector2(0, 1),  //Down
				new THREE.Vector2(-1, 0)]; //Left
function createDungeon() {
  let texture = new THREE.TextureLoader().load("https://raw.githubusercontent.com/symphone/W3D/master/test/hologramTest/images/8021-diffuse.jpg");
  let bump = new THREE.TextureLoader().load("https://raw.githubusercontent.com/symphone/W3D/master/test/hologramTest/images/8021-bump.jpg");
  let material = new THREE.MeshPhongMaterial({
    color: 0x666666,
    map: texture,
    bumpMap: bump,
    bumpScale: 0.1
  });
  let basicWallGeom = new THREE.BoxGeometry(1, 1, 1);
  let basicTileGeom = new THREE.PlaneGeometry(1, 1, 1);

  for (let y = 0; y < map.length; y++) {
    let row = map[y];
    for (let x = 0; x < row.length; x++) {
      let type = row[x];

      if (type == 0 || type == -1) {
        let mesh = new THREE.Mesh(basicWallGeom, material);
        // mesh.castShadow = true;
        // mesh.receiveShadow = true;
        if (type == -1) {

          for (let i = 0; i < 4; i++) {
            let yy = y + dirs[i].y;
            let xx = x + dirs[i].x;
            if (yy >= 12 || yy < 0) continue;
            if (xx >= 32 || xx < 0) continue;
            if (map[yy][xx] == 1) {
              let torch = new THREE.Object3D();
              torch.position.set(x + dirs[i].x / 2, 0.5, y + dirs[i].y / 2);
              let light = new THREE.PointLight(0xf13c0e, 2, 2);
              light.position.y += 0.2;
              light.add(new THREE.Mesh(new THREE.SphereBufferGeometry(0.05, 16, 8), new THREE.MeshBasicMaterial({
                color: 0xf13c0e
              })));
              torch.add(light);
              let stick = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 0.3, 20), new THREE.MeshBasicMaterial({
                color: 0x804000
              }));
              torch.add(stick);
              scene.add(torch);
            }
          }
        }
        mesh.position.x = x;
        mesh.position.y = 0.5;
        mesh.position.z = y;
        scene.add(mesh);

      } else if (type == 1 || type == 2) {
        let floorMesh = new THREE.Mesh(basicTileGeom, material);
        // floorMesh.castShadow = true;
        // floorMesh.receiveShadow = true;

        floorMesh.position.x = x;
        floorMesh.position.y = 0;
        floorMesh.position.z = y;
        floorMesh.rotation.x = Math.PI * -0.5;
        scene.add(floorMesh);

        let ceilMesh = new THREE.Mesh(basicTileGeom, material);
        //   ceilMesh.castShadow = true;
        //   ceilMesh.receiveShadow = true;

        ceilMesh.position.x = x;
        ceilMesh.position.y = 1;
        ceilMesh.position.z = y;
        ceilMesh.rotation.x = Math.PI * 0.5;
        scene.add(ceilMesh);


      }
    }
  }
}
function isCollision(x, y){
  return map[y][x] == 1 || map[y][x] == 2;
}
