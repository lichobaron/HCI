var raycaster = new THREE.Raycaster();
var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 ); //apertura del lente, proporción, dist corta, dist larga
camera.position.z = 13;
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var geometry = new THREE.BoxGeometry( 1, 1, 1 );
var material = new THREE.MeshBasicMaterial( {color: 0x00ff00} );
var cube = new THREE.Mesh( geometry, material );
scene.add( cube );

var geometryFloor = new THREE.BoxGeometry( 10,1,5 );
var materialFloor = new THREE.MeshBasicMaterial( {color: 0x00fff0} );
var floor = new THREE.Mesh( geometryFloor, materialFloor );
scene.add( floor );
floor.translateY(-3.0);

var v = new THREE.Vector3(0,0,0);
var a = new THREE.Vector3(0,-0.01,0);

document.addEventListener("keydown", keyD);
function keyD(event){
    if(event.keyCode==37)
    {
        cube.position.x+=0.2;
    }
    if(event.keyCode==39)
    {
        cube.position.x-=0.2;
    }
    if(event.keyCode==38 && v.y < 0)
    {
        cube.position.y+=0.5;
    }
}


var render = function(){
    requestAnimationFrame(render);
    v.y+=a.y;
    cube.position.y +=v.y;
    ////
    raycaster.set(cube.position, new THREE.Vector3(0,-1,0));
    var intersects = raycaster.intersectObjects(scene.children,true);
    if(intersects.length>0)
    {
        console.log(intersects);
        if(intersects[0].distance<1)
        {
            v.y*=-1;
            cube.position.y+=0.2;
        }
    }
    camera.position.x=cube.position.x;
    /////
    renderer.render(scene,camera);
}

render();