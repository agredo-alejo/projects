class Particle {
    constructor() {
        this.position = createVector(width / 2, height / 2)
        this.rays = []
        for (let i = 0; i < 360; i++) {
            this.rays.push(new Ray(this.position, rad(i)))
        }
    }

    look(walls) {
        for (ray of this.rays) {
            let closest = null
            let record = Infinity

            for (wall of walls) {
                let pt = ray.cast(wall)

                if (pt) {
                    let distance = Vector.dist(this.position, pt)
                    if (distance < record) {
                        record = distance
                        closest = pt
                    }
                }
            }
            if (closest) {
                line(this.position, closest, [255, 0.4])
            }
        }
    }
    update(x, y) {
        this.position.set(x, y)
    }
    show() {
        fill(255)
        circle(this.position, 1)
        // for (ray of this.rays) {
        //     ray.show()
        // }
    }
}
