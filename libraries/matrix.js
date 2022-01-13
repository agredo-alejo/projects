class Matrix {
    constructor(rows, cols, stuff = 0) {
        this.rows = rows;
        this.cols = cols;
        this.data = Array(this.rows).fill().map(() => Array(this.cols).fill(stuff))
    }

    static fromArray(array) {
        let newMatrix
        if (array[0].length !== undefined) {
            newMatrix = new Matrix(array.length, array[0].length)
            for (let i = 0; i < newMatrix.rows; i++) {
                for (let j = 0; j < newMatrix.cols; j++) {
                    newMatrix.data[i][j] = array[i][j]
                }
            }
        } else {
            newMatrix = new Matrix(array.length, 1)
            for (let i = 0; i < array.length; i++) {
                newMatrix.data[i][0] = array[i]
            }
        }

        return newMatrix
    }

    static fromVector(vector) {
        let newMatrix = new Matrix(3, 1)
        newMatrix.data[0][0] = vector.x
        newMatrix.data[1][0] = vector.y
        newMatrix.data[2][0] = vector.z
        return newMatrix
    }
    toVector() {
        let newVector = { x: 0, y: 0, z: 0 }
        newVector.x = this.data[0][0]
        newVector.y = this.data[1][0]
        newVector.z = this.data[2][0]
        return newVector
    }
    toArray() {
        return this.data.slice()
    }
    sub(term) {
        if (term instanceof Matrix) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] -= term.data[i][j]
                }
            }
        }
        else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] -= term
                }
            }
        }

    }
    static sub(matrix, term) {
        let result = new Matrix(matrix.rows, matrix.cols)
        if (term instanceof Matrix) {
            for (let i = 0; i < result.rows; i++) {
                for (let j = 0; j < result.cols; j++) {
                    result.data[i][j] = matrix.data[i][j] - term.data[i][j]
                }
            }
        }
        else {
            for (let i = 0; i < result.rows; i++) {
                for (let j = 0; j < result.cols; j++) {
                    result.data[i][j] = matrix.data[i][j] - term
                }
            }
        }
        return result
    }
    add(addend) {
        if (addend instanceof Matrix) {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] += addend.data[i][j];
                }
            }
        } else {
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] += addend
                }
            }
        }
    }
    static add(matrix, term) {
        let result = new Matrix(matrix.rows, matrix.cols)
        if (term instanceof Matrix) {
            for (let i = 0; i < result.rows; i++) {
                for (let j = 0; j < result.cols; j++) {
                    result.data[i][j] = matrix.data[i][j] + term.data[i][j]
                }
            }
        }
        else {
            for (let i = 0; i < result.rows; i++) {
                for (let j = 0; j < result.cols; j++) {
                    result.data[i][j] = matrix.data[i][j] + term
                }
            }
        }
        return result
    }
 
    randomize(min = -1, max = 1) {
        this.data = Array(this.rows).fill().map(() => Array(this.cols).fill().map(() => Math.random() * (max - min) + min))
    }
    static randomize(rows, cols, min = -1, max = 1){
        return Array(rows).fill().map(() => Array(cols).fill().map(() => Math.random() * (max - min) + min))
    }
    transpose() {
        let result = new Matrix(this.cols, this.rows)
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                result.data[j][i] = this.data[i][j]
            }
        }
        this.data = result.data
    }

    static transpose(matrix) {
        let result = new Matrix(matrix.cols, matrix.rows)
        for (let i = 0; i < matrix.rows; i++) {
            for (let j = 0; j < matrix.cols; j++) {
                result.data[j][i] = matrix.data[i][j]
            }
        }
        return result
    }
    mult(factor) {
        // Matrix product
        if (this.cols !== factor.rows) {
            console.log('Columns of A must match rows of B.')
            return undefined
        }
        let result = new Matrix(this.rows, factor.cols)
        for (let i = 0; i < result.rows; i++) {
            for (let j = 0; j < result.cols; j++) {
                let sum = 0
                for (let k = 0; k < this.cols; k++) {
                    sum += this.data[i][k] * factor.data[k][j]
                }
                result.data[i][j] = sum
            }
        }
        return result
    }
    static mult(matrix, factor) {
        // Matrix product
        if (matrix.cols !== factor.rows) {
            console.log('Columns of A must match rows of B.')
            return undefined
        }
        let result = new Matrix(matrix.rows, factor.cols)
        for (let i = 0; i < result.rows; i++) {
            for (let j = 0; j < result.cols; j++) {
                let sum = 0
                for (let k = 0; k < matrix.cols; k++) {
                    sum += matrix.data[i][k] * factor.data[k][j]
                }
                result.data[i][j] = sum
            }
        }
        return result
    } 
    static changeOfBasis(vi = { x: 1, y: 0, z: 0 }, vj = { x: 0, y: 1, z: 0 }, vk = { x: 0, y: 0, z: 1 }) {
        let argA
        if (vi instanceof Array) {
            argA = [vi, vj, vk]
        } else if (vi instanceof Object) {
            argA = [
                [vi.x, vi.y, vi.z],
                [vj.x, vj.y, vj.z],
                [vk.x, vk.y, vk.z]
            ]
        }

        let result = []
        for (let i = 0; i < 3; i++) {
            result[i] = []
            for (let j = 0; j < 3; j++) {
                result[j][i] = argA[i][j]
            }

        }
        return new Matrix().setData(result)
    }
    multiply(factor) {
        if (factor instanceof Matrix) {
            // Hadamard product
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] *= factor.data[i][j]
                }
            }
        } else {
            // Scalar product
            for (let i = 0; i < this.rows; i++) {
                for (let j = 0; j < this.cols; j++) {
                    this.data[i][j] *= factor
                }
            }
        }
    }
    static multiply(matrix, factor) {
        let newMatrix = new Matrix(matrix.rows, matrix.cols)

        if (factor instanceof Matrix) {
            // Hadamard product
            for (let i = 0; i < matrix.rows; i++) {
                for (let j = 0; j < matrix.cols; j++) {
                    newMatrix.data[i][j] = matrix.data[i][j] * factor.data[i][j]
                }
            }
        } else {
            // Scalar product
            for (let i = 0; i < matrix.rows; i++) {
                for (let j = 0; j < matrix.cols; j++) {
                    newMatrix.data[i][j] = matrix.data[i][j] * factor
                }
            }
        }
        return newMatrix
    }

    map(func) {
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                this.data[i][j] = func(this.data[i][j])
            }
        }
        return this
    }

    
    static map(matrix, func) {
        let result = new Matrix(matrix.rows, matrix.cols);
        for (let i = 0; i < matrix.rows; i++) {
            for (let j = 0; j < matrix.cols; j++) {
                result.data[i][j] = func(matrix.data[i][j])
            }
        }
        return result
    }

    serialize() {
        return JSON.stringify(this);
    }

    static deserialize(data) {
        if (typeof data == 'string') {
            data = JSON.parse(data);
        }
        let matrix = new Matrix(data.rows, data.cols);
        matrix.data = data.data;
        return matrix;
    }
    copy() {
        return Matrix.fromArray(this.toArray())
    }
    print() {
        console.table(this.data);
    }
}
const print = (x) => console.table(x)

