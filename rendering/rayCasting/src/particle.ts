import { circleVector, fill, grayScaleColor, lineVector, radians, stroke } from "@apjs/dynamic"
import { createVector, dist, Vector } from "@apjs/vector"
import { Boundary } from "./boundary"
import { ctx } from "./main"
import { Ray } from "./ray"


export class Particle {

    position: Vector
    rays: Ray[]

    constructor() {
        this.position = createVector(innerWidth / 2, innerHeight / 2)
        this.rays = []
        for (let i = 0; i < 360; i++) {
            this.rays.push(new Ray(this.position, radians(i)))
        }
    }

    look(walls: Boundary[]) {
        for (let ray of this.rays) {
            let closest = null
            let record = Infinity

            for (let wall of walls) {
                let pt = ray.cast(wall)

                if (pt) {
                    let distance = dist(this.position, pt)
                    if (distance < record) {
                        record = distance
                        closest = pt
                    }
                }
            }
            if (closest) {
                lineVector(ctx, this.position, closest)
                stroke(ctx, grayScaleColor(255, 0.4))
            }
        }
    }
    update(x: number, y?: number) {
        this.position.set(x, y)
    }
    show() {
        circleVector(ctx, this.position, 1)
        fill(ctx, "#fff")
        // for (ray of this.rays) {
        //     ray.show()
        // }
    }
}
