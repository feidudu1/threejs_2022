import  * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

/**
 * 渲染黄色正方体
 * 添加轨道控制器，使可以用鼠标拖动物体
 * 物体移动、缩放、旋转
 * 新增：用requestAnimationFrame做平滑的动画
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

function render(time) {
  // cube.position.x += 0.01 // 不要用这种方法，会因为刷新频率的问题不平滑，且与屏幕刷新不一致，动画效果不好
  const t = (time / 1000) % 5
  cube.position.x = t * 1 // 每单位时间移动一个，速度为1。t最大为4.99999
  if (cube.position.x > 4) { // 即使不符合条件，方块也会自动回到原点？而且动画更顺畅
    console.log(cube.position.x)
    cube.position.x = 0
  }
  controls.update()
  // 使用渲染器，通过相机将场景渲染进来
  renderer.render(scene, camera)
  requestAnimationFrame(render)
}

render()

