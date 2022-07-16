import  * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/**
 * bufferGeometry设置顶点创建矩形
 */

// 创建场景
const scene = new THREE.Scene()

// 创建相机
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
// 设置相机位置
camera.position.set(0, 0, 10)
scene.add(camera)

// 创建几何体
const geometry = new THREE.BufferGeometry()
// 创建六个顶点（两个三角形拼成一个正方形，共6个顶点）
const vertices = new Float32Array([
  -1.0, -1.0, 1.0,
  1.0, -1.0, 1.0,
  1.0, 1.0, 1.0, 
  1.0, 1.0, 1.0, 
  -1.0, 1.0, 1.0,
  -1.0, -1.0, 1.0,
])
geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3)) // 每三个值作为一个坐标
const material = new THREE.MeshBasicMaterial({color: 0xffff00})
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

// 添加坐标轴辅助器
const axesHelper = new THREE.AxesHelper(5)
scene.add(axesHelper)

// 渲染器
const renderer = new THREE.WebGLRenderer()

// 创建轨道控制器
const controls = new OrbitControls(camera, renderer.domElement)
// 设置控制器阻尼，让控制器更有真实效果,必须在动画循环里调用.update()。
controls.enableDamping = true;

// 设置渲染的尺寸大小，这里的renderer里有个domElement，是个canvas
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

function render() {
  controls.update()
  // 使用渲染器，通过相机将场景渲染进来
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()

// 监听画面变化，更新渲染画面
window.addEventListener('resize', () => {
  // 更新摄像头
  camera.aspect = window.innerWidth / window.innerHeight
  // 更新摄像头的投影矩阵
  camera.updateProjectionMatrix()
  // 更新渲染器
  renderer.setSize(window.innerWidth, window.innerHeight)
  // 设置渲染器的像素比
  renderer.setPixelRatio(window.devicePixelRatio)
})


