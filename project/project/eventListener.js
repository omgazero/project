var mouse = new THREE.Vector2(), isHit;
function onMouseMove() {
  event.preventDefault();
  let ww = $('#container').innerWidth();
  let hh = $('#container').innerHeight();
  mouse.x = (event.clientX / ww) * 2 - 1;
  mouse.y = -(event.clientY / hh) * 2 + 1;

  /*let vec = new THREE.Vector3(mouse.x, mouse.y, -2);
  frontSight.position.copy(vec);*/

}

function onMouseClick() {
  /*let vec = frontSight.position.clone() //new THREE.Vector3(mouse.x, mouse.y, 0.5);
  vec.unproject(camera);*/
  if (isHit) {
    //console.log(hitObj);
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
