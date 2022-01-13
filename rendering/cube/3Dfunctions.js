let orthographic = new Matrix(2, 3)
orthographic.data = [
    [1, 0, 0],
    [0, 1, 0]
]
// let distance = 2
let exampleVector = new Matrix(3, 1)
exampleVector.data = [
    [1],
    [2],
    [3]
]


let perspectiveElement = (distance, z)=>{
    return 1/(distance - z)
}
const perspective = (angle, near) => {
    let perspectiveMatrix = [
        [Math.cos(angle), 0, 0],
        [0, Math.sin(angle), 0],
        [0, 0, Math.tan(angle)],
    ]
} 

let perspective1 = new Matrix(2, 3)
perspective1.data = [
    [perspectiveElement(5, exampleVector.data[2]), 0, 0],
    [0, perspectiveElement(5, exampleVector.data[2]), 0]
]

let exampleResult = Matrix.mult(perspective1, exampleVector)

let angle = rad(1)
// let rotationX = new Matrix(3, 3)
// rotationX.data = [
//     [1, 0, 0],
//     [0, cos(angle), -sin(angle)],
//     [0, sin(angle, cos(angle))]
// ]

let rotationY = new Matrix(3, 3)
rotationY.data = [
    [cos(angle), 0, sin(angle)],
    [0, 1, 0],
    [-sin(angle), 0, cos(angle)]
]

let rotationZ = new Matrix(3, 3)
rotationZ.data = [
    [cos(angle), -sin(angle), 0],
    [sin(angle), cos(angle), 0],
    [0, 0, 1]
]
function rotateX(vector, angle){
    let rotationX = new Matrix(3, 3)
    rotationX.data = [
        [1, 0, 0],
        [0, cos(angle), -sin(angle)],
        [0, sin(angle, cos(angle))]
    ]
    rotationX = Matrix.fromArray(rotationX)
    let p = vector;
    p = Matrix.fromVector(p)
    p = Matrix.mult(rotationX, p)
    p = p.toVector()
    return createVector(p)

}