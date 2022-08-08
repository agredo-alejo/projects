import { circle, circleVector, fill, lineVector, randomRange, rgbaColor, stroke } from "@apjs/dynamic"
import { createVector, mult, Vector, zero } from "@apjs/vector"
import { ctx } from "./main"

export class Ruleta {

    position: Vector
    size: number
    numeros: any[]
    velocity: number
    angle: number
    angularVelocity: number
    angleBall: number
    angularVelocityBall: number
    fontsize: number
    color: number[]
    friction: number
    radiusBall: number
    posBall: Vector

    constructor() {
        this.position = createVector(innerWidth / 2, innerHeight / 2)
        if (innerWidth < innerHeight) {
            this.size = (innerWidth / 2) * 0.9
        } else {
            this.size = (innerHeight / 2) * 0.9
        }
        this.numeros = [0, 28, 9, 26, 30, 11, 7, 20, 32, 17, 5, 22, 34, 15, 3, 24, 36, 13, 1, '00', 27, 10, 25, 29, 12, 8, 19, 31, 18, 6, 21, 33, 16, 4, 23, 35, 14, 2]

        this.velocity = 10

        this.angle = Math.random() * Math.PI * 2
        this.angularVelocity = randomRange(this.velocity / 2, this.velocity)

        this.angleBall = Math.random() * Math.PI * 2
        this.angularVelocityBall = randomRange(-this.velocity / 2, -this.velocity)


        this.fontsize = this.size * 0.09
        this.color = [150, 80, 0]

        this.friction = 0.975


        this.radiusBall = this.size * 0.7
        this.posBall = createVector(
            this.radiusBall * Math.cos(this.angleBall),
            this.radiusBall * Math.sin(this.angleBall)
        )
    }

    draw() {
        ctx.save()
        ctx.translate(this.position.x, this.position.y)

        circleVector(ctx, zero(), this.size * 1.05)
        fill(ctx, rgbaColor(this.color))

        circleVector(ctx, zero(), this.size)
        stroke(ctx, "#fff")


        ctx.save()
        ctx.rotate(this.angle)

        circleVector(ctx, zero(), this.size * 0.85)
        fill(ctx)



        for (let i = 0; i < 38; i++) {
            let angulo = (i * Math.PI * 2 / 38)
            let anguloColor2 = ((i + 1) * Math.PI * 2 / 38)

            let internMag = this.size * 0.85
            let x1 = internMag * Math.cos(angulo)
            let y1 = internMag * Math.sin(angulo)

            let x2 = internMag * Math.cos(anguloColor2)
            let y2 = internMag * Math.sin(anguloColor2)



            if (i % 2 == 0) {
                ctx.beginPath()
                ctx.moveTo(0, 0)
                ctx.lineTo(x1, y1);
                ctx.lineTo(x2, y2)

                ctx.closePath()
                fill(ctx, rgbaColor(255, 0, 0))

            }

            if (i == 0 || i == 19) {

                ctx.beginPath()
                ctx.moveTo(0, 0)
                ctx.lineTo(x1, y1);
                ctx.lineTo(x2, y2)

                ctx.closePath()
                fill(ctx, rgbaColor(0, 200, 0))

            }

            ctx.save()

            let mag = this.size * 0.75
            ctx.translate(
                mag * Math.cos(angulo),
                mag * Math.sin(angulo)
            )
            ctx.rotate(angulo + (Math.PI / 2))

            ctx.font = this.fontsize + 'px Arial'
            ctx.fillStyle = "#fff"
            ctx.fillText('' + this.numeros[i] + '', 2.5, 0)

            ctx.restore()


        }

        ctx.restore()

        circle(ctx, 0, 0, this.size * 0.6)
        fill(ctx, rgbaColor(this.color))


        ctx.rotate(this.angleBall)

        circleVector(ctx, this.posBall, this.size * 0.05)
        fill(ctx, "#fff")


        lineVector(ctx, this.posBall, mult(this.posBall, 0.875))
        stroke(ctx, "#fff")

        ctx.restore()
    }

    update() {

        if (this.angularVelocity <= 0.00001) {
            this.angularVelocity = 0
        }

        this.angle += this.angularVelocity

        this.angleBall += this.angularVelocityBall

        this.angularVelocityBall *= this.friction
        this.angularVelocity *= this.friction

        this.draw()
    }

}