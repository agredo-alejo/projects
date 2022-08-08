import { triangleCoords } from "@apjs/dynamic"
import { random2D, sub, Vector } from "@apjs/vector"
import { ctx, diagonalMag, grid, resolution, smallerCanvasSide } from "./main"



export class Boid {
    
    position: Vector
    velocity: Vector
    size: number
    aceleration: Vector
    maxForce: number
    maxSpeed: number

    constructor() {
        this.position = new Vector(Math.random() * innerWidth, Math.random() * innerHeight)
        this.velocity = random2D()
        this.size = diagonalMag / 500
        if (innerWidth == smallerCanvasSide) {
            this.size = diagonalMag / 250
        }
        this.aceleration = new Vector()
        this.maxForce = 0.5
        this.maxSpeed = 3
    }
    behaviour(boidsArray: Boid[]) {
        let acPerceptionR = 70, sPerceptionR = 30
        let totalAC = 0, totalS = 0

        let forces = []
        for (let i = 0; i < 3; i++) forces.push(new Vector())

        for (let other of boidsArray) {
            if (other === this) continue

            let difference = sub(this.position, other.position)
            let distance = difference.mag

            if (distance < acPerceptionR) {
                forces[0].add(other.velocity)
                forces[1].add(other.position)

                totalAC++
            }
            if (distance < sPerceptionR) {
                difference.div(distance)
                forces[2].add(difference)

                totalS++
            }
        }
        if (totalAC > 0) {
            forces[1].div(totalAC)
            forces[1].sub(this.position)

            this.steer(forces[0])
            this.steer(forces[1])
        }
        if (totalS > 0) {
            this.steer(forces[2])
        }

        return forces
    }

    steer(force: Vector) {
        force.mag = this.maxSpeed
        force.sub(this.velocity)
        force.maxMag(this.maxForce)
    }

    flock(boidsArray: Boid[]) {
        let forces = this.behaviour(boidsArray)

        let alignment = forces[0],
            cohesion = forces[1],
            separation = forces[2]

        // alignment.mult(1)
        // cohesion.mult(1)
        separation.mult(1.25)

        this.applyForce(alignment)
        this.applyForce(cohesion)
        this.applyForce(separation)
    }
    draw() {
        ctx.save()
        ctx.translate(this.position.x, this.position.y)
        ctx.rotate(this.velocity.direction)

        triangleCoords(
            ctx,
            this.size * 1.75, 0,
            this.size * -0.5, this.size * 0.8,
            this.size * -0.5, this.size * -0.8
        )
        ctx.fill()

        ctx.restore()
    }
    edges() {
        if (this.position.x > innerWidth) {
            this.position.x = 0
        } else if (this.position.x < 0) {
            this.position.x = innerWidth
        }
        if (this.position.y > innerHeight) {
            this.position.y = 0
        } else if (this.position.y < 0) {
            this.position.y = innerHeight
        }
    }

    update() {
        let col = Math.floor(this.position.x / resolution)
        let row = Math.floor(this.position.y / resolution)
        grid[row][col].push(this)

        this.flock(grid[row][col])

        this.velocity.add(this.aceleration)
        this.velocity.maxMag(this.maxSpeed)
        this.position.add(this.velocity)

        this.edges()
        this.draw()
        this.aceleration.mult(0)
    }
    applyForce(force: Vector) {
        this.aceleration.add(force)
    }

} 