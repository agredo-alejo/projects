let boids,size,diagonal
let numBoids
let raton = createVector()
let angle = 120
let angleOfView = rad(angle)
let perceptionRadius = 75
 
function init() {
    diagonal = createVector(width, height)
    size = diagonal.mag() / 200
    if (width == smallerCanvasSide) {
        size = diagonal.mag() / 125
    }
    boids = []
    numBoids = smallerCanvasSide / 10
    for (let i = 0; i < numBoids; i++) {
        boids.push(new Boid())
    }
}
window.addEventListener("keydown", (event) => {
    if (event.keyCode == 68) {
        angle += 3
    } else if (event.keyCode == 65) {
        angle -= 3
    }
    angle = constrain(angle, 5, 175)
    angleOfView = rad(angle)

})

// setFps(10)
function animate() {
    // requestAnimationFrame(animacion)
    clearCanvas()
    raton.set(mouseX,mouseY)


    let force = Vector.sub(raton, boids[0].position)

    boids[0].applyForce(force)

    boids[0].view()

    for (other of boids) {
        let distance = boids[0].position.dist(other.position)
        let superVector = Vector.sub(other.position, boids[0].position)
        if (Vector.angleBetween(boids[0].velocity, superVector) < angleOfView && distance < perceptionRadius) {
            other.ownColor = [255, 0, 0]
        }
        else {
            other.ownColor = 125
        }
    }

    for (boid of boids) {
        boid.update()
        boid.draw()
    }

}


init()
// animacion()

