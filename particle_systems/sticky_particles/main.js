let numParticles, stickyDistance, particles, diagonal, speed
let drawTriangles = true
let drawLines = false

function init() {
    particles = []
    diagonal = createVector(width, height)

    numParticles = (width * height) / (40 * 1e3)
    numParticles = constrain(numParticles, 20, 100)

    stickyDistance = diagonal.mag() / 5

    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle())
    }
}
addEventListener('dblclick', event => {
    if (event.x > halfWidth) {
        drawTriangles = !drawTriangles
    } else {
        drawLines = !drawLines
    }
})
let counter = 0
function animate() {
    clearCanvas()
    let mouse = createVector(mouseX, mouseY)


    if (counter % 1 == 0) {
        for (particle of particles) {
            speed = createVector(random(-1, 1), random(-1, 1))
            speed.div(5)
            // particle.velocity.add(speed)
            particle.velocity.maxMag(1)
            particle.update()
        }
        counter = 0
    }
    counter++
    for (particle of particles) {
        particle.draw()
        particle.sticky(mouse, stickyDistance * 2)
    }


}
init()