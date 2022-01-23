import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from 'dat.gui'

// loading 
const TextureLoader = new THREE.TextureLoader()

const normalMapTextTure = TextureLoader.load('/textture/NormalMap.png')
// Debug
const gui = new dat.GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Objects
const geometry = new THREE.TorusGeometry(.6, .2, 126, 10);
const sphereGm = new THREE.SphereBufferGeometry(.7, 64, 64)
// Materials

const material = new THREE.MeshStandardMaterial()
material.metalness = .7;
material.roughness = .2;
material.normalMap = normalMapTextTure;
material.color = new THREE.Color(0xFFffff)

// Mesh
const sphere = new THREE.Mesh(sphereGm, material)
scene.add(sphere)

// const sphere2 = new THREE.Mesh(geometry, material)
// scene.add(sphere2)

// Lights

const pointLight = new THREE.PointLight(0xffffff, 0.1)
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)
const pointLight2 = new THREE.PointLight(0x880af, 0.3)
pointLight2.position.set(15.7, -13.4, -26.2)
pointLight2.intensity = 1
scene.add(pointLight2)

gui.add(pointLight2.position, 'y')
gui.add(pointLight2.position, 'x')
gui.add(pointLight2.position, 'z')

const pointLight3 = new THREE.PointLight(0xff0000, 0.3)
pointLight3.position.set(-13.4, 15.7, -26.2)

scene.add(pointLight3)


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
let mouseX = 0
let mouseY = 0

let targetX = 0
let targetY = 0

const windowX = window.innerWidth / 2;
const windowY = window.innerHeight / 2;

function movinegfuntion(e) {
    mouseX = (e.clientX - windowX)
    mouseY = (e.clientY - windowY)
    mouseY = (e.clientY - windowY)
}
const clock = new THREE.Clock()

const tick = () => {
    targetX = mouseX * .001
    targetY = mouseY * .001

    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // sphere.rotation.y = .8 * elapsedTime
    sphere.rotation.y = .8 * elapsedTime
    sphere.rotation.y += .5 * (targetX - sphere.rotation.y)
    sphere.rotation.x += .5 * (targetY - sphere.rotation.x)

    // Update Orbital Controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()