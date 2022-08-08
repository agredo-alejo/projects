import { circleVector, fill, grayScaleColor, lineTo, moveTo, rgbaColor, translateCanvas, trianglePolar } from "@apjs/dynamic"
import { createVector, fromAngle, mult, random2D, right, Vector, zero } from "@apjs/vector"
import { angleOfView, ctx, perceptionRadius, size } from "./main"


export class Boid {

    position: Vector
    velocity: Vector
    acceleration: Vector
    ownColor: number | number[]
    viewColor: number[]
    maxForce: number
    maxSpeed: number

    constructor() {
        this.position = createVector(Math.random() * innerWidth, Math.random() * innerHeight)
        this.velocity = random2D()

        this.acceleration = createVector()

        // this.size = size
        this.ownColor = 255
        this.viewColor = [255, 255, 0]

        this.maxForce = 0.1
        this.maxSpeed = 1.25

    }
    draw() {
        ctx.save()
        translateCanvas(ctx, this.position)
        ctx.rotate(this.velocity.direction)


        trianglePolar(
            ctx,
            [size * 1.75, 0],
            [size, 2.1],
            [size, 4.2]
        )
        let color = this.ownColor instanceof Array ? rgbaColor(this.ownColor) : grayScaleColor(this.ownColor)
        fill(ctx, color)

        ctx.restore()
    }
    view() {
        let vectorPosAngle = fromAngle(angleOfView)
        let vectorNegAngle = fromAngle(-angleOfView)
        ctx.save()
        ctx.translate(this.position.x, this.position.y)
        ctx.rotate(this.velocity.direction)


        circleVector(ctx, zero(), perceptionRadius, 0, -angleOfView)
        fill(ctx, rgbaColor(this.viewColor))


        circleVector(ctx, zero(), perceptionRadius, 0, angleOfView, false)
        fill(ctx, rgbaColor(this.viewColor))

        ctx.beginPath()
        moveTo(ctx, mult(vectorPosAngle, perceptionRadius))
        lineTo(ctx, mult(right(), perceptionRadius))
        lineTo(ctx, mult(vectorNegAngle, perceptionRadius))
        lineTo(ctx, zero())
        lineTo(ctx, mult(vectorPosAngle, perceptionRadius))
        ctx.closePath()
        fill(ctx, rgbaColor(this.viewColor))



        ctx.restore()
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

        this.acceleration.maxMag(this.maxForce)
        this.velocity.add(this.acceleration)
        this.velocity.maxMag(this.maxSpeed)
        this.position.add(this.velocity)

        this.acceleration.mult(0)
        this.edges()
    }
    applyForce(force: Vector) {

        this.acceleration.add(force)
    }

}