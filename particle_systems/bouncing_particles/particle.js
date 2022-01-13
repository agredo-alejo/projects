class Particle {
    constructor(position, radio) {
        this.position = position
        this.velocity = Vector.random2D()
        this.radio = radio
        this.color = random(colors)
        this.mass = this.radio * 2
    }
    resolveCollision(particle) {
        let velocityDiff = Vector.sub(this.velocity, particle.velocity)
        let positionDiff = Vector.sub(particle.position, this.position)

        if (velocityDiff.dot(positionDiff) >= 0) {
            let angle = positionDiff.heading()

            let m1 = this.mass
            let m2 = particle.mass

            let u1 = Vector.rotate(this.velocity, -angle)
            let u2 = Vector.rotate(particle.velocity, -angle)

            const v1 = createVector(
                u1.x * (m1 - m2) /
                (m1 + m2) +
                u2.x * 2 * m2 / (m1 + m2),

                u1.y
            )
            const v2 = createVector(
                u1.x * 2 * m1 /
                (m1 + m2) +
                u2.x * (m2 - m1) / (m1 + m2),

                u2.y
            )

            this.velocity = Vector.rotate(v1, angle)
            particle.velocity = Vector.rotate(v2, angle)

        }
    }
    draw() {
        fill(this.color)
        circle(this.position, this.radio)
    }
    edges() {
        if (this.position.x + this.radio > width || this.position.x - this.radio < 0) {
            this.velocity.x *= -1
        }
        if (this.position.y + this.radio > height || this.position.y - this.radio < 0) {
            this.velocity.y *= -1
        }
    }
    collisions() {
        for (let i = 0; i < particles.length; i++) {
            if (this === particles[i]) continue
            let distance = this.position.dist(particles[i].position)
            let sumOfRadius = this.radio + particles[i].radio
            if (distance <= sumOfRadius) {
                this.resolveCollision(particles[i])
            }
        }
    }
    update() {
        this.position.add(this.velocity)
        this.collisions()
        this.edges()
    }
}
