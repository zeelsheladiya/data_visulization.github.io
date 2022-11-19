//Libraries

import './style.css'

import * as THREE from 'three';

import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';
import {FontLoader} from 'three/examples/jsm/loaders/FontLoader';
import {TextGeometry} from 'three/examples/jsm/geometries/TextGeometry';
import { TTFLoader } from 'three/examples/jsm/loaders/TTFLoader';

import { EffectComposer } from 'three/addons/postprocessing/EffectComposer';
import { RenderPass } from 'three/addons/postprocessing/RenderPass';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass';

import { LuminosityShader } from 'three/addons/shaders/LuminosityShader';
import { SobelOperatorShader } from 'three/addons/shaders/SobelOperatorShader';

let effectSobel, composer;

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

composer = new EffectComposer( renderer );
const renderPass = new RenderPass( scene, camera );
composer.addPass( renderPass );

// postprocessing

composer = new EffectComposer( renderer );
composer.addPass( renderPass );

// color to grayscale conversion

const effectGrayScale = new ShaderPass( LuminosityShader );
composer.addPass( effectGrayScale );

// you might want to use a gaussian blur filter before
// the next pass to improve the result of the Sobel operator

// Sobel operator

effectSobel = new ShaderPass( SobelOperatorShader );
effectSobel.uniforms[ 'resolution' ].value.x = window.innerWidth * window.devicePixelRatio;
effectSobel.uniforms[ 'resolution' ].value.y = window.innerHeight * window.devicePixelRatio;
composer.addPass( effectSobel );

//const geometry = new THREE.TorusGeometry(15, 1, 16, 100);
const geometry = new THREE.TorusKnotGeometry(80, 5, 300, 20, 2, 3);
const material = new THREE.MeshStandardMaterial({color: 0x049ef4});
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

Array(300).fill().forEach(addStar);

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

    const sidharthtextGeometry = new TextGeometry('Sidhant', {
        height: 1,
        size: 0.5,
        font: jetBrainsFont,
    });

    const meenakshitextGeometry = new TextGeometry('Meenakshi', {
        height: 1,
        size: 0.5,
        font: jetBrainsFont,
    });

    const mahommadtextGeometry = new TextGeometry('Muhammad', {
        height: 1,
        size: 0.5,
        font: jetBrainsFont,
    });

//    const textMaterial = new THREE.MeshNormalMaterial();

    const textMaterial = [
        new THREE.MeshPhongMaterial({ color: 0xff6600 }), // front
        new THREE.MeshPhongMaterial({ color: 0x000000 }) // side
    ];

    const zeeltextMesh = new THREE.Mesh(zeeltextGeometry, textMaterial);
    const anibaltextMesh = new THREE.Mesh(anibaltextGeometry, textMaterial);
    const aashishtextMesh = new THREE.Mesh(aashishtextGeometry, textMaterial);
    const tonytextMesh = new THREE.Mesh(tonytextGeometry, textMaterial);
    const sidharthtextMesh = new THREE.Mesh(sidharthtextGeometry, textMaterial);
    const meenakshitextMesh = new THREE.Mesh(meenakshitextGeometry, textMaterial);
    const mahommadtextMesh = new THREE.Mesh(mahommadtextGeometry, textMaterial);

    zeeltextMesh.position.x = textPositionX;
    zeeltextMesh.position.y = textPositionY + 4;
    zeeltextMesh.position.z = textPositionZ;

    anibaltextMesh.position.x = textPositionX - 4;
    anibaltextMesh.position.y = textPositionY + 4;
    anibaltextMesh.position.z = textPositionZ + 2;
    anibaltextMesh.rotation.y = 0.2;

    aashishtextMesh.position.x = textPositionX -8;
    aashishtextMesh.position.y = textPositionY + 4;
    aashishtextMesh.position.z = textPositionZ + 4;
    aashishtextMesh.rotation.y = 0.4;

    tonytextMesh.position.x = textPositionX - 12;
    tonytextMesh.position.y = textPositionY + 4;
    tonytextMesh.position.z = textPositionZ + 6;
    tonytextMesh.rotation.y = 0.6;

    sidharthtextMesh.position.x = textPositionX - 16;
    sidharthtextMesh.position.y = textPositionY + 4;
    sidharthtextMesh.position.z = textPositionZ + 8;
    sidharthtextMesh.rotation.y = 0.8;

    meenakshitextMesh.position.x = textPositionX - 22;
    meenakshitextMesh.position.y = textPositionY + 4;
    meenakshitextMesh.position.z = textPositionZ + 10;
    meenakshitextMesh.rotation.y = 1;

    mahommadtextMesh.position.x = textPositionX - 28;
    mahommadtextMesh.position.y = textPositionY + 4;
    mahommadtextMesh.position.z = textPositionZ + 12;
    mahommadtextMesh.rotation.y = 1.2;

    scene.add(zeeltextMesh);
    scene.add(anibaltextMesh);
    scene.add(aashishtextMesh);
    scene.add(tonytextMesh);
    scene.add(sidharthtextMesh);
    scene.add(meenakshitextMesh);
    scene.add(mahommadtextMesh);
});

//avatars

//const dogeTexture = new THREE.TextureLoader().load('images/doge.png');
const zeelTexture = new THREE.TextureLoader().load('images/zeel.jpg');

const anibalTexture = new THREE.TextureLoader().load('images/anibal.jpg');
const aashishTexture = new THREE.TextureLoader().load('images/aashish.jpeg');
const tonyTexture = new THREE.TextureLoader().load('images/tony.jpeg');
const sidharthTexture = new THREE.TextureLoader().load('images/sishant.jpeg');
const meenakshiTexture = new THREE.TextureLoader().load('images/meenakshi.jpeg');
const mahommadTexture = new THREE.TextureLoader().load('images/mahommad.jpeg');

//const doge = new THREE.Mesh(
//        new THREE.BoxGeometry(3, 3, 3),
//        new THREE.MeshBasicMaterial({map: dogeTexture})
//        );

var sizeOfAvtarBox = 2.5;

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

const sidharth = new THREE.Mesh(
        new THREE.BoxGeometry(sizeOfAvtarBox, sizeOfAvtarBox, sizeOfAvtarBox),
        new THREE.MeshBasicMaterial({map: sidharthTexture})
        );

const meenakshi = new THREE.Mesh(
        new THREE.BoxGeometry(sizeOfAvtarBox, sizeOfAvtarBox, sizeOfAvtarBox),
        new THREE.MeshBasicMaterial({map: meenakshiTexture})
        );

const mahommad = new THREE.Mesh(
        new THREE.BoxGeometry(sizeOfAvtarBox, sizeOfAvtarBox, sizeOfAvtarBox),
        new THREE.MeshBasicMaterial({map: mahommadTexture})
        );

//doge.position.set(0, 3, 3);


scene.add(zeel);
scene.add(anibal);
scene.add(aashish);
scene.add(tony);
scene.add(sidharth);
scene.add(meenakshi);
scene.add(mahommad);

//moon

const moonTexture = new THREE.TextureLoader().load('images/moon.jpg');
const moonNormalTexture = new THREE.TextureLoader().load('images/moon_normal.jpg');

const moon = new THREE.Mesh(
        new THREE.SphereGeometry(3, 32, 32),
        new THREE.MeshStandardMaterial({map: moonTexture, normalMap: moonNormalTexture})
);


const earthTexture = new THREE.TextureLoader().load('images/earth.jpg');
const earthNormalTexture = new THREE.TextureLoader().load('images/earth_normal.jpg');

const earth = new THREE.Mesh(
        new THREE.SphereGeometry(3, 32, 32),
        new THREE.MeshStandardMaterial({map: earthTexture, normalMap: earthNormalTexture})
        );



scene.add(moon);
scene.add(earth);

//camera scroll animation

moon.position.z = 30;
moon.position.setX(-10);

earth.position.z = 30;
earth.position.setX(0);

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

sidharth.position.z = positionXPoint + 8;
sidharth.position.x = positionyPoint - 16;

meenakshi.position.z = positionXPoint + 10;
meenakshi.position.x = positionyPoint - 20;

mahommad.position.z = positionXPoint + 12;
mahommad.position.x = positionyPoint - 24;

var rotationSpeed = 0.01;

function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.005;
    moon.rotation.y += 0.009;
    moon.rotation.z += 0.005;

    earth.rotation.x += 0.005;
    earth.rotation.y += 0.009;
    earth.rotation.z += 0.005;

//    zeel
    zeel.rotation.y += rotationSpeed;
    zeel.rotation.z += rotationSpeed;

//    anibal
    anibal.rotation.y += rotationSpeed + 0.02;
    anibal.rotation.z += rotationSpeed + 0.02;

//    aashish
    aashish.rotation.y += rotationSpeed + 0.03;
    aashish.rotation.z += rotationSpeed + 0.03;

//    tony
    tony.rotation.y += rotationSpeed + 0.04;
    tony.rotation.z += rotationSpeed + 0.04;

    //    sidharth
    sidharth.rotation.y += rotationSpeed + 0.05;
    sidharth.rotation.z += rotationSpeed + 0.05;

    //    meenakshi
    meenakshi.rotation.y += rotationSpeed + 0.06;
    meenakshi.rotation.z += rotationSpeed + 0.06;

    //    mahommad
    mahommad.rotation.y += rotationSpeed + 0.07;
    mahommad.rotation.z += rotationSpeed + 0.07;

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

//    composer.render();

}

animate();




//===============================================================================
//===============================================================================
