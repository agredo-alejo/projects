import { grayScaleColor, lineVector, stroke } from "@apjs/dynamic";
import { createVector, Vector } from "@apjs/vector";
import { ctx } from "./main";


export class Boundary {

    a: Vector
    b: Vector

    constructor(x1: number, y1: number, x2: number, y2: number) {
        this.a = createVector(x1, y1)
        this.b = createVector(x2, y2)
    }
    show() {
        ctx.save()
        ctx.lineWidth = 3
        lineVector(ctx, this.a, this.b)
        stroke(ctx, grayScaleColor(200))
        ctx.restore()
    }
}