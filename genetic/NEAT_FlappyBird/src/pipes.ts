import { fill, randomRange, rect, rgbaColor } from "@apjs/dynamic"
import { Bird } from "./bird"
import { birdXPosition, ctx, pipesWidth, size, spacing } from "./main"

export class Pipe {

    centery: number
    top: number
    bottom: number
    x: number
    w: number
    speed: number

    constructor() {
        this.centery = randomRange(spacing, innerHeight - spacing)

        this.top = this.centery - spacing / 2;
        this.bottom = innerHeight - (this.centery + spacing / 2)

        this.x = innerWidth

        this.w = pipesWidth;

        this.speed = 5
    }

    hits(bird: Bird) {
        if ((bird.positionY - size) <= this.top || (bird.positionY + size) > (innerHeight - this.bottom)) {
            if (birdXPosition > this.x && birdXPosition < this.x + this.w) return true
        }
        return false;
    }
    draw() {
        // Bottom pipe
        rect(ctx, this.x, innerHeight - this.bottom, this.w, this.bottom);
        fill(ctx, rgbaColor(0, 200, 0))

        // Top pipe
        rect(ctx, this.x, 0, this.w, this.top);
        fill(ctx, rgbaColor(0, 200, 0))

    }
    update() {
        this.x -= this.speed;
    }
    offscreen() {
        if (this.x < -this.w) return true
        return false
    }
}