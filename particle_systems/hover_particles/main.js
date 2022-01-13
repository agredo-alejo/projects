let colorArray = [
    'green',
    'blue',
    '#F2E527',
    '#F2AB27',
    '#F2522E'
]
let mouse = createVector()
let maxRadio = smallerCanvasSide / 15;
let numParticles

let particles
function init() {
    numParticles = smallerCanvasSide / 3
    numParticles = constrain(numParticles, 1, 500)

    particles = [];
    for (let i = 0; i < numParticles; i++) {
        particles.push(new Particle())
    }
}

function animate() {
    clearCanvas()
    mouse.set(mouseX, mouseY)

    for (particle of particles) {
        particle.update()
    }

}
init()