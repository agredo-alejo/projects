import { mouse, randomIndex, randomRange, rgbaColor, stroke } from "@apjs/dynamic"
import { add, createVector, fromAngle, Vector } from "@apjs/vector"
import { colores, ctx, smallerCanvasSide } from "./main"


export class Particle {

    position: Vector
    center: Vector
    velocity: number
    radians: number
    color: number[]
    radius: number
    distance: number
    lastPoint: Vector
    lastMouse: Vector

    constructor(x: number, y: number) {
        this.position = createVector(x, y)
        this.center = createVector(x, y)

        this.radius = randomRange(1, 2)
        this.color = randomIndex(colores)
        this.velocity = 0.05
        this.radians = Math.random()*(Math.PI *2)
        this.distance = randomRange(smallerCanvasSide / 15, smallerCanvasSide / 5)

        this.lastPoint = createVector()
        this.lastMouse = createVector(x, y)
    }
    draw() {
        // ctx.save()
        ctx.lineWidth = this.radius
        ctx.beginPath()
        ctx.moveTo(this.position.x, this.position.y)
        ctx.lineTo(this.lastPoint.x, this.lastPoint.y)
        // ctx.strokeStyle = this.color
        // ctx.stroke()
        stroke(ctx, rgbaColor(this.color))
        // ctx.restore()
    }
    update() {
        this.lastPoint.set(this.position)
        this.radians += this.velocity
        if (mouse.x != undefined) {
            let mouseVector = createVector(mouse.x, mouse.y)
            this.lastMouse.lerp(mouseVector, 0.05)
            this.center.set(this.lastMouse)
        }

        let circular = fromAngle(this.radians).mult(this.distance)

        this.position.set(add(this.center, circular))

        this.draw()
    }
} 