function init() {
  scene = new THREE.Scene();
  renderer = new THREE.WebGLRenderer();
  let ww = $('#container').innerWidth();
  let hh = $('#container').innerHeight();
  renderer.setSize(ww, hh);
  renderer.setClearColor(0x888888);
  $("#container").append(renderer.domElement);

  camera = new THREE.PerspectiveCamera(60, ww / hh, 0.1, 1000);
  camera2 = new THREE.PerspectiveCamera(60, ww / hh, 0.1, 2000);
  camera2.position.set(22, 20, -5);

  let controls = new THREE.OrbitControls(camera2, renderer.domElement);
  controls.enableKeys = false;

  light = new THREE.DirectionalLight(0xffffff, 0.25);
  light.position.set(20, 100, 10);
  scene.add(light);

  var lightA = new THREE.AmbientLight(0x111111, 0.5);
  scene.add(lightA);
  makePerspective(camera, 0.035, 0.1);
  createDungeon();
  player = new player(camera, frontSight, new THREE.Vector3(7, 0.5, 9));

  var loader = new THREE.TextureLoader();
  loader.setCrossOrigin('');
  let texture = loader.load ('https://i.imgur.com/HE7XPmB.png');
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  noise = loader.load ('https://i.imgur.com/29vcdKE.jpg');
  noise.wrapS = THREE.RepeatWrapping;
  noise.wrapT = THREE.RepeatWrapping;

  dissovleMaterial = new THREE.ShaderMaterial({
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
            value: new THREE.Vector3()
          },
          mytex: {
            type: 't',
            value: texture
          },
          noise: {
            type: 't',
            value: noise
          }
        },
        vertexShader: document.getElementById('myVertexShader').textContent,
        fragmentShader: document.getElementById('myFragmentShader').textContent

  });
  //dissovleMaterial.uniforms["lightpos"].value.copy (light.position);
  let target1 = new THREE.Mesh(new THREE.PlaneGeometry(0.5,0.5), new THREE.MeshBasicMaterial({ map:texture, transparent:true}));
  //let target1 = new THREE.Mesh(new THREE.PlaneGeometry(0.5,0.5), dissovleMaterial);
		target1.position.set(7,0.5,8.5);
		scene.add(target1);
		pickObject.push(target1);

  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('mousemove', onMouseMove, false);
  window.addEventListener('click', onMouseClick, false);
}

function animate() {
  keyboard.update();
  player.update();
  rayCaster();
  dissolve();
  makePerspective(camera, 0.035, 0.1);
  requestAnimationFrame(animate);
  TWEEN.update();
  render();
}

function render() {
  if (toggle === true)
    renderer.render(scene, camera);
  else
    renderer.render(scene, camera2);
}
$('#toggle').click(function(){
        toggle = !toggle;
    });
var camera, scene, renderer, keyboard = new KeyboardState(), toggle = true, clock = new THREE.Clock(), dissovleMaterial, noise;


init();
animate();
