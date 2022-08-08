import { addResizeCanvasListener, animation, background, circleVector, constrain, fill, grayScaleColor, rgbaColor, setFps, startAnimation } from "@apjs/dynamic"
import { createVector, Vector } from "@apjs/vector"
import { Boid } from "./boid"


export const canvas = document.querySelector("canvas")!
export const ctx = canvas.getContext("2d")!
export let boids: Boid[]
let food: Vector[]
let poison: Vector[]


// Controladores
let numboids = 50
let numPoison
let numFood
// let reproductionSpeed = 0.5
// let mutationRate = 0.5
// let mutation = 1


export const colores = [
  // [255, 255, 255],
  [255, 255, 0],
  // [0, 255, 0],
  // [100,100,100]
  // [255,0,255],
  [0, 255, 255],
  // [255,0,0],
  // [0, 150, 255]
  // [0, 0, 0]
]
addEventListener('dblclick', init)
const createFood = () => {
  let x = Math.random() * innerWidth
  let y = Math.random() * innerHeight
  food.push(createVector(x, y))
}
const createPoison = () => {
  let x = Math.random() * innerWidth
  let y = Math.random() * innerHeight
  poison.push(createVector(x, y))
}
const createBoids = (num: number) => {
  for (let i = 0; i < num; i++) {
    let x = Math.random() * innerWidth
    let y = Math.random() * innerHeight
    let position = createVector(x, y)

    boids.push(new Boid(position))
  }
}

let diagonalVector
export let diagonalVectorMag: number
export let size: number

addResizeCanvasListener(canvas)
function init() {
  canvas.width = innerWidth
  canvas.height = innerHeight
  diagonalVector = createVector(innerWidth, innerHeight)
  diagonalVectorMag = diagonalVector.mag
  numFood = 0
  numPoison = 2
  numPoison = innerWidth * innerHeight / 8000 * numPoison
  numFood = numPoison * 1

  let smallerCanvasSide = Math.min(innerHeight, innerWidth)
  if (innerWidth == smallerCanvasSide) {
    numFood = numPoison * 2
  }
  size = diagonalVectorMag / 200
  if (innerWidth == smallerCanvasSide) {
    size = diagonalVectorMag / 125
  }
  boids = []
  food = []
  poison = []
  createBoids(numboids)

  for (let i = 0; i < numFood; i++) {
    createFood()
  }
  for (let i = 0; i < numPoison; i++) {
    createPoison()
  }
}

let cycles = 1
addEventListener('keydown', (event) => {

  if (event.keyCode == 37) {
    cycles -= 3
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
  if (pressingR) {
    pressingR = false
  }
  if (pressingL) {
    pressingL = false
  }
})
let pressCounter = 0

function animate() {
  background(ctx, grayScaleColor(50))


  if (pressCounter % 2 == 0) {
    if (pressingR) {
      cycles += 2
    }
    if (pressingL) {
      cycles -= 2
    }
    cycles = constrain(cycles, 0, 70)
    pressCounter = 0
  }
  pressCounter++
  for (let i = 0; i < cycles; i++) {

    // for (let i = 0; i < 30; i++) {
    //     if (food.length < numFood) {
    //         createFood()
    //     }

    // }

    // for (let i = 0; i < 50; i++) {
    //     if (poison.length < numPoison) {
    //         createPoison()
    //     }
    // }


    if (boids.length == 0) {
      createBoids(numboids)
    }


    for (let i = boids.length - 1; i >= 0; i--) {

      boids[i].behaviors(food, poison)
      boids[i].update()

      let newBoid = boids[i].clone()
      if (newBoid !== null) {
        boids.unshift(newBoid)
      }


      if (boids[i].dead()) {
        // food.push(createVector(
        //     boids[i].position.x,
        //     boids[i].position.y
        // ))
        boids.splice(i, 1)
      }
    }
  }
  let pointsSize = 1.5
  food.forEach((food) => {
    circleVector(ctx, food, pointsSize)
    fill(ctx, rgbaColor(0, 255, 0))
  })
  poison.forEach((poison) => {
    circleVector(ctx, poison, pointsSize)
    fill(ctx, rgbaColor(255, 0, 0))
  })
  boids.forEach((boid) => {
    boid.draw()
  })
}
init()
animation.animate(animate)
startAnimation()
setFps(30)