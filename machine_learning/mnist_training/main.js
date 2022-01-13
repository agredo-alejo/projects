let size
let spacing = 5
let xSpacing = spacing * 2

let numChannels = 1
let numFiltersLayer1 = 3
let numFiltersLayer2 = 2
let result
let modelWidth = 0



let mnist
loadMNIST(data => {
    mnist = data
})

// let model = new nd.NeuralNet()
// model.add(nd.layer.conv({
//     inputShape: [1, 28, 28],
//     filters: 24,
//     kernelSize: 5,
//     activation: 'relu',
// }))
// model.add(nd.layer.maxPooling())
// model.add(nd.layer.norm())
// model.add(nd.layer.conv({
//     filters: 32,
//     kernelSize: 3,
//     activation: 'relu',
// }))
// model.add(nd.layer.maxPooling())
// model.add(nd.layer.flatten())
// model.add(nd.layer.norm())
// // model.add(nd.layer.dropout())
// model.add(nd.layer.dense({
//     units: 100,
//     activation: 'relu',
// }))
// model.add(nd.layer.norm())
// // model.add(nd.layer.dropout())
// model.add(nd.layer.dense({
//     units: 10,
// }))

// model.compile({
//     loss: 'softmaxCrossEntropy',
//     // loss: 'crossEntropy',
//     optimizer: nd.optimizers.adam(),
// })
let model = nd.NeuralNet.fromObject(trainedModel)
model.compile({
    loss: 'softmaxCrossEntropy',
    optimizer: nd.optimizers.adam(0)
})

function init() {
    size = (width - xSpacing * model.layers.length) / calculatemodelWidth(model) - 0.5
    // result = model.predict(testInput)

    drawModel(model, nd.random([1, 28, 28]), nd.oneHot(1, 10))
}


let velocity = 1000
let trainData = [nd.random([1, 28, 28]), nd.oneHot(1, 10)]
let logAmt = 0
setInterval(() => {

    if (mnist) {
        let batchSize = 10
        let trainInputs = []
        let targets = []
        for (let index = 0; index < batchSize; index++) {
            trainData = train()

            trainInputs.push(trainData[0])
            targets.push(trainData[1])
        }

        drawModel(model, trainData[0], trainData[1])
        model.train(trainInputs, targets, {
            shuffle: true,
            epochs: 1,
            trainDataSize: 60000,
        })

    }
    logAmt++
    if (logAmt > 10) {
        console.clear()
        logAmt = 0
    }

    console.log(model.error);


}, velocity);

init()


addEventListener('keyup', event => {
    if (event.keyCode == 32) {
        download('CNN model error=' + model.error.toFixed(3) + ',parameters= ' + model.parameters + '.js', 'let trainedModel = ' + model.serialize())
    }
})
