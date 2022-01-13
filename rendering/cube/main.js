let focalLength, center, x, y, z, target, cube
let size = 50


function project(points3d) {

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

    target = createVector()
    center = createVector(halfWidth, halfHeight)
    focalLength = smallerCanvasSide
    cube = new Cube(0, 0, focalLength, size)

}
// let fps = 0
function animate() {
    clearCanvas()
    save()
    translate(halfWidth, halfHeight)


    if (mouseX != undefined) {
        // Make cube rotate towards mouse
        target.set(mouseX, mouseY)
        target.sub(center)


            // drag cube with mouse movement
            // cube.x= target.x
            // cube.y = target.y
            // cube.createVertices()
    } else {
        // Set initial rotation
        target.set(Vector.sub(center, createVector(halfWidth / 2, halfHeight / 2)))
    }

    cube.rotateX(target.y / 10000);
    cube.rotateY(-target.x / 10000);
    cube.draw()



    restore()
    // fps++
}

init()
