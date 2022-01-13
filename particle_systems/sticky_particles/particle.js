class Particle {
    constructor() {
        this.position = createVector(random(width), random(height))
        this.velocity = Vector.random2D()
        this.radio = 1
    }
    draw() {
        fill()
        circle(this.position, this.radio)
    }
    edges() {
        if (this.position.x + this.radio > width || this.position.x - this.radio < 0) {
            this.velocity.x *= -1
        }
        if (this.position.y + this.radio > height || this.position.y - this.radio < 0) {
            this.velocity.y *= -1
        }
    }
    sticky(vector, stickyDistance) {
        if (drawLines) {
            let distance = this.position.dist(vector)
            if (distance <= stickyDistance) {
                let alpha = 1 - (distance / stickyDistance)
                // Or
                // let alpha = (stickyDistance - distance) / stickyDistance 

                // let alpha = map(distance, 0, stickyDistance, 1, 0)
                //  \_(._.)-/

                line(this.position, vector, [125, alpha])
            }
        }
    }
    triangles() {
        if (drawTriangles) {
            let closest, secondClosest
            let record = Infinity
            for (particle of particles) {
                if (this === particle) continue
                let distance = this.position.dist(particle.position)
                if (distance < record) {
                    record = distance
                    secondClosest = closest
                    closest = particle
                }

            }
            if (secondClosest) {
                let side1 = this.position.dist(secondClosest.position)
                let side2 = this.position.dist(closest.position)
                let side3 = secondClosest.position.dist(closest.position)

                let maxSide = stickyDistance

                let largerSide = Math.max(side1, side2, side3)
                let shorterSide = Math.min(side1, side2, side3)


                if (largerSide < maxSide) {
                    let alpha = 1 - (shorterSide + largerSide) / (maxSide * 2)

                    fill(125, alpha)
                    triangle(this.position, closest.position, secondClosest.position)

                }
            }
        }
    }
    update() {
        this.position.add(this.velocity)
        this.edges()
        this.triangles()
        for (particle of particles) {
            if (this === particle) continue
            this.sticky(particle.position, stickyDistance)
        }
    }
}
