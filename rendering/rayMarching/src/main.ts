import { addMouseListeners, addResizeCanvasListener, animation, background, mouse, onResizeCanvas, startAnimation } from "@apjs/dynamic"
import { createVector, Vector } from "@apjs/vector"
import { Circle } from "./circles"
import { Ray } from "./ray"

export const canvas = document.querySelector("canvas")!
export const ctx = canvas.getContext("2d")!

let obstacles: Circle[]
let numObstacles
let perimeter
let ray: Ray
let center: Vector

export let smallerCanvasSide: number

function init() {
  canvas.width = innerWidth
  canvas.height = innerHeight
  center = createVector(innerWidth / 2, innerHeight / 2)

  smallerCanvasSide = Math.min(innerWidth, innerHeight)
  perimeter = innerWidth + innerHeight
  numObstacles = Math.floor(perimeter / 200)
  obstacles = []
  for (let i = 0; i < numObstacles; i++) {
    obstacles.push(new Circle())
  }
  ray = new Ray()
}
addEventListener('dblclick', init)
function animate() {
  background(ctx, "#000")

  for (let obstacle of obstacles) {
    obstacle.draw()
    // obstacle.update()
  }
  if (mouse.dragging) {
    let mouseVector = createVector(mouse.x, mouse.y)
    mouseVector.sub(center)
    ray.angle = mouseVector.direction
  }

  ray.march(obstacles)
  ray.update()
  // ray.draw()
}
init()
addMouseListeners()
addResizeCanvasListener(canvas)
onResizeCanvas(init)
animation.animate(animate)
startAnimation()
// function signedDistance(point1, point2, radius) {
  // return Vector.dist(point1, point2) - radius
// }