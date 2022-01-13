class Boid {
    constructor() {
        this.position = createVector(random(width), random(height))
        this.velocity = Vector.random2D()
        // this.velocity.mult(2)
        this.aceleration = createVector()

        // this.size = size
        this.ownColor = 255
        this.viewColor = [255, 255, 0]

        this.maxForce = 0.1
        this.maxSpeed = 1.25

    }
    draw() {
        save()
        translate(this.position)
        rotate(this.velocity.heading())


        fill(this.ownColor)
        trianglePolar(
            [size * 1.75, 0],
            [size, 2.1],
            [size, 4.2]
        )

        restore()
    }
    view() {
        let vectorPosAngle = Vector.fromAngle(angleOfView)
        let vectorNegAngle = Vector.fromAngle(-angleOfView)
        save()
        translate(this.position.x, this.position.y)
        rotate(this.velocity.heading())


        fill(this.viewColor)
        circle(Vector.zero, perceptionRadius, 0, -angleOfView)


        fill(this.viewColor)
        circle(Vector.zero, perceptionRadius, 0, angleOfView, false)

        fill(this.viewColor)
        beginPath()
        moveTo(Vector.mult(vectorPosAngle, perceptionRadius))
        vertex(Vector.mult(Vector.right, perceptionRadius))
        vertex(Vector.mult(vectorNegAngle, perceptionRadius))
        vertex(Vector.zero)
        vertex(Vector.mult(vectorPosAngle, perceptionRadius))
        closePath()



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

        this.aceleration.maxMag(this.maxForce)
        this.velocity.add(this.aceleration)
        this.velocity.maxMag(this.maxSpeed)
        this.position.add(this.velocity)

        this.aceleration.mult(0)
        this.edges()
    }
    applyForce(force) {

        this.aceleration.add(force)
    }

}