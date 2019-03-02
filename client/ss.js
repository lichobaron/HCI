var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 ); //apertura del lente, proporción, dist corta, dist larga
camera.position.z = 13;
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var loader = new THREE.TextureLoader();

controls = new THREE.OrbitControls( camera );

var light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set( 0, 0, 0 );
scene.add(light);

var ambientLight = new THREE.AmbientLight( 0xa5a5a5, 1, 100 );
ambientLight.position.set( 0, 0, 0 );
scene.add(ambientLight);

var sunTexture = loader.load("images/sun.jpg");
var geometrySun = new THREE.SphereGeometry( 1.5, 32, 32 ); //radio, lin h, lin v
var materialSun = new THREE.MeshBasicMaterial( { 
    map: sunTexture,
    ambient: 0x050505, 
    specular: 0x555555, 
    shininess: 30 } );
var sun = new THREE.Mesh( geometrySun, materialSun );
scene.add( sun );

var earthTexture = loader.load("images/earth.jpg");
var geometryEarth = new THREE.SphereGeometry( 0.3, 32, 32 ); //radio, lin h, lin v
var materialEarth = new THREE.MeshPhongMaterial( { 
    map: earthTexture,
    ambient: 0x050505, 
    specular: 0x555555, 
    shininess: 30 } );
var earth = new THREE.Mesh( geometryEarth, materialEarth );
scene.add( earth ); 

var moonTexture = loader.load("images/moon.jpg");
var geometryMoon = new THREE.SphereGeometry( 0.1, 32, 32 ); //radio, lin h, lin v
var materialMoon = new THREE.MeshPhongMaterial( {
    map: moonTexture, 
    ambient: 0x050505, 
    specular: 0x555555, 
    shininess: 30 } );
var moon = new THREE.Mesh( geometryMoon, materialMoon );
scene.add( moon );

var mercuryTexture = loader.load("images/mercury.jpg");
var geometryMercury = new THREE.SphereGeometry( 0.15, 32, 32 ); //radio, lin h, lin v
var materialMercury = new THREE.MeshPhongMaterial( {
    map: mercuryTexture, 
    ambient: 0x050505, 
    specular: 0x555555, 
    shininess: 30 } );
var mercury = new THREE.Mesh( geometryMercury, materialMercury );
scene.add( mercury );

var venusTexture = loader.load("images/venus.jpg");
var geometryVenus = new THREE.SphereGeometry( 0.26, 32, 32 ); //radio, lin h, lin v
var materialVenus = new THREE.MeshPhongMaterial( {
    map: venusTexture, 
    ambient: 0x050505, 
    specular: 0x555555, 
    shininess: 30 } );
var venus = new THREE.Mesh( geometryVenus, materialVenus );
scene.add( venus );

var marsTexture = loader.load("images/mars.jpg");
var geometryMars = new THREE.SphereGeometry( 0.23, 32, 32 ); //radio, lin h, lin v
var materialMars = new THREE.MeshPhongMaterial( {
    map: marsTexture, 
    ambient: 0x050505, 
    specular: 0x555555, 
    shininess: 30 } );
var mars = new THREE.Mesh( geometryMars, materialMars );
scene.add( mars );

var jupiterTexture = loader.load("images/jupiter.jpeg");
var geometryJupiter = new THREE.SphereGeometry( 1, 32, 32 ); //radio, lin h, lin v
var materialJupiter = new THREE.MeshPhongMaterial( {
    map: jupiterTexture, 
    ambient: 0x050505, 
    specular: 0x555555, 
    shininess: 30 } );
var jupiter = new THREE.Mesh( geometryJupiter, materialJupiter );
scene.add( jupiter );

var t = 0;
function render() { 
    requestAnimationFrame(render); 
    t += 0.01; 
    sun.rotation.y += 0.001;         
    earth.rotation.y += 0.03;
    moon.rotation.y += 0.03;
    mercury.rotation.y += 0.03;
    venus.rotation.y += 0.03;
    mars.rotation.y += 0.03;
    jupiter.rotation.y += 0.03;

    mercury.position.x = 2 *Math.cos(t+0.1);
    mercury.position.z = 2 *Math.sin(t+0.1);

    venus.position.x = 3 *Math.cos(t+0.2);
    venus.position.z = 3 *Math.sin(t+0.2);

    earth.position.x = 5 *Math.cos(t);
    earth.position.z = 5 *Math.sin(t);

    moon.position.x = 1 *Math.cos(t*2)+earth.position.x;
    moon.position.z = 1 *Math.sin(t*2)+earth.position.z;

    mars.position.x = 7 *Math.cos(t);
    mars.position.z = 7 *Math.sin(t);

    jupiter.position.x = 10 *Math.cos(t);
    jupiter.position.z = 10 *Math.sin(t);

    controls.update();

    renderer.render(scene, camera); 
} 
render();
