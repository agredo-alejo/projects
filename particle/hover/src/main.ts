import { addMouseListeners, addResizeCanvasListener, animation, clearCanvas, constrain, mouse, onResizeCanvas, startAnimation } from "@apjs/dynamic"
import { createVector } from "@apjs/vector"
import { Particle } from "./particle"


export const canvas = document.querySelector("canvas")!
export const ctx = canvas.getContext("2d")!
export let colors = [
  'green',
  'blue',
  '#F2E527',
  '#F2AB27',
  '#F2522E'
]
export let mouseVector = createVector()
export let smallerCanvasSide: number
export let maxRadio: number


addResizeCanvasListener(canvas)
onResizeCanvas(init)
addMouseListeners()
let particles: Particle[] = []
let numParticles
function init() {
  canvas.width = innerWidth
  canvas.height = innerHeight
  smallerCanvasSide = Math.min(innerHeight, innerWidth)
  maxRadio = smallerCanvasSide / 15;
  numParticles = smallerCanvasSide / 3
  numParticles = constrain(numParticles, 1, 500)

  particles = [];
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle())
  }
}

function animate() {
  clearCanvas(ctx)
  if (mouse.x) {
    mouseVector.set(mouse.x, mouse.y)
  }

  for (let particle of particles) {
    particle.update()
  }

}

init()
animation.animate(animate)
startAnimation()