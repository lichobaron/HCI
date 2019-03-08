var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 ); //apertura del lente, proporción, dist corta, dist larga
camera.position.z = 13;
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var loader = new THREE.TextureLoader();

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


var saturnTexture = loader.load("images/saturn.jpg");
var geometrySaturn = new THREE.SphereGeometry( 0.8, 32, 32 ); //radio, lin h, lin v
var materialSaturn = new THREE.MeshPhongMaterial( {
    map: saturnTexture, 
    ambient: 0x050505, 
    specular: 0x555555, 
    shininess: 30 } );
var saturn = new THREE.Mesh( geometrySaturn, materialSaturn );
scene.add( saturn );

var ringTexture = loader.load("images/ring.png");
var geometryRing = new THREE.RingGeometry(0.9,1.5,360);
var materialRing = new THREE.MeshPhongMaterial({
    color: 0xa5a5a5,
    shininess: 15,
    side: THREE.DoubleSide,
    map: ringTexture
});
var ring = new THREE.Mesh( geometryRing, materialRing );
scene.add(ring);

var controls = new THREE.OrbitControls( camera );

scene.background = new THREE.CubeTextureLoader()
                    .load( [ './images/space.png', './images/space.png', './images/space.png', 
                    './images/space.png', './images/space.png', './images/space.png' ] );



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
    saturn.rotation.y += 0.03;
    ring.rotation.x = 90;
    ring.rotation.z += 0.05;


    mercury.position.x = 2 *Math.cos(3*t+0.1);
    mercury.position.z = 2 *Math.sin(3*t+0.1);

    venus.position.x = 3 *Math.cos(2*t+0.2);
    venus.position.z = 3 *Math.sin(2*t+0.2);

    earth.position.x = 5 *Math.cos(t);
    earth.position.z = 5 *Math.sin(t);

    moon.position.x = 1 *Math.cos(t*2)+earth.position.x;
    moon.position.z = 1 *Math.sin(t*2)+earth.position.z;

    mars.position.x = 7 *Math.cos(1/2*t);
    mars.position.z = 7 *Math.sin(1/2*t);

    jupiter.position.x = 10 *Math.cos(1/4*t);
    jupiter.position.z = 10 *Math.sin(1/4*t);
    
    saturn.position.x = 15 *Math.cos(1/5*t);
    saturn.position.z = 15 *Math.sin(1/5*t);

    ring.position.x = saturn.position.x;
    ring.position.z = saturn.position.z;

    controls.update();

    renderer.render(scene, camera); 
} 
render();
