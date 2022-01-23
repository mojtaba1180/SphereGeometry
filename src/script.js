import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'



// coursor 

var cursor = document.getElementById("cursor");


// loading 
const TextureLoader = new THREE.TextureLoader()

const normalMapTextTure = TextureLoader.load('/textture/NormalMap.png')
const normalMapTextTure2 = TextureLoader.load('/textture/NormalMap2.png')
// Debug

// const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry(2, .1, 64, 64);
const sphereGm = new THREE.SphereBufferGeometry(.7, 64, 64)
// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = .7;
material.roughness = .2;
material.normalMap = normalMapTextTure;
material.color = new THREE.Color(0xFFffff)

const material2 = new THREE.MeshStandardMaterial()
material2.metalness = .7;
material2.roughness = .2;
material2.normalMap = normalMapTextTure2;
material2.color = new THREE.Color(0xFFffff)

// Mesh
const sphere = new THREE.Mesh(sphereGm, material)
scene.add(sphere)

const sphere2 = new THREE.Mesh(geometry, material2)
scene.add(sphere2)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.5)

scene.add(pointLight)
const pointLight2 = new THREE.PointLight(0xa80ff, 0.3)
pointLight2.position.set(15.7, -13.4, -26.2)
pointLight2.intensity = 1
scene.add(pointLight2)
const pointLight3 = new THREE.PointLight(0xff0000, 0.3)
pointLight3.position.set(-13.4, 15.7, -26.2)
scene.add(pointLight3)

// const pointLight4 = new THREE.PointLight(0x00ff00, 0.3)
// pointLight4.position.set(3.4, 15.7, -26.2)
// scene.add(pointLight4)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */

// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 2
scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))


/**
 * Animate
 */

document.addEventListener('mousemove', movinegfuntion)
let mouseX = 12
let mouseY = 120

let targetX = 0
let targetY = 0

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function movinegfuntion(e) {
    mouseX = (e.clientX - windowX)
    mouseY = (e.clientY - windowY)
    console.log
    cursor.style.left = `${e.clientX}px`,
        cursor.style.top = `${e.clientY}px`;
}
const clock = new THREE.Clock()

const tick = () => {
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    sphere.rotation.y = .8 * elapsedTime
    sphere2.rotation.z = .3 * elapsedTime
    sphere2.rotation.x = 4.5
    sphere2.rotation.y = .06 * elapsedTime
    // sphere.rotation.y = .8 * elapsedTime
    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .5 * (targetY - sphere.rotation.x)
    sphere.castShadow = true;
    pointLight.position.set(mouseX, mouseY * -1, 4)

    // console.log(targetY )


    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}


tick()