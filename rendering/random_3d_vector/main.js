let center, vi, vj, vk, vector, changedVector
let scaleV = smallerCanvasSide * 0.4
let angle = rad(0.025)
let aum = 0.01
function init() {
    vi = Vector.right
    vj = Vector.up
    vk = Vector.forward

    vector = createVector(1, 0, 0)
    changedVector = new Vector()

    center = new Vector(width / 2, height / 2)
    scaleV = smallerCanvasSide * 0.4
    rotateXT(rad(40))
    rotateYT(rad(30))
    // rotateZT(rad(35))
}
addEventListener('dblclick', init)

function animate() {
    clearCanvas()
    // background(255, 0.01)

    vector.rotate(aum)
    changedVector = Vector.changeOfBasis(vector, vi, vj, vk)



    if (mouseDragged) {
        let mouse = createVector(mouseX, mouseY)
        mouse.sub(center)


        rotateXT(-mouse.y / 10000);
        rotateYT(mouse.x / 10000);
    }
    if (!mouseDragged) {
        rotateXT(angle)
        rotateYT(angle * 2)
        rotateZT(angle)
    }



    save()
    translate(halfWidth, halfHeight)

    save()
    lineWidth(3)

    line(
        Vector.zero,
        Vector.mult(changedVector, scaleV / 2),
        [255, 0, 0]
    )

    restore()

    line(
        Vector.mult(vi, scaleV),
        Vector.mult(vi.invert, scaleV)
    )
    line(
        Vector.mult(vj, scaleV),
        Vector.mult(vj.invert, scaleV)
    )
    line(
        Vector.mult(vk, scaleV),
        Vector.mult(vk.invert, scaleV)
    )

    let triangleScale = scaleV * 0.15
    let triangleColor = [0, 0, 255, 0.5]
    fill(triangleColor)
    triangle(
        Vector.zero,
        Vector.mult(vi, triangleScale),
        Vector.mult(vj, triangleScale)
    )

    fill(triangleColor)
    triangle(
        Vector.zero,
        Vector.mult(vi.invert, triangleScale),
        Vector.mult(vk, triangleScale)
    )


    restore()
}
init()

function rotateXT(angle) {
    vi.rotateX(angle)
    vj.rotateX(angle)
    vk.rotateX(angle)
}
function rotateYT(angle) {
    vi.rotateY(angle)
    vj.rotateY(angle)
    vk.rotateY(angle)
}

function rotateZT(angle) {
    vi.rotate(angle)
    vj.rotate(angle)
    vk.rotate(angle)
}
