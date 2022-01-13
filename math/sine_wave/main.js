let frecuency = 1.5
let amplitude = 50
let waveLength = 50
let increment = 0
background(0)
function animate() {
    background(0, 0.03)

    stroke(30, 170, 255)
    beginPath()
    moveTo(0, calc(0) + height / 2)
    for (let index = 0; index < width; index++) {
        vertex(index, calc(index) + height / 2)
    }
    closePath()

    increment -= frecuency
}
function calc(x) {
    return Math.sin((x + increment) / waveLength) * (amplitude * Math.sin(increment / 100))
}