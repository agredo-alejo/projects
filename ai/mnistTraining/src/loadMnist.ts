export async function loadMNIST() {

    let test_images = await loadFile('./test-images.idx3-ubyte', 16)

    let test_labels = await loadFile('./test-labels.idx1-ubyte', 8)

    let train_images = await loadFile('./train-images.idx3-ubyte', 16)

    let train_labels = await loadFile('./train-labels.idx1-ubyte', 8)

    return {
        test_images,
        test_labels,
        train_images,
        train_labels
    }
}

async function loadFile(file: RequestInfo, offset: number) {
    let r = await fetch(file)
    let data = await r.arrayBuffer()
    return new Uint8Array(data).slice(offset)
}
