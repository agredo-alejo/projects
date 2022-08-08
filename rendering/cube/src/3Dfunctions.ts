import { create, mult, zeros } from "@apjs/tensor"
import { radians } from "@apjs/dynamic";
import { createVector, Vector } from "@apjs/vector";


export let orthographic = zeros([2, 3])
orthographic.data = [
    [1, 0, 0],
    [0, 1, 0]
]
// export let distance = 2
export let exampleVector = zeros([3, 1])
exampleVector.data = [
    [1],
    [2],
    [3]
]


export let perspectiveElement = (distance: number, z: number)=>{
    return 1/(distance - z)
}
export const perspective = (angle: number) => {
    let perspectiveMatrix = [
        [Math.cos(angle), 0, 0],
        [0, Math.sin(angle), 0],
        [0, 0, Math.tan(angle)],
    ]
    return perspectiveMatrix
    
} 

export let perspective1 = zeros([2, 3])
perspective1.data = [
    [perspectiveElement(5, exampleVector.data[2]), 0, 0],
    [0, perspectiveElement(5, exampleVector.data[2]), 0]
]

export let exampleResult = mult(perspective1, exampleVector)

export let angle = radians(1)
// export let rotationX = new Matrix(3, 3)
// rotationX.data = [
//     [1, 0, 0],
//     [0, cos(angle), -sin(angle)],
//     [0, sin(angle, cos(angle))]
// ]

export let rotationY = zeros([3, 3])
rotationY.data = [
    [Math.cos(angle), 0, Math.sin(angle)],
    [0, 1, 0],
    [-Math.sin(angle), 0, Math.cos(angle)]
]

export let rotationZ = zeros([3, 3])
rotationZ.data = [
    [Math.cos(angle), -Math.sin(angle), 0],
    [Math.sin(angle), Math.cos(angle), 0],
    [0, 0, 1]
]
export function rotateX(vector: Vector, angle: number){
    let rotationX = zeros([3, 3])
    rotationX.data = [
        [1, 0, 0],
        [0, Math.cos(angle), -Math.sin(angle)],
        [0, Math.sin(angle), Math.cos(angle)]
    ]
    // rotationX = fromArray(rotationX)
    let p = vector;
    let p_2 = create([p.x,p.y,p.z])
    // p = fromVector(p)
    p_2.mult(rotationX)
    // p_2 = mult(rotationX, p_2)
    // p = p.toVector()
    return createVector(...p_2.data)

}