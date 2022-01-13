class Asteroid {
    constructor(pos, r) {
        if (pos) {
            this.pos = pos.copy()
        } else {
            this.pos = new Vector(random(width), random(height))
        }

        if (r) {
            this.r = r * 0.5
        } else {
            this.r = random(15, 50)
        }


        this.vel = Vector.random2D()
        this.total = floor(random(5, 15))
        this.offset = []
        for (var i = 0; i < this.total; i++) {
            let offset = this.r * 0.5
            this.offset[i] = random(-1, 1) * offset
        }
    }
    update() {
        this.pos.add(this.vel)
    }

    draw() {
        save()
        translate(this.pos)

        stroke(255)
        beginPath()
        for (let i = 0; i <= this.total; i++) {
            let iteration = i % this.total,
                angle = map(iteration, 0, this.total, 0, Tau),
                r = this.r + this.offset[iteration],
                x = r * cos(angle),
                y = r * sin(angle)
            vertex(x, y)
        }
        closePath()
        restore()
    }

    breakup() {
        let newA = []
        newA[0] = new Asteroid(this.pos, this.r)
        newA[1] = new Asteroid(this.pos, this.r)
        return newA
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
}
