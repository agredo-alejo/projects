let boton = document.getElementById('btn')
let resultados = document.getElementById('res')
let number = document.getElementById('numero')
let pos = document.getElementById('posicion')

boton.addEventListener('click', fibonacci)
addEventListener('keyup', (event) => {
    if (event.keyCode == 13) {
        fibonacci()
    }
})


function fibonacci() {
    let x, y, z
    
    resultados.innerHTML = ''
    pos.innerHTML = ''
    iterations = parseInt(number.value)
    
    x = 0
    y = 1

    for (i = 1; i <= iterations; i++) {
        z = x + y
        x = y
        y = z
        pos.innerHTML += '#' + i + ':' + '<br/><hr/>'
        resultados.innerHTML += x + '<br/><hr/>'
    }
}

