import { circleVector, fill, grayScaleColor, lineVector, stroke, translateCanvas } from "@apjs/dynamic"
import { createVector, dist, fromAngle, Vector, zero } from "@apjs/vector"
import { Circle } from "./circles"
import { ctx } from "./main"

export class Ray {

    position: Vector
    angle: number

    constructor() {
        this.position = createVector(innerWidth / 2, innerHeight / 2)
        this.angle = Math.random() * Math.PI * 2
    }
    update() {
        this.angle += 0.005
    }
    draw() {
        ctx.save()
        translateCanvas(ctx, this.position)
        let direction = fromAngle(this.angle)
        direction.mag = 50
        lineVector(ctx, zero(), direction)
        ctx.restore()
    }
    march(obstacles: Circle[]) {
        let current = this.position.copy()
        while (true) {

            let record = Infinity
            // let closest = null


            for (let i = 0; i < obstacles.length; i++) {
                let distance = dist(current, obstacles[i].position) - obstacles[i].radius
                if (distance < record) {
                    record = distance
                    // closest = obstacles[i]
                }
            }
            if (record < 1) {
                break
            }


            let direction = fromAngle(this.angle)
            direction.mag = record

            circleVector(ctx, current, record)
            fill(ctx, grayScaleColor(200, 0.5))



            current.add(direction)
            if (this.offScreen(current)) {
                break
            }

        }

        lineVector(ctx, this.position, current)
        stroke(ctx, "#fff")

    }
    offScreen(point: Vector) {
        return (point.x > innerWidth || point.x < 0 || point.y > innerHeight)
    }
}