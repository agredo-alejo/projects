class Ray {
    constructor(position, angle) {
        this.position = position
        this.direction = Vector.fromAngle(angle)
    }
    show() {
        // save()
        // translate(this.position)
        // line(Vector.zero, Vector.mult(this.direction, 10),[255])
        // restore()
    }
    cast(wall) {
        let x1 = wall.a.x
        let y1 = wall.a.y
        let x2 = wall.b.x
        let y2 = wall.b.y

        let x3 = this.position.x
        let y3 = this.position.y
        let x4 = this.position.x + this.direction.x
        let y4 = this.position.y + this.direction.y

        let den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)

        if (den == 0) {
            return
        }

        let t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den
        let u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3)) / den

        if (t > 0 && t < 1 && u > 0) {
            let pt = createVector(
                x1 + t * (x2 - x1),
                y1 + t * (y2 - y1)
            )
            return pt
        } else {
            return
        }
    }
}