import * as THREE from 'three';
// import { ARButton } from 'https://unpkg.com/three@0.126.0/examples/jsm/webxr/ARButton.js';

// const scene = new THREE.Scene();

// // create sphere 
// const geometry = new THREE.SphereGeometry(3, 64, 64)
// const material = new THREE.MeshStandardMaterial({
//   color: '#00ff83',
// })
// const mesh = new THREE.Mesh(geometry, material)
// scene.add(mesh)

// //light
// const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1)
// light.position.set(0,0,0)
// scene.add(light)

// //Camera
// const camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 0.1, 100)
// camera.position.z = 20
// scene.add(camera)

// //renderer
// const canvas = document.getElementById('webgl')
// const renderer = new THREE.WebGLRenderer({canvas})
// renderer.xr.enabled = true
// renderer.setSize(window.innerWidth, window.innerHeight)
// renderer.setAnimationLoop(() => { renderer.render(scene, camera); });

// document.body.appendChild(ARButton.createButton(renderer))





// To start an AR scene with webXR, we can use a handy button provided by three.js
// We first have to import it because it is a javascript module
import { ARButton } from 'https://unpkg.com/three@0.126.0/examples/jsm/webxr/ARButton.js';

let camera, scene, renderer;
let mesh;

init();
animate();

function init() {
  const container = document.createElement('div');
  document.body.appendChild(container);

  scene = new THREE.Scene();

  camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 40);

  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  // This next line is important to to enable the renderer for WebXR
  renderer.xr.enabled = true; // New!
  container.appendChild(renderer.domElement);

  var light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 1);
  light.position.set(0.5, 1, 0.25);
  scene.add(light);

  const geometry = new THREE.IcosahedronGeometry(0.1, 1);
  const material = new THREE.MeshPhongMaterial({
    color      :  new THREE.Color("rgb(226,35,213)"),
    shininess  :  6,
    flatShading:  true,
    transparent: 1,
    opacity    : 0.8
  });
  
  mesh = new THREE.Mesh(geometry, material);
  mesh.position.set(0, 0, -0.5);
  scene.add(mesh);

  // Add the AR button to the body of the DOM
  document.body.appendChild(ARButton.createButton(renderer));

  window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
  renderer.setAnimationLoop(render);
}

function render() {      
  renderer.render(scene, camera);
}