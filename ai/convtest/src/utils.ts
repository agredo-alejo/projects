import { fill, grayScaleColor, map, rect, stroke } from "@apjs/dynamic"
import { max, min, TensorLike1D, TensorLike2D } from "@apjs/tensor"
import { ctx } from "./main"

export const drawMatrix = (matrix: TensorLike2D, size: number, x = 0, y = 0, strokeMatrix = false) => {
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            let range = [
                min(matrix),
                max(matrix)
            ]
            let color = grayScaleColor(
                map(matrix[i][j], range[0], range[1], 0, 255)
            )
            // fill(map(matrix[i][j], -1, 1, 0, 1) * 255)
            rect(ctx, j * size + x, i * size + y, size)
            fill(ctx, color)
            if (strokeMatrix) {
                stroke(ctx)
            }
        }
    }
}
export const drawVector = (vector: TensorLike1D, size: number, x = 0, y = 0, strokeMatrix = false) => {
    for (let i = 0; i < vector.length; i++) {
        let range = [
            min(vector),
            max(vector)
        ]
        // if (strokeVector) {
        // stroke()
        // }
        let color = grayScaleColor(
            map(vector[i], range[0], range[1], 0, 255)
        )
        rect(ctx, x + size, y + size * i, size)
        fill(ctx, color)
        if (strokeMatrix) {
            stroke(ctx)
        }
    }
}




export function download(filename: string, text: string) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}
