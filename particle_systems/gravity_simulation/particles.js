class Particle {
    constructor() {
        this.radius = random(radio)
        this.mass = (this.radius ** 2) * Pi
        this.position = new Vector(Math.random() * width, Math.random() * height)
        // this.position = Vector.random2D().mult((smallerCanvasSide / 2)).add(center)
        this.velocity = Vector.random2D().mult(1)
        // this.velocity = Vector.up.mult(speed)
        this.acceleration = new Vector()
    }

    atraction() {
        for (let i = particles.length - 1; i >= 0; i--) {
            if (this === particles[i]) continue
            let diff = Vector.sub(particles[i].position, this.position)
            let dist = diff.mag()
            let magDist = dist * 2
            let mag = gConstant * (this.mass * particles[i].mass / magDist)
            let force = Vector.setMag(diff, mag)
            let condition = this.radius + particles[i].radius

            if (dist <= condition) {
                this.resolveCollision(particles[i])
            }
            if (dist <= condition * singularity) {
                if (this.mass < particles[i].mass) {
                    this.velocity.set(particles[i].velocity)
                    this.position.set(particles[i].position)
                }
                this.mass += particles[i].mass
                this.radius = Math.hypot(this.radius, particles[i].radius)
                particles.splice(i, 1)
                continue
            }
            this.applyForce(force)      
        }
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Tau, true)
        ctx.stroke()
        ctx.closePath()

        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius * singularity, 0, Tau, true)
        ctx.fill()
        ctx.closePath()
    }
    update() {
        this.velocity.add(this.acceleration)
        // this.velocity.mult(0.9)
        this.position.add(this.velocity)
        this.acceleration.mult(0)
    }
    applyForce(force) {
        this.acceleration.add(Vector.div(force, this.mass))
    }

    resolveCollision(particle) {
        let velocityDiff = Vector.sub(this.velocity, particle.velocity)
        let positionDiff = Vector.sub(particle.position, this.position)

        if (velocityDiff.dot(positionDiff) >= 0) {
            let angle = Math.atan2(positionDiff.y, positionDiff.x)

            let m1 = this.mass
            let m2 = particle.mass

            let u1 = Vector.rotate(this.velocity, -angle)
            let u2 = Vector.rotate(particle.velocity, -angle)

            const v1 = new Vector(
                u1.x * (m1 - m2) /
                (m1 + m2) +
                u2.x * 2 * m2 / (m1 + m2),

                u1.y
            )
            const v2 = new Vector(
                u1.x * 2 * m1 /
                (m1 + m2) +
                u2.x * (m2 - m1) / (m1 + m2),

                u2.y
            )

            this.velocity = Vector.rotate(v1, angle)
            particle.velocity = Vector.rotate(v2, angle)

            this.velocity.mult(0.999)
            particle.velocity.mult(0.999)

        }
    }
}
// this.radius = sqrt(
//     (this.radius ** 2 * Pi + particles[i].radius ** 2 * Pi) /
//     Pi
// )
// // 
// this.radius = sqrt(
//     this.radius ** 2 + particles[i].radius ** 2
// )
// // 
// this.radius **= 2
// this.radius += particles[i].radius ** 2
// this.radius **= 0.5
// //
// let area = this.radius * this.radius + particles[i].radius * particles[i].radius
// this.radius = sqrt(area)

// Suma de volumenes
// this.radius = Math.cbrt(this.radius ** 3 + particles[i].radius ** 3)