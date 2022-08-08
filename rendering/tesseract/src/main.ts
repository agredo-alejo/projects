import { Vector4d } from "./vector4d"
import { addResizeCanvasListener, animation, background, circle, fill, grayScaleColor, line, onResizeCanvas, startAnimation, stroke } from "@apjs/dynamic";
import { matmul } from "./matrixUtils";


const canvas = document.querySelector("canvas")!
const ctx = canvas.getContext("2d")!
let angle: number
let points: Vector4d[]
function init() {
  canvas.width = innerWidth
  canvas.height = innerHeight
  angle = 0
  points = []



  for (let i = -1; i < 2; i += 2) {
    for (let j = -1; j < 2; j += 2) {
      points.push(new Vector4d(-1, -1, j, i))
      points.push(new Vector4d(1, -1, j, i))
      points.push(new Vector4d(1, 1, j, i))
      points.push(new Vector4d(-1, 1, j, i))
    }
  }


}

function animate() {
  background(ctx, grayScaleColor(25))
  ctx.save()
  ctx.translate(innerWidth / 2, innerHeight / 2)



  let projected3d = []

  for (let i = 0; i < points.length; i++) {
    const v = points[i]

    const rotationXY = [
      [Math.cos(angle), -Math.sin(angle), 0, 0],
      [Math.sin(angle), Math.cos(angle), 0, 0],
      [0, 0, 1, 0],
      [0, 0, 0, 1]
    ];

    const rotationZW = [
      [1, 0, 0, 0],
      [0, 1, 0, 0],
      [0, 0, Math.cos(angle), -Math.sin(angle)],
      [0, 0, Math.sin(angle), Math.cos(angle)]
    ]

    const rotationX = [
      [1, 0, 0, 0],
      [0, Math.cos(-angle), -Math.sin(-angle), 0],
      [0, Math.sin(-angle), Math.cos(-angle), 0],
      [0, 0, 0, 1]
    ]

    let rotated = matmul(rotationXY, v)
    rotated = matmul(rotationZW, rotated)
    rotated = matmul(rotationX, rotated) as Vector4d

    let distance = 2;
    let w = 1 / (distance - rotated.w)

    const projection = [
      [w, 0, 0, 0],
      [0, w, 0, 0],
      [0, 0, w, 0]
    ];

    let projected = matmul(projection, rotated) as Vector4d
    projected.mult(innerWidth / 8)
    projected3d[i] = projected

    circle(ctx, projected.x, projected.y, 2)
    fill(ctx, "#0f0")
  }

  // Connecting
  for (let i = 0; i < 4; i++) {
    connect(0, i, (i + 1) % 4, projected3d)
    connect(0, i + 4, ((i + 1) % 4) + 4, projected3d)
    connect(0, i, i + 4, projected3d)
  }

  for (let i = 0; i < 4; i++) {
    connect(8, i, (i + 1) % 4, projected3d)
    connect(8, i + 4, ((i + 1) % 4) + 4, projected3d)
    connect(8, i, i + 4, projected3d)
  }

  for (let i = 0; i < 8; i++) {
    connect(0, i, i + 8, projected3d)
  }

  // angle = map(mouseX, 0, width, 0, Tau);
  angle += 0.005

  ctx.restore()
}
init()
addResizeCanvasListener(canvas)
onResizeCanvas(init)
animation.animate(animate)
startAnimation()

function connect(offset: number, i: number, j: number, points: Vector4d[]) {
  // strokeWeight(4);
  // stroke(255);
  const a = points[i + offset]
  const b = points[j + offset]
  ctx.save()
  ctx.lineWidth = 1
  line(ctx, a.x, a.y, b.x, b.y)
  stroke(ctx, grayScaleColor(255, 0.75))
  ctx.restore()
}