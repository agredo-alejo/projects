import { addMouseListeners, addResizeCanvasListener, animation, background, fill, grayScaleColor, mouse, onResizeCanvas, rect, startAnimation } from "@apjs/dynamic"
import { TensorLike2D } from "@apjs/tensor";


let canvas = document.querySelector("canvas")!
let ctx = canvas.getContext("2d")!
let grid: TensorLike2D
let cols: number
let rows: number
let resolution: number

function init() {
  canvas.width = innerWidth
  canvas.height = innerHeight
  resolution = 3
  cols = Math.floor(innerWidth / resolution)
  rows = Math.floor(innerHeight / resolution)


  grid = []
  for (let i = 0; i < cols; i++) {
    grid[i] = []
    for (let j = 0; j < rows; j++) {
      grid[i][j] = (Math.random() < 0.07) ? 1 : 0
    }
  }

}
let activo = true
addEventListener('keyup', (event) => {
  if (event.key === ' ') {
    activo = !activo
  }
})

addEventListener('dblclick', init)
function turnOnCellOnMouseDragg() {
  if (mouse.dragging) {
    let x = Math.floor(mouse.x! / resolution)
    if (x < 0 || x >= cols) return
    let y = Math.floor(mouse.y! / resolution)
    if (y < 0 || y >= rows) return
    grid[x][y] = 1
  }
}
function animate() {
  background(ctx, grayScaleColor(50))

  turnOnCellOnMouseDragg()
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      let x = i * resolution
      let y = j * resolution
      let w = resolution

      if (grid[i][j] == 1) {
  
        rect(ctx, x, y, w)
        fill(ctx, "#fff")

      }

    }
  }

  if (activo) {
    let next: TensorLike2D = []

    for (let i = 0; i < cols; i++) {
      next[i] = []
      for (let j = 0; j < rows; j++) {
        let state = grid[i][j]
        let sum = countNeighbors(grid, i, j)



        if (state == 0 && sum == 3) {
          next[i][j] = 1
        } else if (state == 1 && (sum < 2 || sum > 3)) {
          next[i][j] = 0
        } else {
          next[i][j] = state
        }



      }
    }

    grid = next
  }



}
init()
addResizeCanvasListener(canvas)
onResizeCanvas(init)
animation.animate(animate)
startAnimation()
addMouseListeners()
// setFps(10)
function countNeighbors(grid: TensorLike2D, x: number, y: number) {
  let sum = 0
  for (let i = -1; i < 2; i++) {
    for (let j = -1; j < 2; j++) {
      let col = (x + i + cols) % cols
      let row = (y + j + rows) % rows
      sum += grid[col][row]
    }
  }
  sum -= grid[x][y]
  return sum
}

