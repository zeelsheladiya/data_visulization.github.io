//Libraries

import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';


//scene

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer=  new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);

renderer.setSize(window.innerWidth, window.innerHeight);

camera.position.setZ(30);

renderer.render(scene, camera);

//objects

const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

//lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//helpers

//const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper);

//const controls = new OrbitControls(camera, renderer.domElement);

//adding star to scene

function addStar() {
    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial({color: 0xffffff});
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

    star.position.set(x, y, z);
    scene.add(star);

}

Array(200).fill().forEach(addStar);

//adding background to scene

const spaceTexture = new THREE.TextureLoader().load('images/space.jpg');
scene.background = spaceTexture;

//avatars

//const dogeTexture = new THREE.TextureLoader().load('images/doge.png');
const zeelTexture = new THREE.TextureLoader().load('images/zeel.jpg');

//const doge = new THREE.Mesh(
//        new THREE.BoxGeometry(3, 3, 3),
//        new THREE.MeshBasicMaterial({map: dogeTexture})
//        );

const zeel = new THREE.Mesh(
        new THREE.BoxGeometry(3, 3, 3),
        new THREE.MeshBasicMaterial({map: zeelTexture})
        );

//doge.position.set(0, 3, 3);

scene.add(zeel);

//moon

const moonTexture = new THREE.TextureLoader().load('images/moon.jpg');
const normalTexture = new THREE.TextureLoader().load('images/moon_normal.jpg');

const moon = new THREE.Mesh(
        new THREE.SphereGeometry(3, 32, 32),
        new THREE.MeshStandardMaterial({map: moonTexture, normalMap: normalTexture})
);



scene.add(moon);

//camera scroll animation

moon.position.z = 30;
moon.position.setX(-10);

zeel.position.z = -5;
zeel.position.x = 2;


function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    zeel.rotation.y += 0.01;
    zeel.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

//main animation function

function animate(){
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

//    controls.update();

    renderer.render(scene, camera);
}

animate();
