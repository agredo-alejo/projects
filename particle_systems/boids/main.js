let numBoids, resolution, grid, boids, chasers, raton, diagonal, chaserPerception
let numChasers = 2
let cols, rows

function init() {
    boids = []
    chasers = []
    raton = new Vector()
    diagonal = new Vector(width, height)
    diagonalMag = diagonal.mag()
    chaserPerception = diagonal.mag() * 0.05

    numBoids = (height + width) / 5
    if (width == smallerCanvasSide) {
        numBoids = (height + width) / 10
    }
    numBoids = constrain(numBoids, 1, 400)

    // numBoids = 50

    resolution = smallerCanvasSide / 2.5
    resolution = constrain(resolution, 1, Infinity)

    cols = Math.floor(width / resolution) + 1
    rows = Math.floor(height / resolution) + 1
    grid = array2d(rows, cols, [])

    for (let i = 0; i < numBoids; i++) {
        boids.push(new Boid())
    }
    for (let i = 0; i < numChasers; i++) {
        chasers.push(new Chaser())
    }
}

addEventListener('dblclick', init)
// let fps = 0
function animate() {
    clearCanvas()
    raton.set(mouseX, mouseY)

    for (boid of boids) {
        boid.update()
        boid.draw()

        let force = avoid(boid, raton)
        if (force) {
            boid.applyForce(force)
        }
        for (chaser of chasers) {
            let force = avoid(boid, chaser.position)
            if (force) {
                boid.applyForce(force)
            }
        }
    }
    chasers.forEach(chaser => {
        chaser.update()
        chaser.draw()
    });

    // grid = array2d(rows, cols, [])

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
            grid[i][j] = []
        }
    }
    // fps++
}

init()
const avoid = (boid, target) => {
    if (boid.position.dist(target) < chaserPerception) {
        return Vector.sub(boid.position, target)
    }
}


