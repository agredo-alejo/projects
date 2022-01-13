let particles, numParticles, colors, center, mouse
colors = [
    // [0,255,255],
    [0, 200, 0],
    [0, 0, 255],
    [255, 150, 0]
]
let gConstant = 0.01
let singularity = 0.2
let radio = 7
numParticles = 175

function init() {
    ctx.strokeStyle = 'rgba(' + 200 + ',' + 200 + ',' + 200 + ', 1)'
    center = new Vector(halfWidth, halfHeight)
    particles = []
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle())
    }
}
addEventListener('dblclick', init)
// let fps = 0
let heavier, force
function animate() {
    clearCanvas()
    // background(255, 0)
    let record = 0
    for (particle of particles) {
        // particle.update()
        particle.atraction()
        if (particle.mass > record) {
            record = particle.mass
            heavier = particle
        }
        
    }
    for(particle of particles){
        particle.update()
        particle.draw() 
    }
    force = Vector.sub(center, heavier.position)
    force.setMag(0.025).mult(heavier.mass)
    heavier.applyForce(force)
    heavier.velocity.mult(0.997)
}
init()
// setFps(2)