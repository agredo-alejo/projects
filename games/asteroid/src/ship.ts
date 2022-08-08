import { stroke, translateCanvas, triangleCoords } from "@apjs/dynamic"
import { fromAngle, Vector, zero } from "@apjs/vector"
import { Asteroid } from "./asteroid"
import { ctx } from "./main"

export class Ship {

    pos: Vector
    r: number
    heading: number
    rotation: number
    vel: Vector
    isBoosting: boolean

    constructor() {
        this.pos = new Vector(innerWidth / 2, innerHeight / 2)
        this.r = 20
        this.heading = 0
        this.rotation = 0
        this.vel = zero()
        this.isBoosting = false
    }
    boosting(b: boolean) {
        this.isBoosting = b
    }

    update() {
        if (this.isBoosting) {
            this.boost()
        }
        this.pos.add(this.vel)
        this.vel.mult(0.99)
    }

    boost() {
        var force = fromAngle(this.heading)
        force.mult(0.1)
        this.vel.add(force)
    }

    hits(asteroid: Asteroid) {
        var d = this.pos.dist(asteroid.pos)
        if (d < this.r + asteroid.r) {
            return true
        } else {
            return false
        }
    }

    draw() {
        ctx.save()
        translateCanvas(ctx, this.pos)
        ctx.rotate(this.heading + Math.PI / 2)
        // fill(0);
        
        triangleCoords(
            ctx,
            -this.r, this.r,
            this.r, this.r,
            0, -this.r
        )
        stroke(ctx, "#fff")
        ctx.restore()
    }

    edges() {
        if (this.pos.x > innerWidth + this.r) {
            this.pos.x = -this.r
        } else if (this.pos.x < -this.r) {
            this.pos.x = innerWidth + this.r;
        }
        if (this.pos.y > innerHeight + this.r) {
            this.pos.y = -this.r
        } else if (this.pos.y < -this.r) {
            this.pos.y = innerHeight + this.r;
        }
    }

    setRotation(a: number) {
        this.rotation = a
    }

    turn() {
        this.heading += this.rotation
    }
}
