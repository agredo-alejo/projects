import { map, randomRange, stroke, translateCanvas } from "@apjs/dynamic"
import { random2D, Vector } from "@apjs/vector"
import { ctx } from "./main"

export class Asteroid {

    pos: Vector
    r: number
    vel: Vector
    total: number
    offset: number[]

    constructor(pos?: Vector, r?: number) {
        if (pos) {
            this.pos = pos.copy()
        } else {
            this.pos = new Vector(Math.random()*innerWidth, Math.random()*innerHeight)
        }

        if (r) {
            this.r = r * 0.5
        } else {
            this.r = randomRange(15, 50)
        }


        this.vel = random2D()
        this.total = Math.floor(randomRange(5, 15))
        this.offset = []
        for (var i = 0; i < this.total; i++) {
            let offset = this.r * 0.5
            this.offset[i] = randomRange(-1, 1) * offset
        }
    }
    update() {
        this.pos.add(this.vel)
    }

    draw() {
        ctx.save()
        translateCanvas(ctx, this.pos)

        
        ctx.beginPath()
        for (let i = 0; i <= this.total; i++) {
            let iteration = i % this.total,
                angle = map(iteration, 0, this.total, 0, Math.PI * 2),
                r = this.r + this.offset[iteration],
                x = r * Math.cos(angle),
                y = r * Math.sin(angle)
            ctx.lineTo(x, y)
        }
        ctx.closePath()
        stroke(ctx, "#fff")
        ctx.restore()
    }

    breakup() {
        let newA = []
        newA[0] = new Asteroid(this.pos, this.r)
        newA[1] = new Asteroid(this.pos, this.r)
        return newA
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
}
