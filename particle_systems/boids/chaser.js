class Chaser {
    constructor() {
        this.position = new Vector(Math.random() * width, Math.random() * height)
        // this.velocity = Vector.random2D()
        this.velocity = new Vector()
        this.radius = smallerCanvasSide * 0.006
        this.maxSpeed = smallerCanvasSide * 0.003
    }
    draw() {
        fill(255,0,0)
        circle(this.position, this.radius)
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
        let randomAcceleration = Vector.random2D().mult(0.5)
        this.velocity.add(randomAcceleration)
        this.velocity.maxMag(this.maxSpeed)
        this.position.add(this.velocity)
        this.edges()
    }
}