import { circleVector, fill, randomIndex, randomRange } from "@apjs/dynamic"
import { createVector, random2D, Vector } from "@apjs/vector"
import { colors, ctx, maxRadio, mouseVector, smallerCanvasSide } from "./main"


export class Particle {

    position: Vector
    velocity: Vector
    radio: number
    minRadio: number
    color: string

    constructor() {
        this.position = createVector(Math.random() * innerWidth, Math.random() * innerHeight)
        this.velocity = random2D()
        this.velocity.mag = 0.5
        this.radio = randomRange(1, 7)
        this.minRadio = this.radio
        this.color = randomIndex(colors)
    }
    draw() {
        circleVector(ctx, this.position, this.radio)
        fill(ctx, this.color)
    }
    edges() {
        if (this.position.x > innerWidth || this.position.x < 0) {
            this.velocity.x *= -1
        }
        if (this.position.y > innerHeight || this.position.y < 0) {
            this.velocity.y *= -1
        }
    }
    interactivity() {
        let distance = mouseVector.dist(this.position)
        if (distance < smallerCanvasSide * 0.1 && distance > 0) {
            if (this.radio < maxRadio) {
                this.radio++
            }
        }
        else if (this.radio > this.minRadio) {
            this.radio--
        }
    }
    update() {
        this.position.add(this.velocity)
        this.interactivity()
        this.edges()
        this.draw()
    }
}