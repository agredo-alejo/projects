import { addMouseListeners, addResizeCanvasListener, animation, clearCanvas, constrain, mouse, randomRange, startAnimation } from "@apjs/dynamic"
import { createVector } from "@apjs/vector"
import { Particle } from "./particle"

export const canvas = document.querySelector("canvas")!
export const ctx = canvas.getContext("2d")!
let numParticles
export let stickyDistance: number
export let particles: Particle[] = []
let diagonal
let speed
export let drawTriangles = true
export let drawLines = false


addMouseListeners()
addResizeCanvasListener(canvas)
function init() {
  canvas.width = innerWidth
  canvas.height = innerHeight
  particles = []
  diagonal = createVector(innerWidth, innerHeight)

  numParticles = (innerWidth * innerHeight) / (40 * 1e3)
  numParticles = constrain(numParticles, 20, 100)

  stickyDistance = diagonal.mag / 5

  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle())
  }
}
addEventListener('dblclick', event => {
  if (event.x > innerWidth / 2) {
    drawTriangles = !drawTriangles
  } else {
    drawLines = !drawLines
  }
})
let counter = 0
let mouseVector = createVector()
function animate() {
  clearCanvas(ctx)
  if(mouse.x){
    mouseVector.set(mouse.x, mouse.y)
  }



  if (counter % 1 == 0) {
    for (let particle of particles) {
      speed = createVector(randomRange(-1, 1), randomRange(-1, 1))
      speed.div(5)
      // particle.velocity.add(speed)
      particle.velocity.maxMag(1)
      particle.update()
    }
    counter = 0
  }
  counter++
  for (let particle of particles) {
    particle.draw()
    particle.sticky(mouseVector, stickyDistance * 2)
  }


}
init()
animation.animate(animate)
startAnimation()