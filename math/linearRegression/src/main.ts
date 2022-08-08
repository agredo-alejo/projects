import { addMouseListeners, addResizeCanvasListener, animation, circle, clearCanvas, fill, grayScaleColor, line, map, mouse, onResizeCanvas, randomRange, startAnimation } from "@apjs/dynamic";
import { scalar, Tensor1D, tensor1d, tidy, train, Variable, variable } from "@tensorflow/tfjs";

let canvas = document.querySelector("canvas")!
let ctx = canvas.getContext("2d")!

let x_vals: number[] = []
let y_vals: number[] = []
let x
let y
let m: Variable
let b: Variable

const learningRate = 0.5
const optimizer = train.sgd(learningRate)


addEventListener('click', () => {
    x = map(mouse.x!, 0, innerWidth, 0, 1)
    y = map(mouse.y!, 0, innerHeight, 0, 1)
    x_vals.push(x)
    y_vals.push(y)
})


function predict(inputs: number[]) {
    const tfxs = tensor1d(inputs)
    // y = mx + b
    const tfys = tfxs.mul(m).add(b)

    return tfys
}


function loss(pred: any, label: Tensor1D) {
    return pred.sub(label).square().mean()
}



function init() {
    canvas.width = innerWidth
    canvas.height = innerHeight
    x_vals = []
    y_vals = []

    m = variable(scalar(randomRange(-1, 1)))
    b = variable(scalar(randomRange(-1, 1)))

}


function animate() {
    clearCanvas(ctx)

    tidy(() => {
        if (x_vals.length > 0) {
            const ys = tensor1d(y_vals)
            optimizer.minimize(() => loss(predict(x_vals), ys))
        }
    })



    for (let i = 0; i < x_vals.length; i++) {
        let px = map(x_vals[i], 0, 1, 0, innerWidth)
        let py = map(y_vals[i], 0, 1, 0, innerHeight)
        
        circle(ctx, px,py)
        fill(ctx, grayScaleColor(150))
        
    }

    const lineX = [0, 1]
    const ys = tidy(() => predict(lineX))
    let lineY = ys.dataSync()
    ys.dispose()

    let x1 = 0
    let x2 = innerWidth

    let y1 = lineY[0] * innerHeight
    let y2 = lineY[1] * innerHeight

    line(ctx, x1, y1, x2, y2)
    ctx.stroke()

}


init()
addMouseListeners()
addResizeCanvasListener(canvas)
onResizeCanvas(init)
animation.animate(animate)
startAnimation()

