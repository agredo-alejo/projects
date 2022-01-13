class Boid {
    constructor(position, dna) {
        this.position = position
        this.velocity = Vector.random2D()
        this.acceleration = new Vector()
        
        this.dna = []

        this.health = 1

        let perceptionRadius = (width + height) * 0.035
        let perceptionDifference = 0.5
        let force = 5
        let maxSpeed = diagonalVectorMag / 250

        if (dna == undefined) {
            this.dna = [
                //Food force [0]
                Math.random() * force,
                //Poison force [1]
                Math.random() * -force,
                // -10,
                //Food perception [2]
                random(perceptionRadius),
                //Poison perception [3]
                random(perceptionRadius * perceptionDifference),
                //Force to others [4]
                random(force / 2, force),
                //Others perception [5]
                random(perceptionRadius * perceptionDifference),
                //color [6]
                random(colores.slice()),
                // Raproduction rate [7]
                random(0.5, 1),
                // Mutation rate [8]
                random(0.2, 1),
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
            // this.dna = dna

            // Mutation algorithm
            if (Math.random() < this.dna[8]) {
                let index = Math.floor(Math.random() * this.dna.length)
                let dnaToMutate = this.dna[index]

                if (index !== 6) {
                    // let index2 = Math.floor(Math.random() * this.dna[6].length)
                    // let cambio = 255

                    let amountOfMutation = random(-1, 1)

                    // this.dna[6][index2] += amountOfMutation * cambio

                    // this.dna[6][index2] = constrain(this.dna[6][index2], 0, 255)

                    this.dna[index] += amountOfMutation * dnaToMutate
                }
                this.dna[8] = constrain(this.dna[8], 0.1, 1)
                this.dna[9] = constrain(this.dna[9], 0.1, 10)
                this.dna[10] = Math.min(this.dna[10], maxSpeed)
            }
        }

        let sum = this.dna[6].reduce((acc, val) => acc += val)
        let suma = (x) => x += 100
        if (sum < 255) {

            this.dna[6] = this.dna[6].map(suma)
        }
    }
    edges() {
        let distance = 10;
        let desired = null;
        if (this.position.x < distance) {
            desired = new Vector(this.dna[10], this.velocity.y);
        } else if (this.position.x > width - distance) {
            desired = new Vector(-this.dna[10], this.velocity.y);
        }

        if (this.position.y < distance) {
            desired = new Vector(this.velocity.x, this.dna[10]);
        } else if (this.position.y > height - distance) {
            desired = new Vector(this.velocity.x, -this.dna[10]);
        }

        if (desired !== null) {
            desired.setMag(this.dna[10]);
            let steer = Vector.sub(desired, this.velocity);
            steer.maxMag(this.dna[11] * 2);
            this.applyForce(steer);
        }
    }
    seek(target) {
        let desired = Vector.sub(target, this.position)
        desired.setMag(this.dna[10])
        let steer = Vector.sub(desired, this.velocity)
        steer.maxMag(this.dna[11])
        return steer
    }
    eat(array, nutricion, perception) {
        let record = Infinity
        let closest = null
        for (let i = array.length - 1; i >= 0; i--) {
            let distance = this.position.dist(array[i])

            if (distance < this.dna[10]) {
                array.splice(i, 1)
                array.push(createVector(random(width), random(height)))
                this.health += nutricion
            }
            else {
                if (distance < record && distance <  perception) {
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
    // separation(boidsArray) {
    //     let steering = new Vector()
    //     let total = 0
    //     for (let other of boidsArray) {
    //         if (other === this) continue
    //         let d = this.position.distSq(other.position)

    //         if (d < this.dna[5] * this.dna[5]) {
    //             let diff = Vector.sub(this.position, other.position)

    //             steering.add(diff)
    //             total++
    //         }
    //     }
    //     if (total > 0) {
    //         // steering.mult(1/total)
    //         steering.setMag(this.dna[10])
    //         steering.sub(this.velocity)
    //         steering.maxMag(this.dna[11])
    //     }
    //     return steering
    // }
    behaviors(good, bad) {
        let steerG = this.eat(good, 0.3, this.dna[2])
        let steerB = this.eat(bad, -500, this.dna[3])
        // let separation = this.separation(boids)


        steerG.mult(this.dna[0])
        steerB.mult(this.dna[1])
        // separation.mult(this.dna[4])


        this.applyForce(steerG)
        this.applyForce(steerB)
        // this.applyFor0ce(separation)
    }
    dead() {
        return (this.health < 0)
    }
    clone() {
        if (Math.random() < this.dna[7] && this.health > 2) {
            let positionSon = this.position.copy()
            let diferencia = Vector.random2D()
            diferencia.mult(this.dna[12])
            positionSon.add(diferencia)

            this.health = 1

            return new Boid(positionSon, this.dna.slice())
        }
        else {
            return null
        }
    }
    draw() {
        save()
        translate(this.position)
        rotate(this.velocity.heading())


        // // Food Perception
        // circle(Vector.zero, this.dna[2])
        // stroke(0, 255, 0, 0.5)

        // // Poison Perception 
        // circle(Vector.zero, this.dna[3])
        // stroke(255, 0, 0, 0.5)

        // // Others Perception
        // circle(Vector.zero, this.dna[5])
        // stroke(255, 0.5)



        this.color = lerpColor([255, 0, 0], [0, 255, 0], this.health)


        fill(this.color)
        triangleCoords(
            size * 1.75, 0,
            size * -0.5, size * 0.8,
            size * -0.5, size * -0.8
        )

        restore()
    }
    edges2() {
        if (this.position.x > width) {
            this.position.x = 0
        } else if (this.position.x < 0) {
            this.position.x = width
        }
        if (this.position.y > height) {
            this.position.y = 0
        } else if (this.position.y < 0) {
            this.position.y = height
        }
    }
    update() {
        this.edges()
        this.health -= 0.0075

        for (let i = 0; i < boids.length; i++) {
            if (this === boids[i]) continue
            if (this.position.dist(boids[i].position) < 3) {
                this.health = 0.5
            }
        }

        this.velocity.add(this.acceleration)
        this.velocity.maxMag(this.dna[10])
        this.position.add(this.velocity)
        this.acceleration.mult(0)
        // this.draw()
    }
    applyForce(force) {
        this.acceleration.add(force)
    }
}