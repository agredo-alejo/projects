let totalPopulation = 70
let activeBirds = []
let allBirds = []
let pipes = []
let size
let diferenceAdjust
let counter = 0
let birdArray = []

let cycles = 1
let spacing
let pipesWidth
let highScore = 0

let birdXPosition, gravity, up


function init() {
    spacing = height / 7
    pipesWidth = spacing / 1.5
    size = spacing / 7
    diferenceAdjust = pipesWidth + (size / 2)
    birdXPosition = width / 10


    up = -spacing / 12
    gravity = -up / 10

    resetGame()

    for (let i = 0; i < totalPopulation; i++) {
        let bird = new Bird()
        activeBirds[i] = bird
        allBirds[i] = bird
    }
}

addEventListener('keydown', (event) => {
    if (event.keyCode == 32) {
        activeBirds[0].jump()
    }
    if (event.keyCode == 37) {
        cycles -= 4
    }
    if (event.keyCode == 39) {
        cycles += 1
    }
    cycles = constrain(cycles, 0, 70)
})

let pressingR = false
let pressingL = false
addEventListener('touchstart', (event) => {
    if (event.targetTouches[0].pageX > width / 2) {
        pressingR = true
    } else {
        pressingL = true
    }
})
addEventListener('touchend', () => {
    pressingR = false
    pressingL = false
})
function mobileEventHandler() {
    if (pressingR) {
        cycles += 0.25
        cycles = constrain(cycles, 0, 70)
    }
    if (pressingL) {
        cycles -= 1
        cycles = constrain(cycles, 0, 70)
    }
}
function animate() {
    background(125, 255, 255)
    mobileEventHandler()

    for (let i = 0; i < cycles; i++) {
        gameLogic()
    }
    // Draw everything
    for (let i = 0; i < pipes.length; i++) {
        pipes[i].draw();
    }
    
    // If we're out of birds go to the next generation
    if (activeBirds.length == 0) {
        nextGeneration();
    }

    for (let i = 0; i < activeBirds.length; i++) {
        activeBirds[i].draw();
    }
}
init()
// setFps(10)
function gameLogic() {
    for (let j = pipes.length - 1; j >= 0; j--) {
        pipes[j].update()
        if (pipes[j].offscreen()) {
            pipes.splice(j, 1)
        }
    }

    for (let j = activeBirds.length - 1; j >= 0; j--) {
        let bird = activeBirds[j]

        bird.think(pipes)
        bird.update()

        for (let k = 0; k < pipes.length; k++) {
            if (pipes[k].hits(activeBirds[j])) {
                activeBirds.splice(j, 1)
                break
            }
        }
        if (bird.isDead()) {
            activeBirds.splice(j, 1)
        }
    }

    if (counter % 72 == 0) {
        pipes.push(new Pipe());
        counter = 0
    }
    counter++;
}
