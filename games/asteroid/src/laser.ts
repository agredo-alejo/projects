import { circleVector, stroke } from "@apjs/dynamic"
import { createVector, fromAngle, Vector } from "@apjs/vector"
import { Asteroid } from "./asteroid"
import { ctx } from "./main"


export class Laser {

    pos: Vector
    vel: Vector

    constructor(spos: Vector, angle: number) {
        this.pos = createVector(spos.x, spos.y)
        this.vel = fromAngle(angle)
        this.vel.mult(10)
    }
    update() {
        this.pos.add(this.vel)
    }

    draw() {
        ctx.save()
        ctx.lineWidth = 4
        circleVector(ctx, this.pos, 4)
        stroke(ctx, "#fff")
        ctx.restore()
    }

    hits(asteroid: Asteroid) {
        return this.pos.dist(asteroid.pos) < asteroid.r
    }

    offscreen() {
        if (this.pos.x > innerWidth || this.pos.x < 0) {
            return true
        }
        if (this.pos.y > innerHeight || this.pos.y < 0) {
            return true
        }
        return false
    }
}