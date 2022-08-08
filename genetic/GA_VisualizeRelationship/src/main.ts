import { addResizeCanvasListener, animation, background, circleVector, constrain, fill, grayScaleColor, rgbaColor, setFps, startAnimation } from "@apjs/dynamic"
import { createVector, Vector } from "@apjs/vector"
import { Boid } from "./boid"

export const canvas = document.querySelector("canvas")!
export const ctx = canvas.getContext("2d")!

export let boids: Boid[]
export let food: Vector[]
export let poison: Vector[]
export let smallerCanvasSide: number


// Controladores
let numboids = 50
let numPoison
let numFood
// let reproductionSpeed = 0.5
// let mutationRate = 0.5
// let mutation = 1


export const colores = [
  [255, 255, 255],
  // [255, 255, 0],

  // [0, 255, 255],

]
const createFood = () => {
  let x = Math.random()*innerWidth
  let y = Math.random()*innerHeight
  food.push(createVector(x, y))
}
const createPoison = () => {
  let x = Math.random()*innerWidth
  let y = Math.random()*innerHeight
  poison.push(createVector(x, y))
}
const createBoids = (num: number) => {
  for (let i = 0; i < num; i++) {
    let x = Math.random()*innerWidth
    let y = Math.random()*innerHeight
    let position = createVector(x, y)

    boids.push(new Boid(position))
  }
}
// let diagonalVector
function init() {
  // diagonalVector = createVector(innerWidth, innerHeight)
  // diagonalVectorMag = diagonalVector.mag
  canvas.width = innerWidth
  canvas.height = innerHeight
  numFood = 0
  numPoison = 2
  numPoison = innerWidth * innerHeight / 8000 * numPoison
  numFood = numPoison * 1
  smallerCanvasSide = Math.min(innerHeight, innerWidth)
  // if(width == smallerSide){
  //     numFood = numPoison*3
  // }
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
addEventListener('dblclick', init)
let cycles = 1
addEventListener('keydown', (event) => {

  if (event.keyCode == 37) {
    cycles -= 1
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
      cycles += 1
    }
    if (pressingL) {
      cycles -= 3
    }
    cycles = constrain(cycles, 0, 70)
    pressCounter = 0
  }
  pressCounter++
  for (let i = 0; i < cycles; i++) {



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
addResizeCanvasListener(canvas)
setFps(30)
init()
animation.animate(animate)
startAnimation()