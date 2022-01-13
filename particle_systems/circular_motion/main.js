const colores = [
    [0, 190, 255],
    [75, 55, 205],
    [5, 145, 255]
]
let particles
function init() {
    clearCanvas()
    particles = []
    for (let i = 0; i < 75; i++) {
        particles.push(new Particle(halfWidth, halfHeight))
    }
}
addEventListener('dblclick', init)
function animate() {
    background(10, 0.1)

    for (particle of particles) {
        particle.update()
    }

}
init() 