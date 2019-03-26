var effect, controls, group, intensity = 0.5;
var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var loader = new THREE.TextureLoader();

document.body.appendChild(renderer.domElement);

effect = new THREE.StereoEffect(renderer);
effect.setSize(window.innerWidth, window.innerHeight);
controls = new THREE.DeviceOrientationControls(camera);

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshNormalMaterial();
var cube = new THREE.Mesh(geometry, material);
cube.name = "b1";
scene.add(cube);
camera.position.z = 5;

makeFloor();
makeBulbGroup();
makeWalls();


function makeFloor() {
    var floorGeo = new THREE.PlaneGeometry(100, 100);
    var floorMat = new THREE.MeshStandardMaterial({
        color: 0xffffff,
        metalness: 0.65
    });
    floorMat.color.setHex(0xe81b05);

    var floor = new THREE.Mesh(floorGeo, floorMat);
    floor.rotation.x = -Math.PI / 2;
    floor.position.y = -2;

    scene.add(floor);
    //floor.receiveShadow = true;
    
}
function makeWalls() {
    var widthWall = 1;

    var wallRightTexture = loader.load("images/jupiter.jpeg");
    var geometryWallRight = new THREE.BoxGeometry(widthWall, 20, 5); //w,  h,  d
    var materialWallRight = new THREE.MeshPhongMaterial({
        map: wallRightTexture,
        ambient: 0x050505,
        specular: 0x555555,
        shininess: 30
    });
    var wallRight = new THREE.Mesh(geometryWallRight, materialWallRight);
    scene.add(wallRight);

    var distanceWallRight = 5;
    wallRight.translateX(distanceWallRight);
    wallRight.translateY(-3.5);

    var wallLeftTexture = loader.load("images/jupiter.jpeg");
    var geometryWallLeft = new THREE.BoxGeometry(widthWall, 20, 5); //w,  h,  d
    var materialWallLeft = new THREE.MeshPhongMaterial({
        map: wallLeftTexture,
        ambient: 0x050505,
        specular: 0x555555,
        shininess: 30
    });
    var wallLeft = new THREE.Mesh(geometryWallLeft, materialWallLeft);
    scene.add(wallLeft);

    var distanceWallLeft = -5;
    wallLeft.translateX(distanceWallLeft);
    wallLeft.translateY(-3.5);


}

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
    group.position.y = 1.5;
    group.position.z = 0;
    group.position.x = 0;
}


//camera
camera = new THREE.PerspectiveCamera(
    30,
    window.innerWidth / window.innerHeight,
    1,
    10000
);

camera.position.set(0, 4.25, 15);
scene.add(camera);

camera.lookAt(new THREE.Vector3(0, 2, 0));

//directional light for highlighting
var light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1).normalize();


function onMouseMove(event) {

    // calculate mouse position in normalized device coordinates
    // (-1 to +1) for both components

    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

}
var t = 0;
var intensity2 = 1;
var render = function () {
    requestAnimationFrame(render);

    raycaster.setFromCamera(mouse, camera);

    // calculate objects intersecting the picking ray
    var intersects = raycaster.intersectObjects(scene.children, true);

    if (intersects.length > 0) {
        if (intersects[0].object.name == "b1") {
            t++;
            if (t > 120) {
                intersects[0].object.rotation.x += 0.1;
                intersects[0].object.rotation.y += 0.1;
                scene.add(light);
                
            }

        }

    } else { t = 0; scene.remove(light); }


    //cube.rotation.x += 0.1;
    //cube.rotation.y += 0.1;
    //controls.update();
    //effect.render(scene, camera);
    renderer.render(scene, camera);
};

render();
window.addEventListener('mousemove', onMouseMove, false); 
