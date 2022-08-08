import { Tensor } from "@apjs/tensor"
import { ActivationClass, Sequential } from "@apjs/ml"
import { drawMatrix, drawVector } from "./utils"

export async function drawModel(
    model: Sequential,
    input: Tensor,
    target: Tensor,
    size: number,
    xSpacing: number,
    spacing: number) {
    let result = await model.predict(input) as Tensor
    let growingSpacing = 0
    for (let i = 0; i < model.layers.length; i++) {
        if (model.layers[i] instanceof ActivationClass) { continue }
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

        let xDispacement = result.shape[2]

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

export function calculatemodelWidth(model: Sequential) {
    let result = 0
    for (let i = 0; i < model.layers.length; i++) {
        if (model.layers[i] instanceof ActivationClass) {
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

