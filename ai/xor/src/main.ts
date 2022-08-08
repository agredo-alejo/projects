import { addResizeCanvasListener, clearCanvas, fill, grayScaleColor, onResizeCanvas, rect, animation, startAnimation } from "@apjs/dynamic"
import { create, Tensor, unstack } from "@apjs/tensor"
import { activationLayer, adam, denseLayer, Sequential } from "@apjs/ml"


let canvas = document.querySelector("canvas")!
let ctx = canvas.getContext("2d")!

let resolution: number, screenInputs: Tensor[]
let rows: number, cols: number

let inputs = unstack([[0, 0], [0, 1], [1, 0], [1, 1]])
let targets = unstack([[0], [1], [1], [0]])

let model: Sequential
function initModel() {
  model = new Sequential()
  model.add(denseLayer({
    inputShape: 2,
    units: 3,
  }))
  model.add(activationLayer('tanh'))
  model.add(denseLayer({
    units: 2,
  }))
  model.add(activationLayer('tanh'))
  model.add(denseLayer({
    units: 1,
  }))
  model.add(activationLayer('tanh'))
  model.compile({
    loss: 'mse',
    optimizer: adam()
  })
}
initModel()

addResizeCanvasListener(canvas)
function init() {
  canvas.width = innerWidth
  canvas.height = innerHeight
  let smallerCanvasSide = Math.min(innerHeight, innerWidth)
  resolution = smallerCanvasSide / 25
  cols = Math.round(innerWidth / resolution)
  rows = Math.round(innerHeight / resolution)


  screenInputs = []
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x1 = i / cols
      let x2 = j / rows
      screenInputs.push(create([x1, x2]))

    }
  }
}
init()
onResizeCanvas(init)
let ys

animation.animate(async () => {

  clearCanvas(ctx)


  await model.train(inputs, targets, {
    shuffle: true,
    batchSize: 1,
    epochs: 3
  })


  ys = []

  let prediction = await model.predictOnBatch(screenInputs)
  for (let i = 0; i < screenInputs.length; i++) {
    ys[i] = prediction[i].data[0]
  }


  let index = 0
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let color = grayScaleColor(ys[index] * 255)


      rect(ctx, i * resolution, j * resolution, resolution)
      fill(ctx, color)
      index++
    }
  }
})
startAnimation()

addEventListener('dblclick', initModel)
setInterval(() => {
  if (model.error > 0.01) {
    initModel()
  }
}, 3000);