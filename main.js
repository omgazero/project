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
  window.addEventListener('resize', onWindowResize, false);
  window.addEventListener('mousemove', onMouseMove, false);
  window.addEventListener('click', onMouseClick, false);
}

function animate() {
  keyboard.update();
  player.update();
  //rayCaster();
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
var camera, scene, renderer, keyboard = new KeyboardState(), toggle = true, clock = new THREE.Clock(), raycaster = new THREE.Raycaster();

init();
animate();
