import { circleVector, randomRange, stroke } from "@apjs/dynamic"
import { createVector, random2D, Vector } from "@apjs/vector"
import { ctx, smallerCanvasSide } from "./main"

export class Circle {

    radius: number
    position: Vector
    velocity: Vector

    constructor() {
        this.radius = randomRange(smallerCanvasSide / 20, smallerCanvasSide / 10)
        this.position = createVector(
            // random(this.radius, innerWidth- this.radius),
            // random(this.radius, height - this.radius)
            Math.random() * innerHeight,
            Math.random() * innerHeight
        )
        this.velocity = random2D()
        this.velocity.mag = 0.5
    }
    egdes() {
        if (this.position.x > innerWidth) {
            this.position.x = 0
        } else if (this.position.x < 0) {
            this.position.x = innerWidth
        }
        if (this.position.y > innerHeight) {
            this.position.y = 0
        } else if (this.position.y < 0) {
            this.position.y = innerHeight
        }
    }
    update() {
        this.position.add(this.velocity)
        this.egdes()
    }
    draw() {
        circleVector(ctx, this.position, this.radius)
        stroke(ctx, "#fff")
    }
}