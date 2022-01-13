class Particle {
    constructor() {
        this.position = createVector(random(width), random(height))
        this.velocity = Vector.random2D()
        this.velocity.setMag(0.5)
        this.radio = random(1, 7)
        this.minRadio = this.radio
        this.color = random(colorArray)
    }
    draw() {
        fill(this.color)
        circle(this.position, this.radio)
    }
    edges() {
        if (this.position.x > width || this.position.x < 0) {
            this.velocity.x *= -1
        }
        if (this.position.y > height || this.position.y < 0) {
            this.velocity.y *= -1
        }
    }
    interactivity() {
        let distance = mouse.dist(this.position)
        if (distance < smallerCanvasSide * 0.1 && distance > 0) {
            if (this.radio < maxRadio) {
                this.radio++
            }
        }
        else if (this.radio > this.minRadio) {
            this.radio--
        }
    }
    update() {
        this.position.add(this.velocity)
        this.interactivity()
        this.edges()
        this.draw()
    }
}