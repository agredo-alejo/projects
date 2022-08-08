import { addMouseListeners, addResizeCanvasListener, animation, background, grayScaleColor, mouse, onResizeCanvas, startAnimation } from "@apjs/dynamic"
import { Boundary } from "./boundary"
import { Particle } from "./particle"


export const canvas = document.querySelector("canvas")!
export const ctx = canvas.getContext("2d")!

let walls: Boundary[]
// let ray: Ray
let particle: Particle


function init() {
  canvas.width = innerWidth
  canvas.height = innerHeight
  walls = []
  for (let i = 0; i < 5; i++) {
    let x1 = Math.random() * innerWidth
    let x2 = Math.random() * innerWidth
    let y1 = Math.random() * innerHeight
    let y2 = Math.random() * innerHeight
    walls.push(new Boundary(x1, y1, x2, y2))
  }
  walls.push(new Boundary(0, 0, innerWidth, 0))
  walls.push(new Boundary(innerWidth, 0, innerWidth, innerHeight))
  walls.push(new Boundary(innerWidth, innerHeight, 0, innerHeight))
  walls.push(new Boundary(0, innerHeight, 0, 0))

  particle = new Particle()
}
addEventListener('dblclick', init)
function animate() {
  background(ctx, grayScaleColor(50))
  for (let wall of walls) {
    wall.show()
  }


  if (mouse.x !== undefined) {
    particle.update(mouse.x, mouse.y)
  }
  particle.look(walls)
  // particle.show()

}
init()
addResizeCanvasListener(canvas)
addMouseListeners()
onResizeCanvas(init)
animation.animate(animate)
startAnimation()