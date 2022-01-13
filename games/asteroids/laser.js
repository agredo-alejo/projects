class Laser {
    constructor(spos, angle) {
        this.pos = createVector(spos.x, spos.y)
        this.vel = Vector.fromAngle(angle)
        this.vel.mult(10)
    }
    update() {
        this.pos.add(this.vel)
    }

    draw() {
        save()
        lineWidth(4)
        stroke(255)
        circle(this.pos)
        restore()
    }

    hits(asteroid) {
        return this.pos.dist(asteroid.pos) < asteroid.r
    }

    offscreen() {
        if (this.pos.x > width || this.pos.x < 0) {
            return true
        }
        if (this.pos.y > height || this.pos.y < 0) {
            return true
        }
        return false
    }
}