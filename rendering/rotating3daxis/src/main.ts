import { addMouseListeners, addResizeCanvasListener, animation, clearCanvas, fill, lineVector, mouse, onResizeCanvas, radians, rgbaColor, startAnimation, stroke, triangleVector } from "@apjs/dynamic"
import { changeOfBasis, createVector, forward, mult, right, up, Vector, zero } from "@apjs/vector"

let canvas = document.querySelector("canvas")!
let ctx = canvas.getContext("2d")!
let center: Vector
let vi: Vector
let vj: Vector
let vk: Vector
let vector: Vector
let changedVector
let smallerCanvasSide = Math.min(innerWidth, innerHeight)
let scaleV = smallerCanvasSide * 0.4
let angle = radians(0.025)
let aum = 0.01
addResizeCanvasListener(canvas)
function init() {
  canvas.width = innerWidth
  canvas.height = innerHeight
  vi = right()
  vj = up()
  vk = forward()

  vector = createVector(1, 0, 0)
  changedVector = new Vector()

  smallerCanvasSide = Math.min(innerWidth, innerHeight)
  center = new Vector(innerWidth / 2, innerHeight / 2)
  scaleV = smallerCanvasSide * 0.4
  rotateXT(radians(40))
  rotateYT(radians(30))
  // rotateZT(rad(35))
}
addEventListener('dblclick', init)

function animate() {
  clearCanvas(ctx)
  // background(255, 0.01)

  vector.rotate(aum)
  // rotate(vector,aum)
  changedVector = changeOfBasis(vector, vi, vj, vk)



  if (mouse.dragging) {
    let mouseVector = createVector(mouse.x, mouse.y)
    mouseVector.sub(center)


    rotateXT(-(mouse.y || 0) / 10000);
    rotateYT((mouse.x || 0) / 10000);
  }
  if (!mouse.dragging) {
    rotateXT(angle)
    rotateYT(angle * 2)
    rotateZT(angle)
  }



  ctx.save()
  ctx.translate(innerWidth / 2, innerHeight / 2)

  ctx.save()
  ctx.lineWidth = 3

  lineVector(
    ctx,
    zero(),
    mult(changedVector, scaleV / 2)
  )
  stroke(ctx, rgbaColor(255, 0, 0))

  ctx.restore()

  lineVector(
    ctx,
    mult(vi, scaleV),
    mult(mult(vi, -1), scaleV)
  )
  ctx.stroke()
  lineVector(
    ctx,
    mult(vj, scaleV),
    mult(mult(vj, -1), scaleV)
  )
  ctx.stroke()
  lineVector(
    ctx,
    mult(vk, scaleV),
    mult(mult(vk, -1), scaleV)
  )
  ctx.stroke()

  let triangleScale = scaleV * 0.15
  let triangleColor = rgbaColor([0, 0, 255, 0.5])
  triangleVector(
    ctx,
    zero(),
    mult(vi, triangleScale),
    mult(vj, triangleScale)
  )
  fill(ctx, triangleColor)

  triangleVector(
    ctx,
    zero(),
    mult(mult(vi, -1), triangleScale),
    mult(vk, triangleScale)
  )
  fill(ctx, triangleColor)


  ctx.restore()
  // ctx.restore()
}
init()
addMouseListeners()
onResizeCanvas(init)
// animate()
// animate()
animation.animate(animate)
startAnimation()

function rotateXT(angle: number) {
  vi.rotateX(angle)
  vj.rotateX(angle)
  vk.rotateX(angle)
}
function rotateYT(angle: number) {
  vi.rotateY(angle)
  vj.rotateY(angle)
  vk.rotateY(angle)
}

function rotateZT(angle: number) {
  vi.rotate(angle)
  vj.rotate(angle)
  vk.rotate(angle)
}
