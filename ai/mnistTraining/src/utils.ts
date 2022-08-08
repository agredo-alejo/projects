import { fill, grayScaleColor, map, stroke, rect } from "@apjs/dynamic";
import { fromArray, Tensor, TensorLike2D, zeros } from "@apjs/tensor";


export const canvas = document.querySelector("canvas")!
export const ctx = canvas.getContext("2d")!


canvas.width = innerWidth
canvas.height = innerHeight

const rangeOfValuesArray = (array: any) => {
    let max = -Infinity
    let min = Infinity
    let recursion = (array: any) => {
        if (array[0] instanceof Array) {
            for (let index = 0; index < array.length; index++) {
                recursion(array[index])
            }
        } else {
            for (let index = 0; index < array.length; index++) {
                if (array[index] > max) {
                    max = array[index]
                }
                if (array[index] < min) {
                    min = array[index]
                }
            }
        }
    }
    recursion(array)
    return [min, max]
}

export const drawMatrix = (matrix: number[][], size: number, x = 0, y = 0, strokeMatrix = false) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            let range = rangeOfValuesArray(matrix)


            let color = grayScaleColor(map(matrix[i][j], range[0], range[1], 0, 255))

            rect(ctx, j * size + x, i * size + y, size)
            fill(ctx, color)
            if (strokeMatrix) {
                stroke(ctx)
            }


        }
    }
}
export const drawVector = (vector: any, size: number, x = 0, y = 0, strokeVector = true) => {
    for (let i = 0; i < vector.length; i++) {
        let range = rangeOfValuesArray(vector)
        if (strokeVector) {
            stroke(ctx)
        }
        let color = grayScaleColor(map(vector[i], range[0], range[1], 0, 255))

        rect(ctx, x + size, y + size * i, size)
        fill(ctx, color)
    }
}

export function mnistImage(trainImages: number[], trainIndex = Math.floor(Math.random() * 60000)) {
    let linearImage = 0
    let inputs: any = []
    for (let imgRow = 0; imgRow < 28; imgRow++) {
        inputs[imgRow] = []
        for (let imgCol = 0; imgCol < 28; imgCol++) {
            let bright = trainImages[linearImage + trainIndex * 784]
            inputs[imgRow][imgCol] = bright / 255

            linearImage++
        }
    }
    return inputs
}

export function download(filename: string, text: string | number | boolean) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

export function train(trainImages: number[], trainLabels: number[]) {
    let trainIndex = Math.floor(Math.random() * 60000)
    let linearImage = 0

    let inputs: Tensor | TensorLike2D = []
    for (let imgRow = 0; imgRow < 28; imgRow++) {
        inputs[imgRow] = []
        for (let imgCol = 0; imgCol < 28; imgCol++) {
            let bright = trainImages[linearImage + trainIndex * 784]
            inputs[imgRow][imgCol] = bright / 255

            linearImage++
        }
    }
    inputs = fromArray([inputs])

    // Neural Netwrok stuff
    let label = trainLabels[trainIndex]
    let targets = zeros([10])
    targets.data[label] = 1

    return [inputs, targets]
}