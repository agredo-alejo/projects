let numParticles
let valorRadio = {
    min: undefined,
    max: undefined
}
const colors = [
    'green',
    'blue',
    '#F2E527',
    '#F2AB27',
    '#F2522E'
]

let particles
function init() {
    particles = []

    numParticles = 20
    valorRadio.min = smallerCanvasSide / 70
    valorRadio.max = valorRadio.min * 5

    createParticles()    
}
addEventListener('dblclick', init)

function createParticles() {
    let radio, position
    for (let i = 0; i < numParticles; i++) {

        // Create random properties for the new particle
        radio = random(valorRadio.min, valorRadio.max)
        position = createVector(
            random(radio, width - radio),
            random(radio, height - radio)
        )

        // Check if the new Particle is overlapping with an already existing particle
         if (i !== 0) {
            let distancefromOtherParticle, minimumDistanceBetweenCircles
            for (let j = 0; j < particles.length; j++) {
                distancefromOtherParticle = position.dist(particles[j].position) 
                minimumDistanceBetweenCircles = radio + particles[j].radio
                
                if (distancefromOtherParticle <= minimumDistanceBetweenCircles) {
                    position = createVector(
                        random(radio, width - radio),
                        random(radio, height - radio)
                    )
                    j = -1
                }
            }
        }
        particles.push(new Particle(position, radio))
    }
}
function animate() {
    clearCanvas()

    for (particle of particles) {
        particle.update()
        particle.draw()
    }
}
init()