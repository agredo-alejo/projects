let grid, cols, rows, resolution
function init() {
    resolution = 3
    cols = floor(width / resolution) 
    rows = floor(height / resolution) 


    grid = array2d(cols, rows)
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            grid[i][j] = (random() < 0.07) ? 1 : 0
        }
    }

}
let activo = true
addEventListener('keyup', (event)=>{
    if(event.keyCode == 32){
        activo = !activo
    }
})
mouseDragged = false
addEventListener('dblclick', init)
function animate() {
    background(50)

    if(mouseDragged){
        let x = floor(mouseX / resolution)
        let y = floor(mouseY / resolution)
        grid[x][y] = 1
    }
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            let x = i * resolution
            let y = j * resolution
            let w = resolution

            if (grid[i][j] == 1) {
                // save()
                fill(255)
                square(x, y, w)
                // restore()
                // strokeRect(x, y, w, w)
            }
            // styleColor(255,0.1)
            // strokeRect(x, y, w, w)

        }
    }

    if (activo) {
        let next = array2d(cols, rows)

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                let state = grid[i][j]
                let sum = countNeighbors(grid, i, j)



                if (state == 0 && sum == 3) {
                    next[i][j] = 1
                } else if (state == 1 && (sum < 2 || sum > 3)) {
                    next[i][j] = 0
                } else {
                    next[i][j] = state
                }



            }
        }

        grid = next
    }



}
init()
// setFps(10)
function countNeighbors(grid, x, y) {
    let sum = 0
    for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
            let col = (x + i + cols) % cols
            let row = (y + j + rows) % rows
            sum += grid[col][row]
        }
    }
    sum -= grid[x][y]
    return sum
}

let prueba = (x = 0)=>{
    let r 
    if(x == undefined){
        return 1
        
    }else{
        r = x
    }
    return r
}