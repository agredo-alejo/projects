import { addResizeCanvasListener, animation, background, constrain, rgbaColor, startAnimation } from "@apjs/dynamic"
import { Bird } from "./bird"
import { generate } from "./controller"
import { Pipe } from "./pipes"

export const canvas = document.querySelector("canvas")!
export const ctx = canvas.getContext("2d")!

export let totalPopulation = 70
export let activeBirds: Bird[] = []
export let allBirds: Bird[] = []
export let pipes: Pipe[] = []
export let size: number
export let diferenceAdjust: number
let counter = 0
// let birdArray = []

let cycles = 1
export let spacing: number
export let pipesWidth: number
// let highScore = 0

export let birdXPosition: number
export let gravity: number
export let up: number

addResizeCanvasListener(canvas)
function init() {
  canvas.width = innerWidth
  canvas.height = innerHeight

  spacing = innerHeight / 7
  pipesWidth = spacing / 1.5
  size = spacing / 7
  diferenceAdjust = pipesWidth + (size / 2)
  birdXPosition = innerWidth / 10


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
  if (event.targetTouches[0].pageX > innerWidth / 2) {
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

function resetGame() {
  counter = 0;
  pipes = [];
}
function nextGeneration() {
  resetGame();
  activeBirds = generate(allBirds);
  allBirds = activeBirds.slice();
}

function animate() {
  background(ctx, rgbaColor(125, 255, 255))
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
animation.animate(animate)
startAnimation()
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
