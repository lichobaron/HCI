var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 ); //apertura del lente, proporción, dist corta, dist larga
camera.position.z = 13;
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var loader = new THREE.TextureLoader();

/*var light = new THREE.PointLight( 0xffffff, 1, 100 );
light.position.set( 0, 0, 0 );
scene.add(light);
*/

var ambientLight = new THREE.AmbientLight( 0xa5a5a5, 1, 100 );
ambientLight.position.set( 0, 0, 0 );
scene.add(ambientLight);
var radJupiter = 1;
var jupiterTexture = loader.load("images/jupiter.jpeg");
var geometryJupiter = new THREE.SphereGeometry( radJupiter, 32, 32 ); //radio, lin h, lin v
var materialJupiter = new THREE.MeshPhongMaterial( {
    map: jupiterTexture, 
    ambient: 0x050505, 
    specular: 0x555555, 
    shininess: 30 } );
var jupiter = new THREE.Mesh( geometryJupiter, materialJupiter );
scene.add( jupiter );
jupiter.position.y = 10;

var radMars = 1;
var marsTexture = loader.load("images/mars.jpg");
var geometryMars = new THREE.SphereGeometry( radMars, 32, 32 ); //radio, lin h, lin v
var materialMars = new THREE.MeshPhongMaterial( {
    map: marsTexture, 
    ambient: 0x050505, 
    specular: 0x555555, 
    shininess: 30 } );
var mars = new THREE.Mesh( geometryMars, materialMars );
scene.add( mars );
mars.position.y = 10;

var heightFloor = 1;

var floorTexture = loader.load("images/jupiter.jpeg");
var geometryFloor = new THREE.BoxGeometry( 10,heightFloor,5 ); //w,  h,  d
var materialFloor = new THREE.MeshPhongMaterial( {
    map: floorTexture, 
    ambient: 0x050505, 
    specular: 0x555555, 
    shininess: 30 } );
var floor = new THREE.Mesh( geometryFloor, materialFloor );
scene.add( floor );

var distanceFloor = -8;
floor.translateY(distanceFloor);

var widthWall = 1;

var wallRightTexture = loader.load("images/jupiter.jpeg");
var geometryWallRight = new THREE.BoxGeometry( widthWall,10,5 ); //w,  h,  d
var materialWallRight = new THREE.MeshPhongMaterial( {
    map: wallRightTexture, 
    ambient: 0x050505, 
    specular: 0x555555, 
    shininess: 30 } );
var wallRight = new THREE.Mesh( geometryWallRight, materialWallRight );
scene.add( wallRight );

var distanceWallRight = 5;
wallRight.translateX(distanceWallRight);
wallRight.translateY(-3.5);

var wallLeftTexture = loader.load("images/jupiter.jpeg");
var geometryWallLeft = new THREE.BoxGeometry( widthWall,10,5 ); //w,  h,  d
var materialWallLeft = new THREE.MeshPhongMaterial( {
    map: wallLeftTexture, 
    ambient: 0x050505, 
    specular: 0x555555, 
    shininess: 30 } );
var wallLeft = new THREE.Mesh( geometryWallLeft, materialWallLeft );
scene.add( wallLeft );

var distanceWallLeft = -5;
wallLeft.translateX(distanceWallLeft);
wallLeft.translateY(-3.5);


var controls = new THREE.OrbitControls( camera );

var aJupiter = [0,-0.01,0];
var vJupiter = [-0.1,0,0];
var pJupiter = [0,0,0];
var aMars = [0,-0.01,0];
var vMars = [0.1,0,0];
var pMars = [0,-4,0];


function render() { 
    requestAnimationFrame(render); 
    //Caida libre
    var i;
    for(i = 0; i < 3; i++) {
        vJupiter[i] += aJupiter[i];
        pJupiter[i] += vJupiter[i];
    }
    jupiter.position.y = pJupiter[1]; 
    jupiter.position.x = pJupiter[0]; 
    for(i = 0; i < 3; i++) {
        vMars[i] += aMars[i];
        pMars[i] += vMars[i];
    }
    mars.position.y = pMars[1]; 
    mars.position.x = pMars[0]; 

    // Rebote Floor
    if (jupiter.position.y < distanceFloor + heightFloor){
        vJupiter[1] = 0.37000000000000016;
    }
    // Rebote WallRight
    if (jupiter.position.x > distanceWallRight - radJupiter - (widthWall/2)){
        vJupiter[0] = vJupiter[0]*-1;
    }
    // Rebote WallLeft
    if (jupiter.position.x < distanceWallLeft  + radJupiter + (widthWall/2)){
        vJupiter[0] = vJupiter[0]*-1;
    }

    if (mars.position.y < distanceFloor + heightFloor){
        vMars[1] = 0.37000000000000016;
    }
    // Rebote WallRight
    if (mars.position.x > distanceWallRight - radJupiter - (widthWall/2)){
        vMars[0] = vMars[0]*-1;
    }
    // Rebote WallLeft
    if (mars.position.x < distanceWallLeft  + radJupiter + (widthWall/2)){
        vMars[0] = vMars[0]*-1;
    }
    var distanciaBolas = Math.sqrt(Math.pow(jupiter.position.x - mars.position.x,2)+Math.pow(jupiter.position.y - mars.position.y,2)); 
    //Choque de bolas
    if(distanciaBolas < (radJupiter+radMars)){
        vMars[0] = vMars[0] * -1;
        vMars[1] = vMars[1] * -1;
        vJupiter[0] = vJupiter[0] * -1;
        vJupiter[1] = vJupiter[1] *-1;
    }

    controls.update();

    renderer.render(scene, camera); 
} 
render();

