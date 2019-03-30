var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000); //apertura del lente, proporción, dist corta, dist larga
console.log(camera.position);
camera.position.z=1;
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var loader = new THREE.TextureLoader();

var controls = new THREE.OrbitControls(camera);

/*var light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set( 0, 0, 0 );
scene.add(light);
*/

var ambientLight = new THREE.AmbientLight(0xa5a5a5, 1, 100);
ambientLight.position.set(0, 0, 0);
scene.add(ambientLight);

var geometry = new THREE.BoxGeometry(20, 15, 1);
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);
cube.name = "b1";
scene.add(cube);
cube.position.z = 10;

var geometryo = new THREE.BoxGeometry(20, 15, 1);
var materialo = new THREE.MeshNormalMaterial();
var cubeo = new THREE.Mesh(geometryo, materialo);
cubeo.name = "b1";
scene.add(cubeo);
cubeo.position.z = -10;

var geometryWall = new THREE.BoxGeometry(1, 15, 20);
var materialWall = new THREE.MeshNormalMaterial();
var wall = new THREE.Mesh(geometryWall, materialWall);
wall.name = "b1";
scene.add(wall);
wall.position.x = -10;

var geometryWallo = new THREE.BoxGeometry(1, 15, 20);
var materialWallo = new THREE.MeshNormalMaterial();
var wallo = new THREE.Mesh(geometryWallo, materialWallo);
wallo.name = "b1";
scene.add(wallo);
wallo.position.x = 10;



var geometryFloor = new THREE.BoxGeometry(20, 1, 20);
var materialFloor = new THREE.MeshNormalMaterial();
var floor = new THREE.Mesh(geometryFloor, materialFloor);
floor.name = "b1";
scene.add(floor);
floor.position.y = -7;

var geometryRoof = new THREE.BoxGeometry(20, 1, 20);
var materialRoof = new THREE.MeshNormalMaterial();
var roof = new THREE.Mesh(geometryRoof, materialRoof);
roof.name = "b1";
scene.add(roof);
roof.position.y = 7;




function render() {
    requestAnimationFrame(render);


    controls.update();

    renderer.render(scene, camera);
}
render();


