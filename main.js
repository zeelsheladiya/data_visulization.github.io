//Libraries

import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';


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

const geometry = new THREE.TorusGeometry(15, 1, 16, 100);
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

// font
const fontLoader = new FontLoader();

var textPositionX = 1;
var textPositionY = -2;
var textPositionZ = -5;

const ttfLoader = new TTFLoader();
ttfLoader.load('font/Roboto-Bold.ttf', (json) => {
    // First parse the font.
    const jetBrainsFont = fontLoader.parse(json);
    // Use parsed font as normal.
    const zeeltextGeometry = new TextGeometry('Zeel', {
        height: 1,
        size: 0.5,
        font: jetBrainsFont,
    });

    const anibaltextGeometry = new TextGeometry('Anibal', {
        height: 1,
        size: 0.5,
        font: jetBrainsFont,
    });

    const aashishtextGeometry = new TextGeometry('Aashish', {
        height: 1,
        size: 0.5,
        font: jetBrainsFont,
    });

    const tonytextGeometry = new TextGeometry('Tony', {
        height: 1,
        size: 0.5,
        font: jetBrainsFont,
    });

    const textMaterial = new THREE.MeshNormalMaterial();

    const zeeltextMesh = new THREE.Mesh(zeeltextGeometry, textMaterial);
    const anibaltextMesh = new THREE.Mesh(anibaltextGeometry, textMaterial);
    const aashishtextMesh = new THREE.Mesh(aashishtextGeometry, textMaterial);
    const tonytextMesh = new THREE.Mesh(tonytextGeometry, textMaterial);

    zeeltextMesh.position.x = textPositionX;
    zeeltextMesh.position.y = textPositionY;
    zeeltextMesh.position.z = textPositionZ;

    anibaltextMesh.position.x = textPositionX - 4;
    anibaltextMesh.position.y = textPositionY;
    anibaltextMesh.position.z = textPositionZ + 2;
    anibaltextMesh.rotation.y = 0.2;

    aashishtextMesh.position.x = textPositionX -8;
    aashishtextMesh.position.y = textPositionY;
    aashishtextMesh.position.z = textPositionZ + 4;
    aashishtextMesh.rotation.y = 0.4;

    tonytextMesh.position.x = textPositionX - 12;
    tonytextMesh.position.y = textPositionY;
    tonytextMesh.position.z = textPositionZ + 6;
    tonytextMesh.rotation.y = 0.6;

    scene.add(zeeltextMesh);
    scene.add(anibaltextMesh);
    scene.add(aashishtextMesh);
    scene.add(tonytextMesh);
});

//avatars

//const dogeTexture = new THREE.TextureLoader().load('images/doge.png');
const zeelTexture = new THREE.TextureLoader().load('images/zeel.jpg');

const anibalTexture = new THREE.TextureLoader().load('images/zeel.jpg');
const aashishTexture = new THREE.TextureLoader().load('images/zeel.jpg');
const tonyTexture = new THREE.TextureLoader().load('images/zeel.jpg');

//const doge = new THREE.Mesh(
//        new THREE.BoxGeometry(3, 3, 3),
//        new THREE.MeshBasicMaterial({map: dogeTexture})
//        );

var sizeOfAvtarBox = 2;

const zeel = new THREE.Mesh(
        new THREE.BoxGeometry(sizeOfAvtarBox, sizeOfAvtarBox, sizeOfAvtarBox),
        new THREE.MeshBasicMaterial({map: zeelTexture})
        );

const anibal = new THREE.Mesh(
        new THREE.BoxGeometry(sizeOfAvtarBox, sizeOfAvtarBox, sizeOfAvtarBox),
        new THREE.MeshBasicMaterial({map: anibalTexture})
        );

const aashish = new THREE.Mesh(
        new THREE.BoxGeometry(sizeOfAvtarBox, sizeOfAvtarBox, sizeOfAvtarBox),
        new THREE.MeshBasicMaterial({map: aashishTexture})
        );

const tony = new THREE.Mesh(
        new THREE.BoxGeometry(sizeOfAvtarBox, sizeOfAvtarBox, sizeOfAvtarBox),
        new THREE.MeshBasicMaterial({map: tonyTexture})
        );

//doge.position.set(0, 3, 3);


scene.add(zeel);
scene.add(anibal);
scene.add(aashish);
scene.add(tony);

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

var positionXPoint = -5;
var positionyPoint = 2;

zeel.position.z = positionXPoint;
zeel.position.x = positionyPoint;

anibal.position.z = positionXPoint + 2;
anibal.position.x = positionyPoint - 4;

aashish.position.z = positionXPoint + 4;
aashish.position.x = positionyPoint - 8;

tony.position.z = positionXPoint + 6;
tony.position.x = positionyPoint - 12;

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.005;
    moon.rotation.y += 0.0025;
    moon.rotation.z += 0.005;

//    zeel
    zeel.rotation.y += 0.01;
    zeel.rotation.z += 0.01;

//    anibal
    anibal.rotation.y += 0.02;
    anibal.rotation.z += 0.02;

//    aashish
    aashish.rotation.y += 0.03;
    aashish.rotation.z += 0.03;

//    tony
    tony.rotation.y += 0.04;
    tony.rotation.z += 0.04;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.rotation.y = t * -0.0002;
}

document.body.onscroll = moveCamera;
moveCamera();

//main animation function

function animate(){
    requestAnimationFrame(animate);

//    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

//    controls.update();

    renderer.render(scene, camera);
}

animate();
