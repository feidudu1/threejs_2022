import  * as THREE from 'three';

/**
 * 最基础的静态场景
 * 渲染黄色正方体
 */

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// 设置相机位置
camera.position.set(0, 0, 10)
scene.add(camera)

// 创建几何体
const cubeGeometry = new THREE.BoxGeometry()
const cubeMaterial = new THREE.MeshBasicMaterial({color: 0xffff00})
const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
scene.add(cube)

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// 渲染器
const renderer = new THREE.WebGLRenderer()
// 设置渲染的尺寸大小，这里的renderer里有个domElement，是个canvas
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)
// 使用渲染器，通过相机将场景渲染进来
renderer.render(scene, camera)

