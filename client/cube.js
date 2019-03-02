var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 ); //apertura del lente, proporción, dist corta, dist larga
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 ); //largo, ancho, alto
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );
camera.position.z = 5;

var render = function () {
  requestAnimationFrame( render );
  cube.scale.x += 0.1;
  cube.rotation.y += 0.1;
  renderer.render( scene, camera );
};

render();