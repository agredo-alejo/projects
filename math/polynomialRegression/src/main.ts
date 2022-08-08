import { addMouseListeners, addResizeCanvasListener, animation, circle, clearCanvas, fill, grayScaleColor, map, mouse, onResizeCanvas, randomRange, startAnimation } from "@apjs/dynamic"
import { scalar, tensor1d, tidy, variable, train, Variable, Tensor1D } from "@tensorflow/tfjs"

let canvas = document.querySelector("canvas")!
let ctx = canvas.getContext("2d")!
let normalizedXinputs: number[]
let normalizedYinputs: number[]
let mouseXinputs: number[]
let mouseYinputs: number[]
let a: Variable
let b: Variable
let c: Variable
let d: Variable


const optimizer = train.adam(0.5)

addEventListener('click', () => {
  mouseXinputs.push(mouse.x!)
  mouseYinputs.push(mouse.y!)
  let x = map(mouse.x!, 0, innerWidth, 0, 1)
  let y = map(mouse.y!, 0, innerHeight, 0, 1)
  normalizedXinputs.push(x)
  normalizedYinputs.push(y)
})
function predict(inputs: number[]) {
  const tfXs = tensor1d(inputs)
  // y = ax^3 + bx^2 + cx + d 
  const tfYs = tfXs.pow(scalar(3)).mul(a).add(tfXs.square().mul(b)).add(tfXs.mul(c)).add(d)

  return tfYs
}
function loss(pred: any, label: Tensor1D) {
  return pred.sub(label).square().mean()
}
function init() {
  canvas.width = innerWidth
  canvas.height = innerHeight

  mouseXinputs = []
  mouseYinputs = []
  normalizedXinputs = []
  normalizedYinputs = []
  a = variable(scalar(randomRange(-1, 1)))
  b = variable(scalar(randomRange(-1, 1)))
  c = variable(scalar(randomRange(-1, 1)))
  d = variable(scalar(randomRange(-1, 1)))
}
function animate() {
  clearCanvas(ctx)

  tidy(() => {
    if (normalizedXinputs.length > 0) {
      optimizer.minimize(() => loss(predict(normalizedXinputs), tensor1d(normalizedYinputs)))
    }
  })
  let screenXs: number[] = []
  for (let i = 0; i < 1; i += 3 / innerWidth) {
    screenXs.push(i)
  }

  const computedYs = tidy(() => predict(screenXs))
  let arrayTypeYs = computedYs.dataSync()
  computedYs.dispose()

  ctx.beginPath()
  for (let i = 0; i < screenXs.length; i++) {
    let x = screenXs[i] * innerWidth
    let y = arrayTypeYs[i] * innerHeight
    ctx.lineTo(x, y)
  }
  ctx.lineWidth = 2
  ctx.stroke()
  ctx.closePath()

  for (let i = 0; i < mouseXinputs.length; i++) {
    circle(ctx, mouseXinputs[i], mouseYinputs[i])
    fill(ctx, grayScaleColor(150))
  }
}
init()
addMouseListeners()
addResizeCanvasListener(canvas)
onResizeCanvas(init)
startAnimation()
animation.animate(animate)

