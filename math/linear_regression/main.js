let x_vals, y_vals = []
let x, y
let m, b

const learningRate = 0.5
const optimizer = tf.train.sgd(learningRate)


addEventListener('click', () => {
    x = map(mouseX, 0, width, 0, 1)
    y = map(mouseY, 0, height, 0, 1)
    x_vals.push(x)
    y_vals.push(y)
})


function predict(inputs) {
    const tfxs = tf.tensor1d(inputs)
    // y = mx + b
    const tfys = tfxs.mul(m).add(b)

    return tfys
}


function loss(pred, label) {
    return pred.sub(label).square().mean()
}



function init() {
    x_vals = []
    y_vals = []

    m = tf.variable(tf.scalar(random(-1, 1)))
    b = tf.variable(tf.scalar(random(-1, 1)))

}


function animate() {
    clearCanvas()

    tf.tidy(() => {
        if (x_vals.length > 0) {
            const ys = tf.tensor1d(y_vals)
            optimizer.minimize(() => loss(predict(x_vals), ys))
        }
    })



    for (let i = 0; i < x_vals.length; i++) {
        let px = map(x_vals[i], 0, 1, 0, width)
        let py = map(y_vals[i], 0, 1, 0, height)
        
        fill(150)
        circle(px,py)
        
    }

    const lineX = [0, 1]
    const ys = tf.tidy(() => predict(lineX))
    let lineY = ys.dataSync()
    ys.dispose()

    let x1 = 0
    let x2 = width

    let y1 = lineY[0] * height
    let y2 = lineY[1] * height

    lineCoords(x1, y1, x2, y2)

}


init()

