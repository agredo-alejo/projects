import { Vector4d } from "./vector4d";

export function vecToMatrix(vector: Vector4d) {
    let m: number[][] = [];
    for (let i = 0; i < 3; i++) {
        m[i] = [];
    }
    m[0][0] = vector.x;
    m[1][0] = vector.y;
    m[2][0] = vector.z;
    return m;
}

export function vec4ToMatrix(vector: Vector4d) {
    let m = vecToMatrix(vector);
    m[3] = [];
    m[3][0] = vector.w;
    return m;
}

export function matrixToVec4(m: number[][]) {
    let r = new Vector4d(m[0][0], m[1][0], m[2][0], 0);
    if (m.length > 3) {
        r.w = m[3][0];
    }
    return r;
}

export function matmulvec(a: number[][], vec: Vector4d) {
    let m = vecToMatrix(vec);
    let r = matmul(a, m);
    return matrixToVec4(r as number[][]);
}

export function matmulvec4(a: number[][], vec: Vector4d): Vector4d {
    let m = vec4ToMatrix(vec);
    let r = matmul(a, m);
    return matrixToVec4(r as number[][]);
}

export function matmul(a: number[][], b: number[][] | Vector4d) {
    if (b instanceof Vector4d) {
        return matmulvec4(a, b);
    }

    let colsA = a[0].length
    let rowsA = a.length
    let colsB = b[0].length
    let rowsB = b.length

    if (colsA !== rowsB) {
        // console.error('')
        throw new Error("Columns of A must match rows of B");

    }

    let result: number[][] = []
    for (let j = 0; j < rowsA; j++) {
        result[j] = []
        for (let i = 0; i < colsB; i++) {
            let sum = 0
            for (let n = 0; n < colsA; n++) {
                sum += a[j][n] * b[n][i]
            }
            result[j][i] = sum
        }
    }
    return result
}