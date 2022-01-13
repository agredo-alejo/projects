let pTag = document.querySelector('p')
let dTag = document.querySelector('div')
let domButton = document.querySelector('button')
let scaling = 10
let img = nd.zeros([28 * scaling, 28 * scaling])
let resolution = 1 / scaling * 10
let size = 28 * scaling * resolution
let offset

// showFps()
resize(width, size)
let model = nd.NeuralNet.fromObject(trainedModel)
// model.layers[4].rate = 0
// model.layers[10].rate = 0
// let model2 = nd.NeuralNet.fromObject(JSON.parse(model.serialize()))
function init() {
    offset = width - size
    offset /= 2
    pTag = document.querySelector('p')
    dTag = document.querySelector('div')
}
let inputs
function animate() {

    inputs = nd.maxPooling(img, false, [scaling, scaling])
    inputs.transpose()
    for (let i = 0; i < inputs.shape[0]; i++) {
        for (let j = 0; j < inputs.shape[1]; j++) {
            stroke(25)
            fill(inputs.data[i][j] * 255)

            square(offset + j * resolution * scaling, i * resolution * scaling, resolution * scaling)
        }
    }
    let prediction = model.predict([inputs.data])
    prediction = nd.softmax(prediction)
    let guess = indexOfMax(prediction.data)
    let certanty = (guess[1] * 100).toFixed(1)
    pTag.innerHTML = ''
    dTag.innerHTML = ''
    pTag.innerHTML = 'Guess: ' + guess[0]
    dTag.innerHTML = ' Confidence: ' + certanty + '%'
}
init()

function indexOfMax(array) {
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
setFps(60)

function mouseDragged() {
    let distance = Math.ceil(scaling / 2)

    if (mouseX > offset + distance && mouseX < (offset + img.shape[0]) - distance * resolution) {
        if (mouseY < img.shape[1] * resolution) {
            let row = mouseX - offset
            row = floor(row / resolution)
            let col = floor(mouseY / resolution)

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
}
function clearImage() {
    img = nd.zeros([28 * scaling, 28 * scaling])
}
addEventListener('dblclick', clearImage)
domButton.addEventListener('click',clearImage)
domButton.addEventListener('touchend', clearImage)