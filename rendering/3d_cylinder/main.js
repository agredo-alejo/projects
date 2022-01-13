class Particle {
    constructor(x, y, z, angle) {
        this.x = x
        this.y = y
        this.z = z
        this.angle = angle
    }
}
let focalLenght = 100,
    particles = [],
    numParticles = 200,
    centerZ = 2000,
    radius = 500,
    baseAngle = 0,
    rotationSpeed = 0.01


function init() {
    restore()
    particles = []
    for (let i = 0; i < numParticles; i++) {
        let angle = 0.2 * i

        particles.push(new Particle(
            Math.cos(angle + baseAngle) * radius,
            2000 - 4000 / numParticles * i + Math.random()*500,
            centerZ + Math.sin(angle + baseAngle) * radius,
            0.2 * i
        ))
    }
    // save()
    // translate(width/2, height/2)
}
function mousemove() {
    rotationSpeed = (mouseX - width / 2) * 0.00005
    // ypos = (mouseY - height / 2) * 2
}

function animate() {
    // clearRect(-width / 2, -height / 2, width, height);
    // fill()
    // circle(0,height/2,50)
    clearCanvas()
    save()
    translate(width / 2, height / 2);

    baseAngle += rotationSpeed;

    stroke()
    beginPath()

    for (let i = 0; i < numParticles; i++) {
        let particle = particles[i],
            perspective = focalLenght / (focalLenght + particle.z)

        save()
        scale(perspective)
        translate(particle)

        // if (i == 0) {
            // moveTo(particle)
        // } else {
            vertex(particle)
        // }
        // ctx.stroke()
        

        // fill()
        // circle(0, 0, 40)

        restore()

        particle.x = Math.cos(particle.angle + baseAngle) * radius
        particle.z = centerZ + Math.sin(particle.angle + baseAngle) * radius
    }
    closePath()

    restore()
}

init()