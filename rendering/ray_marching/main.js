let obstacles, numObstacles, perimeter, ray,center

function init() {
    center = createVector(halfWidth, halfHeight)
    perimeter = width + height
    numObstacles = floor(perimeter / 200)
    obstacles = []
    for(let i = 0; i < numObstacles; i++){
        obstacles.push(new Circle())
    }
    ray = new Ray()
}
addEventListener('dblclick', init)
function animate() {
    background(0)

    for(let obstacle of obstacles){
        obstacle.draw()
        // obstacle.update()
    }
    if(mouseIsDragged){
        let mouse = createVector(mouseX, mouseY)
        mouse.sub(center)
        ray.angle = mouse.heading()
    }

    ray.march(obstacles)
    ray.update()
    // ray.draw()
}
init()
function signedDistance(point1, point2, radius) {
    return Vector.dist(point1, point2) - radius
}