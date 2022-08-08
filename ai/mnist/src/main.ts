import { fill, grayScaleColor, rect, stroke, animation, mouse, onMouseDragg, addResizeCanvasListener, startAnimation, addMouseListeners } from "@apjs/dynamic";
import { Sequential } from "@apjs/ml";
import { create, maxPooling2D, softmax, TensorLike1D, zeros, _inferShape } from "@apjs/tensor";
import { trainedModel } from "./trainedModel";


export let canvas = document.querySelector("canvas")!
export let ctx = canvas.getContext("2d")!

let pTag = document.querySelector('p')!
let dTag = document.querySelector('div')!
let domButton = document.querySelector('button')!
let scaling = 10
let img = zeros([28 * scaling, 28 * scaling])
let resolution = 1 / scaling * 10
let size = 28 * scaling * resolution
let offset: number


let model = Sequential.loadModel(trainedModel)
console.log(model);


addResizeCanvasListener(canvas)
function init() {
  canvas.width = innerWidth
  canvas.height = size
  offset = innerWidth - size
  offset /= 2
  pTag = document.querySelector('p')!
  dTag = document.querySelector('div')!
}

async function animate() {
  let inputs = maxPooling2D(img, false, [scaling, scaling])



  inputs.transpose()

  for (let i = 0; i < inputs.shape[0]; i++) {
    for (let j = 0; j < inputs.shape[1]; j++) {
      rect(ctx, offset + j * resolution * scaling, i * resolution * scaling, resolution * scaling)
      fill(ctx, grayScaleColor(inputs.data[i][j] * 255))

      stroke(ctx, grayScaleColor(25))
    }
  }



  let prediction = await model.predict(create([inputs.data]))

  prediction = softmax(prediction)
  let guess = indexOfMax(prediction.data)
  let certanty = (guess[1] * 100).toFixed(1)
  pTag.innerHTML = ''
  dTag.innerHTML = ''
  pTag.innerHTML = 'Guess: ' + guess[0]
  dTag.innerHTML = ' Confidence: ' + certanty + '%'
}
startAnimation()
animation.animate(animate)
init()
// resize(init)
animate()
function indexOfMax(array: TensorLike1D) {
  let record = 0
  let index = 0
  for (let i = 0; i < array.length; i++) {
    if (array[i] > record) {
      index = i
      record = array[i]
    }
  }
  return [index, array[index]]
}
init()

addMouseListeners()
onMouseDragg(() => {
  let distance = Math.ceil(scaling / 2)

  if (mouse.x! > offset + distance && mouse.x! < (offset + img.shape[0]) - distance * resolution) {
    if (mouse.y! < img.shape[1] * resolution) {
      let row = mouse.x! - offset
      row = Math.floor(row / resolution)
      let col = Math.floor(mouse.y! / resolution)

      for (let i = -distance; i < distance; i++) {
        for (let j = -distance; j < distance; j++) {
          let col2 = col + i
          let row2 = row + j

          img.data[row2][col2] = Math.min(img.data[row2][col2] + 0.7, 1)
        }
      }
      img.data[row][col] = 1
    }
  }
})
function clearImage() {
  img = zeros([28 * scaling, 28 * scaling])
}
addEventListener('dblclick', clearImage)
domButton.addEventListener('click', clearImage)
domButton.addEventListener('touchend', clearImage)
