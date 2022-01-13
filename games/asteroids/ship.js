class Ship {
    constructor() {
        this.pos = new Vector(width / 2, height / 2)
        this.r = 20
        this.heading = 0
        this.rotation = 0
        this.vel = Vector.zero
        this.isBoosting = false
    }
    boosting(b) {
        this.isBoosting = b
    }

    update() {
        if (this.isBoosting) {
            this.boost()
        }
        this.pos.add(this.vel)
        this.vel.mult(0.99)
    }

    boost() {
        var force = Vector.fromAngle(this.heading)
        force.mult(0.1)
        this.vel.add(force)
    }

    hits(asteroid) {
        var d = this.pos.dist(asteroid.pos)
        if (d < this.r + asteroid.r) {
            return true
        } else {
            return false
        }
    }

    draw() {
        save()
        translate(this.pos)
        rotate(this.heading + Pi / 2)
        // fill(0);
        stroke(255)
        triangleCoords(
            -this.r, this.r,
            this.r, this.r,
            0, -this.r
        )
        restore()
    }

    edges() {
        if (this.pos.x > width + this.r) {
            this.pos.x = -this.r
        } else if (this.pos.x < -this.r) {
            this.pos.x = width + this.r;
        }
        if (this.pos.y > height + this.r) {
            this.pos.y = -this.r
        } else if (this.pos.y < -this.r) {
            this.pos.y = height + this.r;
        }
    }

    setRotation(a) {
        this.rotation = a
    }

    turn() {
        this.heading += this.rotation
    }
}
