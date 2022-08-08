import { addMouseListeners, addResizeCanvasListener, animation, background, clearCanvas, grayScaleColor, startAnimation } from "@apjs/dynamic"
import { Particle } from "./particle"


export const canvas = document.querySelector("canvas")!
export const ctx = canvas.getContext("2d")!

export const smallerCanvasSide = Math.min(innerWidth, innerHeight)

export const colores = [
  [0, 190, 255],
  [75, 55, 205],
  [5, 145, 255]
]
let particles: Particle[] = []
function init() {
  canvas.width = innerWidth
  canvas.height = innerHeight


  clearCanvas(ctx)
  particles = []
  for (let i = 0; i < 75; i++) {
    particles.push(new Particle(innerWidth / 2, innerHeight / 2))
  }
}
addResizeCanvasListener(canvas)
addMouseListeners()
addEventListener('dblclick', init)
function animate() {
  background(ctx, grayScaleColor(10, 0.1))

  for (let particle of particles) {
    particle.update()
  }

}
animation.animate(animate)
startAnimation()
init() 