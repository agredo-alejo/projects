import { circleVector, fill, rgbaColor } from "@apjs/dynamic"
import { random2D, Vector } from "@apjs/vector"
import { ctx, smallerCanvasSide } from "./main"


export class Chaser {

    position: Vector
    velocity: Vector
    radius: number
    maxSpeed: number

    constructor() {
        this.position = new Vector(Math.random() * innerWidth, Math.random() * innerHeight)
        this.velocity = new Vector()
        this.radius = smallerCanvasSide * 0.006
        this.maxSpeed = smallerCanvasSide * 0.003
    }
    draw() {
        circleVector(ctx, this.position, this.radius)

        fill(ctx, rgbaColor(255, 0, 0))
    }
    edges() {
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
        let randomAcceleration = random2D().mult(0.5)
        this.velocity.add(randomAcceleration)
        this.velocity.maxMag(this.maxSpeed)
        this.position.add(this.velocity)
        this.edges()
    }
}