import { addResizeCanvasListener, onResizeCanvas } from "@apjs/dynamic"
import { activationLayer, adam, convLayer, denseLayer, flattenLayer, maxPoolingLayer, Sequential } from "@apjs/ml"
import { unstack, zeros } from "@apjs/tensor"
import { calculatemodelWidth, drawModel } from "./modelUtils"
import { trainedModel } from "./trainedModel";
import { download } from "./utils";

export let canvas = document.querySelector("canvas")!
export let ctx = canvas.getContext("2d")!

export let model = new Sequential()
export let size: number
export let spacing = 5
export let xSpacing = spacing * 2
let input: any[] = []
let imgWidth = 16
let imgHeight = imgWidth



addResizeCanvasListener(canvas)
let inputsShape = [1, imgHeight, imgWidth]
input = [zeros(inputsShape), zeros(inputsShape)]

for (let i = 0; i < imgHeight; i++) {
  let mitad = Math.floor(imgHeight / 2)

  for (let j = 0; j < imgWidth; j++) {
    for (let k = -1; k < 1; k++) {
      input[0].data[0][mitad + k][j] = 1
    }
  }
}
for (let i = 0; i < imgHeight; i++) {
  let mitad = Math.floor(imgWidth / 2)

  for (let j = 0; j < imgWidth; j++) {
    for (let k = -1; k < 1; k++) {
      input[1].data[0][i][mitad + k] = 1
    }
  }
}
// console.log(trainedModel);
function initializeModel() {
  model = Sequential.loadModel(trainedModel)
  // model.add(convLayer({
  //     inputShape: inputsShape,
  //     filters: 3,
  //     kernelSize: 3,
  //     // kernelInitializer:'xavierNorm'
  //     // kernelRandom: [0,0.5],
  //     padding: 'same'
  // }))
  // model.add(activationLayer('relu'))
  // model.add(maxPoolingLayer({
  //     poolSize: 2
  // }))
  // model.add(convLayer({
  //     filters: 2,
  //     kernelSize: 3,
  //     // kernelInitializer: 'xavierNorm'
  //     // padding: 'same'
  // }))
  // model.add(maxPoolingLayer({
  //     poolSize: 2
  // })) 
  // // model.add(normLayer({}))

  // model.add(activationLayer('relu'))
  // model.add(flattenLayer({}))
  // model.add(denseLayer({
  //     units: 2,
  //     // kernelInitializer: 'varianceScaling'
  // }))

  // model.compile({
  //     loss: 'softmaxCrossEntropy',
  //     // loss: 'crossEntropy',
  //     optimizer: adam()
  // })

}

let target = unstack([[1, 0], [0, 1]])
initializeModel()
function init() {
  size = (innerWidth - xSpacing * model.layers.length) / calculatemodelWidth(model) - 0.5
  canvas.width = innerWidth
  canvas.height = innerHeight
  // console.log(model.error);

}
init()
onResizeCanvas(init)
let index = 0
// console.log(trainedModel);

setInterval(async () => {
  index = index === 0 ? 1 : 0
  // result = model.predict(input)

  // console.log(model.error);
  await drawModel(model, input[index], target[index])
  // await model.train(input, target, {
  //   batchSize: 1,
  //   shuffle: false,
  //   epochs: 1
  // })
  // console.log(input);
}, 2000);
addEventListener('dblclick', init)
addEventListener("keypress", e => {
  if (e.key === "p") {

    console.log(model.save());
  }
})

addEventListener('keyup', event => {
  if (event.key == ' ') {
    download('CNN model error prueba = ' + model.error.toFixed(2) + '.js', 'export let trainedModel = ' + model.save())
  }
})