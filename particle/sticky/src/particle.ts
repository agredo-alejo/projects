import { circleVector, fill, grayScaleColor, lineVector, stroke, triangleVector } from "@apjs/dynamic"
import { createVector, random2D, Vector } from "@apjs/vector"
import { ctx, drawLines, drawTriangles, particles, stickyDistance } from "./main"


export class Particle {

    position: Vector
    velocity: Vector
    radio: number

    constructor() {
        this.position = createVector(Math.random()*innerWidth, Math.random()*innerHeight)
        this.velocity = random2D()
        this.radio = 1
    }
    draw() {
        circleVector(ctx, this.position, this.radio)
        fill(ctx)
    }
    edges() {
        if (this.position.x + this.radio > innerWidth || this.position.x - this.radio < 0) {
            this.velocity.x *= -1
        }
        if (this.position.y + this.radio > innerHeight || this.position.y - this.radio < 0) {
            this.velocity.y *= -1
        }
    }
    sticky(vector: Vector, stickyDistance: number) {
        if (drawLines) {
            let distance = this.position.dist(vector)
            if (distance <= stickyDistance) {
                let alpha = 1 - (distance / stickyDistance)
                // Or
                // let alpha = (stickyDistance - distance) / stickyDistance 

                // let alpha = map(distance, 0, stickyDistance, 1, 0)
                //  \_(._.)-/

                lineVector(ctx, this.position, vector)
                stroke(ctx, grayScaleColor([125, alpha]))
            }
        }
    }
    triangles() {
        if (drawTriangles) {
            let closest: Particle | undefined
            let secondClosest
            let record = Infinity
            for (let particle of particles) {
                if (this === particle) continue
                let distance = this.position.dist(particle.position)
                if (distance < record) {
                    record = distance
                    secondClosest = closest
                    closest = particle
                }

            }
            if (secondClosest && closest) {
                let side1 = this.position.dist(secondClosest.position)
                let side2 = this.position.dist(closest.position)
                let side3 = secondClosest.position.dist(closest.position)

                let maxSide = stickyDistance

                let largerSide = Math.max(side1, side2, side3)
                let shorterSide = Math.min(side1, side2, side3)


                if (largerSide < maxSide) {
                    let alpha = 1 - (shorterSide + largerSide) / (maxSide * 2)

                    triangleVector(ctx, this.position, closest.position, secondClosest.position)
                    fill(ctx, grayScaleColor(125, alpha))

                }
            }
        }
    }
    update() {
        this.position.add(this.velocity)
        this.edges()
        this.triangles()
        for (let particle of particles) {
            if (this === particle) continue
            this.sticky(particle.position, stickyDistance)
        }
    }
}
