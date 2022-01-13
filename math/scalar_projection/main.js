let point1, ponit2, mouse, result

function init() {
    point1 = createVector(
        random(halfWidth),
        random(height)
    )
    point2 = createVector(
        random(halfWidth, width),
        random(height)
    )
    mouse = createVector()
    result = createVector()
}
addEventListener('dblclick', init)

function animate() {
    clearCanvas()
    mouse.set(mouseX, mouseY)
    
    fill(0, 0, 255)
    circle(point2)
    

    line(point1, point2)

    fill(0, 0, 255)
    circle(mouse)
    

    line(point1, mouse)


    result = Vector.scalarProyection(point1, point2, mouse)
    fill(255, 0, 0)
    circle(result)
    

    line(mouse, result)

}
init()