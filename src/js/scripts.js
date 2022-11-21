import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "dat.gui"

const render = new THREE.WebGLRenderer();

render.shadowMap.enabled = true

render.setSize(window.innerWidth, innerHeight);

document.body.appendChild(render.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
  45,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const orbit = new OrbitControls(camera, render.domElement);

const axesHelper = new THREE.AxesHelper(5);

scene.add(axesHelper);

camera.position.set(-10, 30, 30);
orbit.update();

// Cubo
const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const box = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(box);
box.rotation.x = 5;
box.rotation.y = 5;

// Plano
const planeGeometry = new THREE.PlaneGeometry(30, 30);
const planeMaterial = new THREE.MeshStandardMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
});
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
scene.add(plane);
plane.rotation.x = -0.5 * Math.PI;
plane.receiveShadow = true

// Malla de Ayuda
const gridHelper = new THREE.GridHelper(30);
scene.add(gridHelper);

// Esfera
const sphereGeometry = new THREE.SphereGeometry(4, 50, 50);
const sphereMaterial = new THREE.MeshStandardMaterial({
  color: 0x0000ff,
  wireframe: false,
});
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
scene.add(sphere);

sphere.position.set(-10, 10, 0);
sphere.castShadow = true

// Ambiente
const ambientLight = new THREE.AmbientLight(0x333333)
scene.add(ambientLight)

// // Direccion de Luz
// const directionLight = new THREE.DirectionalLight(0xFFFFFF,0.8)
// scene.add(directionLight)
// directionLight.position.set(-30,50,0)
// directionLight.castShadow = true
// directionLight.shadow.camera.bottom = -12

// // Linea de Guia de Luz
// const dLightHelper = new THREE.DirectionalLightHelper(directionLight)
// scene.add(dLightHelper)

// // Linea de Guia de Sombras
// const dLightShadowsHelper = new THREE.CameraHelper(directionLight.shadow.camera)
// scene.add(dLightShadowsHelper)

const spotLight = new THREE.SpotLight(0xffffff)
scene.add(spotLight)

// Opciones
const gui = new dat.GUI()

const options = {
    sphereColor: "#ffea00",
    wireframe : false,
    speed: 0.01
}
gui.addColor(options, "sphereColor").onChange(function(e){
    sphere.material.color.set(e)
})

gui.add(options, "wireframe").onChange(function(e){
    sphere.material.wireframe = e
})

gui.add(options, "speed", 0, 0.1)

let step = 0

// Animaciones
function animate(time) {
  box.rotation.x = time / 1000;
  box.rotation.x = time / 1000;
  step += options.speed
  sphere.position.y = 10 * Math.abs(Math.sin(step))
  render.render(scene, camera);
}

render.setAnimationLoop(animate);
