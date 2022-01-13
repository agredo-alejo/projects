class Boid {
    constructor() {
        this.position = new Vector(random(width), random(height))
        this.velocity = Vector.random2D()
        this.size = diagonalMag / 500
        if (width == smallerCanvasSide) {
            this.size = diagonalMag / 250
        }
        this.aceleration = new Vector()
        this.maxForce = 0.5
        this.maxSpeed = 3
    }
    behaviour(boidsArray) {
        let acPerceptionR = 70, sPerceptionR = 30
        let totalAC = 0, totalS = 0

        let forces = []
        for(let i = 0; i < 3; i++) forces.push(new Vector())

        for (let other of boidsArray) {
            if (other === this) continue

            let difference = Vector.sub(this.position, other.position)
            let distance = difference.mag()

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

    steer(force) {
        force.setMag(this.maxSpeed)
        force.sub(this.velocity)
        force.maxMag(this.maxForce)
    }

    flock(boidsArray) {
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
        save()
        translate(this.position.x, this.position.y)
        rotate(this.velocity.heading())


        fill()
        triangleCoords(
            this.size * 1.75, 0,
            this.size * -0.5, this.size * 0.8,
            this.size * -0.5, this.size * -0.8
        )

        restore()
    }
    edges() {
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
    applyForce(force) {
        this.aceleration.add(force)
    }

} 