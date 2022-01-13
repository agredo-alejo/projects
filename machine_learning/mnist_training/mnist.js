function loadMNIST(callback) {
    let mnist = {}
    loadFile('test-images.idx3-ubyte', 16)
        .then(data => {
            mnist.test_images = data
            return loadFile('test-labels.idx1-ubyte', 8)
        })
        .then(data => {
            mnist.test_labels = data
            return loadFile('train-images.idx3-ubyte', 16)
        })
        .then(data => {
            mnist.train_images = data
            return loadFile('train-labels.idx1-ubyte', 8)
        })
        .then(data => {
            mnist.train_labels = data
            callback(mnist)
        })
}

async function loadFile(file, offset) {
    let r = await fetch(file)
    let data = await r.arrayBuffer()
    return new Uint8Array(data).slice(offset)
}
function download(filename, text) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}