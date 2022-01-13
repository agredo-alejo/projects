let ruleta
function init() {
    ruleta = new Ruleta()
}
addEventListener('dblclick', init)
function animate() {
    clearCanvas()

    ruleta.update()
}
init()


