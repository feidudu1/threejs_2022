import  * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import gsap from 'gsap'

/**
 * 渲染黄色正方体
 * 添加轨道控制器，使可以用鼠标拖动物体
 * 物体移动、缩放、旋转
 * 用requestAnimationFrame做平滑的动画
 * 新增：使用gsap动画库设置动画效果
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

/**
 * position、scale、rotation 都是object3D的属性
 */
// 设置物体的位置
// cube.position.set(0, 1, 0)
// cube.position.y = 1

// 设置物体的缩放
// cube.scale.set(3, 2, 1)
// cube.scale.x = 2

// 设置物体的旋转
cube.rotation.set(Math.PI / 4, 0, 0)

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

// 设置动画
const animation1 = gsap.to(cube.position, {x: 5, duration: 5, ease: 'power1.inOut', 
// 往返运动yoyo在repeat不为1时生效
yoyo: true,
repeat: -1,
delay: 5,
onComplete: () => {
  console.log('动画完成')
}, onStart: () => {
  console.log('动画开始')
}})
// 无限次循环 repeat 为 -1
gsap.to(cube.rotation, {x: Math.PI * 2, duration: 5, ease: 'power1.inOut', repeat: 2})

window.addEventListener('dblclick', () => {
  if (animation1.isActive()) {
    animation1.pause()
  } else {
    animation1.resume()
  }
})

function render() {
  controls.update()
  // 使用渲染器，通过相机将场景渲染进来
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()

