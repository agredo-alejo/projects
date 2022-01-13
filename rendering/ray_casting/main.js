let walls, ray, particle
function init() {
    walls = []
    for (let i = 0; i < 5; i++) {
        let x1 = random(width)
        let x2 = random(width)
        let y1 = random(height)
        let y2 = random(height)
        walls.push(new Boundary(x1, y1, x2, y2))
    }
    walls.push(new Boundary(0, 0, width, 0))
    walls.push(new Boundary(width, 0, width, height))
    walls.push(new Boundary(width, height, 0, height))
    walls.push(new Boundary(0, height, 0, 0))

    particle = new Particle()
}
addEventListener('dblclick', init)
function animate() {
    background(50)
    for (wall of walls) {
        wall.show()
    }


    if (mouseX !== undefined) {
        particle.update(mouseX, mouseY)
    }
    particle.look(walls)
    // particle.show()

}
init()