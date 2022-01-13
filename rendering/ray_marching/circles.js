class Circle{
    constructor(){
        this.radius = random(smallerCanvasSide / 20, smallerCanvasSide / 10)
        this.position = createVector(
            // random(this.radius, width- this.radius),
            // random(this.radius, height - this.radius)
            random(width),
            random(height)
        )
        this.velocity = Vector.random2D()
        this.velocity.setMag(0.5)
    }
    egdes(){
        if (this.position.x > width) {
            this.position.x = 0
        } else if (this.position.x < 0) {
            this.position.x = width
        }
        if (this.position.y > height) {
            this.position.y = 0
        } else if (this.position.y < 0) {
            this.position.y = height
        }
    }
    update(){
        this.position.add(this.velocity)
        this.egdes()
    }
    draw(){
        stroke(255)
        circle(this.position, this.radius)
    }
}