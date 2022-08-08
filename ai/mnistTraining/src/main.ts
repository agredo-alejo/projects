import { convLayer, denseLayer, flattenLayer, maxPoolingLayer, Sequential, normLayer, zerosInitializer, activationLayer, adam } from "@apjs/ml"
import { loadMNIST } from "./loadMnist";
import { canvas, download, train } from "./utils";
import { calculatemodelWidth, drawModel } from "./modelUtils";
import { oneHot, zeros } from "@apjs/tensor";
import { trainedModel } from "./trainedModel";
import { addResizeCanvasListener, onResizeCanvas } from "@apjs/dynamic";


let mnist = zerosInitializer([28, 28]).data
async function fillMnist() {
  mnist = await loadMNIST()
}
fillMnist()


let model = new Sequential()

model.add(convLayer({
  inputShape: [1, 28, 28],
  filters: 24,
  kernelSize: 5,
}))
model.add(maxPoolingLayer({}))
model.add(normLayer({}))
model.add(activationLayer("relu"))
model.add(convLayer({
  filters: 32,
  kernelSize: 3,
}))
model.add(maxPoolingLayer({}))
model.add(normLayer({}))
model.add(activationLayer("relu"))
model.add(flattenLayer({}))
// model.add(dropoutLayer({}))
model.add(denseLayer({
  units: 100,
}))
model.add(normLayer({}))
model.add(activationLayer("relu"))
// model.add(dropoutLayer({}))
model.add(denseLayer({
  units: 10,
}))

model.compile({
  loss: 'softmaxCrossEntropy',
  // loss: 'crossEntropy',
  optimizer: adam(),
})
// model = Sequential.loadModel(trainedModel)


let spacing: number
let xSpacing: number
let size: number
function init() {
  canvas.width = innerWidth
  canvas.height = innerHeight
  spacing = 5
  xSpacing = spacing * 2
  size = (innerWidth - xSpacing * model.layers.length) / calculatemodelWidth(model) - 0.5
  // console.log("tet");

}
init()
addResizeCanvasListener(canvas)
onResizeCanvas(init)


let trainData = [zeros([1, 28, 28]), oneHot(1, 10)]
let logAmt = 0
async function frame() {
  if (mnist instanceof Array) return

  let then = Date.now()

  let trainInputs = []
  let targets = []
  let batchSize = 200
  for (let index = 0; index < batchSize; index++) {
    // trainData = train()
    trainData = train(mnist.train_images, mnist.train_labels)

    trainInputs.push(trainData[0])
    targets.push(trainData[1])
  }

  await model.train(trainInputs, targets, {
    shuffle: true,
    batchSize,
    epochs: 1,
  })

  drawModel(
    model,
    trainData[0],
    trainData[1],
    size,
    xSpacing,
    spacing
  )

  logAmt++
  if (logAmt > 20) {
    console.clear()
    logAmt = 0
  }

  let now = Date.now()

  console.log(now - then);

  console.log(model.error);
}
// frame()
setInterval(frame, 18000)
console.log(model);


addEventListener("keyup", e => {
  if (e.key === ' ') {
    download('CNN model error=' + model.error.toFixed(7) + ',parameters= ' + model.parameters + '.js', 'export let trainedModel = ' + model.save())
  }
})