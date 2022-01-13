let model = new nd.NeuralNet()
let input = []
let size
let spacing = 5
let xSpacing = spacing * 2
let imgWidth = 16
let imgHeight = imgWidth
let numChannels = 1
let numFiltersLayer1 = 3
let numFiltersLayer2 = 2
let result
let modelWidth = 0

let vertical = [
    [-1, 0, 1],
    [-1, 0, 1],
    [-1, 0, 1]
]
let horizontal = [
    [-1, -1, -1],
    [0, 0, 0],
    [1, 1, 1]
]
let inputsShape = [numChannels, imgHeight, imgWidth]
input = [nd.zeros(inputsShape), nd.zeros(inputsShape)]

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
function initializeModel() {
    model = new nd.NeuralNet()
    model.add(nd.layer.conv({
        inputShape: inputsShape,
        filters: numFiltersLayer1,
        kernelSize: 3,
        // kernelInitializer:'xavierNorm'
        // kernelRandom: [0,0.5],
        // padding: 'same'
    }))
    model.add(nd.layer.activation('relu'))
    model.add(nd.layer.conv({
        filters: 2,
        kernelSize: 3,
        // kernelInitializer: 'xavierNorm'
        // padding: 'same'
    }))
    model.add(nd.layer.maxPooling({
        poolSize: 3
    }))
    // model.add(nd.layer.norm({}))

    model.add(nd.layer.activation('relu'))
    model.add(nd.layer.flatten({}))
    model.add(nd.layer.dense({
        units: 2,
        // kernelInitializer: 'varianceScaling'
    }))

    model.compile({
        loss: 'softmaxCrossEntropy',
        // loss: 'crossEntropy',
        optimizer: nd.optimizers.adam()
    })

}

let target = nd.unstack([[1, 0], [0, 1]])
initializeModel()
function init() {
    size = (width - xSpacing * model.layers.length) / calculatemodelWidth(model) - 0.5

    // console.log(model.error);

}
init()
let index = 0
setInterval(() => {
    if (index == 0) {
        index = 1
    } else {
        index = 0
    }
    // result = model.predict(input)

    drawModel(model, input[index], target[index])
    model.train(input, target, {
        epochs: 1
    })
}, 1000);
addEventListener('dblclick', init)

