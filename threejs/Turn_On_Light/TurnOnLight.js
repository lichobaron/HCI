var group, intensity = 0.5;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000); //apertura del lente, proporción, dist corta, dist larga
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
//scene.add(ambientLight);

makeWalls();
makeFloorRoof();
makeBulbGroup();

function makeWalls(){
    var geometryTexture = loader.load("images/walls.jpg");
    var geometry = new THREE.BoxGeometry(20, 15, 0.1);
    var material = new THREE.MeshBasicMaterial({
        map: geometryTexture,
        ambient: 0x050505,
        specular: 0x555555,
        shininess: 30
    });
    var cube = new THREE.Mesh(geometry, material);
    cube.name = "w1";
    scene.add(cube);
    cube.position.z = 10;

    var geometryoTexture = loader.load("images/walls.jpg");
    var geometryo = new THREE.BoxGeometry(20, 15, 0.1);
    var materialo = new THREE.MeshBasicMaterial({
        map: geometryoTexture,
        ambient: 0x050505,
        specular: 0x555555,
        shininess: 30
    });
    var cubeo = new THREE.Mesh(geometryo, materialo);
    cubeo.name = "w2";
    scene.add(cubeo);
    cubeo.position.z = -10;

    var wallTexture = loader.load("images/walls2.jpg");
    var geometryWall = new THREE.BoxGeometry(0.1, 15, 20);
    var materialWall = new THREE.MeshBasicMaterial({
        map: wallTexture,
        ambient: 0x050505,
        specular: 0x555555,
        shininess: 30
    });
    var wall = new THREE.Mesh(geometryWall, materialWall);
    wall.name = "w3";
    scene.add(wall);
    wall.position.x = -10;

    
    var geometrySwitch = new THREE.BoxGeometry(0.4, 1.5, 1);
    var materialSwitch = new THREE.MeshNormalMaterial();
    var switchTurn = new THREE.Mesh(geometrySwitch, materialSwitch);
    switchTurn.name = "switch";
    scene.add(switchTurn);
    switchTurn.position.x = -10;

    var walloTexture = loader.load("images/walls2.jpg");
    var geometryWallo = new THREE.BoxGeometry(0.1, 15, 20);
    var materialWallo = new THREE.MeshBasicMaterial({
        map: walloTexture,
        ambient: 0x050505,
        specular: 0x555555,
        shininess: 30
    });
    var wallo = new THREE.Mesh(geometryWallo, materialWallo);
    wallo.name = "w4";
    scene.add(wallo);
    wallo.position.x = 10;
}

function makeFloorRoof(){
    var floorTexture = loader.load("images/floor.jpg");
    var geometryFloor = new THREE.BoxGeometry(20, 1, 20);
    var materialFloor = new THREE.MeshBasicMaterial({
        map: floorTexture,
        ambient: 0x050505,
        specular: 0x555555,
        shininess: 30
    });
    var floor = new THREE.Mesh(geometryFloor, materialFloor);
    floor.name = "floor";
    scene.add(floor);
    floor.position.y = -7;

    var roofTexture = loader.load("images/roof.jpg");
    var geometryRoof = new THREE.BoxGeometry(20, 1, 20);
    var materialRoof = new THREE.MeshBasicMaterial({
        map: roofTexture,
        ambient: 0x050505,
        specular: 0x555555,
        shininess: 30
    });
    var roof = new THREE.Mesh(geometryRoof, materialRoof);
    roof.name = "roof";
    scene.add(roof);
    roof.position.y = 7;
}
//_____________________________________________________________________________________________________________________________________________________

function makeBulbGroup() {
    group = new THREE.Group();
    //main bulb
    var bulbGeometry = new THREE.SphereGeometry(1, 32, 32);
    var bulbLight = new THREE.PointLight(0xffee88, 1, 100, 2);
    var bulbMat = new THREE.MeshStandardMaterial({
        emissive: 0xffffee,
        emissiveIntensity: intensity,
        color: 0xffffee,
        roughness: 1
    });

    bulbLight.add(new THREE.Mesh(bulbGeometry, bulbMat));
    bulbLight.position.set(0, 2, 0);
    bulbLight.castShadow = true;

    var d = 200;

    bulbLight.shadow.camera.left = -d;
    bulbLight.shadow.camera.right = d;
    bulbLight.shadow.camera.top = d;
    bulbLight.shadow.camera.bottom = -d;

    bulbLight.shadow.camera.far = 100;

    //stem
    var bulbStem = new THREE.CylinderGeometry(0.5, 0.65, 0.55, 32);
    var stemMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        emissive: 0xffffee,
        emissiveIntensity: intensity,
        metalness: 0.8,
        roughness: 0
    });

    var bStem = new THREE.Mesh(bulbStem, stemMat);
    bStem.position.set(0, 2.9, 0);
    bStem.castShadow = true;
    bStem.receiveShadow = true;

    //plug main
    var bulbPlug = new THREE.CylinderGeometry(0.52, 0.52, 1.2, 32);

    var plugMat = new THREE.MeshStandardMaterial({
        color: 0x807d7a
    });

    var plug = new THREE.Mesh(bulbPlug, plugMat);
    plug.position.set(0, 3.2, 0);
    plug.receiveShadow = true;
    plug.castShadow = true;

    //plug top
    var topGeo = new THREE.CylinderGeometry(0.25, 0.3, 0.2, 32);

    var topMat = new THREE.MeshStandardMaterial({
        color: 0xe8d905
    });
    var plugTop = new THREE.Mesh(topGeo, topMat);
    plugTop.position.set(0, 3.75, 0);
    plugTop.receiveShadow = true;
    plugTop.castShadow = true;

    //plug rings
    var ringGeo = new THREE.TorusGeometry(0.52, 0.04, 4, 100);

    var ringMat = new THREE.MeshStandardMaterial({
        color: 0x807d7a
    });

    var ringY = 3.33;
    for (i = 0; i < 3; i++) {
        var ring = new THREE.Mesh(ringGeo, ringMat);
        ring.rotation.x = -Math.PI / 2;
        ring.position.set(0, ringY, 0);
        group.add(ring);

        ringY += 0.15;
    }

    //top ring
    var topRingGeo = new THREE.TorusGeometry(0.49, 0.05, 16, 100);

    var topRing = new THREE.Mesh(topRingGeo, ringMat);
    topRing.position.set(0, 3.75, 0);
    topRing.rotation.x = -Math.PI / 2;

    //bottom ring
    var botRingGeo = new THREE.TorusGeometry(0.5, 0.05, 16, 100);

    var botRing = new THREE.Mesh(botRingGeo, ringMat);
    botRing.position.set(0, 3.15, 0);
    botRing.rotation.x = -Math.PI / 2;

    //add to group
    group.add(bStem);
    group.add(bulbLight);
    group.add(plug);
    group.add(plugTop);
    group.add(botRing);
    group.add(topRing);

    scene.add(group);
    group.position.y = 2;
    group.position.z = 1;
    group.position.x = 0;
}


//camera
/*camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);

camera.position.set(0, 4.25, 1);
scene.add(camera);

camera.lookAt(new THREE.Vector3(0, 2, 1));*/

//directional light for highlighting
var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();

//___________________________________________________________________________________________________________________________________

function onMouseMove(event) {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

}
var t = 0;

function render() {
    requestAnimationFrame(render);

    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        if (intersects[0].object.name == "switch") {
            scene.add(light);
           // t++;
           /* if (t > 30) {
                scene.add(light);

            }*/

        }

    } else {
       // t = 0;
        scene.remove(light);
    }


    controls.update();

    renderer.render(scene, camera);
}
render();
window.addEventListener('mousemove', onMouseMove, false); 


