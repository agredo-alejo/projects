class Bird {
    constructor(brain) {
        this.positionY = height / 2
        this.velocity = 0
        this.score = 0
        if (brain instanceof nd.NeuralNet) {
            this.brain = brain.copy()
            this.brain.mutate(true, 0.25)
        } else {
            this.brain = new nd.NeuralNet()
            this.brain.add(nd.layer.norm({
                inputShape: 3
            }))
            this.brain.add(nd.layer.dense({
                // inputShape: 3,
                units: 2,
                activation: 'tanh'
            }))
            this.brain.add(nd.layer.dense({
                units: 1,
                activation: 'tanh'
            }))
        }
    }
    think(pipes) {
        let closest = null;
        let record = Infinity;
        for (let i = 0; i < pipes.length; i++) {
            let diff = pipes[i].x - birdXPosition;
            if (diff + diferenceAdjust > 0 && diff < record) {
                record = diff;
                closest = pipes[i];
            }
        }
        if (closest == null) return
        let inputs = []

        inputs.push(this.velocity)
        inputs.push(this.positionY)
        inputs.push(closest.centery)

        let decision = this.brain.predict(nd.tensor(inputs));
        if (decision.data[0] > 0) {
            this.jump()
        }
    }
    draw() {
        fill(255, 255, 0)
        circle(birdXPosition, this.positionY, size)
    }
    isDead() {
        if (this.positionY + size >= height) {
            this.positionY = height - size
            this.velocity = 0
            return true
        }
        else if (this.positionY - size <= 0) {
            this.positionY = size
            this.velocity = 0
            return true
        }
        else {
            return false
        }
    }
    clone() {
        return new Bird(this.brain)
    }
    jump() {
        this.velocity = up
    }
    save() {
        return this.brain.serialize()
    }
    update() {
        this.velocity += gravity
        this.positionY += this.velocity

        this.score += 0.001
        this.isDead()
        this.draw()
    }

}