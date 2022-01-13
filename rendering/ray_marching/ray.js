class Ray {
    constructor() {
        this.position = createVector(halfWidth, halfHeight)
        this.angle = random(Tau)
    }
    update() {
        this.angle += 0.005
    }
    draw() {
        save()
        translate(this.position)
        let direction = Vector.fromAngle(this.angle)
        direction.setMag(50)
        line(0, 0, direction)
        restore()
    }
    march(obstacles) {
        let current = this.position.copy()
        while (true) {

            let record = Infinity
            let closest = null


            for (let i = 0; i < obstacles.length; i++) {
                let distance = Vector.dist(current, obstacles[i].position) - obstacles[i].radius
                if (distance < record) {
                    record = distance
                    closest = obstacles[i]
                }
            }
            if (record < 1) {
                break
            }


            let direction = Vector.fromAngle(this.angle)
            direction.setMag(record)

            fill(200, 0.5)
            circle(current, record)
            


            current.add(direction)
            if (this.offScreen(current)) {
                break
            }

        }

        line(this.position, current, [255])

    }
    offScreen(point) {
        return (point.x > width || point.x < 0 || point.y > height || point < 0)
    }
}