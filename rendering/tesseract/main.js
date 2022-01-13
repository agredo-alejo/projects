let angle, points
function init() {
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
    background(25)
    save()
    translate(width / 2, height / 2)


    
    let projected3d = []

    for (let i = 0; i < points.length; i++) {
        const v = points[i]

        const rotationXY = [
            [cos(angle), -sin(angle), 0, 0],
            [sin(angle), cos(angle), 0, 0],
            [0, 0, 1, 0],
            [0, 0, 0, 1]
        ];

        const rotationZW = [
            [1, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, cos(angle), -sin(angle)],
            [0, 0, sin(angle), cos(angle)]
        ]

        const rotationX = [
            [1, 0, 0, 0],
            [0, cos(-angle), -sin(-angle), 0],
            [0, sin(-angle), cos(-angle), 0],
            [0, 0, 0, 1]
        ]

        let rotated = matmul(rotationXY, v)
        rotated = matmul(rotationZW, rotated)
        rotated = matmul(rotationX, rotated)

        let distance = 2;
        let w = 1 / (distance - rotated.w)

        const projection = [
            [w, 0, 0, 0],
            [0, w, 0, 0],
            [0, 0, w, 0]
        ];

        let projected = matmul(projection, rotated)
        projected.mult(width / 8)
        projected3d[i] = projected

        fill(255)
        circle(projected, 2)
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

    restore()
}
init()

function connect(offset, i, j, points) {
    // strokeWeight(4);
    // stroke(255);
    const a = points[i + offset]
    const b = points[j + offset]
    save()
    lineWidth(5)
    line(a, b, [255, 0.75])
    restore()
}