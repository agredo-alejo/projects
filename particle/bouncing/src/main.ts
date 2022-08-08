import { animation, clearCanvas, randomRange, startAnimation } from "@apjs/dynamic"
import { createVector } from "@apjs/vector"
import { Particle } from "./particle"

export const canvas = document.querySelector("canvas")!
export const ctx = canvas.getContext("2d")!
export const colors = [
  'green',
  'blue',
  '#F2E527',
  '#F2AB27',
  '#F2522E'
]

let numParticles: number
let valorRadio = {
  min: 0,
  max: 0
}

let particles: Particle[]
function init() {
  canvas.width = innerWidth
  canvas.height = innerHeight

  let smallerCanvasSide = Math.min(innerWidth, innerHeight)



  particles = []

  numParticles = 20
  valorRadio.min = smallerCanvasSide / 70
  valorRadio.max = valorRadio.min * 5

  createParticles()
}
addEventListener('dblclick', init)

function createParticles() {
  let radio, position
  for (let i = 0; i < numParticles; i++) {

    // Create random properties for the new particle
    radio = randomRange(valorRadio.min, valorRadio.max)
    position = createVector(
      randomRange(radio, innerWidth - radio),
      randomRange(radio, innerHeight - radio)
    )

    // Check if the new Particle is overlapping with an already existing particle
    if (i !== 0) {
      let distancefromOtherParticle, minimumDistanceBetweenCircles
      for (let j = 0; j < particles.length; j++) {
        distancefromOtherParticle = position.dist(particles[j].position)
        minimumDistanceBetweenCircles = radio + particles[j].radio

        if (distancefromOtherParticle <= minimumDistanceBetweenCircles) {
          position = createVector(
            randomRange(radio, innerWidth - radio),
            randomRange(radio, innerHeight - radio)
          )
          j = -1
        }
      }
    }
    particles.push(new Particle(position, radio))
  }
}
function animate() {
  clearCanvas(ctx)

  for (let particle of particles) {
    particle.update(particles)
    particle.draw()
  }
}
init()
animation.animate(animate)
startAnimation()
