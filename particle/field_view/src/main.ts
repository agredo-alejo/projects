import { addMouseListeners, addResizeCanvasListener, animation, clearCanvas, constrain, mouse, radians, startAnimation } from "@apjs/dynamic"
import { angleBetween, createVector, sub } from "@apjs/vector"
import { Boid } from "./boid"

export const canvas = document.querySelector("canvas")!
export const ctx = canvas.getContext("2d")!

let boids: Boid[]
export let size: number
let diagonal
let numBoids
let raton = createVector()
let angle = 120
export let angleOfView = radians(angle)
export let perceptionRadius = 75

addResizeCanvasListener(canvas)
addMouseListeners()
function init() {
  canvas.width = innerWidth
  canvas.height = innerHeight

  let smallerCanvasSide = Math.min(innerWidth, innerHeight)

  diagonal = createVector(innerWidth, innerHeight)
  size = diagonal.mag / 200
  if (innerWidth == smallerCanvasSide) {
    size = diagonal.mag / 125
  }
  boids = []
  numBoids = smallerCanvasSide / 10
  for (let i = 0; i < numBoids; i++) {
    boids.push(new Boid())
  }
}
window.addEventListener("keydown", (event) => {
  if (event.keyCode == 68) {
    angle += 3
  } else if (event.keyCode == 65) {
    angle -= 3
  }
  angle = constrain(angle, 5, 175)
  angleOfView = radians(angle)

})

// setFps(10)
function animate() {
  // requestAnimationFrame(animacion)
  clearCanvas(ctx)
  if(mouse.x){
    raton.set(mouse.x, mouse.y)
  }


  let force = sub(raton, boids[0].position)

  boids[0].applyForce(force)

  boids[0].view()

  for (let other of boids) {
    let distance = boids[0].position.dist(other.position)
    let superVector = sub(other.position, boids[0].position)
    
    if (angleBetween(boids[0].velocity, superVector) < angleOfView && distance < perceptionRadius) {
      other.ownColor = [255, 0, 0]
    }
    else {
      other.ownColor = 125
    }
  }

  for (let boid of boids) {
    boid.update()
    boid.draw()
  }

}


init()
animation.animate(animate)
startAnimation()
// animacion()

