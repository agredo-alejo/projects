import { addResizeCanvasListener, animation, background, grayScaleColor, rgbaColor, startAnimation, stroke } from "@apjs/dynamic";


let canvas = document.querySelector("canvas")!
let ctx = canvas.getContext("2d")!

let frecuency = 1.5
let amplitude = 50
let waveLength = 50
let increment = 0

function init() {
  background(ctx, "#000")
  canvas.width = innerWidth
  canvas.height = innerHeight
  
}
init()
addResizeCanvasListener(canvas)

function animate() {
  background(ctx, grayScaleColor(0, 0.03))

  ctx.beginPath()
  ctx.moveTo(0, calc(0) + innerHeight / 2)
  for (let index = 0; index < innerWidth; index++) {
    ctx.lineTo(index, calc(index) + innerHeight / 2)
  }
  stroke(ctx, rgbaColor(30, 170, 255))

  increment -= frecuency
}
function calc(x: number) {
  return Math.sin((x + increment) / waveLength) * (amplitude * Math.sin(increment / 100))
}

animation.animate(animate)
startAnimation()