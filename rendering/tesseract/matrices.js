function vecToMatrix(v) {
    let m = [];
    for (let i = 0; i < 3; i++) {
        m[i] = [];
    }
    m[0][0] = v.x;
    m[1][0] = v.y;
    m[2][0] = v.z;
    return m;
}

function vec4ToMatrix(v) {
    let m = vecToMatrix(v);
    m[3] = [];
    m[3][0] = v.w;
    return m;
}

function matrixToVec4(m) {
    let r = new Vector4d(m[0][0], m[1][0], m[2][0], 0);
    if (m.length > 3) {
        r.w = m[3][0];
    }
    return r;
}

function matmulvec(a, vec) {
    let m = vecToMatrix(vec);
    let r = matmul(a, m);
    return matrixToVec(r);
}

function matmulvec4(a, vec) {
    let m = vec4ToMatrix(vec);
    let r = matmul(a, m);
    return matrixToVec4(r);
}

function matmul(a, b) {
    if (b instanceof Vector4d) {
        return matmulvec4(a, b);
    }

    let colsA = a[0].length
    let rowsA = a.length
    let colsB = b[0].length
    let rowsB = b.length

    if (colsA !== rowsB) {
        console.error('Columns of A must match rows of B')
        return
    }

    result = []
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