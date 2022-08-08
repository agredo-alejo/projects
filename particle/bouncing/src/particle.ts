import { circleVector, fill, randomIndex } from "@apjs/dynamic"
import { createVector, random2D, rotate, sub, Vector } from "@apjs/vector"
import { colors, ctx } from "./main"


export class Particle {

    position: Vector
    velocity: Vector
    radio: number
    color: string
    mass: number

    constructor(position: Vector, radio: number) {
        this.position = position
        this.velocity = random2D()
        this.radio = radio
        this.color = randomIndex(colors)
        this.mass = this.radio * 2
    }
    resolveCollision(particle: Particle) {
        let velocityDiff = sub(this.velocity, particle.velocity)
        let positionDiff = sub(particle.position, this.position)

        if (velocityDiff.dot(positionDiff) >= 0) {
            let angle = positionDiff.direction

            let m1 = this.mass
            let m2 = particle.mass

            let u1 = rotate(this.velocity, -angle)
            let u2 = rotate(particle.velocity, -angle)

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

            this.velocity = rotate(v1, angle)
            particle.velocity = rotate(v2, angle)

        }
    }
    draw() {
        circleVector(ctx, this.position, this.radio)
        fill(ctx, this.color)
    }
    edges() {
        if (this.position.x + this.radio > innerWidth || this.position.x - this.radio < 0) {
            this.velocity.x *= -1
        }
        if (this.position.y + this.radio > innerHeight || this.position.y - this.radio < 0) {
            this.velocity.y *= -1
        }
    }
    collisions(particles: Particle[]) {
        for (let i = 0; i < particles.length; i++) {
            if (this === particles[i]) continue
            let distance = this.position.dist(particles[i].position)
            let sumOfRadius = this.radio + particles[i].radio
            if (distance <= sumOfRadius) {
                this.resolveCollision(particles[i])
            }
        }
    }
    update(particles: Particle[]) {
        this.position.add(this.velocity)
        this.collisions(particles)
        this.edges()
    }
}
