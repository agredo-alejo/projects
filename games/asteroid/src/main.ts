import { addResizeCanvasListener, animation, background, onResizeCanvas, startAnimation } from "@apjs/dynamic"
import { Asteroid } from "./asteroid"
import { Laser } from "./laser"
import { Ship } from "./ship"

export const canvas = document.querySelector("canvas")!
export const ctx = canvas.getContext("2d")!

let ship: Ship
let asteroids: Asteroid[]
let lasers: Laser[]

function init() {
    canvas.width = innerWidth
    canvas.height = innerHeight
    asteroids = []
    lasers = []
    ship = new Ship();
    for (let i = 0; i < 5; i++) {
        asteroids.push(new Asteroid())
    }
}

function animate() {
    background(ctx, "#000")

    for (let i = 0; i < asteroids.length; i++) {
        if (ship.hits(asteroids[i])) {
            console.log('Game Over!')
        }
        asteroids[i].draw()
        asteroids[i].update()
        asteroids[i].edges()
    }

    for (let i = lasers.length - 1; i >= 0; i--) {
        lasers[i].draw()
        lasers[i].update()
        if (lasers[i].offscreen()) {
            lasers.splice(i, 1)
        } else {
            for (let j = asteroids.length - 1; j >= 0; j--) {
                if (lasers[i].hits(asteroids[j])) {
                    if (asteroids[j].r > 10) {
                        let newAsteroids = asteroids[j].breakup()
                        asteroids = asteroids.concat(newAsteroids)
                    }
                    asteroids.splice(j, 1)
                    lasers.splice(i, 1)
                    break
                }
            }
        }
    }


    ship.draw()
    ship.turn()
    ship.update()
    ship.edges()
}
init()
addResizeCanvasListener(canvas)
onResizeCanvas(init)
animation.animate(animate)
startAnimation()
// setFps(1)

addEventListener('keyup', () => {
    ship.setRotation(0)
    ship.boosting(false)
})

function keydown(event: KeyboardEvent) {
     
    switch (event.key) {
        case " ":
            lasers.push(new Laser(ship.pos, ship.heading))
            break;
        case "ArrowRight":
            ship.setRotation(0.1)
            break;
        case "ArrowLeft":
            ship.setRotation(-0.1)
            break;
        case "ArrowUp":
            ship.boosting(true)
            break;
        default:
            break;
    }
}
addEventListener("keydown", e=>keydown(e))