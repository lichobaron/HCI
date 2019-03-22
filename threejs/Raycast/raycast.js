var raycaster = new THREE.Raycaster();
var scene = new THREE.Scene();
var aspect = window.innerWidth / window.innerHeight;
var camera = new THREE.PerspectiveCamera( 75, aspect, 0.1, 1000 ); //apertura del lente, proporción, dist corta, dist larga
camera.position.z = 13;
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
var loader = new THREE.TextureLoader();

var ballTexture = loader.load("images/sun.jpg");
var geometryBall = new THREE.SphereGeometry( 1, 32, 32 );
var materialBall = new THREE.MeshBasicMaterial( { 
    map: ballTexture} );
var ball = new THREE.Mesh( geometryBall, materialBall );
scene.add( ball );
//ball.translateY(-1);

function createFloor(tY, tX, w, h, d) {
    var geometryFloor = new THREE.BoxGeometry( w,h,d );
    var materialFloor = new THREE.MeshBasicMaterial( {color: 0x00fff0} );
    var floor = new THREE.Mesh( geometryFloor, materialFloor );
    scene.add( floor );
    floor.translateY(tY);
    floor.translateX(tX);
}
function createEnemy(tY, tX, w, h, d) {
    var geometryEnemy = new THREE.BoxGeometry(w, h, d);
    var materialEnemy = new THREE.MeshBasicMaterial({ color: 0xfff00 });
    var enemy = new THREE.Mesh(geometryEnemy, materialEnemy);
    scene.add(enemy);
    enemy.translateY(tY);
    enemy.translateX(tX);
    
}

/*var geometryFloor = new THREE.BoxGeometry( 10,1,5 );
var materialFloor = new THREE.MeshBasicMaterial( {color: 0x00fff0} );
var floor = new THREE.Mesh( geometryFloor, materialFloor );
scene.add( floor );
floor.translateY(-3.0);*/
createFloor(-5,0,10,1,5);
createFloor(-5,18,10,1,5);
createEnemy(-4, 18, 0.5, 1, 1);


var v = new THREE.Vector3(0,0,0);
var a = new THREE.Vector3(0,-0.01,0);
var jump = false;
var touchFloor = false;
var y = 0;
//var a = new THREE.Vector3(0,0,0);

document.addEventListener("keydown", keyD);
function keyD(event){
    if(event.keyCode==37)
    {
        ball.rotation.z -= 0.05;
        if(!touchFloor){
            ball.position.x-=1;
        }
        else{
            ball.position.x-=0.4;
        }
    }
    if(event.keyCode==39)
    {
        //ball.position.x+=0.4;
        ball.rotation.z += 0.05;
        if(!touchFloor){
            ball.position.x+=1;
        }
        else{
            ball.position.x+=0.4;
        }
    }
    if(event.keyCode==38)
    {
        if(!jump){
            jump= true;
            touchFloor = false;
            a.y=0.01;
            //a.y*=-1;
            y = ball.position.y;
            //v.y+=0.01;
        }
    }
}

var render = function(){
    requestAnimationFrame(render);
    console.log(a.y);

    camera.position.x=ball.position.x;
    camera.position.y=ball.position.y;
    v.y+=a.y;
    ball.position.y += v.y;

    //console.log(v.y);
    ////
    raycaster.set(ball.position, new THREE.Vector3(0,-1,0));
    var intersects = raycaster.intersectObjects(scene.children,true);

    if(jump){
        if(ball.position.y > y+3){
            jump=false;
            a.y*=-1;
        }
        //v.y= v.y*-1;
    }
    else{
        if(intersects.length>0)
        {
            if(intersects[0].distance<1)
            {
                a.y=0;
                v.y=0;
                touchFloor = true;
                /*if(jump){
                    v.y-=0.3;
                    jump = false;
                }*/
            }
        }
        else{
            a.y= -0.01
        }
    }
    if(ball.position.y < -7){
        ball.position.x = 0;
        ball.position.y = -1;
    }



    /*
    if(ball.position.y < -5){
        ball.position.x = 0;
        ball.position.y = -1;
    }*/

    /////
    
    renderer.render(scene,camera);
}

render();