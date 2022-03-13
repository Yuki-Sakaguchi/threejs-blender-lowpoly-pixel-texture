import './style.css'

import { Scene, WebGLRenderer, PerspectiveCamera, Group, DirectionalLight, SpotLight, PlaneGeometry, MeshBasicMaterial, Mesh, DoubleSide } from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

import model from './assets/FutureCar.glb?url';
let island: Group;

let scene = new Scene();

let camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 12;
camera.position.y = 4;

const directionalLight = new DirectionalLight(0xFFFFFF, 1.0);
scene.add(directionalLight);

// 色, 光の強さ, 距離, 照射角, ボケ具合, 減衰率
const light = new SpotLight(0x089999, 4, 50, Math.PI / 4, 0, 0.5);
// light.position.set(0, 0, 0);
light.position.set( 10, 10, 10 );
scene.add(light);

// const lightHelper = new SpotLightHelper(light);
// scene.add(lightHelper);

let renderer = new WebGLRenderer({
  antialias: true, // 表面を滑らかにする
	alpha: true,
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000, 0);
renderer.physicallyCorrectLights = true;
//@ts-ignore
renderer.gammaOutput = true;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.update();

const gltfLoader = new GLTFLoader();
gltfLoader.load(model, (data) => {
  island = data.scene;
  island.scale.set(0.5, 0.5, 0.5);
  scene.add(island);
});

const geometry = new PlaneGeometry( 12, 12 );
const material = new MeshBasicMaterial( {color: 0x089999, side: DoubleSide} );
const plane = new Mesh( geometry, material );
plane.rotation.x = Math.PI / -2;
plane.rotation.z = Math.PI / -4;
scene.add( plane );

const animate = () => {
  requestAnimationFrame(animate);
  if (island != null) island.rotation.y += 0.005;
  if (plane != null) plane.rotation.z += 0.005;
  renderer.render(scene, camera);
  // lightHelper.update();
};
animate();

const resize = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);

  camera.aspect = width / height;
  camera.updateProjectionMatrix();
};
window.addEventListener('resize', resize);
resize();
