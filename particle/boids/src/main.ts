import { addMouseListeners, addResizeCanvasListener, animation, clearCanvas, mouse, setFps, startAnimation } from "@apjs/dynamic"
import { _constrain } from "@apjs/tensor"
import { sub, Vector } from "@apjs/vector"
import { Boid } from "./boids"
import { Chaser } from "./chaser"


export const canvas = document.querySelector("canvas")!
export const ctx = canvas.getContext("2d")!
export let diagonalMag = Math.hypot(innerWidth, innerHeight)
export let smallerCanvasSide = Math.min(innerWidth, innerHeight)
export let resolution: number
export let grid: any[]
let numBoids
let boids: Boid[]
let chasers: Chaser[]
let raton: Vector
let diagonal
let chaserPerception: number
let numChasers = 2
let cols, rows


const avoid = (boid: Boid, target: Vector) => {
  if (boid.position.dist(target) >= chaserPerception) return

  return sub(boid.position, target)
}

const array2d = (rows: number, cols: number, content: any = 0) => {
  return Array(rows).fill(undefined).map(() => Array(cols).fill(content))
}

function init() {
  canvas.width = innerWidth
  canvas.height = innerHeight
  
  boids = []
  chasers = []
  raton = new Vector()
  diagonal = new Vector(innerWidth, innerHeight)
  diagonalMag = diagonal.mag
  chaserPerception = diagonal.mag * 0.05

  numBoids = (innerHeight + innerWidth) / 5
  if (innerWidth == smallerCanvasSide) {
    numBoids = (innerHeight + innerWidth) / 10
  }
  numBoids = _constrain(numBoids, 1, 400)


  resolution = smallerCanvasSide / 2.5
  resolution = _constrain(resolution, 1, Infinity)

  cols = Math.floor(innerWidth / resolution) + 1
  rows = Math.floor(innerHeight / resolution) + 1
  grid = array2d(rows, cols, [])

  for (let i = 0; i < numBoids; i++) {
    boids.push(new Boid())
  }
  for (let i = 0; i < numChasers; i++) {
    chasers.push(new Chaser())
  }
}

addEventListener('dblclick', init)

addMouseListeners()
addResizeCanvasListener(canvas)
function animate() {
  clearCanvas(ctx)

  if(mouse.x){
    raton.set(mouse.x, mouse.y)
  }
  
  for (let boid of boids) {
    boid.update()
    boid.draw()

    let force = avoid(boid, raton)
    
    if (force) {
      boid.applyForce(force)
    }
    for (let chaser of chasers) {
      let force = avoid(boid, chaser.position)
      if (force) {
        boid.applyForce(force)
      }
    }
  }
  chasers.forEach(chaser => {
    chaser.update()
    chaser.draw()
  });
  

  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      grid[i][j] = []
    }
  }
 
}
init()
animation.animate(animate)
startAnimation()