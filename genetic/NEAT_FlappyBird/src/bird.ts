import { circle, fill, rgbaColor } from "@apjs/dynamic"
import { activationLayer, denseLayer, normLayer, Sequential } from "@apjs/ml"
import { create } from "@apjs/tensor"
import { birdXPosition, ctx, diferenceAdjust, gravity, size, up } from "./main"
import { Pipe } from "./pipes"


export class Bird {

    positionY: number
    velocity: number
    score: number
    brain: Sequential

    constructor(brain?: Sequential) {
        this.positionY = innerHeight / 2
        this.velocity = 0
        this.score = 0
        if (brain instanceof Sequential) {
            this.brain = brain.copy()
            this.brain.mutate(true, 0.25, 0.1)
        } else {
            this.brain = new Sequential()
            this.brain.add(normLayer({
                inputShape: 3
            }))
            this.brain.add(denseLayer({
                // inputShape: 3,
                units: 2,
            }))
            this.brain.add(activationLayer("tanh"))
            this.brain.add(denseLayer({
                units: 1,
            }))
            this.brain.add(activationLayer("tanh"))
        }
    }
    async think(pipes: Pipe[]) {
        let closest = null;
        let record = Infinity;
        for (let i = 0; i < pipes.length; i++) {
            let diff = pipes[i].x - birdXPosition;
            if (diff + diferenceAdjust > 0 && diff < record) {
                record = diff;
                closest = pipes[i];
            }
        }
        if (closest == null) return
        let inputs = []

        inputs.push(this.velocity)
        inputs.push(this.positionY)
        inputs.push(closest.centery)

        let decision = await this.brain.predict(create(inputs));
        if (decision.data[0] > 0) {
            this.jump()
        }
    }
    draw() {
        circle(ctx, birdXPosition, this.positionY, size)
        fill(ctx, rgbaColor(255, 255, 0))
    }
    isDead() {
        if (this.positionY + size >= innerHeight) {
            this.positionY = innerHeight - size
            this.velocity = 0
            return true
        }
        else if (this.positionY - size <= 0) {
            this.positionY = size
            this.velocity = 0
            return true
        }
        else {
            return false
        }
    }
    clone() {
        return new Bird(this.brain)
    }
    jump() {
        this.velocity = up
    }
    save() {
        return this.brain.save()
    }
    update() {
        this.velocity += gravity
        this.positionY += this.velocity

        this.score += 0.001
        this.isDead()
        this.draw()
    }

}