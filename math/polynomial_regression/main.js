let normalizedXinputs, normalizedYinputs
let mouseXinputs, mouseYinputs
let a, b, c, d

const optimizer = tf.train.adam(0.5)

addEventListener('click', () => {
    mouseXinputs.push(mouseX)
    mouseYinputs.push(mouseY)
    let x = map(mouseX, 0, width, 0, 1)
    let y = map(mouseY, 0, height, 0, 1)
    normalizedXinputs.push(x)
    normalizedYinputs.push(y)
})
function predict(inputs) {
    const tfXs = tf.tensor1d(inputs)
    // y = ax^3 + bx^2 + cx + d 
    const tfYs = tfXs.pow(tf.scalar(3)).mul(a).add(tfXs.square().mul(b)).add(tfXs.mul(c)).add(d)

    return tfYs
}
function loss(pred, label) {
    return pred.sub(label).square().mean()
}
function init() {
    mouseXinputs = []
    mouseYinputs = []
    normalizedXinputs = []
    normalizedYinputs = []
    a = tf.variable(tf.scalar(random(-1, 1)))
    b = tf.variable(tf.scalar(random(-1, 1)))
    c = tf.variable(tf.scalar(random(-1, 1)))
    d = tf.variable(tf.scalar(random(-1, 1)))
}
function animate() {
    clearCanvas()

    tf.tidy(() => {
        if (normalizedXinputs.length > 0) {
            optimizer.minimize(() => loss(predict(normalizedXinputs), tf.tensor1d(normalizedYinputs)))
        }
    })
    let screenXs = []
    for (let i = 0; i < 1; i += 3 / width ) {
        screenXs.push(i)
    }

    const computedYs = tf.tidy(() => predict(screenXs))
    let arrayTypeYs = computedYs.dataSync()
    computedYs.dispose()
    stroke()
    beginPath()
    for (let i = 0; i < screenXs.length; i++) {
        let x = screenXs[i] * width
        let y = arrayTypeYs[i] * height
        vertex(x, y)
    }
    lineWidth(2)
    closePath()

    for (let i = 0; i < mouseXinputs.length; i++) {
        fill(150)
        circle(mouseXinputs[i], mouseYinputs[i])
    }
}
init()

