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
    // console.log(target);
    
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

// function drawModel(target) {
//     let growingSpacing = 0
//     for (let i = 0; i < model.layers.length; i++) {
//         if (model.layers[i] instanceof nd.layer.ActivationClass) { continue }
//         let inputShape = model.layers[i].inputShape
//         let xDispacement
//         if (inputShape instanceof Array) {
//             xDispacement = inputShape[2]
//         } else {
//             xDispacement = 1
//         }
//         xDispacement = xDispacement * size + xSpacing
//         if (model.layers[i].input[0].rank == 3) {
//             for (let j = 0; j < model.layers[i].input[0].shape[0]; j++) {
//                 drawMatrix(model.layers[i].input[0].data[j], size,
//                     growingSpacing,
//                     j * (model.layers[i].input[0].shape[1] * size + spacing), true
//                 )
//             }
//         } else {
//             drawVector(model.layers[i].input[0].data, size, growingSpacing, 0)
//         }

//         growingSpacing += xDispacement
//     }
//     let aaa
//     if (result.rank == 3) {
//         for (let j = 0; j < result.shape[0]; j++) {
//             drawMatrix(result.data[j], size,
//                 growingSpacing,
//                 j * (result.shape[1] * size + spacing), true
//             )
//         }
//         aaa = result.shape[2]
//     } else {
//         drawVector(result.data, size, growingSpacing, 0)
//         aaa = 1
//     }
//     growingSpacing += aaa * size + xSpacing
//     drawVector(target.data, size, growingSpacing, 0)
// }
function setKernels(layer, kernels) {
    for (let i = 0; i < kernels.length; i++) {
        for (let j = 0; j < layer.inputShape[0]; j++) {
            layer.weights.data[i][j] = kernels[i]
        }
    }
}
let prueba = { one: [1, 2, 3], two: [4, 5, 6] }
addEventListener('keyup', event => {
    if (event.keyCode == 32) {
        download('CNN model error prueba = ' + parseInt(model.error) + '.js', 'let trainedModel = ' + model.serialize())
    }
})

function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
