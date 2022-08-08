import { addResizeCanvasListener, animation, clearCanvas, startAnimation } from "@apjs/dynamic"
import { sub, Vector } from "@apjs/vector"
import { Particle } from "./particle"

export const canvas = document.querySelector("canvas")!
export const ctx = canvas.getContext("2d")!

let particles: Particle[] = []
let numParticles: number

let center: Vector

export let gConstant = 0.01
export let singularity = 0.2
export let radio = 7
numParticles = 175


addResizeCanvasListener(canvas)
function init() {
  canvas.width = innerWidth
  canvas.height = innerHeight

  ctx.strokeStyle = 'rgba(' + 200 + ',' + 200 + ',' + 200 + ', 1)'
  center = new Vector(innerWidth / 2, innerHeight / 2)
  particles = []
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle())
  }
}
addEventListener('dblclick', init)
// let fps = 0
let heavier: Particle
let force
function animate() {
  clearCanvas(ctx)
  // background(255, 0)
  let record = 0
  for (let particle of particles) {
    // particle.update()
    particle.atraction(particles)
    if (particle.mass > record) {
      record = particle.mass
      heavier = particle
    }

  }
  for (let particle of particles) {
    particle.update()
    particle.draw()
  }
  force = sub(center, heavier.position)
  force.mag = 0.025
  force.mult(heavier.mass)
  heavier.applyForce(force)
  heavier.velocity.mult(0.997)
}
init()
animation.animate(animate)
startAnimation()
// setFps(2)