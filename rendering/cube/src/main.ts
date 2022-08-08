import { addMouseListeners, addResizeCanvasListener, animation, clearCanvas, mouse, onResizeCanvas, startAnimation } from "@apjs/dynamic"
import { createVector, sub, Vector } from "@apjs/vector"
import { Cube } from "./cube"

export const canvas = document.querySelector("canvas")!
export const ctx = canvas.getContext("2d")!
let focalLength: number
let center: Vector
// let x
// let y
// let z
let moveCube = false
let target: Vector
let cube: Cube
let smallerCanvasSide: number
export let size = 50


export function project(points3d: Vector[]) {

    let points2d = []
    for (let i = 0; i < points3d.length; i++) {
        let p = points3d[i]
        // let projectMatrix = [
        //     [p.x * (focalLength / p.z), 0],
        //     [0, p.y * (focalLength / p.z)]
        // ]

        let px = p.x * (focalLength / p.z)
        let py = p.y * (focalLength / p.z)

        points2d[i] = createVector(px, py)
        // points2d[i] = Vector.matrixMult(projectMatrix, p)
    }
    return points2d
}


function init() {
    canvas.width = innerWidth
    canvas.height = innerHeight

    smallerCanvasSide = Math.min(innerWidth, innerHeight)

    target = createVector()
    center = createVector(innerWidth/2, innerHeight/2)
    focalLength = smallerCanvasSide
    cube = new Cube(0, 0, focalLength)

}
// let fps = 0
function animate() {
    clearCanvas(ctx)
    ctx.save()
    ctx.translate(innerWidth/2, innerHeight/2)


    if (mouse.x != undefined) {
        // Make cube rotate towards mouse
        target.set(mouse.x, mouse.y)
        target.sub(center)


            // drag cube with mouse movement
            if(moveCube){

                cube.x = target.x
                cube.y = target.y
                cube.createVertices()
            }
    } else {
        // Set initial rotation
        target.set(sub(center, createVector(innerWidth/2 / 2, innerHeight/2 / 2)))
    }

    cube.rotateX(target.y / 10000);
    cube.rotateY(-target.x / 10000);
    cube.draw()



    ctx.restore()
    // fps++
}

init()
addResizeCanvasListener(canvas)
onResizeCanvas(init)
addMouseListeners()
animation.animate(animate)
startAnimation()
addEventListener("dblclick", ()=>{
    moveCube = !moveCube
})