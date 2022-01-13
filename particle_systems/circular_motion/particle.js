class Particle {
    constructor(x, y) {
        this.position = createVector(x, y)
        this.center = createVector(x, y)

        this.radius = random(1, 2)
        this.color = random(colores)
        this.velocity = 0.05
        this.radians = random(Tau)
        this.distance = random(smallerCanvasSide / 15, smallerCanvasSide / 5)

        this.lastPoint = createVector()
        this.lastMouse = createVector(x, y)
    }
    draw() {
        save()
        lineWidth(this.radius)
        line(this.position, this.lastPoint, this.color)
        restore()
    }
    update() {
        this.lastPoint.set(this.position)
        this.radians += this.velocity
        if (mouseX != undefined) {
            let mouse = createVector(mouseX, mouseY)
            this.lastMouse.lerp(mouse, 0.05)
            this.center.set(this.lastMouse)
        }

        let circular = Vector.fromAngle(this.radians).mult(this.distance)

        this.position.set(Vector.add(this.center, circular))

        this.draw()
    }
} 