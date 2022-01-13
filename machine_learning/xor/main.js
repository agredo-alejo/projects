let resolution, screenInputs
let rows, cols

let inputs = nd.unstack([[0, 0], [0, 1], [1, 0], [1, 1]])
let targets = nd.unstack([[0], [1], [1], [0]])

let model
function initModel() {
    model = new nd.NeuralNet()
    model.add(nd.layer.dense({
        inputShape: 2,
        units: 3,
        activation: 'tanh'
    }))
    model.add(nd.layer.dense({
        units: 2,
        activation: 'tanh'
    }))
    model.add(nd.layer.dense({
        units: 1,
        activation: 'tanh'
    }))
    model.compile({
        loss: 'mse',
        optimizer: nd.optimizers.adam()
    })
}
initModel()
// showFps()
function init() {
    resolution = smallerCanvasSide / 25
    cols = round(width / resolution)
    rows = round(height / resolution)


    screenInputs = []
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x1 = i / cols
            let x2 = j / rows
            screenInputs.push([x1, x2])

        }
    }
    for (let i = 0; i < screenInputs.length; i++) {
        screenInputs[i] = nd.tensor(screenInputs[i])
    }

}
let ys
// showFps()
// function animate() {
setInterval(() => {
    

    model.train(inputs, targets, {
        shuffle: true,
        epochs: 1
    })


    ys = []
    for (let i = 0; i < screenInputs.length; i++) {
        ys[i] = model.predict(screenInputs[i]).data[0]
    }

    let index = 0
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let color = ys[index] * 255
            fill(color)
            square(i * resolution, j * resolution, resolution)
            index++
        }
    }
}, 30);
// }
init()
addEventListener('dblclick', initModel)
setInterval(() => {
    if (model.error > 0.1) {
        initModel()
    }
}, 2500);