let mouse = createVector()
let center

function init() {
    center = createVector(halfWidth, halfHeight)
}

function animate() {
    clearCanvas()
    mouse.set(mouseX, mouseY)
    mouse.sub(center)



    save()
    lineWidth(3)
    translate(center)



    lineCoords(0, -height, 0, height, 0)
    lineCoords(-width, 0, width, 0)
    line(Vector.zero, mouse, [255, 0, 0])


    fill([255, 0, 0])
    circle(Vector.zero)

    fill([255, 0, 0])
    circle(mouse)

    stroke([0, 0, 255])
    circle(Vector.zero, 30, 0, mouse.heading())

    restore()

    let magnitud = (mouse.mag() / 10).toFixed(2)
    let angulo = -deg(mouse.heading())


    let x = (polarToCart(magnitud, mouse.heading())[0]).toFixed(2)
    let y = (polarToCart(magnitud, -mouse.heading())[1]).toFixed(2)

    font('20px Arial')

    fill(255)
    rect(Vector.zero, width, 30)

    fill(255)
    rect(0, height - 90, width, 90)


    fill('blue')
    text('Ángulo: ' + angulo.toFixed(2) + '˚', 10, 80)

    fill('red')
    text('Radio: ' + magnitud, 10, 50)


    fill(255)
    text(0, height - 90, width, 90)


    fillText('Coordenadas Polares: (r, a˚)', 10, 20)

    fillText('Coordenadas Cartesianas: (X, Y)', 10, height - 70)

    fillText('X: ' + x + ', Y: ' + y, 10, height - 40)


}
init()