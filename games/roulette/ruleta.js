// Alejandro Agredo Portilla - Noviembre / 2019 - @agredoalejo en instagram
class Ruleta {
    constructor() {
        this.position = createVector(width / 2, height / 2)
        if (width < height) {
            this.size = (width / 2) * 0.9
        } else {
            this.size = (height / 2) * 0.9
        }
        this.numeros = [0, 28, 9, 26, 30, 11, 7, 20, 32, 17, 5, 22, 34, 15, 3, 24, 36, 13, 1, '00', 27, 10, 25, 29, 12, 8, 19, 31, 18, 6, 21, 33, 16, 4, 23, 35, 14, 2]

        this.velocity = 10

        this.angle = random(Pi * 2)
        this.angularVelocity = random(this.velocity / 2, this.velocity)

        this.angleBall = random(Pi * 2)
        this.angularVelocityBall = random(-this.velocity / 2, -this.velocity)


        this.fontsize = this.size * 0.09
        this.color = [150, 80, 0]

        this.friction = 0.975


        this.radiusBall = this.size * 0.7
        this.posBall = createVector(
            this.radiusBall * Math.cos(this.angleBall),
            this.radiusBall * Math.sin(this.angleBall)
        )
    }

    draw() {
        save()
        translate(this.position.x, this.position.y)

        fill(this.color)
        circle(Vector.zero, this.size * 1.05)

        stroke(255)
        circle(Vector.zero, this.size)


        save()
        rotate(this.angle)

        fill()
        circle(Vector.zero, this.size * 0.85)



        for (let i = 0; i < 38; i++) {
            let angulo = (i * Pi * 2 / 38)
            let anguloColor2 = ((i + 1) * Pi * 2 / 38)

            let internMag = this.size * 0.85
            let x1 = internMag * Math.cos(angulo)
            let y1 = internMag * Math.sin(angulo)

            let x2 = internMag * Math.cos(anguloColor2)
            let y2 = internMag * Math.sin(anguloColor2)



            if (i % 2 == 0) {
                fill(255, 0, 0)
                beginPath()
                moveTo(0, 0)
                vertex(x1, y1);
                vertex(x2, y2)

                closePath()

            }

            if (i == 0 || i == 19) {
                fill(0, 200, 0)

                beginPath()
                moveTo(0, 0)
                vertex(x1, y1);
                vertex(x2, y2)

                closePath()

            }

            save()

            let mag = this.size * 0.75
            translate(
                mag * Math.cos(angulo),
                mag * Math.sin(angulo)
            )
            rotate(angulo + (Pi / 2))

            fill(255)
            font('' + this.fontsize + 'px Arial')
            text('' + this.numeros[i] + '', 2.5, 0)
            restore()


        }

        restore()

        fill(this.color)
        circle(0, 0, this.size * 0.6)


        rotate(this.angleBall)
        fill(255)
        circle(this.posBall, this.size * 0.05)


        line(this.posBall, Vector.mult(this.posBall, 0.875), 255)

        restore()
    }

    update() {

        if (this.angularVelocity <= 0.00001) {
            this.angularVelocity = 0
        }

        this.angle += this.angularVelocity

        this.angleBall += this.angularVelocityBall

        this.angularVelocityBall *= this.friction
        this.angularVelocity *= this.friction

        this.draw()
    }

}