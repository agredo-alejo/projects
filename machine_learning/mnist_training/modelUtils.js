function drawModel(model, input, target) {
    result = model.predict(input)
    let growingSpacing = 0
    for (let i = 0; i < model.layers.length; i++) {
        if (model.layers[i] instanceof nd.layer.ActivationClass) { continue }
        let inputShape = model.layers[i].inputShape
        let xDispacement
        if (inputShape instanceof Array) {
            xDispacement = inputShape[2]
        } else {
            xDispacement = 1
        }
        xDispacement = xDispacement * size + xSpacing
        if (model.layers[i].input[0].rank == 3) {
            for (let j = 0; j < model.layers[i].input[0].shape[0]; j++) {
                drawMatrix(model.layers[i].input[0].data[j], size,
                    growingSpacing,
                    j * (model.layers[i].input[0].shape[1] * size + spacing), true
                )
            }
        } else {
            drawVector(model.layers[i].input[0].data, size, growingSpacing, 0)
        }

        growingSpacing += xDispacement
    }
    if (result.rank == 3) {
        let xDispacement
        // if (inputShape instanceof Array) {
        xDispacement = result.inputShape[2]
        // } else {
        // xDispacement = 1
        // }
        xDispacement = xDispacement * size + xSpacing
        for (let j = 0; j < result.shape[0]; j++) {
            drawMatrix(result.data[j], size,
                growingSpacing,
                j * (result.shape[1] * size + spacing), true
            )
        }
        growingSpacing += xDispacement
    } else {

        drawVector(result.data, size, growingSpacing, 0)
        growingSpacing += size + spacing
    }
    drawVector(target.data, size, growingSpacing, 0)
}
function calculatemodelWidth(model) {
    let result = 0
    for (let i = 0; i < model.layers.length; i++) {
        if (model.layers[i] instanceof nd.layer.ActivationClass) {
            continue
        }
        let inputShape = model.layers[i].inputShape
        if (inputShape instanceof Array) {
            result += inputShape[2]
        } else {
            result += 1
        }
    }
    let outputShape = model.layers[model.layers.length - 1].outputShape
    if (outputShape instanceof Array) {
        result += outputShape[2]
    } else {
        result += 1
    }
    return result
}
function setKernels(layer, kernels) {
    for (let i = 0; i < kernels.length; i++) {
        for (let j = 0; j < layer.inputShape[0]; j++) {
            layer.kernels.data[i][j] = kernels[i]
        }
    }
}
function findMaxIndex(arr) {
    let record = 0, index = 0
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > record) {
            index = i
            record = arr[i]
        }
    }
    return index
}
function train() {
    let trainIndex = Math.floor(Math.random() * 60000)
    let linearImage = 0

    let inputs = []
    for (let imgRow = 0; imgRow < 28; imgRow++) {
        inputs[imgRow] = []
        for (let imgCol = 0; imgCol < 28; imgCol++) {
            let bright = mnist.train_images[linearImage + trainIndex * 784]
            inputs[imgRow][imgCol] = bright / 255

            linearImage++
        }
    }
    inputs = nd.fromArray([inputs])

    // Neural Netwrok stuff
    label = mnist.train_labels[trainIndex]
    let targets = nd.zeros([10])
    targets.data[label] = 1

    return [inputs, targets]
}
