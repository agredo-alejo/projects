import { addResizeCanvasListener, animation, clearCanvas, onResizeCanvas, startAnimation } from "@apjs/dynamic"
import { Ruleta } from "./ruleta"

export const canvas = document.querySelector("canvas")!
export const ctx = canvas.getContext("2d")!
let ruleta: Ruleta
function init() {
    ruleta = new Ruleta()
}
addEventListener('dblclick', init)
function animate() {
    canvas.width = innerWidth
    canvas.height = innerHeight
    clearCanvas(ctx)

    ruleta.update()
}
init()
addResizeCanvasListener(canvas)
onResizeCanvas(init)
animation.animate(animate)
startAnimation()



