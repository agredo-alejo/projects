import { circleVector, constrain, fill, randomIndex, randomRange, rgbaColor } from "@apjs/dynamic"
import { random2D, sub, Vector } from "@apjs/vector"
import { boids, colores, ctx, smallerCanvasSide } from "./main"

export class Boid {

    position: Vector
    velocity: Vector
    acceleration: Vector
    size: number
    dna: any[]
    health: number

    constructor(position: Vector, dna?: any[]) {
        this.position = position
        this.velocity = random2D()
        this.acceleration = new Vector()
        this.size = 3
        this.dna = []

        this.health = 1

        let perceptionRadius = (innerWidth + innerHeight) * 0.035
        let perceptionDifference = 0.5
        let force = 5
        let maxSpeed = smallerCanvasSide / 150
        if (dna == undefined) {
            this.dna = [
                //Food force [0]
                Math.random() * force,
                //Poison force [1]
                Math.random() * -force,
                // -10,
                //Food perception [2]
                Math.random() * perceptionRadius,
                //Poison perception [3]
                Math.random() * perceptionRadius * perceptionDifference,
                //Force to others [4]
                randomRange(force / 2, force),
                //Others perception [5]
                Math.random() * perceptionRadius * perceptionDifference,
                //color [6]
                randomIndex(colores.slice()),
                // Raproduction rate [7]
                randomRange(0.5, 1),
                // Mutation rate [8]
                randomRange(0.2, 1),
                // Amount of mutation [9]
                Math.random(),
                // Max Speed [10]
                Math.random() * maxSpeed,
                // Max Force [11]
                Math.random() * 5,
                // Distance to son [12]
                Math.random() * 25
            ]
        }
        else {
            for (let i = 0; i < dna.length; i++) {
                if (i !== 6) {
                    this.dna[i] = dna[i]
                }
                else {
                    this.dna[i] = dna[i].slice()
                }
            }
            // Mutation algorithm
            if (Math.random() < this.dna[8]) {
                let index = Math.floor(Math.random() * this.dna.length)
                let dnaToMutate = this.dna[index]

                if (index !== 6) {
                    let index2 = Math.floor(Math.random() * this.dna[6].length)
                    let cambio = 255

                    let amountOfMutation = randomRange(-1, 1)

                    this.dna[6][index2] += amountOfMutation * cambio

                    this.dna[6][index2] = constrain(this.dna[6][index2], 0, 255)

                    this.dna[index] += amountOfMutation * dnaToMutate
                }
                this.dna[8] = constrain(this.dna[8], 0.1, 1)
                this.dna[9] = constrain(this.dna[9], 0.1, 10)
                this.dna[10] = Math.min(this.dna[10], maxSpeed)
            }
        }

        let sum = this.dna[6].reduce((acc:number, val:number) => acc += val)
        let suma = (x: number) => x += 100
        if (sum < 255) {
            this.dna[6] = this.dna[6].map(suma)
        }
    }
    edges() {
        let distance = 10;
        let desired = null;
        if (this.position.x < distance) {
            desired = new Vector(this.dna[10], this.velocity.y);
        } else if (this.position.x > innerWidth - distance) {
            desired = new Vector(-this.dna[10], this.velocity.y);
        }

        if (this.position.y < distance) {
            desired = new Vector(this.velocity.x, this.dna[10]);
        } else if (this.position.y > innerHeight - distance) {
            desired = new Vector(this.velocity.x, -this.dna[10]);
        }

        if (desired !== null) {
            desired.mag = this.dna[10];
            let steer = sub(desired, this.velocity);
            steer.maxMag(this.dna[11] * 2);
            this.applyForce(steer);
        }
    }
    seek(target: Vector) {
        let desired = sub(target, this.position)
        desired.mag = this.dna[10]
        let steer = sub(desired, this.velocity)
        steer.maxMag(this.dna[11])
        return steer
    }
    eat(array: Vector[], nutricion: number, perception: number) {
        let record = Infinity
        let closest = null
        let distance
        for (let i = array.length - 1; i >= 0; i--) {
            distance = this.position.dist(array[i])

            if (distance < this.dna[10]) {
                array.splice(i, 1)
                array.push(new Vector(Math.random() * innerWidth, Math.random() * innerHeight))
                this.health += nutricion
            }
            else {
                if (distance < record && distance < perception) {
                    record = distance
                    closest = array[i]
                }
            }
        }
        if (closest !== null) {
            return this.seek(closest)
        }
        return new Vector()
    }
    separation(boidsArray: Boid[]) {
        let steering = new Vector()
        let total = 0
        for (let other of boidsArray) {
            if (other === this) continue
            let diff = sub(this.position, other.position)
            let dist = diff.mag
            if (dist < this.dna[5]) {

                steering.add(diff)
                total++
            }
            if (dist < 12.5) {
                this.health = 0
            }
        }
        if (total > 0) {
            // steering.div(total)
            steering.mag = this.dna[10]
            steering.sub(this.velocity)
            steering.maxMag(this.dna[11])
        }
        return steering
    }
    behaviors(good: Vector[], bad: Vector[]) {
        let steerG = this.eat(good, 0.2, this.dna[2])
        let steerB = this.eat(bad, -500, this.dna[3])
        let separation = this.separation(boids)


        steerG.mult(this.dna[0])
        steerB.mult(this.dna[1])
        separation.mult(this.dna[4])


        this.applyForce(steerG)
        this.applyForce(steerB)
        this.applyForce(separation)
    }
    dead() {
        return (this.health < 0)
    }
    clone() {
        if (Math.random() < this.dna[7] && this.health > 2) {
            let positionSon = this.position.copy()
            let diferencia = random2D()
            diferencia.mult(this.dna[12])
            positionSon.add(diferencia)

            // this.health /=2

            return new Boid(positionSon, this.dna)
        }
        else {
            return null
        }
    }
    draw() {
        // save()
        // translate(this.position)

        circleVector(ctx, this.position, this.size)
        fill(ctx, rgbaColor(this.dna[6]))


        // // Food Perception
        // circle(zero, this.dna[2])
        // stroke(0, 255, 0, 0.5)

        // // Poison Perception 
        // circle(zero, this.dna[3])
        // stroke(255, 0, 0, 0.5)

        // // Others Perception
        // circle(zero, this.dna[5])
        // stroke(255, 0.5)


        // restore()
    }
    edges2() {
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
        this.edges()
        if (innerWidth == smallerCanvasSide) {
            this.health -= 0.001
        } else {
            this.health -= 0.005
        }


        this.velocity.add(this.acceleration)
        this.velocity.maxMag(this.dna[10])
        this.position.add(this.velocity)
        this.acceleration.mult(0)
    }
    applyForce(force: Vector) {
        this.acceleration.add(force)
    }
}